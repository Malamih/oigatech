"use client"
import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export type ImageOrQRCode = {
  _id: string;
  url: string;
  public_id: string;
  createdAt: string;
};

export type Company = {
  _id: string;
  name: string;
  users_limit: number;
  users: any[];
  createdAt: string;
};

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position: string;
  company_name: string;
  participation_type: string;
  send_via: string;
  image: ImageOrQRCode;
  qrcode: ImageOrQRCode;
  status: "pending" | "accepted" | "rejected";
  createdAt: number;
  company?: Company;
};

export type UsersResponse = {
  message: string;
  payload: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const getUsers = (page: number, params?: {}) => {
  const endpoint = new ApiClient<any, UsersResponse>(`/users`);
  return useQuery({
    queryKey: ["users", page, params],
    queryFn: endpoint.get,
    meta: { params },
  });
};

export const AcceptUser = (success: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>("/users/accept");
  return useMutation({
    mutationFn: (id: string) => endpoint.put({}, id),
    mutationKey: ["users"],
    retry: false,
    onSuccess: (data) => {
      success(data.message);
    },
  });
};

export const RejectUser = (success: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>("/users/reject");
  return useMutation({
    mutationFn: (id: string) => endpoint.put({}, id),
    mutationKey: ["users"],
    retry: false,
    onSuccess: (data) => {
      success(data.message);
    },
  });
};

export const DeleteUser = (success: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>("/users");
  return useMutation({
    mutationFn: (id: string) => endpoint.delete({}, id),
    mutationKey: ["users"],
    retry: false,
    onSuccess: (data) => {
      success(data.message);
    },
  });
};

export const registerUser = (Success: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>("/users/register");
  return useMutation({
    mutationFn: endpoint.post,
    retry: false,
    onSuccess: (data) => {
      Success(data.message);
    },
  });
};

export const editUser = (Success: (msg: string) => void, id: string) => {
  const endpoint = new ApiClient<any, { message: string }>(`/users`);
  return useMutation({
    mutationFn: (form: FormData) => endpoint.put(form, id),
    mutationKey: ["edit-user"],
    retry: false,
    onSuccess: (data) => {
      Success(data.message);
    },
  });
};

export const sendEmail = (success: (msg: string) => void, id: string) => {
  const endpoint = new ApiClient<any, { message: string }>(
    `/pdf/send/${id}?send_via=email`
  );
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["send_email"],
    retry: false,
    onSuccess: (data) => {
      success(data.message);
    },
  });
};
export const sendWhatsapp = (success: (msg: string) => void, id: string) => {
  const endpoint = new ApiClient<any, { message: string }>(
    `/pdf/send/${id}?send_via=whatsapp`
  );
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["send_email"],
    retry: false,
    onSuccess: (data) => {
      success(data.message);
    },
  });
};
