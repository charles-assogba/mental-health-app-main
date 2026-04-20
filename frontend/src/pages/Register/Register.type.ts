import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export interface RegisterProps {
  error: string;
  loading: boolean;
  form: UseFormReturn<
    {
      name: string;
      email: string;
      username: string;
      password: string;
    },
    undefined
  >;

  onSubmit: (
    values: z.infer<
      z.ZodObject<
        {
          name: z.ZodString;
          email: z.ZodString;
          username: z.ZodString;
          password: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          name: string;
          email: string;
          username: string;
          password: string;
        },
        {
          name: string;
          email: string;
          username: string;
          password: string;
        }
      >
    >
  ) => void;
}

export interface RegisterResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  accessToken: string;
}
