'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTreatmentData } from '@/hooks/useTreatmentData';
import { Treatment } from '@/models/Treatment';
import Header from '@/components/layout/header';
import { Search } from 'lucide-react';

export default function TreatmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { treatments, loading, error } = useTreatmentData();
  const router = useRouter();

  const treatmentTypes = treatments ? [...new Set(treatments.map(t => t.treatment_type))] : [];

  useEffect(() => {
    if (treatments) {
      if (searchTerm.trim() !== '' || selectedType !== '') {
        setFilteredTreatments(
          treatments.filter(treatment => 
            (treatment.treatment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             treatment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
             treatment.target_conditions.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedType === '' || treatment.treatment_type === selectedType)
          )
        );
        setHasSearched(true);
      } else {
        setFilteredTreatments([]);
        setHasSearched(false);
      }
    }
  }, [treatments, searchTerm, selectedType]);

  const handleViewDetails = (id: number) => {
    router.push(`/dashboard/treatments/${id}`);
  };

  const getEffectivenessColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-100 text-green-800';
    if (rating >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) return <div className="flex justify-center p-8">Loading treatment data...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading treatment data: {error}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 relative bg-white">
        <h1 className="text-2xl font-bold mb-6">Treatment Database</h1>
        
        <div className="mb-6 flex flex-col items-start">
          <div className="relative max-w-md w-full mb-2">
            <Input
              placeholder="Search treatments or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border rounded p-2 max-w-xs mt-2"
          >
            <option value="">All Treatment Types</option>
            {treatmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {!hasSearched ? (
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
                <h2 className="text-xl font-semibold mb-2">Search for Treatments</h2>
                <p className="text-gray-600">
                  Enter a treatment name, description, condition, or select a treatment type to see results from our treatment database.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {filteredTreatments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTreatments.map(treatment => (
                  <Card key={treatment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{treatment.treatment_name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getEffectivenessColor(treatment.effectiveness_rating)}`}>
                          Rating: {treatment.effectiveness_rating}/10
                        </span>
                      </CardTitle>
                      <div className="text-sm text-gray-500">{treatment.treatment_type}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{treatment.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold">Target Conditions:</h4>
                        <p className="text-sm">{treatment.target_conditions}</p>
                      </div>
                      <Button onClick={() => handleViewDetails(treatment.id)} variant="outline" className="w-full mt-2">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p>No treatments found matching your search criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}