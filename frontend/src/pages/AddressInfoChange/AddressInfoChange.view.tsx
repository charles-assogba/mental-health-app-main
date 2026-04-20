import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadableButton from "@/components/LoadableButton/LoadableButton";

import {
  ArrowLeft,
  MapPin,
  Save,
  ShieldAlert,
  Milestone,
  Building,
  Building2,
  Mailbox,
  Globe,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  cardFadeUp,
  formContainerStagger,
  formItemVariants,
  errorVariant,
  buttonHoverTap,
} from "./AddressInfoChange.data";
import { AddressInfoChangeProps } from "./AddressInfoChange.type";
import { Link } from "react-router-dom";

const AddressInfoChangeView: FC<AddressInfoChangeProps> = ({
  loading,
  error,
  onSubmit,
  form,
  countries = [],
  provinces = [],
  cities = [],
  selectedCountry,
  selectedProvince,
  handleCountryChange = () => {},
  handleProvinceChange = () => {},
}) => {
  const isProvinceSelectEnabled = !!selectedCountry && provinces.length > 0;

  const isCitySelectEnabled = !!selectedProvince && cities.length > 0;

  return (
    <motion.div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="w-full max-w-lg mb-6">
        <Link to="/account-settings">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Pengaturan
          </Button>
        </Link>
      </div>

      <motion.div className="flex justify-center w-full" variants={cardFadeUp}>
        <Card className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
            >
              <MapPin className="h-7 w-7 text-green-600 dark:text-green-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Ubah Alamat</CardTitle>
            <CardDescription>
              Perbarui informasi alamat pengiriman atau penagihan Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <Form {...form}>
              <motion.form
                variants={formContainerStagger}
                initial="hidden"
                animate="visible"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Negara</FormLabel>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCountryChange(value);
                            }}
                            value={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:ring-green-400 dark:focus:ring-green-500 h-11 pl-10">
                                <SelectValue placeholder="Pilih Negara" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provinsi / Wilayah</FormLabel>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleProvinceChange(value);
                            }}
                            value={field.value}
                            required={isProvinceSelectEnabled}
                            disabled={!isProvinceSelectEnabled}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:ring-green-400 dark:focus:ring-green-500 h-11 pl-10 disabled:opacity-50 disabled:cursor-not-allowed">
                                <SelectValue placeholder="Pilih Provinsi/Wilayah (Pilih Negara dulu)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {provinces.map((province) => (
                                <SelectItem
                                  key={province.value}
                                  value={province.value}
                                >
                                  {province.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {!isProvinceSelectEnabled &&
                          selectedCountry &&
                          provinces.length === 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Provinsi/Wilayah tidak tersedia atau perlu diisi
                              manual untuk negara ini.
                            </p>
                          )}
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kota / Kabupaten</FormLabel>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />{" "}
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            required={isCitySelectEnabled}
                            disabled={!isCitySelectEnabled}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:ring-green-400 dark:focus:ring-green-500 h-11 pl-10 disabled:opacity-50 disabled:cursor-not-allowed">
                                <SelectValue placeholder="Pilih Kota/Kabupaten (Pilih Provinsi dulu)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.value} value={city.value}>
                                  {city.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {!isCitySelectEnabled &&
                          selectedProvince &&
                          cities.length === 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Kota/Kabupaten tidak tersedia atau perlu diisi
                              manual untuk provinsi ini.
                            </p>
                          )}
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Jalan</FormLabel>
                        <div className="relative">
                          <Milestone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Contoh: Jl. Merdeka No. 10"
                              required
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-green-400 dark:focus-visible:ring-green-500 h-11 pl-10"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <FormField
                    control={form.control}
                    name="postal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kode Pos</FormLabel>
                        <div className="relative">
                          <Mailbox className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Masukkan Kode Pos"
                              required
                              {...field}
                              className="bg-gray-50 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus-visible:ring-green-400 dark:focus-visible:ring-green-500 h-11 pl-10"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      variants={errorVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-md text-center font-medium flex items-center justify-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" /> {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div variants={formItemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={!loading ? buttonHoverTap.hover : {}}
                    whileTap={!loading ? buttonHoverTap.tap : {}}
                    disabled={loading}
                    className="w-full"
                  >
                    <LoadableButton
                      isLoading={loading}
                      type="submit"
                      className={cn(
                        "w-full h-11 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-green-600 hover:bg-green-700 text-white disabled:opacity-70"
                      )}
                      disabled={loading}
                    >
                      <Save className="mr-2 h-5 w-5" /> Simpan Perubahan Alamat
                    </LoadableButton>
                  </motion.button>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AddressInfoChangeView;
