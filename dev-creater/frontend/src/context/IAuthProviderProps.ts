import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

export interface IAuthProviderProps {
  children: ReactNode;
  provider: typeof AuthProvider;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

export interface IAuthContext {
  user: any | null;
  authTokens: AuthTokens | null;
  setAuthTokens: (tokens: AuthTokens | null) => void;
  setUser: (user: any | null) => void;
  registerUser ?: (email: string, password: string, second_password: string, company_id: string) => Object;
  loginUser ?: (email: string, password: string) => void;
  logoutUser: () => void;
  createCompany: (name: string) => any;
}

export const defaultAuthContext: IAuthContext = {
  user: null,
  authTokens: null,
  setAuthTokens: (tokens: AuthTokens | null) => {},
  setUser:  (user: any | null) => {},
  registerUser:  () => Object,
  loginUser:  () => {},
  logoutUser:  () => {},
  createCompany: () => Object,
}