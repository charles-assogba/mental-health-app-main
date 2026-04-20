import LoginView from "./Login.view";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginResponse } from "./Login.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    username: z.string().min(1, "Username wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");
    try {
      try {
        const data: LoginResponse = (await client().post("/auth/login", values))
          .data;

        localStorage.setItem("mental-jwt-token", data.payload.accessToken);
        localStorage.setItem(
          "mental-jwt-refresh-token",
          data.payload.refreshToken
        );

        toast(
          <div className="flex flex-col space-y-3">
            <p>Login Berhasil</p>
            <p>Selamat datang kembali {data.payload.user.name} 👋</p>
          </div>
        );
        navigate("/", {
          state: nanoid(),
        });
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          if (error.status == 401) {
            setError(error.response?.data?.msg || "Email atau password salah.");
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

  document.title = "Masuk - Mental Health App";
  return (
    <LoginView
      loading={loading}
      error={error}
      form={form}
      onSubmit={onSubmit}
    />
  );
}
