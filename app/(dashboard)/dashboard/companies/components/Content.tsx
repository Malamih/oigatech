"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCompanies } from "@/services/companies";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { ComapnyRow } from "./CompanyRow";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { NewCompany } from "./NewCompany";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Content = () => {
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const limit = 50;

  const {
    data: companies_data,
    isFetching: isFetching_companies,
    error: companies_error,
  } = getCompanies(page, { limit, name });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(inputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const totalPages = companies_data?.meta?.totalPages || 1;

  if (companies_error) toast.error(companies_error.message);

  return (
    <div className="content w-[calc(100vw-250px)] overflow-auto">
      <header className="flex items-center justify-between pb-4 border-b border-b-gray-300">
        <h1 className="text-lg font-medium">
          Total Companies: {companies_data?.meta?.total || 34}
        </h1>
        <NewCompany />
      </header>
      <Input
        className="w-full max-w-[400px] border border-gray-300 mt-4 px-2 rounded-sm focus-visible:border focus-visible:border-gray-300"
        placeholder="Search by name.."
        type="text"
        value={inputValue}
        onInput={(e: any) => {
          setInputValue(e.target.value);
          setPage(1);
        }}
      />
      <Table className="mt-4 min-w-[767px] h-full">
        <TableHeader>
          <TableRow className="border-b-gray-300">
            <TableHead className="text-gray-600">Company name</TableHead>
            <TableHead className="text-gray-600">Users limit</TableHead>
            <TableHead className="text-gray-600">Users count</TableHead>
            <TableHead className="text-gray-600">Created at</TableHead>
            <TableHead className="text-gray-600 text-center">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching_companies && (
            <TableRow className="border-b-gray-300">
              {Array.from({ length: 4 }).map((_, i) => {
                return (
                  <TableCell key={i}>
                    <Skeleton className="w-full h-[30px]" />
                  </TableCell>
                );
              })}
              <TableCell>
                <div className="icon m-auto w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer duration-100 transition">
                  <MoreVertical width={20} />
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isFetching_companies &&
            companies_data?.payload?.map((company, i: number) => {
              return <ComapnyRow company={company} key={i} />;
            })}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.max(1, prev - 1));
                }}
                isActive={page > 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(index + 1);
                  }}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.min(totalPages, prev + 1));
                }}
                isActive={page < totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {(companies_data?.payload?.length ?? 0) < 1 && !isFetching_companies && (
        <h1 className="text-center text-lg text-gray-400 mt-4">No companies</h1>
      )}
    </div>
  );
};
