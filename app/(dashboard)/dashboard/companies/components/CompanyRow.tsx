import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/helpers/date";
import { queryClient } from "@/providers/QueryClientProvider";
import { deleteCompany, editCompany } from "@/services/companies";
import clsx from "clsx";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ComapnyRow = ({ company }: { company: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const success = (msg: string) => {
    toast.success(msg);
    queryClient.invalidateQueries({ queryKey: ["companies"] });
    setIsOpen(false);
    setPopoverOpen(false);
  };
  const { mutate, isPending, error }: any = editCompany(success, company._id);

  const {
    mutate: delete_company,
    isPending: delete_pending,
    error: delete_error,
  } = deleteCompany(success, company._id);

  const submitEdits = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      users_limit: Number(form.get("users_limit")),
    };
    mutate(data);
  };

  const handleDelete = () => {
    delete_company({});
  };

  if (error || delete_error) {
    toast.error(error?.message || delete_error?.message);
  }
  return (
    <TableRow className="border-b-gray-300 text-gray-500">
      <TableCell className="px-4">{company.name}</TableCell>
      <TableCell className="px-4">{company.users_limit}</TableCell>
      <TableCell className="px-4">{company.users.length}</TableCell>
      <TableCell className="px-4">{formatDate(company.createdAt)}</TableCell>
      <TableCell>
        <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
          <PopoverTrigger asChild>
            <div className="icon m-auto w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer duration-100 transition">
              <MoreVertical width={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 border-gray-300 w-[140px] mr-24">
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="bg-white border-gray-300 w-full cursor-pointer focus-visible:"
                >
                  <Edit />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle>Edit Company</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitEdits} className="flex flex-col gap-4">
                  <div className="input flex flex-col gap-2">
                    <Label className="font-medium" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      placeholder="Company name..."
                      id="name"
                      name="name"
                      defaultValue={company.name}
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
                      defaultValue={company.users_limit}
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
                  <Button
                    className="h-[35px] cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Editing..." : "Edit"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant={"outline"}
              className="bg-white border-gray-300 w-full mt-2 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash />
              {delete_pending ? "Deleting..." : "Delete"}
            </Button>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};
