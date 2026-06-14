"use client";

import { useEffect, useState } from "react";
import rawData from "@/data/portfolio.json";

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
    socials: {
      github: string;
      linkedin: string;
      instagram: string;
    };
  };
  hero: {
    welcomeText: string;
    highlightText: string;
    subText: string;
    ctaText: string;
    ctaUrl: string;
    floatingBadges: Array<{ name: string; icon: string }>;
  };
  about: {
    heading: string;
    subheading: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
  skills: Array<{ name: string; percentage: number; category: string }>;
  resume: {
    experience: Array<{ id: string; role: string; company: string; duration: string; description: string }>;
    internships: Array<{ id: string; role: string; company: string; duration: string; description: string }>;
    college: Array<{ id: string; degree: string; institution: string; duration: string; description: string }>;
    school: Array<{ id: string; degree: string; institution: string; duration: string; description: string }>;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    live: string;
  }>;
  certificates: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    link: string;
  }>;
  contact: {
    email: string;
    phone: string;
    address: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
      facebook: string;
      dribbble: string;
      instagram: string;
    };
  };
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(rawData as unknown as PortfolioData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      console.error("Failed to background refresh portfolio data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
}
