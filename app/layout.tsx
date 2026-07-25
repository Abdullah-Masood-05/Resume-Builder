import "./globals.css"
import { TemplateProvider } from "@/context/TemplateContext"
import LayoutWrapper from "@/components/layout-wrapper"

export const metadata = {
  title: "Resume Builder - Build a professional resume in minutes",
  description: "Create a professional resume from multiple templates and download it as a PDF",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <TemplateProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </TemplateProvider>
      </body>
    </html>
  )
}
