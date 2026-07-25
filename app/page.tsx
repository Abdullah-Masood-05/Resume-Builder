import Link from "next/link";
import { FaFileAlt, FaArrowRight, FaPalette, FaDownload } from "react-icons/fa";
import { htmlTemplates } from "@/lib/html-registry";

export default function Home() {
  const templateCount = Object.keys(htmlTemplates).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-white to-orange-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-2xl text-orange-500" />
          <span className="text-xl font-bold text-gray-900">Resume Builder</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Build Your Resume,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
              Your Way
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Pick a template, fill in your details, and download a polished PDF.
            No account needed.
          </p>
        </div>

        {/* Resume Builder Card */}
        <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden max-w-md w-full">
          <div className="h-2 bg-gradient-to-r from-orange-400 to-amber-500"></div>
          <div className="p-8">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <FaFileAlt className="text-2xl text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Resume Builder</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Create a professional resume with multiple templates &mdash;
              just start building and download your PDF.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaPalette className="text-orange-400 shrink-0" />
                <span>{templateCount} professional templates</span>
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
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </footer>
    </div>
  );
}
