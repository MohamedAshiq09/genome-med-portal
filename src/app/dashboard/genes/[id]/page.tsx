'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGeneData } from '@/hooks/useGeneData';
import { Gene } from '@/models/Gene';
import Header from '@/components/layout/header';

export default function GeneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getGeneById, loading, error } = useGeneData();
  const [gene, setGene] = useState<Gene | null>(null);

  useEffect(() => {
    const fetchGene = async () => {
      if (params.id) {
        const geneData = await getGeneById(Number(params.id));
        setGene(geneData);
      }
    };

    fetchGene();
  }, [params.id, getGeneById]);

  if (loading) return <div className="flex justify-center p-8">Loading gene data...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading gene data: {error}</div>;
  if (!gene) return <div className="flex justify-center p-8">Gene not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        Back to Genes
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{gene.gene_symbol}: {gene.gene_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <p><span className="font-medium">Chromosome:</span> {gene.chromosome}</p>
              <p><span className="font-medium">Position:</span> {gene.position}</p>
              <p className="mt-4">{gene.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Function</h3>
              <p>{gene.protein_function}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Associated Diseases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {gene.associated_diseases.split(',').map((disease, index) => (
              <li key={index}>{disease.trim()}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Relevant Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">
              Related treatments will be displayed here based on the gene's associated diseases.
            </p>
            {/* This would be populated with data from your treatments database */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">
              Common symptoms related to this gene's associated diseases.
            </p>
            {/* This would be populated with data from your symptoms database */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}