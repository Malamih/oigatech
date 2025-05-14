"use client"
import ApiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export interface LoginRes {
  message: string;
  token: string;
  payload: any;
}

export const useLogin = (success: (data: LoginRes) => void) => {
  return useMutation({
    mutationFn: new ApiClient<any, LoginRes>("/admin/login").post,
    mutationKey: ["login"],
    onSuccess: (data) => {
      success(data);
    },
  });
};
