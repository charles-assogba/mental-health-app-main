import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PersonalInfoChangeView from "./PersonalInfoChange.view";
import {
  PersonalInfoFormData,
  UpdatePersonalInfoResponse,
} from "./PersonalInfoChange.type";
import { personalInfoSchema } from "./PersonalInfoChange.data";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { GetUserResponse, UserWithData } from "../Profile/Profile.type";

export default function PersonalInfoChange() {
  const [user, setUser] = useState<UserWithData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const navigate = useNavigate();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),

    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      gender: "",
      bio: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (data: PersonalInfoFormData) => {
    setError(null);
    setLoading(true);
    try {
      const res: UpdatePersonalInfoResponse = (
        await client().post("/user/personal-info", data)
      ).data;
      toast(res.msg || "Informasi berhasil diperbarui.");

      navigate("/account-settings", {
        state: nanoid(),
      });
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.msg || "Gagal memperbarui informasi.";
        setError(errorMsg);
        toast.error(errorMsg);
        console.error("Update Error:", error.response?.data || error.message);

        if (error.status === 401) {
          console.warn("Unauthorized access attempt during update.");
        }
      } else if (error instanceof Error) {
        setError("Terjadi kesalahan tidak terduga.");
        toast.error("Terjadi kesalahan tidak terduga.");
        console.error("Unexpected Update Error:", error.message);
      } else {
        setError("Terjadi kesalahan tidak terduga.");
        toast.error("Terjadi kesalahan tidak terduga.");
        console.error("Unknown Update Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setIsFetchingUser(true);
    setError(null);
    try {
      const data: GetUserResponse = (await client().get("/user")).data;
      setUser(data.payload);
    } catch (error) {
      setUser(null);
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.msg || "Gagal memuat data pengguna.";

        toast.error(errorMsg);
        console.error(
          "Fetch User Error:",
          error.response?.data || error.message
        );
        if (error.status === 401 || error.status === 403) {
          console.warn("Unauthorized access attempt during fetch.");

          setError("Sesi Anda telah berakhir. Silakan login kembali.");
        } else {
          setError(errorMsg);
        }
      } else if (error instanceof Error) {
        toast.error("Gagal memuat data pengguna.");
        setError("Gagal memuat data pengguna.");
        console.error("Unexpected Fetch Error:", error.message);
      } else {
        toast.error("Gagal memuat data pengguna.");
        setError("Gagal memuat data pengguna.");
        console.error("Unknown Fetch Error:", error);
      }
    } finally {
      setIsFetchingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        gender: user.gender || "MALE",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    document.title = "Ubah Informasi Pribadi - Mental Health App";
  }, []);

  if (isFetchingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Replace with your actual Loading Spinner component */}
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <PersonalInfoChangeView
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      navigate={navigate}
      form={form}
    />
  );
}
