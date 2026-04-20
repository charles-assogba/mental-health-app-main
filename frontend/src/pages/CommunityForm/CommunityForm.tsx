import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
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
    try {
      const data: CreatePostResponse = (await client().post("/thread", values))
        .data;

      toast(data.msg);
      navigate("/community");
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.status == 401) {
          setError(error.response?.data?.msg || "Terjadi kesalahan.");
          return;
        }

        console.log(error.message);
        toast(error.message);
      }
    }
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
