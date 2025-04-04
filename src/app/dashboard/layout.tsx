import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* You can add shared sidebar, navigation, or other dashboard layout elements here */}
      <div className="flex-grow">
        {children}
      </div>
      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          &copy; {new Date().getFullYear()} GenomeMed Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}