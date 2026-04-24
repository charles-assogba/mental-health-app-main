import LoginView from "./Login.view";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    toast.success("Login successful!");
    navigate("/", {
      state: nanoid(),
    });
    setLoading(false);
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
