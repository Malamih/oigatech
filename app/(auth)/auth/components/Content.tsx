"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginRes, useLogin } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const Content = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const success = (data: LoginRes) => {
    toast.success(data.message);
    Cookies.set("token", data.token);
    router.push("/dashboard");
  };
  const { isPending, error, mutate }: any = useLogin(success);

  const login = (form: FormData) => {
    const adminData = {
      email: form.get("email"),
      password: form.get("password"),
    };
    mutate(adminData);
  };
  return (
    <>
      <div className="wrapper py-4 px-6 bg-white rounded-sm w-[98%] max-w-[400px]">
        <div className="logo mb-4 flex justify-center flex-col items-center">
          <Image
            src={"/dashboard/malamihLogo.png"}
            alt="logo"
            width={130}
            height={40}
          />
          <span className="text-sm">Dashboard</span>
        </div>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            const form = new FormData(e.target);
            login(form);
          }}
        >
          <div className="input mb-4">
            <Label className="font-medium" htmlFor="email">
              Email
            </Label>
            <Input
              placeholder="e.g.@domain.com"
              name="email"
              type="email"
              id="email"
              autoFocus
              required
            />
            {error?.fieldErrors?.email?.map((err: string, i: number) => {
              return (
                <span className="text-red-400 text-sm select-none" key={i}>
                  {err}
                </span>
              );
            })}
          </div>
          <div className="input">
            <Label className="font-medium" htmlFor="password">
              Password
            </Label>
            <div className="input-wrapper relative">
              <Input
                placeholder={showPassword ? "Your password" : "********"}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                required
              />
              <label
                htmlFor="password"
                className="icon w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer absolute top-2/4 -translate-y-2/4 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Image
                    src={"/icons/eye-closed.svg"}
                    width={19}
                    height={19}
                    alt="eye-icon"
                  />
                ) : (
                  <Image
                    src={"/icons/eye.svg"}
                    width={19}
                    height={19}
                    alt="eye-icon"
                  />
                )}
              </label>
            </div>
            {error?.fieldErrors?.password?.map((err: string, i: number) => {
              return (
                <span className="text-red-400 text-sm select-none" key={i}>
                  {err}
                </span>
              );
            })}
          </div>
          <div className="submit mt-4">
            <Button
              className="w-full text-lg cursor-pointer"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {isPending ? "Signing in" : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
