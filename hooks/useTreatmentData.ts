import { useState, useEffect } from 'react';
import { Treatment } from '@/models/Treatment';
import { createClient } from '@/lib/supabase/client';

export function useTreatmentData() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('treatments').select('*');
        
        if (error) throw error;
        
        setTreatments(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching treatments');
        console.error('Error fetching treatments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const getTreatmentById = async (id: number): Promise<Treatment | null> => {
    try {
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (err) {
      console.error('Error fetching treatment by id:', err);
      return null;
    }
  };

  return {
    treatments,
    loading,
    error,
    getTreatmentById
  };
}