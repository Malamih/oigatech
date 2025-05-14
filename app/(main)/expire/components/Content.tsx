"use client";
import { getBadgeCondition } from "@/services/badge";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Content = () => {
  const { data, isFetching, error } = getBadgeCondition();
  const router = useRouter();
  useEffect(() => {
    if (data?.condition == "active") {
      router.push("/");
    }
  }, [data]);
  return (
    <>
      {data?.condition == "expired" && (
        <div className="mt-24 flex-col">
          <h1 className="text-4xl font-medium mb-4">
            Thank you for your interest.
          </h1>
          <p className="text-lg leading-snug">
            Applications for this year have ended.
          </p>
          <p className="leading-snug text-sm font-medium">see you next year</p>
        </div>
      )}
    </>
  );
};
