"use client";
import { useRouter } from "next/navigation";
import { Content } from "./components/Content";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/lib/apiClient";
import { useEffect } from "react";

const Companies = () => {
  const router = useRouter();
  const {
    data: authData,
    isFetching: authFetching,
    error: authError,
  }: any = useQuery({
    queryFn: new ApiClient<any, any>("/admin/checkAuth").post,
    queryKey: ["auth"],
  });

  useEffect(() => {
    if (authError && authError?.statusCode == 401) {
      router.push("/auth");
    }
  }, [authError]);
  return (
    <>
      {!authFetching && (
        <div className="companies bg-white rounded-sm p-4 m-2">
          <Content />
        </div>
      )}
    </>
  );
};

export default Companies;
