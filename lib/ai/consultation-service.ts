import fs from 'fs/promises'; // Using promise-based fs
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
  try {
    // Load the genetic disorders data
    const csvPath = path.join(process.cwd(), 'seed-data', 'genetic-disorders.csv');
    
    // Using async file reading with error handling
    let disordersData;
    try {
      const csvData = await fs.readFile(csvPath, 'utf-8');
      disordersData = csvToJson(csvData);
    } catch (fileError) {
      console.error('Error reading genetic disorders data:', fileError);
      throw new Error('Could not access genetic disorders database');
    }
    
    // Get the Gemini model
    const model = getGenerativeModel();
    
    // Create a prompt for the AI with more structured formatting
    const prompt = `
You are a genetic consultation AI assistant for the GenomeMed Portal.

PATIENT INFORMATION:
${request.symptoms.length > 0 ? `- Symptoms: ${request.symptoms.join(', ')}` : '- Symptoms: None provided'}
${request.patientHistory ? `- Patient History: ${request.patientHistory}` : '- Patient History: None provided'}
${request.geneticInfo ? `- Genetic Information: ${request.geneticInfo}` : '- Genetic Information: None provided'}
${request.age ? `- Age: ${request.age}` : '- Age: Not specified'}
${request.gender ? `- Gender: ${request.gender}` : '- Gender: Not specified'}

INSTRUCTIONS:
Based on the provided symptoms and patient information, analyze the following genetic disorders database and provide:
1. Potential genetic disorders that match the symptoms (list the top 3-5 most likely matches)
2. Genes that might be affected
3. Recommended genetic tests
4. Possible treatments and management approaches
5. References to medical literature (if available)

GENETIC DISORDERS DATABASE:
${JSON.stringify(disordersData, null, 2)}

FORMAT YOUR RESPONSE IN THE FOLLOWING STRUCTURE:
## Potential Genetic Disorders
(List disorders here with brief descriptions)

## Potentially Affected Genes
(List genes here)

## Recommended Genetic Tests
(List appropriate tests)

## Treatment & Management Approaches
(List approaches)

## References
(List references)

## Medical Disclaimer
(Include standard medical disclaimer)

Provide your consultation in a clear, structured format. Include disclaimers about the importance of professional medical diagnosis.
`;

    // Generate content with proper error handling
    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error('Received empty response from AI model');
    }
    
    return result.response.text();
  } catch (error) {
    console.error('Error generating AI consultation:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate genetic consultation: ${error.message}`);
    } else {
      throw new Error('Failed to generate genetic consultation: An unknown error occurred');
    }
  }
}