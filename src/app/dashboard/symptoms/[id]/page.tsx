'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSymptomData } from '@/hooks/useSymptomData';
import { Symptom } from '@/models/Symptom';

export default function SymptomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getSymptomById, loading, error } = useSymptomData();
  const [symptom, setSymptom] = useState<Symptom | null>(null);

  useEffect(() => {
    const fetchSymptom = async () => {
      if (params.id) {
        const symptomData = await getSymptomById(Number(params.id));
        setSymptom(symptomData);
      }
    };

    fetchSymptom();
  }, [params.id, getSymptomById]);

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
  if (!symptom) return <div className="flex justify-center p-8">Symptom not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        Back to Symptoms
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{symptom.symptom_name}</CardTitle>
            <span className={`text-xs px-3 py-1 rounded-full ${getSeverityColor(symptom.severity)}`}>
              {symptom.severity} Severity
            </span>
          </div>
          <div className="text-gray-500">{symptom.body_system} System</div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p>{symptom.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Common Associations</h3>
              <ul className="list-disc pl-5">
                {symptom.common_associations.split(',').map((disease, index) => (
                  <li key={index}>{disease.trim()}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Diagnostic Methods</h3>
              <ul className="list-disc pl-5">
                {symptom.diagnostic_methods.split(',').map((method, index) => (
                  <li key={index}>{method.trim()}</li>
                ))}
              </ul>
            </div>
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
              Genes associated with conditions that commonly present this symptom.
            </p>
            {/* This would be populated with data from your genes database */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">
              Treatments commonly used to address this symptom.
            </p>
            {/* This would be populated with data from your treatments database */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}