"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Dna,
  Home,
  Stethoscope,
  Pill,
  Brain,
  Settings,
  LogOut
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect if not authenticated
  if (isLoaded && !isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen pt-[11vh]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 overflow-y-auto">
        <div className="mb-8 flex items-center">
          <Dna className="h-6 w-6 text-green-500 mr-2" />
          <h2 className="text-xl font-bold text-green-500">GenomeMed</h2>
        </div>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200"
          >
            <Home className="h-5 w-5 mr-3" />
            Overview
          </Link>
          
          <Link
            href="/dashboard/genes"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200"
          >
            <Dna className="h-5 w-5 mr-3" />
            Genes
          </Link>
          
          <Link
            href="/dashboard/symptoms"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200"
          >
            <Stethoscope className="h-5 w-5 mr-3" />
            Symptoms
          </Link>
          
          <Link
            href="/dashboard/treatments"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200"
          >
            <Pill className="h-5 w-5 mr-3" />
            Treatments
          </Link>
          
          <Link
            href="/dashboard/ai-consultation"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200"
          >
            <Brain className="h-5 w-5 mr-3" />
            AI Consultation
          </Link>
          
          {/* Admin link - you can add conditional rendering based on user role */}
          <Link
            href="/dashboard/admin"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200"
          >
            <Settings className="h-5 w-5 mr-3" />
            Admin
          </Link>
          
          <Link
            href="/sign-out"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition duration-200 mt-8"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}