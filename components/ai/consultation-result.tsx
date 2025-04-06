// src/components/ai/consultation-result.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

interface ConsultationResultProps {
  consultation: string;
}

export function ConsultationResult({ consultation }: ConsultationResultProps) {
  return (
    <div className="relative">
      {/* Decorative DNA helix icon */}
      <div className="absolute -top-4 right-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      </div>
      
      <Card className="bg-gradient-to-r from-white to-indigo-50 border-t-4 border-indigo-600 shadow-sm">
        <CardHeader className="pb-1 pt-3 px-4">
          <CardTitle className="text-base font-bold text-indigo-900">
            AI Consultation Results
          </CardTitle>
          <div className="h-1 w-12 bg-indigo-200 rounded mt-1"></div>
        </CardHeader>
        
        <CardContent className="pt-2 px-4 pb-3">
          <div className="prose max-w-none prose-sm">
            <ReactMarkdown>{consultation}</ReactMarkdown>
          </div>
          
          {/* Added footer with disclaimer */}
          <div className="mt-4 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Results should be reviewed by a healthcare professional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}