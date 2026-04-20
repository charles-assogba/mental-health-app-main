import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export interface LoginProps {
  error: string;
  loading: boolean;
  form: UseFormReturn<
    {
      username: string;
      password: string;
    },
    undefined
  >;

  onSubmit: (
    values: z.infer<
      z.ZodObject<
        {
          username: z.ZodString;
          password: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          username: string;
          password: string;
        },
        {
          username: string;
          password: string;
        }
      >
    >
  ) => void;
}

export interface LoginResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}
