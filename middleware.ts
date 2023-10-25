import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import HeadersInit = NodeJS.fetch.HeadersInit;

const guestOnlyRoutes = ["/auth"];
const protectedRoutes = ["/teacher"];

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("access_token")?.value;

  const authenticated = await isAuth(authToken);
  const route = request.nextUrl.pathname;

  if (guestOnlyRoutes.includes(route) && authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (protectedRoutes.includes(route) && !authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

const isAuth = async (authToken: string | undefined) => {
  if (!authToken || authToken === "") {
    return false;
  }

  const headers: HeadersInit = new Headers();
  headers.set("Authorization", `Bearer ${authToken}`);

  //@ts-ignore
  const res = await fetch({
    url: "http://localhost:3000/auth/me",
    headers: headers,
  });

  return res.status === 200;
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
