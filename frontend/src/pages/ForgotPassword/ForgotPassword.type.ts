import { Dispatch, FormEvent, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export interface ForgotPasswordProps {
  resendLoading: boolean;
  emailSubmitted: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  navigate: NavigateFunction;
  handleForgotPasswordSubmit: (event: FormEvent<HTMLFormElement>) => void;
  email: string;
  error: string | null;
  handleEmailResend: () => void;
}

export interface PasswordlessLoginResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  username: string;
  password: string;
  phone_number: null;
  bio: null;
  gender: null;
  street: null;
  province: null;
  postal: null;
  country: null;
  role: string;
  created_at: Date;
  accessToken: string;
}
