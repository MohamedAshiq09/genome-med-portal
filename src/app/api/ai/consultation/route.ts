// src/app/api/ai/consultation/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getGeneticConsultation } from '@/lib/ai/consultation-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms, patientHistory, geneticInfo, age, gender } = body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: 'Symptoms are required and must be an array' },
        { status: 400 }
      );
    }
    
    const consultation = await getGeneticConsultation({
      symptoms,
      patientHistory,
      geneticInfo,
      age,
      gender
    });
    
    return NextResponse.json({ consultation });
  } catch (error) {
    console.error('AI consultation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate consultation' },
      { status: 500 }
    );
  }
}