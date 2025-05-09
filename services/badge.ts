import ApiClient from "@/lib/apiClient";
import { badgeConditionRes } from "@/middleware";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getBadgeCondition = () => {
  const endpoint = new ApiClient<any, badgeConditionRes>(
    "/admin/badgeCondition"
  );
  return useQuery({
    queryFn: endpoint.get,
    queryKey: ["badge-condition"],
  });
};

export const activeBadge = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>(
    "/admin/activeBadge"
  );
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["badge-condition"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};

export const expireBadge = (scss: (msg: string) => void) => {
  const endpoint = new ApiClient<any, { message: string }>(
    "/admin/expireBadge"
  );
  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["badge-condition"],
    onSuccess: (data) => {
      scss(data.message);
    },
  });
};
