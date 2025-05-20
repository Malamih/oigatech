"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { BASE_URL } from "@/lib/apiClient";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SelectValue, Value } from "@radix-ui/react-select";
import { Share } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const download = async (method: "xlsx" | "pdf") => {
  const token = Cookies.get("token");
  try {
    const response = await fetch(
      `${BASE_URL}/users/download/${method == "xlsx" ? "excel" : method}`,
      {
        method: "GET",
      }
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    console.log(response);
    link.href = url;
    link.download = `users.${method}`;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};

export const Export = () => {
  const [method, setMethod] = useState<"pdf" | "xlsx" | "">("");
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFetch = async () => {
    if (method == "") return toast.error("Please choose a downloading method.");
    try {
      setIsPending(true);
      await download(method);
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Share />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white px-4 py-3">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-medium text-center">
              Export Users
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <div className="method">
              <Select
                onValueChange={(v) => {
                  (v == "pdf" || v == "xlsx") && setMethod(v);
                }}
              >
                <SelectTrigger className="w-[200px] ">
                  <SelectValue placeholder="Export method" />
                </SelectTrigger>
                <SelectContent className="focus-visible:border-gray-200 border-gray-400">
                  <SelectItem value="pdf" className="flex items-center gap-2">
                    <span>PDF</span>
                  </SelectItem>
                  <SelectItem value="xlsx" className="flex items-center gap-2">
                    <span>EXCEL</span>
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* <Loader2Icon className="animate-spin scale-125" /> */}
            </div>
            <Button
              disabled={method == "" || isPending}
              variant={"outline"}
              className="cursor-pointer"
              onClick={handleFetch}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
