// src/lib/ai/consultation-service.ts

import fs from 'fs';
import path from 'path';
import { getGenerativeModel } from './gemini';
import { csvToJson } from '../utils/format';

interface ConsultationRequest {
  symptoms: string[];
  patientHistory?: string;
  geneticInfo?: string;
  age?: number;
  gender?: string;
}

export async function getGeneticConsultation(request: ConsultationRequest) {
  const model = getGenerativeModel();
  
  // Load the genetic disorders data
  const csvPath = path.join(process.cwd(), 'seed-data', 'genetic-disorders.csv');
  const csvData = fs.readFileSync(csvPath, 'utf-8');
  const disordersData = csvToJson(csvData);
  
  // Create a prompt for the AI
  const prompt = `
    You are a genetic consultation AI assistant for the GenomeMed Portal.
    
    Patient Information:
    - Symptoms: ${request.symptoms.join(', ')}
    ${request.patientHistory ? `- Patient History: ${request.patientHistory}` : ''}
    ${request.geneticInfo ? `- Genetic Information: ${request.geneticInfo}` : ''}
    ${request.age ? `- Age: ${request.age}` : ''}
    ${request.gender ? `- Gender: ${request.gender}` : ''}
    
    Based on the provided symptoms and patient information, analyze the following genetic disorders database and provide:
    1. Potential genetic disorders that match the symptoms
    2. Genes that might be affected
    3. Recommended genetic tests
    4. Possible treatments and management approaches
    5. References to medical literature (if available)
    
    Here is the genetic disorders database:
    ${JSON.stringify(disordersData, null, 2)}
    
    Provide your consultation in a clear, structured format. Include disclaimers about the importance of professional medical diagnosis.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating AI consultation:', error);
    throw new Error('Failed to generate genetic consultation');
  }
}