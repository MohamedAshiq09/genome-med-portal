// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { createSupabaseClient } from '@/lib/supabase/client';
import LogoutButton from '@/components/ui/logout-button';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const supabase = createSupabaseClient();
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  // If user hasn't completed onboarding, redirect them
  if (!profile) {
    redirect('/onboarding');
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">GenomeMed Portal</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.firstName || user.emailAddresses[0].emailAddress}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{profile.role}</p>
            </div>
            {profile.specialization && (
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-medium">{profile.specialization}</p>
              </div>
            )}
            {profile.institution && (
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p className="font-medium">{profile.institution}</p>
              </div>
            )}
            {profile.research_focus && (
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm text-gray-500">Research Focus</p>
                <p className="font-medium">{profile.research_focus}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}