// src/components/ui/logout-button.tsx
'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}