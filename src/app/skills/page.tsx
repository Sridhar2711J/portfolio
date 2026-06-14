"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Award, Code, Server, Layout, ToggleLeft, Layers } from "lucide-react";

export default function Skills() {
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

  const { skills } = data;

  // Group skills by category
  const categories = skills.reduce((acc: any, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Layout className="h-6 w-6 text-primary" />;
      case "backend":
        return <Server className="h-6 w-6 text-indigo-500" />;
      case "databases":
        return <Layers className="h-6 w-6 text-teal-500" />;
      case "languages":
        return <Code className="h-6 w-6 text-amber-500" />;
      case "tools":
      default:
        return <Award className="h-6 w-6 text-sky-500" />;
    }
  };

  return (
    <div className="relative min-h-screen py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            Expertise
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            My Technical Skills
          </h3>
          <p className="mt-4 text-lg text-accent-gray font-light">
            A breakdown of my professional toolkit and technical proficiencies over years of deployment.
          </p>
          <div className="mt-4 h-1.5 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {Object.keys(categories).map((catName) => (
            <div
              key={catName}
              className="rounded-3xl border border-card-border bg-[#f8fafc] p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-card-border pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-subtle-bg">
                  {getCategoryIcon(catName)}
                </div>
                <h4 className="text-xl font-bold text-foreground">{catName}</h4>
              </div>

              {/* Skills List in Category */}
              <div className="space-y-5">
                {categories[catName].map((skill: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-foreground/90">{skill.name}</span>
                      <span className="font-bold text-primary">{skill.percentage}%</span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full rounded-full bg-subtle-bg overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
