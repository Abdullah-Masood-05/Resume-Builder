"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TemplateContextType = {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
};

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

interface TemplateProviderProps {
  children: ReactNode;
}

export function TemplateProvider({ children }: TemplateProviderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      return storedTemplate ?? "modern-2col";
    }
    return "modern-2col";
  });

  // Save to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const value: TemplateContextType = {
    selectedTemplate,
    setSelectedTemplate,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate(): TemplateContextType {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
}
// "use client"
// import { createContext, useContext, useState, ReactNode } from "react"

// type TemplateContextType = {
//   selectedTemplate: string
//   setSelectedTemplate: (template: string) => void
// }

// const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

// interface TemplateProviderProps {
//   children: ReactNode
// }

// export function TemplateProvider({ children }: TemplateProviderProps) {
//   const [selectedTemplate, setSelectedTemplate] = useState<string>("modern-2col")

//   const value: TemplateContextType = {
//     selectedTemplate,
//     setSelectedTemplate,
//   }

//   return (
//     <TemplateContext.Provider value={value}>
//       {children}
//     </TemplateContext.Provider>
//   )
// }

// export function useTemplate(): TemplateContextType {
//   const context = useContext(TemplateContext)
//   if (!context) {
//     throw new Error("useTemplate must be used within a TemplateProvider")
//   }
//   return context
// }
