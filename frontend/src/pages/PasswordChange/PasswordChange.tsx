import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { passwordSchema } from "./PasswordChange.data";
import PasswordChangeView from "./PasswordChange.view";
import { PasswordFormData } from "./PasswordChange.type";

export default function PasswordChange() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 5);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = form.watch("newPassword");
  const passwordStrength = getPasswordStrength(newPasswordValue);

  const onSubmit = (data: PasswordFormData) => {
    console.log("Password Change Data:", data);
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (data.currentPassword !== "password") {
        setError("Kata sandi lama yang Anda masukkan salah.");
      } else {
        alert("Kata sandi berhasil diubah! (Simulasi)");
        navigate("/settings");
      }
    }, 1500);
  };

  document.title = "Ubah Kata Sandi - Mental Health App";

  return (
    <PasswordChangeView
      showCurrentPassword={showCurrentPassword}
      setShowCurrentPassword={setShowCurrentPassword}
      showNewPassword={showNewPassword}
      setShowNewPassword={setShowNewPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      loading={loading}
      error={error}
      passwordStrength={passwordStrength}
      onSubmit={onSubmit}
      navigate={navigate}
      form={form}
      newPasswordValue={newPasswordValue}
    />
  );
}
