'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setUnauthorizedHandler } from '../lib/api';

export default function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      router.push('/login');
    });
  }, [router]);

  return <>{children}</>;
}