// src/components/ai/consultation-form.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ConsultationForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [patientHistory, setPatientHistory] = useState('');
  const [geneticInfo, setGeneticInfo] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom('');
    }
  };
  
  const handleRemoveSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = {
        symptoms,
        patientHistory: patientHistory || undefined,
        geneticInfo: geneticInfo || undefined,
        age: age ? parseInt(age) : undefined,
        gender: gender || undefined
      };
      
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptoms</Label>
        <div className="flex gap-2">
          <Input
            id="symptoms"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            placeholder="Enter symptom"
          />
          <Button type="button" onClick={handleAddSymptom} variant="secondary">
            Add
          </Button>
        </div>
        
        {symptoms.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {symptoms.map((symptom, index) => (
              <div key={index} className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
                <span>{symptom}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSymptom(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="patientHistory">Patient History (Optional)</Label>
        <Textarea
          id="patientHistory"
          value={patientHistory}
          onChange={(e) => setPatientHistory(e.target.value)}
          placeholder="Enter relevant patient history"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="geneticInfo">Genetic Information (Optional)</Label>
        <Textarea
          id="geneticInfo"
          value={geneticInfo}
          onChange={(e) => setGeneticInfo(e.target.value)}
          placeholder="Enter any known genetic information"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age (Optional)</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Gender (Optional)</Label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <Button type="submit" disabled={symptoms.length === 0 || isLoading}>
        {isLoading ? 'Processing...' : 'Get AI Consultation'}
      </Button>
    </form>
  );
}