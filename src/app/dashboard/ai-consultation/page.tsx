'use client';

import { useState } from 'react';
import { ConsultationForm } from '@/components/ai/consultation-form';
import { ConsultationResult } from '@/components/ai/consultation-result';
import Header from "@/components/layout/header";

export default function AIConsultationPage() {
  const [consultationResult, setConsultationResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleConsultationSubmit = async (data: any) => {
    setError(null);
    
    try {
      const response = await fetch('/api/ai/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get consultation');
      }
      
      const result = await response.json();
      setConsultationResult(result.consultation);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };
  
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        {/* Left side with image and white background */}
        <div className="hidden md:flex md:w-2/5 bg-white items-center justify-center p-8 border-r border-gray-200">
          <div className="relative w-full max-w-md">
            <img 
              src="/images/young-doctor-character.png" 
              alt="AI Genetic Analysis" 
              className="rounded-lg"
            />
            {/* Removed decorative elements */}
          </div>
        </div>
        
        {/* Right side with consultation content */}
        <div className="w-full md:w-3/5 py-6 px-4 md:px-8 flex items-start justify-center">
          <div className="w-full max-w-lg">
            <div className="flex items-center mb-4">    
              <div className="h-12 w-2 bg-indigo-600 mr-4 rounded"></div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">AI Genetic Consultation</h1>
                <p className="text-indigo-600 text-base">Advanced insights for healthcare professionals</p>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4 p-2 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">
                  Provide patient symptoms and information to get AI-powered genetic disorder insights.
                  <span className="block mt-1 text-xs text-gray-500">This tool is for informational purposes only and does not replace professional medical advice.</span>
                </p>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 border-l-4 border-red-500 text-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              
              <ConsultationForm onSubmit={handleConsultationSubmit} />
            </div>
            
            {consultationResult && (
              <div className="mt-6">
                <ConsultationResult consultation={consultationResult} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}