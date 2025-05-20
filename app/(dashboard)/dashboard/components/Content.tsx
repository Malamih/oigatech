"use client";
import { AddUsesr } from "./AddUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRow } from "./UserRow";
import { getUsers } from "@/services/users";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDownLeftFromCircle,
  RefreshCcw,
  Share,
  Upload,
  UploadIcon,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Export } from "./Export";

export const Content = () => {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const [status, setStatus] = useState<
    "rejected" | "accepted" | "pending" | "all"
  >("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(email);
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  const { data, isFetching, error, refetch } = getUsers(page, {
    email: debouncedEmail,
    status,
    limit,
    page,
  });

  useEffect(() => {
    if (data?.meta) {
      setTotalPages(data.meta.totalPages);
      setTotal(data.meta.total);
    }
  }, [data]);

  if (error) {
    toast.error(error.message);
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 2;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={page === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="last">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <>
      <div
        className="content bg-white p-4 rounded-sm m-2 max-w-[calc(100vw-240px)]"
        style={{ gridArea: "content" }}
      >
        <div className="header flex items-center justify-between">
          <h1 className="font-medium text-lg">Total Users: {total || 0}</h1>
          <div className="actions flex items-center gap-2">
            <Export />
            <AddUsesr />
          </div>
        </div>
        <div>
          <div className="header mt-4 flex items-center justify-between">
            <div className="input w-full flex items-center gap-2">
              <input
                type="text"
                name="search"
                className="border border-gray-300 rounded-sm py-1 px-2 outline-none w-full max-w-[400px]"
                placeholder="Search by email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                className="refresh flex items-center gap-2 py-1 px-3 border border-gray-300 rounded-sm hover:bg-gray-50 cursor-pointer"
                onClick={() => refetch()}
              >
                <span className="text-sm">Refresh</span>
                <RefreshCcw width={15} />
              </div>
            </div>
            <div className="filters flex items-center gap-4">
              <Select
                onValueChange={(
                  v: "accepted" | "rejected" | "pending" | "all"
                ) => setStatus(v)}
                value={status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="border-gray-100">
                  <SelectItem
                    value="accepted"
                    className="flex items-center gap-2"
                  >
                    <div className="circle w-[10px] h-[10px] rounded-full bg-green-200 border border-green-600"></div>
                    <span>Accepted</span>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <div className="circle w-[10px] h-[10px] rounded-full bg-red-200 border border-red-600"></div>
                    <span>Rejected</span>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="circle w-[10px] h-[10px] rounded-full bg-yellow-200 border border-yellow-600"></div>
                    <span>Pending</span>
                  </SelectItem>
                  <SelectItem value="all" className="text-center">
                    <div className="circle w-[10px] h-[10px] rounded-full bg-blue-200 border border-blue-600"></div>
                    <span className="text-center">All</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table className="mt-4 w-full">
            <TableHeader>
              <TableRow className="border-b-gray-300">
                <TableHead className="text-gray-600 font-medium text-center">
                  Image
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Full name
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Email
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Phone
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Company
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Position
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Send via
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Participation type
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Register Date
                </TableHead>
                <TableHead className="text-gray-600 font-medium text-center">
                  Status
                </TableHead>
                <TableHead className="text-center text-gray-400">
                  Options
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.payload &&
                data.payload.map((user, i: number) => {
                  return <UserRow key={i} user={user} />;
                })}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="pagination-container flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page - 1);
                      }}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {generatePaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page + 1);
                      }}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {data?.payload?.length === 0 && (
            <h1 className="text-center mt-4 text-lg font-medium text-gray-500">
              No users
            </h1>
          )}

          {/* Pagination info */}
          {total > 0 && (
            <div className="text-center text-sm text-gray-500 mt-2">
              Showing page {page} of {totalPages} • {total} total users
            </div>
          )}
        </div>
      </div>
    </>
  );
};
