"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import { FolderGit2, ExternalLink } from "lucide-react";
import { Github } from "@/components/SocialIcons";

export default function Projects() {
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

  const { projects } = data;

  return (
    <div className="relative min-h-screen py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            Work
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h3>
          <p className="mt-4 text-lg text-accent-gray font-light">
            A handpicked collection of applications, services, and architectures I've built.
          </p>
          <div className="mt-4 h-1.5 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const delayClass = `delay-${(index + 1) * 100}`;
            return (
              <div
                key={project.id}
                className={`group flex flex-col justify-between rounded-3xl border border-card-border bg-[#f8fafc] p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-scale-in ${delayClass}`}
              >
                <div>
                  {/* Project Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary dark:bg-primary/10">
                      <FolderGit2 className="h-6 w-6" />
                    </div>
                    <div className="flex gap-3 text-accent-gray">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                          aria-label="GitHub link"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                          aria-label="Live demo link"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-accent-gray leading-relaxed font-light mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Technologies Tags */}
                <div className="flex flex-wrap gap-2 border-t border-card-border/60 pt-4 mt-auto">
                  {project.tech && project.tech.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-primary-light px-2.5 py-1 text-2xs font-semibold text-primary dark:bg-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
