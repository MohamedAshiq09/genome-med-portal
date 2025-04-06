// src/hooks/useAiConsultation.ts

import { useState } from 'react';

interface ConsultationParams {
  symptoms: string[];
  patientHistory?: string;
  geneticInfo?: string;
  age?: number;
  gender?: string;
}

export function useAiConsultation() {
  const [consultation, setConsultation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getConsultation = async (params: ConsultationParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get consultation');
      }
      
      const result = await response.json();
      setConsultation(result.consultation);
      return result.consultation;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    consultation,
    isLoading,
    error,
    getConsultation,
  };
}