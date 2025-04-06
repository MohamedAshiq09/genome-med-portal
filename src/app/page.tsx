import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Using the imported Header component */}
      <Header />
      
      {/* Spacer to account for fixed header */}
      <div className="h-[11vh]"></div>

      {/* Hero Section - Rearranged and set to full screen height */}
      <section className="container mx-auto px-6 h-[89vh] flex items-center bg-white">
        <div className="flex flex-col md:flex-row items-center">
          {/* Doctor image on left - replaced card with Image 1 */}
          <div className="md:w-1/2 flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-lg">
              {/* <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-40 blur-xl"></div> */}
              <div className="relative">
                <img 
                  src="/images/doctor-character.png" 
                  alt="Doctor character" 
                  className="h-146 w-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Text content now on right */}
          <div className="md:w-1/2 flex flex-col items-start mb-10 md:mb-0 order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Genomic Medicine Made Accessible
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connect genomic data with symptoms and treatments using our AI-powered platform. 
              Revolutionize personalized medicine with precision diagnostics and treatment recommendations.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" variant="default" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Condensed */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Genetic Database</h3>
              <p className="text-gray-600">Access an extensive library of genes, variants, and their associated symptoms and treatments.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Symptom-Based Analysis</h3>
              <p className="text-gray-600">Identify potential genetic factors from observed symptoms using advanced correlation algorithms.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Treatment Recommendations</h3>
              <p className="text-gray-600">Get personalized treatment suggestions based on genetic profiles and clinical evidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section - Rearranged with Image 2 */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-indigo-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Doctor/AI visualization with Image 2 on left */}
            <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center order-2 md:order-1 bg-white">
              <div className="relative w-full max-w-md">
                <img 
                  src="/images/young-doctor-character.png" 
                  alt="Dr. GenomeMed AI" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Content on right with chat functionality */}
            <div className="md:w-1/2 p-8 md:p-12 order-1 md:order-2 bg-indigo-100">
              <h2 className="text-3xl font-bold text-indigo-800 mb-4">Meet Your Genomic Assistant</h2>
              <p className="text-indigo-700 mb-6">
                Our AI assistant functions as a virtual genomic consultant, providing insights that combine your genetic data with the latest medical research.
              </p>
              <ul className="space-y-3 text-indigo-700 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Gene-Symptom Correlation Analysis
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Personalized Treatment Suggestions
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Evidence-Based Medical Insights
                </li>
              </ul>
              
              {/* Preserved chat functionality */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-gray-700">I've analyzed the BRCA1 mutation in your profile along with your symptoms. Based on current research, I recommend discussing these targeted treatment options with your healthcare provider...</p>
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Ask about symptoms or treatments..." 
                  className="flex-1 rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <button className="bg-indigo-600 text-white rounded-r-lg px-4 hover:bg-indigo-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50" asChild>
                  <Link href="dashboard/ai-consultation">Try AI Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Genomic Medicine?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join healthcare providers, researchers, and patients who are using GenomeMed Portal to advance personalized medicine.
          </p>
          <Button size="lg" variant="default" asChild>
            <Link href="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold text-indigo-700">GenomeMed Portal</h3>
              <p className="text-gray-600 mt-2">Advancing precision medicine through genomics.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><Link href="/features" className="text-gray-600 hover:text-indigo-600">Features</Link></li>
                  <li><Link href="/pricing" className="text-gray-600 hover:text-indigo-600">Pricing</Link></li>
                  <li><Link href="/security" className="text-gray-600 hover:text-indigo-600">Security</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/documentation" className="text-gray-600 hover:text-indigo-600">Documentation</Link></li>
                  <li><Link href="/api" className="text-gray-600 hover:text-indigo-600">API</Link></li>
                  <li><Link href="/blog" className="text-gray-600 hover:text-indigo-600">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-600 hover:text-indigo-600">About</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link></li>
                  <li><Link href="/careers" className="text-gray-600 hover:text-indigo-600">Careers</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">© 2025 GenomeMed Portal. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-indigo-600">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-indigo-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}