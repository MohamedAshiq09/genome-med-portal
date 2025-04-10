// src/components/ai/consultation-result.tsx
'use client';

interface ConsultationResultProps {
  consultation: string;
}

export function ConsultationResult({ consultation }: ConsultationResultProps) {
  if (!consultation) return null;

  // Parse the consultation string to identify sections
  const formatConsultation = (text: string) => {
    // Replace line breaks with proper HTML
    let formatted = text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />');
    
    // Wrap in paragraph if not already
    if (!formatted.startsWith('<p>')) {
      formatted = `<p>${formatted}</p>`;
    }
    
    // Bold headings
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return formatted;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-700 to-blue-500 px-4 py-3">
        <h3 className="text-lg font-medium text-white">AI Consultation Results</h3>
      </div>
      
      <div className="px-4 py-4">
        <div 
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: formatConsultation(consultation) }}
        />
        
        <div className="mt-4 rounded-md bg-blue-50 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                This AI-generated consultation is for informational purposes only and does not constitute medical advice. 
                Always consult with a qualified healthcare professional for diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}