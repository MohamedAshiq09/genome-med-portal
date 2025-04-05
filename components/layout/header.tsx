"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dna, ChevronDown, Search, User, LogIn, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const features = [
    {
      title: "Genomic Database",
      links: [
        { name: "Gene Catalog", href: "/dashboard/genes" },
        { name: "Variant Explorer", href: "/genomic-database/variants" },
        { name: "Mutation Analysis", href: "/genomic-database/mutations" },
        { name: "Chromosome Map", href: "/genomic-database/chromosomes" },
      ],
    },
    {
      title: "Clinical Tools",
      links: [
        { name: "Symptom-Gene Mapper", href: "/dashboard/symptoms" },
        { name: "Treatment Database", href: "/dashboard/treatments" },
        { name: "AI Recommendations", href: "/dashboard/ai-consultation" },
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

  // All searchable items from the navigation
  const allItems = features.flatMap(section => 
    section.links.map(link => ({
      name: link.name,
      href: link.href,
      category: section.title
    }))
  );

  const handleAuthClick = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleSearchItemClick = (href: string) => {
    router.push(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

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

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <div ref={searchRef} className="relative">
            <button
              onClick={toggleSearch}
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Search Popup */}
            {searchOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-md shadow-lg p-4 z-50">
                <div className="flex items-center mb-2">
                  <Search className="h-4 w-4 text-gray-400 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search features..."
                    className="bg-gray-800 text-white w-full p-2 rounded-md border border-gray-700 focus:outline-none focus:border-green-500"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <button 
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {searchResults.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    {searchResults.map((item, index) => (
                      <div 
                        key={index}
                        className="py-2 px-3 hover:bg-gray-800 rounded-md cursor-pointer flex justify-between"
                        onClick={() => handleSearchItemClick(item.href)}
                      >
                        <span className="text-white">{item.name}</span>
                        <span className="text-gray-400 text-sm">{item.category}</span>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length > 0 ? (
                  <div className="py-2 text-gray-400 text-center">No results found</div>
                ) : (
                  <div className="py-2 text-gray-400 text-center">Type to search features</div>
                )}
              </div>
            )}
          </div>
          
          {/* User Profile */}
          {isSignedIn ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={toggleProfileMenu}
                className="text-gray-300 hover:text-white transition duration-300"
              >
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full border border-green-500"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>

              {/* Profile Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-md shadow-lg overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center">
                      {user?.imageUrl ? (
                        <img 
                          src={user.imageUrl} 
                          alt="Profile" 
                          className="h-10 w-10 rounded-full border border-green-500"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link 
                      href="/sign-out" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 border-t border-gray-800"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition duration-300"
            >
              <LogIn className="h-4 w-4" />
              Login / Sign Up
            </button>
          )}
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