"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const BASE_URL = "https://oigatech-api.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((req) => {
  const token = Cookies.get("token");
  req.params = {
    ...req.params,
  };
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default class ApiClient<Req, Res> {
  endpoint: string;
  router = useRouter();
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (data: any) => {
    let queryParams = "";
    if (data.meta?.params) {
      queryParams = new URLSearchParams(data.meta.params).toString();
    }
    return axiosInstance
      .get<Res>(`${this.endpoint}${(queryParams && "?" + queryParams) || ""}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          this.router.push("/auth");
        }
        throw err;
      });
  };

  put = (data?: Req, id?: string): Promise<Res> => {
    return axiosInstance
      .put<Res>(`${this.endpoint}${id ? `/${id}` : ""}`, data)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err.response.data;
      });
  };

  post = (data?: Req, headers?: {}, id?: string): Promise<Res> => {
    return axiosInstance
      .post<Res>(`${this.endpoint}${id != undefined ? `/${id}` : ""}`, data, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          this.router.push("/auth");
        }
        throw err.response?.data || err;
      });
  };

  delete = (data: Req, id?: string): Promise<Res> => {
    return axiosInstance
      .delete<Res>(`${this.endpoint}${id ? `/${id}` : ""}`, {
        data,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          this.router.push("/auth");
        }
        throw err.response.data;
      });
  };
}
