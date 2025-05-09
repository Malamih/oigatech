import { User } from "@/services/users";

export type CompanyResponse = {
  message: string;
  payload: {
    name: string;
    users_limit: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
};

export type GetCompanies = {
  message: string;
  payload: {
    name: string;
    users_limit: number;
    _id: string;
    createdAt: string;
    users: User[];
  }[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
