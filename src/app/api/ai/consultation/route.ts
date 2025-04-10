// src/app/api/ai/consultation/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, patientHistory, geneticInfo, age, gender } = body;

    // Validate input
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: 'At least one symptom is required' },
        { status: 400 }
      );
    }

    // Format prompt for Gemini
    const prompt = `
      You are a genetic disorder specialist AI assistant. Based on the provided information, give a consultation about possible genetic disorders, recommended genetic tests, and potential treatment approaches.
      
      Patient Information:
      - Symptoms: ${symptoms.join(', ')}
      ${age ? `- Age: ${age} years` : ''}
      ${gender ? `- Gender: ${gender}` : ''}
      ${patientHistory ? `- Medical History: ${patientHistory}` : ''}
      ${geneticInfo ? `- Genetic Information: ${geneticInfo}` : ''}
      
      Please structure your consultation with the following sections:
      1. Potential Genetic Disorders to Consider (based on the symptoms and information provided)
      2. Recommended Genetic Tests
      3. Potential Treatment Approaches
      4. Additional Considerations
      
      Provide evidence-based information and be clear about the limitations of this consultation. Emphasize that this is for informational purposes only and should not replace professional medical advice.
    `;

    // Access the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Generate the consultation response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const consultation = response.text();

    return NextResponse.json({ consultation });
  } catch (error: any) {
    console.error('AI Consultation Error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate consultation' },
      { status: 500 }
    );
  }
}