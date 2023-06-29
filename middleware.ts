export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/data",
    "/dashboard/profile",
    "/dashboard/upload",
  ],
};
