"use client";
import { useQuery } from "@tanstack/react-query";
import { Content } from "./components/Content";
import { useRouter } from "next/navigation";
import ApiClient from "@/lib/apiClient";
import { useEffect } from "react";

const DashboardPage = () => {
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
        <div>
          <Content />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
