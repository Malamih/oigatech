"use client";
import { useRouter } from "next/navigation";
import { ImageInput } from "./ImageInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import Loader from "./Loader";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/lib/apiClient";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getAllCompanies } from "@/services/companies";
import Cookies from "js-cookie";
import { getBadgeCondition } from "@/services/badge";

export const Content = () => {
  const {
    data: badgeRes,
    error: badgeErr,
    isFetching: badgeFetching,
  } = getBadgeCondition();

  const [participation_type, setParticipation_type] = useState("");
  const [company, setCompany] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    company_name: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData: FormData) =>
      new ApiClient<any, { message: string }>("/users/register").post(formData),
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      Cookies.set("registeration_success", "true");
      router.push("/success");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const clearData = () => {
    const resetData = {
      first_name: "",
      last_name: "",
      email: "",
      position: "",
      company_name: "",
    };
    setCountryCode("");
    setPhoneValue("");
    setParticipation_type("");
    setCompany("");
    setFormData(resetData);
  };

  const [nameValue, setNameValue] = useState("");
  const [name, setName] = useState("");
  const { data, isFetching, error: company_error } = getAllCompanies(name);
  const [country_code, setCountryCode] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(nameValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [nameValue]);

  if (company_error) {
    toast.error(company_error.message);
  }

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    // const hasNonEnglishLetters = Object.values(formData).some((value) => {
    //   return /[^\u0000-\u007F]/.test(value);
    // });
    // if (hasNonEnglishLetters)
    //   return toast.error(
    //     "Form can't contain non english letters, please make sure that all of the data contains only english"
    //   );
    if (formRef.current) {
      const form = new FormData(formRef.current);
      const phone = form.get("phone_number");
      if (country_code != "") {
        form.delete("phone_number");
        form.append("phone_number", country_code + phone);
      }
      if (participation_type == "exhibitor" && company) {
        if (company == "")
          return toast.error("Please select a company to register.");
        form.append("company_name", company);
      }
      mutate(form);
    }
  };

  const cleanNumbers = (str: string) =>
    str.replace(/[^\d]/g, "").replace(/^0/, "");
  const cleanCountry = (str: string) => str.replace(/[^\d]/g, "");
  const cleanText = (str: string) => str.replace(/[^a-zA-Z\s]/g, "");
  const cleanEmail = (email: string) =>
    email.replace(/[^a-zA-Z0-9@._\-+]/g, "");

  const errorMessage = error ? (error as any).message : null;
  useEffect(() => {
    if (badgeRes?.condition == "expired") {
      router.push("/expire");
    }
  }, [badgeRes]);
  return (
    <>
      {badgeFetching && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader text="Loading" color="black" />
        </div>
      )}
      {!badgeFetching && badgeRes?.condition == "active" && (
        <form
          ref={formRef}
          onSubmit={register}
          onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
            const target = e.target as HTMLElement;
            if (
              e.key === "Enter" &&
              target.tagName === "INPUT" &&
              (target as HTMLInputElement).type === "file"
            ) {
              e.preventDefault();
            }
          }}
          className="flex flex-col h-full gap-4"
        >
          <div className="group flex flex-col sm:flex-row gap-6 justify-between">
            <Input
              placeholder="First name"
              name="first_name"
              value={formData.first_name}
              onInput={(e: any) =>
                setFormData((prev) => ({
                  ...prev,
                  first_name: cleanText(e.target.value),
                }))
              }
              className={clsx({
                "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                  error && (error as any).fieldErrors?.first_name,
              })}
            />
            <Input
              placeholder="Last name"
              name="last_name"
              value={formData.last_name}
              onInput={(e: any) =>
                setFormData((prev) => ({
                  ...prev,
                  last_name: cleanText(e.target.value),
                }))
              }
              className={clsx({
                "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                  error && (error as any).fieldErrors?.last_name,
              })}
            />
          </div>
          <div className="group flex flex-col sm:flex-row gap-4 justify-between mt-4">
            <div className="w-full mt-2">
              <div className="group relative flex items-center gap-1">
                <div className="absolute top-[51%] left-[4px] -translate-y-2/4 pointer-events-none text-lg">
                  +
                </div>
                <Input
                  value={country_code}
                  onInput={(e: any) =>
                    setCountryCode(cleanCountry(e.target.value))
                  }
                  maxLength={4}
                  className={clsx("w-[60px] pl-4", {
                    "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                      error && (error as any).fieldErrors?.phone_number,
                  })}
                  required
                />
                <Input
                  placeholder="Phone number"
                  name="phone_number"
                  value={phoneValue}
                  onInput={(e: any) =>
                    setPhoneValue(cleanNumbers(e.target.value))
                  }
                  className={clsx({
                    "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                      error && (error as any).fieldErrors?.phone_number,
                  })}
                />
              </div>
              <h1
                className={clsx("font-normal text-gray-500 mb-2 mt-2", {
                  "text-red-500": error?.fieldErrors?.send_via,
                })}
              >
                Send badge via
              </h1>
              <RadioGroup
                name="send_via"
                className="grid mt-2"
                style={{ gridTemplateColumns: "repeat(2, minmax(auto, 1fr)" }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="whatsapp"
                    id="whatsapp"
                    className={clsx({
                      "border-red-500":
                        error && (error as any).fieldErrors?.send_via,
                    })}
                  />
                  <Label
                    htmlFor="whatsapp"
                    className={clsx({
                      "text-red-500":
                        error && (error as any).fieldErrors?.send_via,
                    })}
                  >
                    Whatsapp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="email"
                    id="email"
                    className={clsx({
                      "border-red-500":
                        error && (error as any).fieldErrors?.send_via,
                    })}
                  />
                  <Label
                    htmlFor="email"
                    className={clsx({
                      "text-red-500":
                        error && (error as any).fieldErrors?.send_via,
                    })}
                  >
                    Email
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="participationType w-full mt-2">
              <h1
                className={clsx("font-normal text-gray-500 mb-2", {
                  "text-red-500": error?.fieldErrors?.participation_type,
                })}
              >
                Participation type
              </h1>
              <RadioGroup
                name="participation_type"
                value={participation_type}
                style={{ gridTemplateColumns: "repeat(2, minmax(auto, 1fr)" }}
                onValueChange={setParticipation_type}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="exhibitor"
                    id="exhibitor"
                    className={clsx({
                      "border-red-500": error?.fieldErrors?.participation_type,
                    })}
                  />
                  <Label
                    htmlFor="exhibitor"
                    className={clsx({
                      "text-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  >
                    Exhibitor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="organizer"
                    id="organizer"
                    className={clsx({
                      "border-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  />
                  <Label
                    htmlFor="organizer"
                    className={clsx({
                      "text-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  >
                    Organizer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="press"
                    id="press"
                    className={clsx({
                      "border-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  />
                  <Label
                    htmlFor="press"
                    className={clsx({
                      "text-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  >
                    Press
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="visitor"
                    id="visitor"
                    className={clsx({
                      "border-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  />
                  <Label
                    htmlFor="visitor"
                    className={clsx({
                      "text-red-500":
                        error && (error as any).fieldErrors?.participation_type,
                    })}
                  >
                    Visitor
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="group flex flex-col sm:flex-row gap-4 justify-between mt-4">
            {participation_type != "exhibitor" ? (
              <Input
                placeholder="Company name"
                name="company_name"
                value={formData.company_name}
                onInput={(e: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    company_name: cleanText(e.target.value),
                  }))
                }
                className={clsx({
                  "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                    error && (error as any).fieldErrors?.company_name,
                })}
              />
            ) : (
              <Select onValueChange={setCompany}>
                <SelectTrigger className="w-full border-0 border-b rounded-none">
                  <SelectValue placeholder="Select your company" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-gray-200 w-full">
                  {!isFetching &&
                    data?.payload?.map((company, i: number) => {
                      return (
                        <SelectItem key={i} value={company.name}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  {isFetching && (
                    <span className="text-lg text-center flex justify-center">
                      Loading...
                    </span>
                  )}
                  {(data?.payload?.length ?? 0) < 1 && (
                    <span className="py-2 text-center flex justify-center">
                      No companies
                    </span>
                  )}
                </SelectContent>
              </Select>
            )}
            <Input
              placeholder="Your position"
              name="position"
              value={formData.position}
              onInput={(e: any) =>
                setFormData((prev) => ({
                  ...prev,
                  position: cleanText(e.target.value),
                }))
              }
              className={clsx({
                "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                  error && (error as any).fieldErrors?.position,
              })}
            />
          </div>
          <Input
            placeholder="Your email"
            name="email"
            value={formData.email}
            onInput={(e: any) =>
              setFormData((prev) => ({
                ...prev,
                email: cleanEmail(e.target.value),
              }))
            }
            className={clsx("w-full sm:w-2/4 mt-4", {
              "border-red-300 placeholder:text-red-400 focus-visible:border-red-300":
                error && (error as any).fieldErrors?.email,
            })}
          />
          <ImageInput isError={error && (error as any).fieldErrors?.image} />
          <div className="options mt-4 flex gap-4">
            <Button
              className="py-2 px-6 rounded-full text-lg cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Loader text="Registering" /> : "Register Badge"}
            </Button>
            <Button
              className="py-2 px-6 rounded-full text-lg underline cursor-pointer"
              variant={"ghost"}
              onClick={clearData}
              type="button"
            >
              Clear All
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
