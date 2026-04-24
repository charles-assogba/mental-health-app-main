import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { nanoid } from "nanoid";

import AddressInfoChangeView from "./AddressInfoChange.view";
import {
  AddressFormData,
  UpdateAddressResponse,
} from "./AddressInfoChange.type";
import { addressSchema } from "./AddressInfoChange.data";
import { GetUserResponse, UserWithData } from "../Profile/Profile.type";

const AddressInfoChange = () => {
  const [user, setUser] = useState<UserWithData | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [provinces, setProvinces] = useState<
    { value: string; label: string }[]
  >([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  const navigate = useNavigate();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "",
      province: "",
      city: "",
      street: "",
      postal: "",
    },
    mode: "onChange",
  });

  const { reset, watch, getValues, resetField, trigger } = form;

  const selectedCountryCode = watch("country");
  const selectedProvinceCodeOrName = watch("province");

  const getUserAddress = (
    user: UserWithData | null
  ): Partial<AddressFormData> => {
    if (!user) return {};
    return {
      country: user.country || "",
      province: user.province || "",
      city: user.city || "",
      street: user.street || "",
      postal: user.postal || "",
    };
  };

  const fetchUser = useCallback(async () => {
    setIsFetchingUser(true);
    setError(null);
    setUser(null);
    setIsFetchingUser(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const countryData = Country.getAllCountries().map((country: ICountry) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountries(countryData);
  }, []);

  const handleCountryChange = useCallback(
    (countryCode: string, resetDependentFields = true) => {
      if (!countryCode) {
        setProvinces([]);
        setCities([]);
        if (resetDependentFields) {
          resetField("province", { defaultValue: "" });
          resetField("city", { defaultValue: "" });
        }
        return;
      }

      const stateData = State.getStatesOfCountry(countryCode).map(
        (state: IState) => ({
          value:
            state.isoCode && state.isoCode.trim() !== ""
              ? state.isoCode
              : state.name,
          label: state.name,
        })
      );
      setProvinces(stateData);
      setCities([]);

      if (resetDependentFields) {
        resetField("province", { defaultValue: "" });
        resetField("city", { defaultValue: "" });

        trigger("province");
        trigger("city");
      }
    },
    [resetField, trigger]
  );

  const handleProvinceChange = useCallback(
    (provinceCodeOrName: string, resetDependentFields = true) => {
      const currentCountryCode = getValues("country");

      if (!currentCountryCode || !provinceCodeOrName) {
        setCities([]);
        if (resetDependentFields) {
          resetField("city", { defaultValue: "" });
        }
        return;
      }

      const selectedState = State.getStatesOfCountry(currentCountryCode)?.find(
        (s) => s.isoCode === provinceCodeOrName || s.name === provinceCodeOrName
      );

      let cityData: { value: string; label: string }[] = [];

      if (selectedState?.isoCode) {
        cityData = City.getCitiesOfState(
          currentCountryCode,
          selectedState.isoCode
        ).map((city: ICity) => ({
          value: city.name,
          label: city.name,
        }));
      } else if (selectedState) {
        console.warn(
          `Province '${selectedState.name}' found but lacks an ISO code. Cannot fetch cities.`
        );
      } else {
        console.warn(
          `Could not find province matching '${provinceCodeOrName}' in country '${currentCountryCode}'.`
        );
      }

      setCities(cityData);

      if (resetDependentFields) {
        resetField("city", { defaultValue: "" });

        trigger("city");
      }
    },
    [getValues, resetField, trigger]
  );

  useEffect(() => {
    if (user) {
      const userAddress = getUserAddress(user);
      console.log("User data available, resetting address form:", userAddress);

      reset({
        country: userAddress.country || "",
        province: userAddress.province || "",
        city: userAddress.city || "",
        street: userAddress.street || "",
        postal: userAddress.postal || "",
      });

      if (userAddress.country) {
        handleCountryChange(userAddress.country, false);

        if (userAddress.province) {
          setTimeout(() => {
            handleProvinceChange(userAddress.province!, false);
          }, 50);
        }
      }
    }
  }, [user, reset, handleCountryChange, handleProvinceChange]);

  const onSubmit = async (data: AddressFormData) => {
    setLoading(true);
    setError(null);
    console.log("Address Data to Submit:", data);
    toast.success("Address updated successfully.");
    navigate("/account-settings", { state: nanoid() });
    setLoading(false);
  };

  if (isFetchingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading address data...</div>
      </div>
    );
  }

  return (
    <AddressInfoChangeView
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      countries={countries}
      provinces={provinces}
      cities={cities}
      selectedCountry={selectedCountryCode}
      selectedProvince={selectedProvinceCodeOrName}
      handleCountryChange={handleCountryChange}
      handleProvinceChange={handleProvinceChange}
    />
  );
};

export default AddressInfoChange;
