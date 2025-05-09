"use client";
import { LogOut, Settings, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { activeBadge, expireBadge, getBadgeCondition } from "@/services/badge";
import { toast } from "sonner";
import { queryClient } from "@/providers/QueryClientProvider";
import clsx from "clsx";
export const Header = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const pageName = segments[segments.length - 1] || "home";
  const router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    router.push("/");
  };
  const scss = (msg: string) => {
    toast.success(msg);
    queryClient.invalidateQueries({ queryKey: ["badge-condition"] });
  };
  const { data, isFetching, error } = getBadgeCondition();
  const {
    mutate: active_mutate,
    isPending: active_pending,
    error: active_error,
  } = activeBadge(scss);
  const {
    mutate: expire_mutate,
    isPending: expire_pending,
    error: expire_error,
  } = expireBadge(scss);

  if (error || active_error || expire_error) {
    toast.error(
      error?.message || active_error?.message || expire_error?.message
    );
  }
  return (
    <header
      style={{ gridArea: "header" }}
      className="bg-white p-4 z-10 flex items-center justify-between border-b border-b-gray-300 sticky top-0 left-0"
    >
      <h1 className="font-medium text-lg">
        {pageName == "dashboard" ? "Users" : pageName}
      </h1>
      <div className="profile flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="user w-[33px] h-[33px] transition duration-100 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-400 cursor-pointer">
              <UserIcon width={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-fit border-gray-200 mr-4 rounded-sm p-2">
            <h1 className="font-medium">Badge is {data?.condition}</h1>
            <Button
              className={clsx(
                "px-2outline-none mb-2 w-full cursor-pointer bg-white border-gray-400",
                {
                  "border-red-400 bg-red-100": data?.condition == "active",
                  "border-green-400 bg-green-100": data?.condition == "expired",
                }
              )}
              variant={"outline"}
              onClick={() =>
                data?.condition == "expired"
                  ? active_mutate({})
                  : expire_mutate({})
              }
            >
              <span>
                {!isFetching && data?.condition == "active"
                  ? expire_pending
                    ? "Expiring badge..."
                    : "Expire badge"
                  : active_pending
                  ? "Activating badge..."
                  : "Activate badge"}
                {isFetching && "Pending..."}
              </span>
            </Button>
            <Button
              className="w-full px-2 outline-none cursor-pointer bg-white border-gray-400"
              variant={"outline"}
              onClick={logout}
            >
              <span>Logout</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
