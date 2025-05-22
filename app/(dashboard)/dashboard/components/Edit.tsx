"use client";
import { editUser, User } from "@/services/users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useReadImage } from "@/lib/imageReader";
import Image from "next/image";
import { getAllCompanies, getCompanies } from "@/services/companies";
import { toast } from "sonner";
import { queryClient } from "@/providers/QueryClientProvider";
import clsx from "clsx";

type participation_type = "exhibitor" | "press" | "organizer" | "visitor" | "";

export const Edit = ({ user }: { user: User }) => {
  const [preview, setPreview] = useState(user?.image?.url || "");
  const [participationType, setParticipationType] =
    useState<participation_type>(
      (user.participation_type as participation_type) || ""
    );
  const [sendVia, setSendVia] = useState<"whatsapp" | "email" | "">(
    (user?.send_via as "email" | "whatsapp") || ""
  );
  const [status, setStatus] = useState(user.status);
  const [nameInput, setNameInput] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [phone_number, setPhoneNumber] = useState(user?.phone_number || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setName(nameInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [nameInput]);

  const success = (msg: string) => {
    toast.success(msg);
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["users"] });
    setParticipationType("");
    setPhoneNumber("");
    setPreview("");
  };

  const { data, isFetching, error } = getAllCompanies(name);
  const {
    mutate,
    isPending,
    error: register_error,
  }: any = editUser(success, user._id);

  const setImage = async (e: any) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error(
        "The file is not an image, please choose an image to continue"
      );
      return;
    }

    const src = await useReadImage(file);
    setPreview(src as string);
  };

  const edit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("participation_type", participationType);
    form.append("send_via", sendVia);
    form.append("status", status);
    if (participationType == "exhibitor") {
      form.append("company_name", company);
    }
    mutate(form);
  };
  if (error || register_error) {
    toast.error(error?.message || register_error?.message);
  }
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="py-0 px-3 bg-white text-sm h-[30px] text-black border-gray-300 border outline-none rounded-sm text-center cursor-pointer hover:bg-gray-100 duration-100 transition">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-300 py-6 pb-2 px-4 w-[800px]">
        <form onSubmit={(e) => edit(e)} className="flex flex-col">
          <DialogTitle className="text-center text-xl">Edit User</DialogTitle>
          <DialogHeader className="mb-3">
            <div className="inputs items-start flex gap-4">
              <label
                className={clsx(
                  "imageInput cursor-pointer hover:opacity-75 hover:bg-gray-200 relative min-w-[200px] min-h-[150px] w-[200px] transition duration-200 bg-gray-100 border border-gray-300 rounded-sm overflow-hidden",
                  {
                    "border-red-200 bg-red-50":
                      register_error?.fieldErrors?.image,
                  }
                )}
                htmlFor="imageInput"
                onChange={setImage}
              >
                <div className="icon absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-gray-400 ">
                  <ImageIcon />
                </div>
                <input
                  type="file"
                  name="image"
                  id="imageInput"
                  className="hidden"
                />
                {preview != "" && (
                  <img
                    src={preview}
                    alt="image"
                    className="object-cover w-full h-[200px]"
                  />
                )}
              </label>
              <div className="inputs flex flex-col gap-2 flex-[1]">
                <Input
                  name="first_name"
                  placeholder="First name"
                  defaultValue={user.first_name}
                  className={clsx("w-full", {
                    "border-b-red-400 placeholder:text-red-400":
                      register_error?.fieldErrors?.first_name,
                  })}
                />
                <Input
                  name="last_name"
                  placeholder="Last name"
                  defaultValue={user.last_name}
                  className={clsx("w-full", {
                    "border-b-red-400 placeholder:text-red-400":
                      register_error?.fieldErrors?.last_name,
                  })}
                />
                <Input
                  name="email"
                  placeholder="Email"
                  defaultValue={user.email}
                  className={clsx("w-full", {
                    "border-b-red-400 placeholder:text-red-400":
                      register_error?.fieldErrors?.email,
                  })}
                />
                <Input
                  name="phone_number"
                  placeholder="Phone number"
                  value={phone_number}
                  onInput={(e: any) =>
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").replace(/^0/, "")
                    )
                  }
                  className={clsx("w-full", {
                    "border-b-red-400 placeholder:text-red-400":
                      register_error?.fieldErrors?.phone_number,
                  })}
                />
              </div>
            </div>
          </DialogHeader>
          <div className="group flex items-center gap-2">
            <Select
              onValueChange={(
                v: "visitor" | "organizer" | "press" | "exhibitor"
              ) => setParticipationType(v)}
            >
              <SelectTrigger
                className={clsx("w-full", {
                  "border-red-200 bg-red-100":
                    register_error?.fieldErrors?.participation_type,
                })}
              >
                <SelectValue placeholder={user.participation_type} />
              </SelectTrigger>
              <SelectContent className="w-full border-gray-200">
                <SelectItem
                  value="exhibitor"
                  disabled={user.participation_type == "exhibitor"}
                >
                  Exhibitor
                </SelectItem>
                <SelectItem
                  value="press"
                  disabled={user.participation_type == "press"}
                >
                  Press
                </SelectItem>
                <SelectItem
                  value="visitor"
                  disabled={user.participation_type == "visitor"}
                >
                  Visitor
                </SelectItem>
                <SelectItem
                  value="organizer"
                  disabled={user.participation_type == "organizer"}
                >
                  organizer
                </SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(v: "whatsapp" | "email") => setSendVia(v)}>
              <SelectTrigger
                className={clsx("w-full", {
                  "border-red-200 bg-red-100":
                    register_error?.fieldErrors?.send_via,
                })}
              >
                <SelectValue placeholder={user.send_via} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem
                  value="whatsapp"
                  disabled={user.send_via == "whatsapp"}
                >
                  Whatsapp
                </SelectItem>
                <SelectItem value="email" disabled={user.send_via == "email"}>
                  Email
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(v: "pending" | "accepted" | "rejected") =>
                setStatus(v)
              }
            >
              <SelectTrigger
                className={clsx("w-full", {
                  "border-red-200 bg-red-100":
                    register_error?.fieldErrors?.status,
                })}
              >
                <SelectValue placeholder={user.status} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem
                  value="accepted"
                  disabled={user.status == "accepted"}
                >
                  Accepted
                </SelectItem>
                <SelectItem
                  value="rejected"
                  disabled={user.status == "rejected"}
                >
                  Rejected
                </SelectItem>
                <SelectItem value="pending" disabled={user.status == "pending"}>
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="group flex items-center gap-2 mt-4">
            {participationType != "exhibitor" ? (
              <Input
                placeholder="Company name"
                name="company_name"
                defaultValue={user.company_name}
              />
            ) : (
              <Select onValueChange={(v) => setCompany(v)}>
                <SelectTrigger
                  className={clsx("w-full", {
                    "border-red-200 bg-red-100":
                      register_error?.fieldErrors?.company_name,
                  })}
                >
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent className="w-full max-h-[200px]">
                  {isFetching && <span>Loading...</span>}
                  {data?.payload?.length === 0 && (
                    <span className="py-4 font-medium text-gray-400">
                      No Companies
                    </span>
                  )}
                  {data?.payload?.map((company: any, i: number) => {
                    return (
                      <SelectItem value={company.name} key={i}>
                        <span className="mr-2">{company.name}</span>
                        <span>
                          {company?.users?.length}/{company?.users_limit}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
            <Input
              placeholder="Position"
              name="position"
              defaultValue={user.position}
              className={clsx("w-full", {
                "border-b-red-400 placeholder:text-red-400":
                  register_error?.fieldErrors?.position,
              })}
            />
          </div>
          <Button className="cursor-pointer mt-3 w-full" disabled={isPending}>
            {isPending ? "Editing User..." : "Edit User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
