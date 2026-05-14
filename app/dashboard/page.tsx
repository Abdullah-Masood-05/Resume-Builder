"use client";

import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCalendarAlt,
  FaShieldAlt,
  FaEdit,
  FaCamera,
  FaStar,
  FaRocket,
  FaCheckCircle
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Dummy data for enhanced UI
  const profileData = {
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    joinDate: "January 2024",
    completionScore: 85,
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    stats: {
      resumes: 3,
      applications: 12,
      interviews: 5
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
 <div className="min-h-screen p-4 md:p-8 bg-[#FDFBF7] text-gray-800">
  <div className="max-w-6xl mx-auto">

    {/* Header Section */}
    <div className="relative mb-8 sm:mb-12">
      <div className="h-32 sm:h-48 bg-gradient-to-r from-orange-800 via-amber-800 to-yellow-800 rounded-2xl"></div>

      <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8 flex items-end gap-6">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-500 to-amber-800 rounded-2xl flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-xl border-4 border-white">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            <FaCamera className="text-sm" />
          </button>
        </div>
      </div>

      <button className="absolute top-4 right-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/50 backdrop-blur-sm text-orange-600 rounded-lg flex items-center gap-2 hover:bg-white/80 transition-colors text-sm sm:text-base font-medium shadow">
        <FaEdit className="text-sm" />
        <span className="hidden sm:inline">Edit Profile</span>
        <span className="sm:hidden">Edit</span>
      </button>
    </div>

    {/* Name Section */}
    <div className="ml-32 sm:ml-44 mb-8 pt-2 sm:pt-0">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.fullName}</h1>
        <FaCheckCircle className="text-orange-500" />
      </div>
      <p className="text-sm sm:text-base text-gray-600 capitalize flex items-center gap-2 mt-1">
        <FaBriefcase className="text-sm text-orange-400" />
        {user.role} <span className="hidden sm:inline">• San Francisco, CA</span>
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left Column */}
      <div className="space-y-6">

        {/* Profile Completion */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaRocket className="text-orange-500" />
              Profile Strength
            </h3>
            <span className="text-orange-600 font-bold">{profileData.completionScore}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${profileData.completionScore}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-500">Add your phone number to complete your profile</p>
        </Card>

        {/* Contact Info */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="space-y-4">

            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaPhone className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="text-sm">{profileData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-pink-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-sm">{profileData.location}</p>
              </div>
            </div>

          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-4">Social Profiles</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors group">
              <FaLinkedin className="text-blue-600 text-xl" />
              <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                {profileData.linkedin}
              </span>
            </a>

            <a href="#" className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors group">
              <FaGithub className="text-gray-800 text-xl" />
              <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                {profileData.github}
              </span>
            </a>
          </div>
        </Card>

      </div>

      {/* Middle Column */}
      <div className="lg:col-span-2 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-orange-200 to-orange-300 border-orange-400/30 rounded-2xl text-center shadow-sm">
            <p className="text-3xl font-bold text-gray-900">{profileData.stats.resumes}</p>
            <p className="text-sm text-gray-700 mt-1">Resumes</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-200 to-amber-300 border-amber-400/30 rounded-2xl text-center shadow-sm">
            <p className="text-3xl font-bold text-gray-900">{profileData.stats.applications}</p>
            <p className="text-sm text-gray-700 mt-1">Applications</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-200 to-yellow-300 border-yellow-400/30 rounded-2xl text-center shadow-sm">
            <p className="text-3xl font-bold text-gray-900">{profileData.stats.interviews}</p>
            <p className="text-sm text-gray-700 mt-1">Interviews</p>
          </Card>
        </div>

        {/* Account Details */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaUser className="text-orange-500" /> Account Details
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <FaShieldAlt className="text-sm text-orange-500" />
                <span className="text-xs uppercase tracking-wide">User ID</span>
              </div>
              <p className="text-gray-800 font-mono text-sm truncate">{user.id}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <FaBriefcase className="text-sm text-orange-500" />
                <span className="text-xs uppercase tracking-wide">Account Type</span>
              </div>
              <p className="text-gray-800 capitalize">{user.role}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <FaCalendarAlt className="text-sm text-orange-500" />
                <span className="text-xs uppercase tracking-wide">Member Since</span>
              </div>
              <p className="text-gray-800">{profileData.joinDate}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <FaStar className="text-sm text-orange-500" />
                <span className="text-xs uppercase tracking-wide">Status</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm border border-orange-300 hover:border-orange-500 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}

            <button className="px-4 py-2 border-2 border-dashed border-gray-400 text-gray-500 rounded-full text-sm hover:border-orange-500 hover:text-orange-500 transition-colors">
              + Add Skill
            </button>
          </div>
        </Card>

        {/* Tips */}
        {user.role === "candidate" && (
          <Card className="p-6 bg-gradient-to-r from-orange-200/50 via-amber-200/50 to-yellow-200/50 border-orange-300/30 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaRocket className="text-orange-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Pro Tip</h3>
                <p className="text-gray-600 text-sm">
                  Keep your resume updated and add relevant skills to increase your visibility by 40%!
                </p>
              </div>
            </div>
          </Card>
        )}

        {user.role === "recruiter" && (
          <Card className="p-6 bg-gradient-to-r from-orange-300/40 via-amber-300/40 to-yellow-300/40 border-orange-300/30 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaStar className="text-orange-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Recruiter Tip</h3>
                <p className="text-gray-600 text-sm">
                  Post clear job descriptions — complete ones get 3× more applicants!
                </p>
              </div>
            </div>
          </Card>
        )}

      </div>

    </div>
  </div>
</div>

  );
}