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
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { GetUserResponse, UserWithData } from "../Profile/Profile.type";

export default function PersonalInfoChange() {
  const [user, setUser] = useState<UserWithData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
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
    toast("Informasi berhasil diperbarui.");

    navigate("/account-settings", {
      state: nanoid(),
    });
    setLoading(false);
  };

  const fetchUser = async () => {
    setIsFetchingUser(true);
    setError(null);
    setUser(null);
    setIsFetchingUser(false);
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
