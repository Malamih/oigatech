"use client";
import { getCompanies } from "@/services/companies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const Companies = () => {
  const [nameValue, setNameValue] = useState("");
  const [name, setName] = useState("");
  const { data, isFetching, error } = getCompanies(name);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(nameValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [nameValue]);

  if (error) {
    toast.error(error.message);
  }
  return (
    <Select name="company">
      <SelectTrigger className="w-full border-0 border-b rounded-none">
        <SelectValue placeholder="Select company" />
      </SelectTrigger>
      <SelectContent className="rounded-none border-gray-200">
        <Input
          placeholder="Search by name..."
          type="text"
          value={nameValue}
          onInput={(e: any) => setNameValue(e.target.value)}
        />
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
  );
};
