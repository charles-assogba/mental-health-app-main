import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export interface CommunityFormProps {
  error: string;
  loading: boolean;
  form: UseFormReturn<
    {
      title: string;
      body: string;
    },
    undefined
  >;

  onSubmit: (
    values: z.infer<
      z.ZodObject<
        {
          title: z.ZodString;
          body: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          title: string;
          body: string;
        },
        {
          title: string;
          body: string;
        }
      >
    >
  ) => void;
}

export interface CreatePostResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  owner_id: number;
  title: string;
  body: string;
}
