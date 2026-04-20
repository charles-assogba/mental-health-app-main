import { UseFormReturn } from "react-hook-form";

export interface AddressFormData {
  country: string;
  province?: string | undefined;
  city?: string | undefined;
  street: string;
  postal: string;
}

export interface AddressInfoChangeProps {
  form: UseFormReturn<AddressFormData>;
  loading: boolean;
  error: string | null;
  onSubmit: (data: AddressFormData) => void;
  countries: { value: string; label: string }[];
  provinces: { value: string; label: string }[];
  cities: { value: string; label: string }[];
  selectedCountry?: string;
  selectedProvince?: string;
  handleCountryChange: (countryCode: string) => void;
  handleProvinceChange: (provinceCodeOrName: string) => void;
}

export interface UpdateAddressResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  username: string;
  password: string;
  phone_number: string;
  bio: string;
  gender: string;
  country: string;
  province: string;
  city: string;
  street: string;
  postal: string;
  role: string;
  created_at: Date;
  hashedRefreshToken: string;
}
