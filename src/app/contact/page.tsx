"use client";

import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { data, loading, error } = usePortfolioData();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const { contact } = data;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to send email message.");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { icon: Mail, label: "Email Address", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone Number", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, label: "Office Address", value: contact.address, href: null },
  ];

  return (
    <div className="relative min-h-screen py-16 sm:py-24">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-base font-semibold uppercase tracking-wider text-primary">
            Connect
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Get In Touch
          </h3>
          <p className="mt-4 text-lg text-accent-gray font-light">
            Have a project in mind, a job opportunity, or just want to say hello? Drop a line!
          </p>
          <div className="mt-4 h-1.5 w-16 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Side: Contact Methods Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-xl font-bold text-foreground mb-4 animate-fade-in-up delay-75">Contact Information</h4>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const delayClass = `delay-${(index + 1) * 150}`;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 rounded-3xl border border-card-border bg-[#f8fafc] shadow-sm animate-fade-in-up ${delayClass}`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary dark:bg-primary/10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-accent-gray font-semibold uppercase tracking-wider mb-1">
                        {method.label}
                      </div>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <div className="text-base font-semibold text-foreground font-light leading-snug">
                          {method.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Message Submission Form */}
          <div className="lg:col-span-7 rounded-3xl border border-card-border bg-[#f8fafc] p-8 shadow-md animate-scale-in delay-200">
            <h4 className="text-xl font-bold text-foreground mb-6">Send Me a Message</h4>

            {submitError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400">
                {submitError}
              </div>
            )}

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-3 bg-primary-light/40 dark:bg-primary/5 rounded-2xl border border-primary/20">
                <CheckCircle2 className="h-14 w-14 text-primary animate-bounce" />
                <h5 className="text-lg font-bold text-foreground">Message Sent Successfully!</h5>
                <p className="text-sm text-accent-gray max-w-xs font-light">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-2xl border border-card-border bg-white px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. johndoe@example.com"
                      className="w-full rounded-2xl border border-card-border bg-white px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    className="w-full rounded-2xl border border-card-border bg-white px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
