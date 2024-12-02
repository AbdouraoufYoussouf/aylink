"use client"
import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useAuthStore } from '@/store/auth-store';

export function useSessionStatus() {
  const { data: sessionData, status, update: sessionUpdate } = useSession();
  const [session, setSession] = useState<Session | null>(sessionData);
  const [loading, setLoading] = useState(status === 'loading');
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (isAuth && !session) {
      setLoading(true);
      getSession().then((newSession) => {
        setSession(newSession);
        setLoading(false);
      });
    }
  }, [isAuth, session]);

  return { session, loading, sessionUpdate, status };
}