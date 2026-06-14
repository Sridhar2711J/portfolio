"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Briefcase, GraduationCap, Calendar, Award } from "lucide-react";

export default function Resume() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-red-500">Error Loading Data</h2>
        <p className="text-accent-gray">Please try reloading the page.</p>
      </div>
    );
  }

  const { resume } = data;

  const renderTimelineItem = (item: any, type: "work" | "edu") => {
    const Icon = type === "work" ? Briefcase : GraduationCap;
    const title = item.role || item.degree;
    const organization = item.company || item.institution;

    return (
      <div key={item.id} className="relative pl-8 pb-10 last:pb-0">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-card-border -translate-x-1/2"></div>

        {/* Circle Dot with Icon */}
        <div className="absolute left-4 top-1 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary border-4 border-background text-white shadow-sm">
          <Icon className="h-3.5 w-3.5" />
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-card-border bg-[#f8fafc] p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/10">
              <Calendar className="h-3.5 w-3.5" />
              {item.duration}
            </span>
          </div>
          <h4 className="text-lg font-bold text-foreground">{title}</h4>
          <h5 className="text-sm font-semibold text-primary/80 mb-3">{organization}</h5>
          <p className="text-sm text-accent-gray font-light leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            History
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            My Professional Timeline
          </h3>
          <p className="mt-4 text-lg text-accent-gray font-light">
            A comprehensive look at my professional experience, internships, and educational qualifications.
          </p>
          <div className="mt-4 h-1.5 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Timeline Columns Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* Left Column: Professional Experience & Internships */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Work Experience & Internships
              </h3>

              <div className="relative border-l border-transparent">
                {resume.experience && resume.experience.map(item => renderTimelineItem(item, "work"))}

                {resume.internships && resume.internships.length > 0 && (
                  <div className="pt-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent-gray mb-6 ml-4">
                      Internship Projects
                    </h4>
                    {resume.internships.map(item => renderTimelineItem(item, "work"))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Education (College & School) */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education (College & School)
              </h3>

              <div className="relative border-l border-transparent">
                {resume.college && resume.college.map(item => renderTimelineItem(item, "edu"))}

                {resume.school && resume.school.length > 0 && (
                  <div className="pt-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent-gray mb-6 ml-4">
                      School Education
                    </h4>
                    {resume.school.map(item => renderTimelineItem(item, "edu"))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
