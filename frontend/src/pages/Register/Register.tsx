import RegisterView from "./Register.view";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterResponse } from "./Register.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().min(1, "Email wajib diisi").email(),
    username: z.string().min(1, "Username wajib diisi"),
    password: z.string().min(1, "Kata Sandi wajib diisi"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");
    try {
      try {
        const data: RegisterResponse = (
          await client().post("/auth/register", values)
        ).data;

        localStorage.setItem("mental-jwt-token", data.payload.accessToken);
        toast(
          <div className="flex flex-col space-y-3">
            <p>Register Berhasil</p>
            <p>
              Silakan anda lakukan verifikasi email yang sudah dikirimkan ke{" "}
              {data.payload.email} 👍
            </p>
          </div>
        );

        navigate("/email-verify");
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          if (error.status == 401) {
            setError(error.response?.data?.msg || "Email atau password salah.");
            return;
          }

          if (error.status == 409) {
            setError(
              error.response?.data?.msg || "Email atau username sudah diambil."
            );
            return;
          }

          console.log(error.message);
          toast(error.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Form submission error", error);
      toast.error("Gagal mengirim form. Silakan cek console browser");
      toast.error(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(error, null, 2)}</code>
        </pre>
      );
    }
  };
  document.title = "Daftar - Mental Health App";
  return (
    <RegisterView
      error={error}
      loading={loading}
      form={form}
      onSubmit={onSubmit}
    />
  );
}
