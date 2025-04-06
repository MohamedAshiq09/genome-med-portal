// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
// import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerkAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadUserProfile() {
      if (!isSignedIn || !user) {
        setIsLoading(false);
        return;
      }
      
      const supabase = createClient();
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      setProfile(data);
      setIsLoading(false);
    }
    
    loadUserProfile();
  }, [user, isSignedIn]);
  
  return {
    user,
    profile,
    isSignedIn,
    isLoading,
    signOut
  };
}