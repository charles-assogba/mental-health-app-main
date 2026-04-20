import { z } from "zod";
import { personalInfoSchema } from "./PersonalInfoChange.data";
import { NavigateFunction } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

export interface PersonalInfoChangeProps {
  loading: boolean;
  error: string | null;
  onSubmit: (data: PersonalInfoFormData) => void;
  navigate: NavigateFunction;
  form: UseFormReturn<
    {
      name: string;
      email: string;
      phone_number?: string;
      gender?: string;
      bio?: string;
    },
    undefined
  >;
}

export interface UpdatePersonalInfoResponse {
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
  phone_number: string;
  bio: string;
  gender: string;
  country: null;
  province: null;
  city: null;
  street: null;
  postal: null;
  role: string;
  created_at: Date;
  hashedRefreshToken: string;
}

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
