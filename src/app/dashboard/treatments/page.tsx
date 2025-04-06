'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTreatmentData } from '@/hooks/useTreatmentData';
import { Treatment } from '@/models/Treatment';
import Header from '@/components/layout/header';

export default function TreatmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const { treatments, loading, error } = useTreatmentData();
  const router = useRouter();

  
  const treatmentTypes = treatments ? [...new Set(treatments.map(t => t.treatment_type))] : [];

  useEffect(() => {
    if (treatments) {
      setFilteredTreatments(
        treatments.filter(treatment => 
          (treatment.treatment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           treatment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           treatment.target_conditions.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedType === '' || treatment.treatment_type === selectedType)
        )
      );
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
      <Header /> {/* Added Header component */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Treatment Database</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search treatments or conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border rounded p-2 max-w-xs"
          >
            <option value="">All Treatment Types</option>
            {treatmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

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

        {filteredTreatments.length === 0 && (
          <div className="text-center p-8">
            <p>No treatments found matching your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}