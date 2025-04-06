import { useState, useEffect } from 'react';
import { Symptom } from '@/models/Symptom';
import { createClient } from '@/lib/supabase/client';

export function useSymptomData() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('symptoms').select('*');
        
        if (error) throw error;
        
        setSymptoms(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching symptoms');
        console.error('Error fetching symptoms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  const getSymptomById = async (id: number): Promise<Symptom | null> => {
    try {
      const { data, error } = await supabase
        .from('symptoms')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (err) {
      console.error('Error fetching symptom by id:', err);
      return null;
    }
  };

  return {
    symptoms,
    loading,
    error,
    getSymptomById
  };
}