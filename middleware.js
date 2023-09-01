import { NextResponse } from "next/server";

export function middleware(request) {
  const origin = request.headers.get("origin");
  console.log("origin >>", origin);

  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  console.log("Request >> ", {
    method: request.method,
    url: request.url,
    date: new Date(),
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
