export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/profile", "/info", "/admin", "/dashboard"] }