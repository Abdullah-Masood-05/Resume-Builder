"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { jobService, applicationService, type Job } from "@/lib/services";
import { Card, Button, Modal, SearchBar, Badge, EmptyState } from "@/components/ui";
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaCalendar, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function JobBrowsing() {
    const { user } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []); const loadJobs = useCallback(() => {
        const allJobs = jobService.getAll();
        setJobs(allJobs);
    }, []);

    const loadAppliedJobs = useCallback(() => {
        if (user) {
            const applications = applicationService.getByCandidateId(user.id);
            const appliedJobIds = new Set(applications.map((app) => app.jobId));
            setAppliedJobs(appliedJobIds);
        }
    }, [user]);

    useEffect(() => {
        if (user?.role !== "candidate") {
            router.push("/dashboard");
            return;
        }
        loadJobs();
        loadAppliedJobs();
    }, [user, router, loadJobs, loadAppliedJobs]);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const applyToJob = (job: Job) => {
        setSelectedJob(job);
        setShowApplicationModal(true);
    };

    const hasApplied = (jobId: string) => appliedJobs.has(jobId);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
                    <p className="text-gray-600">
                        Discover opportunities and apply with your professional resume
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search by job title, company, or location..."
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Available Jobs</p>
                                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaBriefcase className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">My Applications</p>
                                <p className="text-3xl font-bold text-gray-900">{appliedJobs.size}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FaCheckCircle className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">New This Week</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {
                                        jobs.filter((job) => {
                                            const weekAgo = new Date();
                                            weekAgo.setDate(weekAgo.getDate() - 7);
                                            return new Date(job.postedDate) > weekAgo;
                                        }).length
                                    }
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaCalendar className="text-orange-600 text-xl" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Job Listings */}
                {filteredJobs.length === 0 ? (
                    <EmptyState
                        icon={<FaBriefcase className="w-16 h-16" />}
                        title="No jobs found"
                        description="Try adjusting your search criteria or check back later for new opportunities."
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredJobs.map((job) => (
                            <Card key={job.id} hover className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {job.title}
                                                </h3>
                                                <p className="text-gray-600 font-medium">{job.company}</p>
                                            </div>
                                            <Badge variant="info">{job.type}</Badge>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-gray-400" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaDollarSign className="text-gray-400" />
                                                {job.salary}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCalendar className="text-gray-400" />
                                                Posted {mounted ? new Date(job.postedDate).toLocaleDateString() : "..."}
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4">{job.description}</p>

                                        <div className="mb-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                                {job.requirements.slice(0, 3).map((req, idx) => (
                                                    <li key={idx} className="text-sm">
                                                        {req}
                                                    </li>
                                                ))}
                                                {job.requirements.length > 3 && (
                                                    <li className="text-sm text-gray-500">
                                                        +{job.requirements.length - 3} more
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            <span className="font-semibold">{job.applicationsCount || 0}</span>{" "}
                                            candidate{job.applicationsCount !== 1 ? "s" : ""} applied
                                        </div>
                                    </div>

                                    <div className="ml-4">
                                        {hasApplied(job.id) ? (
                                            <Button variant="outline" size="md" disabled className="whitespace-nowrap">
                                                <FaCheckCircle className="mr-2" /> Applied
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => applyToJob(job)}
                                                variant="primary"
                                                size="md"
                                                className="whitespace-nowrap"
                                            >
                                                Apply Now
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Application Modal */}
            {selectedJob && (
                <ApplicationModal
                    isOpen={showApplicationModal}
                    onClose={() => setShowApplicationModal(false)}
                    job={selectedJob}
                    candidateId={user?.id || ""}
                    candidateName={user?.fullName || ""}
                    candidateEmail={user?.email || ""}
                    onSuccess={() => {
                        loadAppliedJobs();
                        setShowApplicationModal(false);
                    }}
                />
            )}
        </div>
    );
}

function ApplicationModal({
    isOpen,
    onClose,
    job,
    candidateId,
    candidateName,
    candidateEmail,
    onSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    job: Job;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    onSuccess: () => void;
}) {
    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            applicationService.create({
                jobId: job.id,
                candidateId,
                candidateName,
                candidateEmail,
                coverLetter,
            });
            onSuccess();
        } catch (err) {
            setError((err as Error).message || "Failed to submit application");
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Apply for ${job.title}`} size="lg">
            <div className="mb-6">
                <Card className="p-4 bg-blue-50 border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-600">{job.location}</p>
                </Card>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        value={candidateName}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={candidateEmail}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Letter *
                    </label>
                    <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={6}
                        placeholder="Tell the recruiter why you're a great fit for this position..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                        💡 <strong>Tip:</strong> Your resume will be automatically attached from your profile.
                        Make sure it&apos;s up to date before applying!
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
