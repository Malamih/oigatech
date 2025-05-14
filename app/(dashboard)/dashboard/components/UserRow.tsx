"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/providers/QueryClientProvider";
import {
  AcceptUser,
  DeleteUser,
  RejectUser,
  sendEmail,
  sendWhatsapp,
  User,
} from "@/services/users";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "./Edit";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

const download = async (user: User) => {
  try {
    const response = await fetch(`${BASE_URL}/pdf/download/${user?._id}`, {
      method: "GET",
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.first_name}_${user.last_name}.pdf`;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};

export const UserRow = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const success = (msg: string) => {
    toast.success(msg);
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  const { mutate: accept, isPending, error } = AcceptUser(success);
  const {
    mutate: reject,
    isPending: reject_pending,
    error: reject_error,
  } = RejectUser(success);

  const {
    mutate: delete_user,
    isPending: delete_pending,
    error: delete_error,
  } = DeleteUser(success);

  const {
    isPending: download_pending,
    error: download_error,
    mutate: downloadBadge,
  } = useMutation({
    mutationFn: (user: User) => download(user),
    mutationKey: ["download-badge"],
    retry: false,
    onSuccess: () => {
      success("Badge download successfully.");
    },
  });

  const {
    isPending: email_pending,
    error: email_error,
    mutate: send_email,
  } = sendEmail(success, user._id);

  const {
    isPending: whatsapp_pending,
    error: whatsapp_error,
    mutate: send_whatsapp,
  }: any = sendWhatsapp(success, user._id);
  if (
    error ||
    reject_error ||
    delete_error ||
    download_error ||
    email_error ||
    whatsapp_error
  ) {
    toast.error(
      error?.message ||
        reject_error?.message ||
        delete_error?.message ||
        download_error?.message ||
        email_error?.message ||
        whatsapp_error?.error?.message
    );
  }

  return (
    <TableRow className="border-b-gray-300">
      <TableCell className="text-gray-400">
        <img
          src={user?.image?.url || "https://picsum.photos/500/300"}
          alt="profile"
          className="min-w-[90px] h-[90px] m-auto rounded-sm object-cover"
        />
      </TableCell>
      <TableCell className="text-gray-400 text-center">
        {user.first_name} {user.last_name}
      </TableCell>
      <TableCell className="text-gray-400 text-center">{user.email}</TableCell>
      <TableCell className="text-gray-400 text-center">
        {user.phone_number}
      </TableCell>
      <TableCell className="text-gray-400 text-center">
        {user.company_name}
      </TableCell>
      <TableCell className="text-gray-400 text-center">
        {user.position}
      </TableCell>
      <TableCell className="text-gray-400 text-center">
        {user.send_via}
      </TableCell>
      <TableCell className="text-gray-400 text-center">
        {user.participation_type}
      </TableCell>
      <TableCell className="text-center font-medium">
        <span
          className={clsx("py-[5px] px-3 rounded-full capitalize", {
            "bg-green-100 border border-green-600 text-green-500":
              user.status == "accepted",
            "bg-red-100 border border-red-600 text-red-500":
              user.status == "rejected",
            "bg-yellow-100 border border-yellow-600 text-yellow-500":
              user.status == "pending",
          })}
        >
          {user.status}
        </span>
      </TableCell>
      <TableCell className="text-center text-gray-600">
        <Popover onOpenChange={setIsOpen} open={isOpen}>
          <PopoverTrigger asChild>
            <div className="icon m-auto w-[30px] h-[30px] rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-center">
              <MoreHorizontal />
            </div>
          </PopoverTrigger>
          <PopoverContent className="border-gray-100 border flex flex-col p-2 bg-white w-[170px] mr-4 gap-2">
            {user.status != "accepted" && (
              <Button
                className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition"
                onClick={() => accept(user._id)}
                disabled={isPending}
              >
                {isPending ? "Accepting..." : "Accept"}
              </Button>
            )}
            {user.status != "rejected" && (
              <Button
                className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition"
                onClick={() => reject(user._id)}
                disabled={reject_pending}
              >
                {reject_pending ? "Rejecting..." : "Reject"}
              </Button>
            )}
            <Edit user={user} />
            <Button
              className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition"
              onClick={() => send_whatsapp({})}
              disabled={whatsapp_pending}
            >
              {whatsapp_pending ? "Sending..." : "Send Whtsapp"}
            </Button>
            <Button
              className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition"
              onClick={() => send_email({})}
              disabled={email_pending}
            >
              {email_pending ? "Sending..." : "Send Email"}
            </Button>
            <Button
              className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition"
              onClick={() => downloadBadge(user)}
              disabled={download_pending}
            >
              {download_pending ? "Donwloading..." : "Download"}
            </Button>
            <Button
              disabled={delete_pending}
              className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition"
              onClick={() => delete_user(user._id)}
            >
              {delete_pending ? "Deleting..." : "Delete"}
            </Button>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};
