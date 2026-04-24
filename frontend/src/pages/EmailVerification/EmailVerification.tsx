import { useSearchParams } from "react-router-dom";
import EmailVerificationView from "./EmailVerification.view";
import SuccessEmailVerificationView from "./SuccessEmailVerification.view";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  document.title = "Verifikasi Email - Mental Health App";

  if (token) {
    return <SuccessEmailVerificationView />;
  }

  return <EmailVerificationView />;
}
