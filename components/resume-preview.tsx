// components/resume-preview.tsx
"use client"

import { DownloadPdfButton } from "./resume-download"
import type { ResumeData } from "@/lib/resume"
import { htmlTemplates } from "@/lib/html-registry"
import { FiFileText } from "react-icons/fi"
import { BiZoomIn, BiZoomOut } from "react-icons/bi"
import { useTemplate } from "@/context/TemplateContext"

type ResumePreviewProps = {
  data: ResumeData
  template: string
}


export function ResumePreview({ data, template }: ResumePreviewProps) {
  const { setSelectedTemplate } = useTemplate()
  const TemplateComponent = htmlTemplates[template]?.component || htmlTemplates["modern-2col"].component

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 flex flex-col h-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0">
            <FiFileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <p className="text-xs text-gray-500">Live preview of your resume</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={template} 
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer flex-1 sm:flex-none"
          >
            {Object.entries(htmlTemplates).map(([key, temp]) => (
              <option key={key} value={key}>{temp.name}</option>
            ))}
          </select>
          <div className="shrink-0">
            <DownloadPdfButton data={data} template={template} />
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto py-6">
        <div className="max-w-4xl mx-auto px-2 md:px-0">
         {/* Resume Preview */}

          <div className="bg-gray-100 w-full rounded-xl shadow-lg border border-gray-200 py-3 overflow-y-auto overflow-x-hidden flex justify-center">
            <div className="flex justify-center min-w-min">
              <div
                className="origin-top transform scale-[0.38] sm:scale-50 lg:scale-[0.5] transition-transform duration-300"
                style={{
                  width: "816px",        // fixed resume width
                }}
              >
                <TemplateComponent data={data} />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}