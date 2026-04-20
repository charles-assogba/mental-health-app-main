import { z } from "zod";
import { passwordSchema } from "./PasswordChange.data";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

export interface PasswordChangeProps {
  showCurrentPassword: boolean;
  setShowCurrentPassword: Dispatch<SetStateAction<boolean>>;
  showNewPassword: boolean;
  setShowNewPassword: Dispatch<SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  error: string | null;
  passwordStrength: number;
  onSubmit: (data: PasswordFormData) => void;
  navigate: NavigateFunction;
  form: UseFormReturn<
    {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    undefined
  >;
  newPasswordValue: string;
}

export type PasswordFormData = z.infer<typeof passwordSchema>;
