'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSymptomData } from '@/hooks/useSymptomData';
import { Symptom } from '@/models/Symptom';
import Header from '@/components/layout/header';
import { Search } from 'lucide-react';

export default function SymptomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState<Symptom[]>([]);
  const [selectedSystem, setSelectedSystem] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { symptoms, loading, error } = useSymptomData();
  const router = useRouter();

  // Get unique body systems for filtering
  const bodySystems = symptoms ? [...new Set(symptoms.map(s => s.body_system))] : [];

  useEffect(() => {
    if (symptoms) {
      if (searchTerm.trim() !== '' || selectedSystem !== '') {
        setFilteredSymptoms(
          symptoms.filter(symptom => 
            (symptom.symptom_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             symptom.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedSystem === '' || symptom.body_system === selectedSystem)
          )
        );
        setHasSearched(true);
      } else {
        setFilteredSymptoms([]);
        setHasSearched(false);
      }
    }
  }, [symptoms, searchTerm, selectedSystem]);

  const handleViewDetails = (id: number) => {
    router.push(`/dashboard/symptoms/${id}`);
  };

  // Helper function to get a color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading symptom data...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading symptom data: {error}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 relative bg-white">
        <h1 className="text-2xl font-bold mb-6">Symptom Database</h1>
        
        <div className="mb-6 relative max-w-md">
          <div className="relative">
            <Input
              placeholder="Search symptoms by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="border rounded p-2 w-half mt-2"
          >
            <option value="">All Body Systems</option>
            {bodySystems.map(system => (
              <option key={system} value={system}>{system}</option>
            ))}
          </select>
        </div>

        {!hasSearched && searchTerm.trim() === '' && selectedSystem === '' ? (
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
                <h2 className="text-xl font-semibold mb-2">Search for Symptoms</h2>
                <p className="text-gray-600">
                  Enter a symptom name or description, or select a body system to see results from our symptom database.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {filteredSymptoms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSymptoms.map(symptom => (
                  <Card key={symptom.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{symptom.symptom_name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(symptom.severity)}`}>
                          {symptom.severity}
                        </span>
                      </CardTitle>
                      <div className="text-sm text-gray-500">{symptom.body_system}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{symptom.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold">Common Associations:</h4>
                        <p className="text-sm">{symptom.common_associations}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold">Diagnosis:</h4>
                        <p className="text-sm">{symptom.diagnostic_methods}</p>
                      </div>
                      <Button onClick={() => handleViewDetails(symptom.id)} variant="outline" className="w-full mt-2">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p>No symptoms found matching your search criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}