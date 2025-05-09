import ApiClient from "@/lib/apiClient";
import { CompanyResponse, GetCompanies } from "@/types/company";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getCompanies = (page: number, params?: any) => {
  const endpoint = new ApiClient<any, GetCompanies>("/companies");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["companies", page, params?.name],
    meta: { params: { page, ...params } },
  });
};
export const getAllCompanies = (name: string) => {
  const endpoint = new ApiClient<any, GetCompanies>("/companies/all");
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["companies", name],
  });
};

export const addCompany = (success: (msg: string) => void) => {
  const endpoint = new ApiClient<any, CompanyResponse>("/companies");
  return useMutation({
    mutationFn: endpoint.post,
    retry: false,
    mutationKey: ["companies"],
    onSuccess: (data) => {
      success(data.message);
    },
  });
};

export const editCompany = (success: (msg: string) => void, id: string) => {
  const endpoint = new ApiClient<any, { message: string }>(`/companies/${id}`);
  return useMutation({
    mutationFn: endpoint.put,
    mutationKey: ["companies"],
    onSuccess: (data) => {
      success(data.message);
    },
  });
};

export const deleteCompany = (success: (msg: string) => void, id: string) => {
  const endpoint = new ApiClient<any, { message: string }>(`/companies/${id}`);
  return useMutation({
    mutationFn: endpoint.delete,
    mutationKey: ["companies"],
    onSuccess: (data) => {
      success(data.message);
    },
  });
};
