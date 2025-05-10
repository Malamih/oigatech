import { NextRequest, NextResponse } from "next/server";
import ApiClient from "./lib/apiClient";

export interface badgeConditionRes {
  message: string;
  condition: "expired" | "active";
}

export interface CheckAuthResponse {
  message: string;
  status: number;
}

export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const pathsToCheck = ["/", "/expire", "/auth", "/dashboard"];

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!pathsToCheck.some((p) => path === p || path.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");

  try {
    const res = await new ApiClient<any, BadgeConditionRes>(
      "/admin/badgeCondition"
    ).get({});
    console.log(res);

    if (path == "/" && res.condition == "expired") {
      return NextResponse.redirect(new URL("/expire", request.url));
    }
    if (path == "/expire" && res.condition == "active") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error: any) {
    console.error(error.statusCode);
  }

  if (path == "/auth" || path.includes("/dashboard")) {
    try {
      const res = await new ApiClient<any, CheckAuthResponse>(
        "/admin/checkAuth"
      ).post({}, { Authorization: `Bearer ${token?.value}` });

      if (path == "/auth" && res.status == 200) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (res.status == 200) {
        return NextResponse.next();
      }
    } catch (error: any) {
      if (error.statusCode == 401 && path.includes("/dashboard")) {
        return NextResponse.redirect(new URL("/auth", request.url));
      }
    }
  }
};
