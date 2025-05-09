"use client";
import clsx from "clsx";
import { Building2Icon, LogOut, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const links = [
    {
      name: "Users",
      path: "/dashboard",
      icon: <Users width={15} />,
    },
    {
      name: "Companies",
      path: "/dashboard/companies",
      icon: <Building2Icon width={15} />,
    },
  ];
  const pathname = usePathname();
  return (
    <aside
      style={{ gridArea: "sidebar" }}
      className="sticky top-0 left-0 z-10 bg-white border-r border-r-gray-300 h-[100vh] flex flex-col"
    >
      <div className="logo p-4 border-b border-b-gray-300 flex justify-center w-full h-[60px]">
        <div className="image">
          <Image
            src={"/dashboard/malamihLogo.png"}
            alt="Logo"
            width={100}
            height={60}
          />
        </div>
      </div>
      <ul className="links p-4 flex-col flex gap-2 flex-[1]">
        {links.map((link, i: number) => {
          return (
            <li key={i}>
              <Link
                href={link.path}
                className={clsx(
                  "flex items-center gap-2 py-2 px-4 rounded-sm  font-medium hover:bg-primary-50 transition duration-200",
                  {
                    "bg-primary-500 hover:bg-primary-400 text-white":
                      pathname == link.path,
                  }
                )}
              >
                <div className="icon">{link.icon}</div>
                <span className="">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
