import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ForgotPasswordView from "./ForgotPassword.view";
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
    setIsLoading(false);
    setEmailSubmitted(true);
  };

  const handleEmailResend = async () => {
    setResendLoading(true);
    toast("Email reset password berhasil dikirim!");
    setResendLoading(false);
  };

  const verifyResetToken = useCallback(async () => {
    if (token) {
      navigate("/account-settings/change-password");
    }
  }, [token, navigate]);

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
