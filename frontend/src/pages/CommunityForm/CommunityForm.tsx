import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommunityFormView from "./CommunityForm.view";
import { CreatePostResponse } from "./CommunityForm.type";

export default function CommunityForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    title: z.string().min(1, "Judul thread wajib diisi"),
    body: z.string().min(1, "Konten thread wajib diisi"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");
    toast("Thread created");
    navigate("/community");
    setLoading(false);
  };

  document.title = "Forum Komunitas - Mental Health App";
  return (
    <CommunityFormView
      loading={loading}
      error={error}
      form={form}
      onSubmit={onSubmit}
    />
  );
}
