'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGeneData } from '@/hooks/useGeneData';
import { Gene } from '@/models/Gene';
import Header from '@/components/layout/header';
import { Search } from 'lucide-react';

export default function GenesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGenes, setFilteredGenes] = useState<Gene[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { genes, loading, error } = useGeneData();
  const router = useRouter();

  useEffect(() => {
    if (genes && searchTerm.trim() !== '') {
      setFilteredGenes(
        genes.filter(gene => 
          gene.gene_symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gene.gene_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gene.associated_diseases.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setHasSearched(true);
    } else {
      setFilteredGenes([]);
      if (searchTerm.trim() === '') {
        setHasSearched(false);
      }
    }
  }, [genes, searchTerm]);

  const handleViewDetails = (id: number) => {
    router.push(`/dashboard/genes/${id}`);
  };

  if (loading) return <div className="flex justify-center p-8">Loading gene data...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading gene data: {error}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 relative bg-white">
        <h1 className="text-2xl font-bold mb-6">Genomic Database</h1>
        
        <div className="mb-6 relative max-w-md">
          <div className="relative">
            <Input
              placeholder="Search genes by name, symbol, or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>
        </div>

        {!hasSearched && searchTerm.trim() === '' ? (
          <div className="flex justify-center items-center py-8">
            <div className="relative w-full max-w-6xl h-110 flex flex-col items-center justify-center">
              {/* Background image with reduced size and opacity */}
              <div 
                className="absolute inset-0 z-0 bg-center bg-no-repeat opacity-75" 
                style={{
                  backgroundImage: "url('/images/young-doctor-character.png')",
                  backgroundSize: "contain",
                }}
              ></div>
              
              {/* Text content positioned on top of the image */}
              <div className="relative z-10 text-center px-4 -mt-128">
                <Search size={40} className="mx-auto mb-4 text-gray-600" />
                <h2 className="text-xl font-semibold mb-2">Search for Genes</h2>
                <p className="text-gray-600">
                  Enter a gene symbol, name, or associated disease to see results from our genomic database.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {filteredGenes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGenes.map(gene => (
                  <Card key={gene.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{gene.gene_symbol} ({gene.gene_name})</span>
                        <span className="text-sm text-gray-500">Chr {gene.chromosome}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{gene.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold">Associated Diseases:</h4>
                        <p className="text-sm">{gene.associated_diseases}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold">Function:</h4>
                        <p className="text-sm">{gene.protein_function}</p>
                      </div>
                      <Button onClick={() => handleViewDetails(gene.id)} variant="outline" className="w-full mt-2">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p>No genes found matching your search criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}