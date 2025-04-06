'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTreatmentData } from '@/hooks/useTreatmentData';
import { Treatment } from '@/models/Treatment';

export default function TreatmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getTreatmentById, loading, error } = useTreatmentData();
  const [treatment, setTreatment] = useState<Treatment | null>(null);

  useEffect(() => {
    const fetchTreatment = async () => {
      if (params.id) {
        const treatmentData = await getTreatmentById(Number(params.id));
        setTreatment(treatmentData);
      }
    };

    fetchTreatment();
  }, [params.id, getTreatmentById]);

  // Helper function to get color based on effectiveness
  const getEffectivenessColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-100 text-green-800';
    if (rating >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) return <div className="flex justify-center p-8">Loading treatment data...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading treatment data: {error}</div>;
  if (!treatment) return <div className="flex justify-center p-8">Treatment not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        Back to Treatments
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{treatment.treatment_name}</CardTitle>
            <span className={`text-xs px-3 py-1 rounded-full ${getEffectivenessColor(treatment.effectiveness_rating)}`}>
              Effectiveness: {treatment.effectiveness_rating}/10
            </span>
          </div>
          <div className="text-gray-500">{treatment.treatment_type}</div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p>{treatment.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Target Conditions</h3>
              <ul className="list-disc pl-5">
                {treatment.target_conditions.split(',').map((condition, index) => (
                  <li key={index}>{condition.trim()}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Side Effects</h3>
              <ul className="list-disc pl-5">
                {treatment.side_effects.split(',').map((sideEffect, index) => (
                  <li key={index}>{sideEffect.trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Contraindications</h3>
            <ul className="list-disc pl-5">
              {treatment.contraindications.split(',').map((contraindication, index) => (
                <li key={index}>{contraindication.trim()}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Related Genes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">
              Genes associated with conditions that this treatment targets.
            </p>
            {/* This would be populated with data from your genes database */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Symptoms Addressed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">
              Symptoms commonly addressed by this treatment.
            </p>
            {/* This would be populated with data from your symptoms database */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}