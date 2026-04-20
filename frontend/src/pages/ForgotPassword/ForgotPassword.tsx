import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ForgotPasswordView from "./ForgotPassword.view";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { PasswordlessLoginResponse } from "./ForgotPassword.type";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleForgotPasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setError("Mohon masukkan alamat email yang valid.");
        return;
      }

      await client().post("/auth/reset-password", {
        email: email,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast(error?.message);
      }
    } finally {
      setIsLoading(false);
      setEmailSubmitted(true);
    }
  };

  const handleEmailResend = async () => {
    setResendLoading(true);
    try {
      await client().post("/auth/reset-password", {
        email: email,
      });

      toast("Email reset password berhasil dikirim!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast(error?.message);
      }
    } finally {
      setResendLoading(false);
    }
  };

  const verifyResetToken = useCallback(async () => {
    try {
      const data: PasswordlessLoginResponse = (
        await client().post("/auth/verify-reset-password", {
          token: token,
        })
      ).data;

      if (data) {
        localStorage.setItem("mental-jwt-token", data.payload.accessToken);
        navigate("/account-settings/change-password");
        return;
      }

      console.log("Login failed since token `data` is null");
      toast("Terjadi kesalahan.");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast(error?.message);
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token) {
      verifyResetToken();
    }
  }, [token, verifyResetToken]);

  return (
    <ForgotPasswordView
      resendLoading={resendLoading}
      emailSubmitted={emailSubmitted}
      setEmail={setEmail}
      isLoading={isLoading}
      navigate={navigate}
      handleForgotPasswordSubmit={handleForgotPasswordSubmit}
      email={email}
      error={error}
      handleEmailResend={handleEmailResend}
    />
  );
}
