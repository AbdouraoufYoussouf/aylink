// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextResponse } from 'next/server';
import { auth } from './auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: { auth?: any; nextUrl?: any; }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Si l'utilisateur est connecté et sur la page de connexion, rediriger vers /dashboard
  if (isLoggedIn && nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à /dashboard, rediriger vers la page de connexion
  if (!isLoggedIn && nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  // Pour toutes les autres routes, laisser passer
  return NextResponse.next();
});

// Mettre à jour le matcher pour inclure la page d'accueil et le dashboard
export const config = { matcher: ['/', '/dashboard/:path*'] };