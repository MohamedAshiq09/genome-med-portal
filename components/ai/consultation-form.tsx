// src/components/ai/consultation-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ConsultationFormProps {
  onSubmit: (data: ConsultationFormData) => void;
  isLoading?: boolean;
}

export interface ConsultationFormData {
  symptoms: string[];
  patientHistory: string;
  geneticInfo: string;
  age: number | null;
  gender: string;
}

export function ConsultationForm({ onSubmit, isLoading = false }: ConsultationFormProps) {
  const [symptomInput, setSymptomInput] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConsultationFormData>({
    defaultValues: {
      patientHistory: '',
      geneticInfo: '',
      age: null,
      gender: '',
    }
  });

  const addSymptom = () => {
    if (symptomInput.trim() && !symptoms.includes(symptomInput.trim())) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput('');
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: ConsultationFormData) => {
    onSubmit({
      ...data,
      symptoms,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-5">
        {/* Symptoms input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symptoms <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type a symptom and press Add"
            />
            <button
              type="button"
              onClick={addSymptom}
              className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
          {symptoms.length === 0 && (
            <p className="mt-1 text-sm text-red-500">Please add at least one symptom</p>
          )}
        </div>

        {/* Symptoms tags */}
        {symptoms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700"
              >
                {symptom}
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-700"
                >
                  <span className="sr-only">Remove</span>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Patient Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Age
          </label>
          <input
            id="age"
            type="number"
            {...register('age', { min: 0, max: 120 })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.age && <p className="mt-1 text-sm text-red-500">Please enter a valid age (0-120)</p>}
        </div>

        {/* Gender Selection */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            {...register('gender')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        {/* Patient History */}
        <div>
          <label htmlFor="patientHistory" className="block text-sm font-medium text-gray-700 mb-1">
            Patient History
          </label>
          <textarea
            id="patientHistory"
            {...register('patientHistory')}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Relevant medical history, previous conditions, etc."
          ></textarea>
        </div>

        {/* Genetic Information */}
        <div>
          <label htmlFor="geneticInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Genetic Information
          </label>
          <textarea
            id="geneticInfo"
            {...register('geneticInfo')}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Family history of genetic disorders, known mutations, etc."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || symptoms.length === 0}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isLoading || symptoms.length === 0
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Get Consultation'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}