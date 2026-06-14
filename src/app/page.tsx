"use client";

import Link from "next/link";
import Image from "next/image";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Code2, Database, Globe, Cpu, ArrowRight } from "lucide-react";

export default function Home() {
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
        <h2 className="text-2xl font-bold text-red-500">Error Loading Portfolio</h2>
        <p className="text-accent-gray">Please check your configuration and try again.</p>
      </div>
    );
  }

  const { hero, personal, about } = data;

  // Map icon names to lucide components
  const renderFloatingBadgeIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case "react":
        return <Globe className="h-5 w-5 text-sky-400" />;
      case "cpp":
        return <Code2 className="h-5 w-5 text-indigo-500" />;
      case "csharp":
        return <Cpu className="h-5 w-5 text-purple-600" />;
      case "php":
        return <Globe className="h-5 w-5 text-violet-500" />;
      case "database":
      case "sql":
        return <Database className="h-5 w-5 text-teal-500" />;
      default:
        return <Code2 className="h-5 w-5 text-primary" />;
    }
  };

  // Pre-configured positions for floating badges to replicate the layout
  const badgePositions = [
    "top-12 left-0 md:-left-8",
    "top-20 right-0 md:-right-8",
    "bottom-16 left-6 md:-left-12",
    "bottom-32 right-2 md:-right-6",
    "top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary-light/40 dark:bg-primary-light/5 blur-3xl"></div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Text Column */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                <span className="block text-foreground">
                  {hero.welcomeText}{" "}
                  <span className="text-primary font-black animate-pulse">!</span>
                </span>
                <span className="block mt-2 text-[#1e293b] font-bold">
                  {hero.highlightText}
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-accent-gray leading-relaxed font-light">
                {hero.subText}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={hero.ctaUrl}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                {hero.ctaText}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative lg:col-span-5 flex justify-center py-8">
            
            {/* Soft Gray Curving Wave background */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full bg-subtle-bg border border-card-border/80"></div>
            </div>

            {/* Main Image Avatar Container */}
            <div className="relative h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] overflow-visible">
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border-4 border-card-border bg-card-bg shadow-xl">
                <Image
                  src="/hero.png"
                  alt={personal.name}
                  fill
                  sizes="(max-width: 768px) 300px, 380px"
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Badges */}
              {hero.floatingBadges.map((badge, idx) => {
                const position = badgePositions[idx % badgePositions.length];
                const animDelay = `${idx * 0.5}s`;
                return (
                  <div
                    key={idx}
                    className={`absolute ${position} animate-float flex items-center gap-2 rounded-2xl border border-card-border bg-card-bg px-4 py-2.5 shadow-lg transition-all duration-300 hover:scale-110`}
                    style={{ animationDelay: animDelay }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-subtle-bg">
                      {renderFloatingBadgeIcon(badge.icon)}
                    </div>
                    <span className="text-xs font-semibold text-foreground/90">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Info/Stats Summary Bar */}
      <section className="border-t border-card-border bg-subtle-bg/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
            {about.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-extrabold text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-accent-gray uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
