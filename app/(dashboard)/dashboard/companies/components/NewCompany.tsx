import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { queryClient } from "@/providers/QueryClientProvider";
import { addCompany } from "@/services/companies";
import clsx from "clsx";
import { useState } from "react";

export const NewCompany = () => {
  const [isOpen, setIsOpen] = useState(false);
  const success = (msg: string) => {
    queryClient.invalidateQueries({ queryKey: ["companies"] });
    toast.success(msg);
    setIsOpen(false);
  };
  const { mutate, isPending, error }: any = addCompany(success);
  const newCompany = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      users_limit: Number(form.get("users_limit")),
    };
    mutate(data);
  };
  if (error) toast.error(error.message);
  return (
    <div className="new">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button className="h-[30px] cursor-pointer">
            <Plus />
            New
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle>New Company</DialogTitle>
          </DialogHeader>
          <form onSubmit={newCompany} className="flex flex-col gap-4">
            <div className="input flex flex-col gap-2">
              <Label className="font-medium" htmlFor="name">
                Name
              </Label>
              <Input
                placeholder="Company name..."
                id="name"
                name="name"
                className={clsx(
                  "border-gray-300 border px-2 rounded-sm border-b focus-visible:border",
                  {
                    "border-red-400 placeholder:text-red-400 focus-visible:border-red-400":
                      error?.fieldErrors?.name,
                  }
                )}
                type="text"
              />
              <span className="font-medium text-red-400 text-sm first-letter:capitalize">
                {error?.fieldErrors?.name}
              </span>
            </div>
            <div className="input flex flex-col gap-2">
              <Label className="font-medium" htmlFor="Users_limit">
                Users limit
              </Label>
              <Input
                placeholder="Users limit..."
                id="users_limit"
                name="users_limit"
                className={clsx(
                  "border-gray-300 border px-2 rounded-sm border-b focus-visible:border",
                  {
                    "border-red-400 placeholder:text-red-400 focus-visible:border-red-400":
                      error?.fieldErrors?.users_limit,
                  }
                )}
                type="number"
              />
              <span className="font-medium text-red-400 text-sm first-letter:capitalize">
                {error?.fieldErrors?.users_limit}
              </span>
            </div>
            <Button className="h-[35px] cursor-pointer" disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
