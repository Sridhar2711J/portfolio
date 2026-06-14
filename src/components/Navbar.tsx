"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Github, Linkedin, Twitter, Facebook, Dribbble, Instagram } from "@/components/SocialIcons";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Resume", href: "/resume" },
    { label: "Projects", href: "/projects" },
    { label: "Certificates", href: "/certificates" },
    { label: "Contact", href: "/contact" },
  ];

  const { data } = usePortfolioData();

  const socialLinks = [
    { icon: Instagram, href: data?.personal?.socials?.instagram || "https://instagram.com" },
    { icon: Linkedin, href: data?.personal?.socials?.linkedin || "https://linkedin.com" },
    { icon: Github, href: data?.personal?.socials?.github || "https://github.com" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 font-bold text-2xl tracking-tight">
          <span className="text-primary font-extrabold">SJ</span>
          <span className="text-[#13b593] dark:text-[#14cfab]">Developer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-primary text-white shadow-sm shadow-primary/20"
                  : "text-foreground/80 hover:text-primary hover:bg-subtle-bg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Socials Divider */}
          <div className="flex items-center gap-3 border-r border-card-border pr-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Tablet & Mobile Layout Right Area */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Hamburger Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-subtle-bg text-foreground/80 hover:text-primary transition-all duration-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-card-border bg-background px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-foreground/80 hover:text-primary hover:bg-subtle-bg"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-card-border flex justify-around">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-subtle-bg text-foreground/60 hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
