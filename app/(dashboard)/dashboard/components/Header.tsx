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

export const Header = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const pageName = segments[segments.length - 1] || "home";
  const router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    router.push("/");
  };
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
          <PopoverContent className="w-[100px] border-gray-200 mr-4 rounded-sm p-2">
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
