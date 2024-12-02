'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import ThemeProvider from '../theme/theme-provider';

const queryClient = new QueryClient();

export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </QueryClientProvider>

    </>
  );
}

