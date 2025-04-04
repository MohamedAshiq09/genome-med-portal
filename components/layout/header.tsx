"use client";

import React, { useState } from "react";
import { Dna, ChevronDown, Search, User, BarChart2, Database, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const features = [
    {
      title: "Genomic Database",
      links: [
        { name: "Gene Catalog", href: "/genomic-database/catalog" },
        { name: "Variant Explorer", href: "/genomic-database/variants" },
        { name: "Mutation Analysis", href: "/genomic-database/mutations" },
        { name: "Chromosome Map", href: "/genomic-database/chromosomes" },
      ],
    },
    {
      title: "Clinical Tools",
      links: [
        { name: "Symptom-Gene Mapper", href: "/clinical-tools/symptom-gene" },
        { name: "Treatment Database", href: "/clinical-tools/treatments" },
        { name: "AI Recommendations", href: "/clinical-tools/ai-recommendations" },
        { name: "Clinical Insights", href: "/clinical-tools/insights" },
      ],
    },
    {
      title: "Research Portal",
      links: [
        { name: "Study Repository", href: "/research/studies" },
        { name: "Data Analysis Tools", href: "/research/analysis" },
        { name: "Publication Links", href: "/research/publications" },
        { name: "Collaboration Hub", href: "/research/collaboration" },
      ],
    },
    {
      title: "Patient Management",
      links: [
        { name: "Patient Records", href: "/patients/records" },
        { name: "Genetic Profiles", href: "/patients/profiles" },
        { name: "Treatment History", href: "/patients/treatment-history" },
        { name: "Family Mapping", href: "/patients/family-mapping" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[11vh]">
        <div className="flex items-center">
          <div className="text-green-500 font-bold text-2xl flex items-center gap-2">
            <Dna className="h-8 w-8" />
            GenomeMed Portal
          </div>
        </div>

        <nav className="hidden md:flex space-x-12">
          <div
            onMouseEnter={() => setHoveredLink("dashboard")}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative flex items-center"
          >
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition duration-300 text-lg"
            >
              Dashboard
            </Link>
          </div>

          <div className="relative flex items-center">
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              className="text-gray-300 hover:text-white transition duration-300 text-lg flex items-center gap-1"
            >
              Features
              <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div
            onMouseEnter={() => setHoveredLink("analytics")}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative flex items-center"
          >
            <Link
              href="/analytics"
              className="text-gray-300 hover:text-white transition duration-300 text-lg"
            >
              Analytics
            </Link>
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/search"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link 
            href="/profile"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features Dropdown */}
      {featuresOpen && (
        <div
          className="absolute top-[11vh] left-0 w-full h-[50vh] bg-gray-900 bg-opacity-95 backdrop-blur-lg shadow-xl"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-full">
              {features.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400 border-b border-green-400 pb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-white transition duration-300"
                          onClick={() => setFeaturesOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animated Underline */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-green-500 to-transparent"
        initial={{ x: "-100%" }}
        animate={{
          x:
            hoveredLink === "dashboard"
              ? "-25%"
              : hoveredLink === "features"
              ? "0%"
              : hoveredLink === "analytics"
              ? "25%"
              : "0%",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </header>
  );
};

export default Header;