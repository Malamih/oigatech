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
import { getAllCompanies } from "@/services/companies";
import { toast } from "sonner";
import { registerUser, User } from "@/services/users";
import { queryClient } from "@/providers/QueryClientProvider";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

export const AddUsesr = () => {
  const [preview, setPreview] = useState("");
  const [participationType, setParticipationType] = useState<
    "exhibitor" | "press" | "organizer" | "visitor" | ""
  >("");
  const [sendVia, setSendVia] = useState<"whatsapp" | "email" | "">("");
  const [nameInput, setNameInput] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [phone_number, setPhoneNumber] = useState("");

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
  }: any = registerUser(success);

  const setImage = async (e: any) => {
    const files = e.target.files;
    if (!files) return;
    const src = await useReadImage(files[0]);
    setPreview(src as string);
  };

  const register = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("participation_type", participationType);
    form.append("send_via", sendVia);
    if (participationType == "exhibitor") {
      form.append("company_name", company);
    }
    mutate(form);
  };
  if (error || register_error) {
    toast.error(error?.message || register_error?.message);
  }

  return (
    <div className="add">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-[3px] cursor-pointer">New User</Button>
        </DialogTrigger>
        <DialogContent className="bg-white border-gray-300 py-6 pb-2 px-4">
          <form onSubmit={(e) => register(e)} className="flex flex-col">
            <DialogTitle className="text-center text-xl">New User</DialogTitle>
            <DialogHeader className="mb-3">
              <div className="inputs items-start flex gap-4">
                <label
                  className={clsx(
                    "imageInput cursor-pointer hover:opacity-75 hover:bg-gray-200 relative min-w-[200px] min-h-[150px] h-full transition duration-200 bg-gray-100 border border-gray-300 rounded-sm overflow-hidden",
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
                    <img src={preview} alt="image" className="object-cover" />
                  )}
                </label>
                <div className="inputs flex flex-col gap-2 flex-[1]">
                  <Input
                    name="first_name"
                    placeholder="First name"
                    className={clsx("w-full", {
                      "border-b-red-400 placeholder:text-red-400":
                        register_error?.fieldErrors?.first_name,
                    })}
                  />
                  <Input
                    name="last_name"
                    placeholder="Last name"
                    className={clsx("w-full", {
                      "border-b-red-400 placeholder:text-red-400":
                        register_error?.fieldErrors?.last_name,
                    })}
                  />
                  <Input
                    name="email"
                    placeholder="Email"
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
                  <SelectValue placeholder="Participation type" />
                </SelectTrigger>
                <SelectContent className="w-full border-gray-200">
                  <SelectItem value="exhibitor">Exhibitor</SelectItem>
                  <SelectItem value="press">Press</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                  <SelectItem value="organizer">organizer</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(v: "whatsapp" | "email") => setSendVia(v)}
              >
                <SelectTrigger
                  className={clsx("w-full", {
                    "border-red-200 bg-red-100":
                      register_error?.fieldErrors?.send_via,
                  })}
                >
                  <SelectValue placeholder="Send via" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="whatsapp">Whatsapp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="group flex items-center gap-2 mt-4">
              {participationType != "exhibitor" ? (
                <Input placeholder="Company name" name="company_name" />
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
                    <Input
                      placeholder="Search..."
                      className="w-full border-gray-400 border p-1 mb-2 rounded-sm"
                      value={nameInput}
                      onInput={(e: any) => setNameInput(e.target.value)}
                    />
                    {isFetching && <span>Loading...</span>}
                    {data?.payload?.map((company: any, i: number) => {
                      return (
                        <SelectItem value={company.name} key={i}>
                          <span className="mr-2">{company.name}</span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
              <Input
                placeholder="Position"
                name="position"
                className={clsx("w-full", {
                  "border-b-red-400 placeholder:text-red-400":
                    register_error?.fieldErrors?.position,
                })}
              />
            </div>
            <Button className="cursor-pointer mt-3 w-full">
              {isPending ? "Adding User..." : "Add User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
