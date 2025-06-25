'use client';

import { createContext, use } from 'react';

import { AuthUserClaims } from './jwt';

interface AuthContextState {
  user: AuthUserClaims | null;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
});

export const useAuth = () => use(AuthContext);
