import { useSearchParams } from "react-router-dom";
import EmailVerificationView from "./EmailVerification.view";
import SuccessEmailVerificationView from "./SuccessEmailVerification.view";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  document.title = "Verifikasi Email - Mental Health App";

  const verifyToken = async (token: string) => {
    try {
      await client().post("/auth/verify", {
        token: token,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  if (token) {
    verifyToken(token);
    return <SuccessEmailVerificationView />;
  }

  return <EmailVerificationView />;
}
