"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { initializeSampleData } from "@/lib/services";

export default function Dashboard() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Initialize sample data on first load
        initializeSampleData();

        if (!isLoading && !user) {
            router.push("/auth/login");
            return;
        }

        if (user) {
            // Redirect based on role
            if (user.role === "recruiter") {
                router.push("/recruiter/jobs");
            } else {
                router.push("/candidate/jobs");
            }
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return null;
}
