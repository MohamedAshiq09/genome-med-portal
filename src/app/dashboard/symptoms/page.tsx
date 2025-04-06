'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useSymptomData } from '@/hooks/useSymptomData';
import { Symptom } from '@/models/Symptom';
import Header from '@/components/layout/header';

export default function SymptomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState<Symptom[]>([]);
  const [selectedSystem, setSelectedSystem] = useState('');
  const { symptoms, loading, error } = useSymptomData();
  const router = useRouter();

  // Get unique body systems for filtering
  const bodySystems = symptoms ? [...new Set(symptoms.map(s => s.body_system))] : [];

  useEffect(() => {
    if (symptoms) {
      setFilteredSymptoms(
        symptoms.filter(symptom => 
          (symptom.symptom_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           symptom.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedSystem === '' || symptom.body_system === selectedSystem)
        )
      );
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Symptom Database</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />

          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="border rounded p-2 max-w-xs"
          >
            <option value="">All Body Systems</option>
            {bodySystems.map(system => (
              <option key={system} value={system}>{system}</option>
            ))}
          </select>
        </div>

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

        {filteredSymptoms.length === 0 && (
          <div className="text-center p-8">
            <p>No symptoms found matching your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}