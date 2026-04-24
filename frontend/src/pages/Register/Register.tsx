import RegisterView from "./Register.view";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    toast.success("Registration successful!");
    navigate("/login");
    setLoading(false);
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
