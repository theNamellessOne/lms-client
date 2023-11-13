import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import HeadersInit = NodeJS.fetch.HeadersInit;

const guestOnlyRoutes = ["/auth"];
const teacherPrefix = "/teacher";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("access_token")?.value;

  const user = await (await getUser(authToken))?.json();
  const authenticated = !!user && !!user.email;
  const route = request.nextUrl.pathname;

  if (guestOnlyRoutes.includes(route) && authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (route.startsWith(teacherPrefix) && !authenticated && !user?.isTeacher) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

const getUser = async (authToken: string | undefined) => {
  if (!authToken || authToken === "") {
    return undefined;
  }

  const headers: HeadersInit = new Headers();
  headers.set("Authorization", `Bearer ${authToken}`);

  //@ts-ignore
  return await fetch({
    url: "http://localhost:3000/auth/me",
    headers: headers,
  });
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
