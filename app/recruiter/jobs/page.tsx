"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { jobService, applicationService, type Job } from "@/lib/services";
import { Card, Button, Modal, SearchBar, Badge, EmptyState } from "@/components/ui";
import { FaBriefcase, FaPlus, FaEye, FaTrash, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RecruiterDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);

    const loadJobs = useCallback(() => {
        if (user) {
            const recruiterJobs = jobService.getByRecruiterId(user.id);
            setJobs(recruiterJobs);
        }
    }, [user]);

    useEffect(() => {
        if (user?.role !== "recruiter") {
            router.push("/dashboard");
            return;
        }
    }, [user, router]);

    useEffect(() => {
        if (user?.role === "recruiter") {
            loadJobs();
        }
    }, [user, loadJobs]);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const viewApplicants = (job: Job) => {
        setSelectedJob(job);
        setShowApplicantsModal(true);
    };

    const deleteJob = (id: string) => {
        if (confirm("Are you sure you want to delete this job posting?")) {
            jobService.delete(id);
            loadJobs();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Job Postings</h1>
                    <p className="text-gray-600">Manage your job listings and review applications</p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search jobs by title or company..."
                        />
                    </div>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        variant="primary"
                        className="flex items-center gap-2"
                    >
                        <FaPlus /> Post New Job
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Jobs</p>
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
                                <p className="text-gray-600 text-sm">Total Applications</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FaEye className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Active Postings</p>
                                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaBriefcase className="text-orange-600 text-xl" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Job Listings */}
                {filteredJobs.length === 0 ? (
                    <EmptyState
                        icon={<FaBriefcase className="w-16 h-16" />}
                        title="No job postings yet"
                        description="Create your first job posting to start receiving applications from talented candidates."
                        action={{
                            label: "Post Your First Job",
                            onClick: () => setShowCreateModal(true),
                        }}
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
                                                <p className="text-gray-600">{job.company}</p>
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
                                        </div>

                                        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-gray-600">
                                                Posted: {new Date(job.postedDate).toLocaleDateString()}
                                            </span>
                                            <span className="text-blue-600 font-semibold">
                                                {job.applicationsCount || 0} Application{job.applicationsCount !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 ml-4">
                                        <Button
                                            onClick={() => viewApplicants(job)}
                                            variant="primary"
                                            size="sm"
                                            className="flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <FaEye /> View Applicants
                                        </Button>
                                        <Button
                                            onClick={() => deleteJob(job.id)}
                                            variant="danger"
                                            size="sm"
                                            className="flex items-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Job Modal */}
            <CreateJobModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={() => {
                    loadJobs();
                    setShowCreateModal(false);
                }}
                recruiterId={user?.id || ""}
                recruiterName={user?.fullName || ""}
            />

            {/* Applicants Modal */}
            {selectedJob && (
                <ApplicantsModal
                    isOpen={showApplicantsModal}
                    onClose={() => setShowApplicantsModal(false)}
                    job={selectedJob}
                />
            )}
        </div>
    );
}

function CreateJobModal({
    isOpen,
    onClose,
    onSuccess,
    recruiterId,
    recruiterName,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    recruiterId: string;
    recruiterName: string;
}) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-time" as Job["type"],
        salary: "",
        description: "",
        requirements: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const requirements = formData.requirements
            .split("\n")
            .filter((req) => req.trim() !== "");

        jobService.create({
            ...formData,
            requirements,
            recruiterId,
            recruiterName,
        });

        onSuccess();
        setFormData({
            title: "",
            company: "",
            location: "",
            type: "Full-time",
            salary: "",
            description: "",
            requirements: "",
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Post New Job" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company *
                        </label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type *
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value as Job["type"] })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range *
                    </label>
                    <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="e.g., $80k - $120k"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements (one per line) *
                    </label>
                    <textarea
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        rows={4}
                        placeholder="e.g.,&#10;5+ years of experience&#10;Strong communication skills&#10;Bachelor's degree in CS"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="submit" variant="primary" className="flex-1">
                        Post Job
                    </Button>
                    <Button type="button" onClick={onClose} variant="secondary" className="flex-1">
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

function ApplicantsModal({
    isOpen,
    onClose,
    job,
}: {
    isOpen: boolean;
    onClose: () => void;
    job: Job;
}) {
    const [applications, setApplications] = useState(
        applicationService.getByJobId(job.id)
    );

    const updateStatus = (appId: string, status: Application["status"]) => {
        applicationService.updateStatus(appId, status);
        setApplications(applicationService.getByJobId(job.id));
    };

    const getStatusBadge = (status: string) => {
        const variants: any = {
            pending: "default",
            reviewed: "info",
            shortlisted: "success",
            rejected: "danger",
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Applicants for ${job.title}`} size="xl">
            {applications.length === 0 ? (
                <EmptyState
                    icon={<FaEye className="w-16 h-16" />}
                    title="No applications yet"
                    description="When candidates apply to this job, you'll see them here."
                />
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <Card key={app.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {app.candidateName}
                                        </h3>
                                        {getStatusBadge(app.status)}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">{app.candidateEmail}</p>
                                    <p className="text-gray-700 mb-3">{app.coverLetter}</p>
                                    <p className="text-xs text-gray-500">
                                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    <Button
                                        onClick={() => updateStatus(app.id, "reviewed")}
                                        variant="outline"
                                        size="sm"
                                        disabled={app.status === "reviewed"}
                                    >
                                        Mark Reviewed
                                    </Button>
                                    <Button
                                        onClick={() => updateStatus(app.id, "shortlisted")}
                                        variant="primary"
                                        size="sm"
                                        disabled={app.status === "shortlisted"}
                                    >
                                        Shortlist
                                    </Button>
                                    <Button
                                        onClick={() => updateStatus(app.id, "rejected")}
                                        variant="danger"
                                        size="sm"
                                        disabled={app.status === "rejected"}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </Modal>
    );
}
