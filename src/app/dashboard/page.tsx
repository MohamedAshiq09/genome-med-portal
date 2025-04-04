// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createSupabaseClient } from '@/lib/supabase/client';
import LogoutButton from '@/components/ui/logout-button';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/login');
  }
  
  // Get the full user object with proper typing
  const user = await currentUser();
  if (!user) {
    redirect('/login');
  }

  const supabase = createSupabaseClient();
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  // If user hasn't completed onboarding, redirect them
  if (!profile) {
    // You should redirect to onboarding or show onboarding UI
    return (
      <div>
        Welcome, {user.firstName || user.emailAddresses?.[0]?.emailAddress}
        {/* Add onboarding UI here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            GenomeMed Portal
          </h1>
          <div>Welcome, {user.firstName || user.emailAddresses[0].emailAddress}</div>
          <LogoutButton />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold mb-4">
            Your Profile
          </h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="font-medium w-32">
                Role
              </span>
              <span>{profile.role}</span>
            </div>
            {profile.specialization && (
              <div className="flex">
                <span className="font-medium w-32">
                  Specialization
                </span>
                <span>{profile.specialization}</span>
              </div>
            )}
            {profile.institution && (
              <div className="flex">
                <span className="font-medium w-32">
                  Institution
                </span>
                <span>{profile.institution}</span>
              </div>
            )}
            {profile.research_focus && (
              <div className="flex">
                <span className="font-medium w-32">
                  Research Focus
                </span>
                <span>{profile.research_focus}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}