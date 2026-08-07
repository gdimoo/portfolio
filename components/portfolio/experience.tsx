"use client"

import { useState } from "react"
import { ChevronRight, Building2, BookOpen, FlaskConical } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExperienceItem {
  id: string
  period: string
  title: string
  organization: string
  type: "teaching" | "research" | "industry"
  description: string
  highlights: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: "1",
    period: "Dec 2025 — Present",
    title: "Freelance",
    organization: "Ubon Ratchathani",
    type: "teaching",
    description:
      "Tutoring programming and contributing to AI transcription and Thai AI voice-recording projects.",
    highlights: [
      "Tutoring programming fundamentals and problem-solving",
      "Contributing to AI speech-to-text transcription projects",
      "Recording Thai-language voice data for AI projects",
    ],
  },
  {
    id: "2",
    period: "May 2025 — Oct 2025",
    title: "Full Stack Developer",
    organization: "Provincial Electricity Authority (PEA)",
    type: "industry",
    description:
      "Developed the Volta platform and EA-Service system using Next.js and Nest.js within a DevSecOps environment.",
    highlights: [
      "Built Volta Fleet frontend using Next.js",
      "Participated in Sprint Reviews and usability testing",
      "Focused on responsive design and SQL Server integration",
    ],
  },
  {
    id: "3",
    period: "Sep 2023 — Mar 2025",
    title: "Full Stack Developer - Team Lead",
    organization: "SCG Packaging Public Company Limited",
    type: "industry",
    description:
      "Led sprint planning and managed data flows using Airflow and Django for manufacturing and predictive maintenance datasets.",
    highlights: [
      "Led development of predictive maintenance models (APM Platform)",
      "Designed and improved the Demand Platform for Prepack subsidiary",
      "Managed sensor anomaly detection projects using engineering datasets",
    ],
  },
  {
    id: "4",
    period: "Aug 2021 — Dec 2023",
    title: "Research Assistant",
    organization: "Mahidol University",
    type: "research",
    description:
      "Conducted advanced research in Medical AI and Blockchain-based traceability systems.",
    highlights: [
      "Published 3+ peer-reviewed papers in IEEE Access and Diagnostics",
      "Developed ML models for CT-Scan data using TensorFlow",
      "Built Blockchain traceability applications for NECTEC",
    ],
  },
  {
    id: "5",
    period: "Apr 2022 — Apr 2024",
    title: "Full Stack Developer (Part-time)",
    organization: "GMI-KMUTT",
    type: "industry",
    description:
      "Redesigned and developed a comprehensive web system for the Department of Public Works.",
    highlights: [
      "Utilized Angular, NestJS, and Cockroach DB",
      "Implemented security and authentication using Keycloak",
    ],
  },
]

const typeIcons = {
  teaching: BookOpen,
  research: FlaskConical,
  industry: Building2,
}

const typeLabels = {
  teaching: "Teaching",
  research: "Research",
  industry: "Industry",
}

export function Experience() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-12">
          <p className="text-primary font-mono text-sm tracking-wide">
            My Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = typeIcons[exp.type]
              const isActive = activeId === exp.id
              const isEven = index % 2 === 0

              return (
                <div
                  key={exp.id}
                  className={cn(
                    "relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16",
                    !isEven && "md:direction-rtl"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10" />

                  {/* Content */}
                  <div
                    className={cn(
                      "pl-8 md:pl-0",
                      isEven ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"
                    )}
                  >
                    <button
                      onClick={() => setActiveId(isActive ? null : exp.id)}
                      className="text-left md:text-inherit w-full group"
                    >
                      <p className="text-sm text-muted-foreground font-mono mb-1">
                        {exp.period}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground flex items-center gap-2 mt-1 md:justify-start">
                        {isEven ? (
                          <>
                            <span className="md:order-2">{exp.organization}</span>
                            <Icon className="h-4 w-4 md:order-1" />
                          </>
                        ) : (
                          <>
                            <Icon className="h-4 w-4" />
                            <span>{exp.organization}</span>
                          </>
                        )}
                      </p>

                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          isActive ? "max-h-96 mt-4" : "max-h-0"
                        )}
                      >
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3 text-left">
                          {exp.description}
                        </p>
                        <ul className="space-y-1 text-left">
                          {exp.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-xs text-primary mt-2 group-hover:underline">
                        {isActive ? "Click to collapse" : "Click to expand"}
                      </p>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
