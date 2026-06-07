"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaBriefcase, FaFileAlt, FaArrowRight, FaUserTie, FaUsers, FaPalette, FaDownload } from "react-icons/fa";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-white to-orange-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-2xl text-orange-500" />
          <span className="text-xl font-bold text-gray-900">Resume Builder</span>
        </div>
        {user ? (
          <Link
            href="/dashboard"
            className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            Go to Dashboard &rarr;
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
          >
            Sign In
          </Link>
        )}
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Build Your Career,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
              Your Way
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you want to get started. Create a polished resume in minutes or
            access the full job portal to find and manage opportunities.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Resume Builder Card */}
          <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-400 to-amber-500"></div>
            <div className="p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-2xl text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Resume Builder</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create a professional resume with multiple templates. No account needed &mdash;
                just start building and download your PDF.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaPalette className="text-orange-400 shrink-0" />
                  <span>5 professional templates</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaDownload className="text-orange-400 shrink-0" />
                  <span>Download as PDF instantly</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaFileAlt className="text-orange-400 shrink-0" />
                  <span>Live preview as you type</span>
                </div>
              </div>

              <Link
                href="/resume"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg"
              >
                Start Building
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">No sign-up required</p>
            </div>
          </div>

          {/* Job Portal Card */}
          <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <div className="p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FaBriefcase className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Portal</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access the full dashboard for candidates and recruiters. Browse jobs,
                track applications, or post openings.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaUsers className="text-blue-500 shrink-0" />
                  <span>Candidate &amp; Recruiter roles</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaBriefcase className="text-blue-500 shrink-0" />
                  <span>Browse and post jobs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaUserTie className="text-blue-500 shrink-0" />
                  <span>Track applications &amp; hiring</span>
                </div>
              </div>

              <Link
                href={user ? "/dashboard" : "/auth/login"}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                {user ? "Go to Dashboard" : "Sign In to Continue"}
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">
                {user ? "You're signed in" : "Login or create an account"}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </footer>
    </div>
  );
}
