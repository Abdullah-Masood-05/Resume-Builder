"use client"

import { useState } from "react"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { defaultResumeData } from "@/lib/defaults"
import { useTemplate } from "@/context/TemplateContext"

export default function Home() {
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const { selectedTemplate } = useTemplate()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:sticky top-[30px] overflow-hidden gap-6">
        <ResumeEditor data={resumeData} onChange={setResumeData} />
        
        <ResumePreview data={resumeData} template={selectedTemplate} />
      </div>
    </div>
  )
}