"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { applicationService, jobService, type Application } from "@/lib/services";
import { Card, Badge, EmptyState } from "@/components/ui";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function MyApplications() {
    const { user } = useAuth();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []); const loadApplications = useCallback(() => {
        if (user) {
            const userApps = applicationService.getByCandidateId(user.id);
            setApplications(userApps);
        }
    }, [user]);

    useEffect(() => {
        if (user?.role !== "candidate") {
            router.push("/dashboard");
            return;
        }
        loadApplications();
    }, [user, router, loadApplications]);

    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "info" | "success" | "danger" | "warning"> = {
            pending: "warning",
            reviewed: "info",
            shortlisted: "success",
            rejected: "danger",
        };
        return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <FaClock className="text-yellow-600" />;
            case "reviewed":
            case "shortlisted":
                return <FaCheckCircle className="text-green-600" />;
            case "rejected":
                return <FaTimesCircle className="text-red-600" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
                    <p className="text-gray-600">Track the status of your job applications</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-4">
                        <p className="text-gray-600 text-sm mb-1">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                    </Card>
                    <Card className="p-4">
                        <p className="text-gray-600 text-sm mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {applications.filter((a) => a.status === "pending").length}
                        </p>
                    </Card>
                    <Card className="p-4">
                        <p className="text-gray-600 text-sm mb-1">Shortlisted</p>
                        <p className="text-2xl font-bold text-green-600">
                            {applications.filter((a) => a.status === "shortlisted").length}
                        </p>
                    </Card>
                    <Card className="p-4">
                        <p className="text-gray-600 text-sm mb-1">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">
                            {applications.filter((a) => a.status === "rejected").length}
                        </p>
                    </Card>
                </div>

                {/* Applications List */}
                {applications.length === 0 ? (
                    <EmptyState
                        icon={<FaCheckCircle className="w-16 h-16" />}
                        title="No applications yet"
                        description="Start applying to jobs to see your applications here."
                    />
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => {
                            const job = jobService.getById(app.jobId);
                            if (!job) return null;

                            return (
                                <Card key={app.id} className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">{getStatusIcon(app.status)}</div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                    {job.title}
                                                </h3>
                                                <p className="text-gray-600">{job.company}</p>
                                                <p className="text-sm text-gray-500">{job.location}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(app.status)}
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                            Your Cover Letter:
                                        </h4>
                                        <p className="text-sm text-gray-600">{app.coverLetter}</p>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>Applied on {mounted ? new Date(app.appliedDate).toLocaleDateString() : "..."}</span>
                                        {app.status === "shortlisted" && (
                                            <span className="text-green-600 font-semibold">
                                                🎉 Congratulations! You&apos;ve been shortlisted
                                            </span>
                                        )}
                                        {app.status === "rejected" && (
                                            <span className="text-gray-500">Better luck next time</span>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
