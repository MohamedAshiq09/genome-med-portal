import { useState, useEffect } from 'react';
import { Gene } from '@/models/Gene';
import { createClient } from '@/lib/supabase/client';

export function useGeneData() {
  const [genes, setGenes] = useState<Gene[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchGenes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('genes').select('*');
        
        if (error) throw error;
        
        setGenes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching genes');
        console.error('Error fetching genes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenes();
  }, []);

  const getGeneById = async (id: number): Promise<Gene | null> => {
    try {
      const { data, error } = await supabase
        .from('genes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (err) {
      console.error('Error fetching gene by id:', err);
      return null;
    }
  };

  return {
    genes,
    loading,
    error,
    getGeneById
  };
}