"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";

export default function Certificates() {
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

  const { certificates } = data;

  return (
    <div className="relative min-h-screen py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            Credentials
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Certifications & Training
          </h3>
          <p className="mt-4 text-lg text-accent-gray font-light">
            Verified course completions, certifications, and technical badges earned.
          </p>
          <div className="mt-4 h-1.5 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => {
            const delayClass = `delay-${(index + 1) * 100}`;
            return (
              <div
                key={cert.id}
                className={`flex flex-col justify-between rounded-3xl border border-card-border bg-[#f8fafc] p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in ${delayClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-gray hover:text-primary transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        Verify <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-foreground leading-snug mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-sm font-semibold text-primary/80 mb-4">{cert.issuer}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-accent-gray font-medium pt-3 border-t border-card-border/60 mt-auto">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Issued: {cert.date}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
