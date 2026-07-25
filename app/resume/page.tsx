"use client"

import { useState } from "react"
import Link from "next/link"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { defaultResumeData } from "@/lib/defaults"
import { useTemplate } from "@/context/TemplateContext"
import { FaFileAlt, FaArrowLeft } from "react-icons/fa"

export default function ResumePage() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const { selectedTemplate } = useTemplate()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors">
            <FaArrowLeft className="text-sm" />
            <FaFileAlt className="text-xl text-orange-500" />
            <span className="font-bold text-lg text-gray-900">Resume Builder</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:sticky top-[30px] overflow-hidden gap-6 p-4 md:p-6 lg:p-8">
        <ResumeEditor data={resumeData} onChange={setResumeData} />
        <ResumePreview data={resumeData} template={selectedTemplate} />
      </div>
    </div>
  )
}
