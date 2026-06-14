"use client";

import Image from "next/image";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Mail, Phone, MapPin, Calendar, User, Briefcase } from "lucide-react";

export default function About() {
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

  const { about, personal } = data;

  const profileDetails = [
    { icon: User, label: "Name", value: personal.name },
    { icon: Briefcase, label: "Role", value: personal.title },
    { icon: Mail, label: "Email", value: personal.email },
    { icon: Phone, label: "Phone", value: personal.phone },
    { icon: MapPin, label: "Location", value: personal.location },
    { icon: Calendar, label: "Available", value: personal.availability},
  ];

  return (
    <div className="relative min-h-screen py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            {about.heading}
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {about.subheading}
          </h3>
          <div className="mt-4 h-1.5 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">

          {/* Left Side: Photo & Quick Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-card-border bg-white shadow-lg dark:bg-slate-800">
              <Image
                src="/hero.png"
                alt={personal.name}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-top"
              />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-card-border bg-[#f8fafc] p-4 text-center shadow-sm"
                >
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-2xs font-semibold text-accent-gray uppercase tracking-wider">
                    {stat.label.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Detailed Bio & Info Fields */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-lg dark:prose-invert">
              <h4 className="text-xl font-bold text-foreground mb-4">My Story</h4>
              <p className="text-accent-gray leading-relaxed font-light">
                {about.description}
              </p>
              <p className="mt-4 text-accent-gray leading-relaxed font-light">
                Through my years in technology, I have honed a workflow focused on rapid iteration, robust architecture, and cross-functional coordination. My mission is to translate complex business needs into clean, maintainable web experiences.
              </p>
            </div>

            {/* Details List */}
            <div className="border-t border-card-border pt-8">
              <h4 className="text-lg font-bold text-foreground mb-6">Profile Details</h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {profileDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-card-border/60 hover:border-primary/40 transition-colors bg-subtle-bg/30"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs text-accent-gray font-medium">{detail.label}</div>
                        <div className="text-sm font-semibold text-foreground">{detail.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
