import { User } from "firebase/auth";

export type UserType  = User & {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  isAnonymous: boolean;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
};

export type ProviderData = {
  providerId: string;
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string | null;
  photoURL?: string | null;
};

export type StsTokenManager = {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
};

export interface GetAccountInfoResponse {
  kind: string;
  users: User[];
}

export interface ProviderUserInfo {
  providerId: string;
  displayName?: string;
  federatedId: string;
  email?: string;
  rawId: string;
}

export type AuthResponse = {
  user: User;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
};
