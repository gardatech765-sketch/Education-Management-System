import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const authMiddleware = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "super_secret_jwt_key_here",
    })
  )
  .derive(async ({ jwt, headers, set }) => {
    const authorization = headers["authorization"];
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return { user: null };
    }

    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token);

    if (!user) {
      return { user: null };
    }

    return { user };
  });

export const requireAuth = (app: Elysia) =>
  app
    .use(authMiddleware)
    .onBeforeHandle(({ user, set }) => {
      if (!user) {
        set.status = 401;
        return { success: false, message: "Unauthorized" };
      }
    });

export const requireRole = (roles: string[]) => (app: Elysia) =>
  app
    .use(authMiddleware)
    .onBeforeHandle(({ user, set }: any) => {
      if (!user) {
        set.status = 401;
        return { success: false, message: "Unauthorized" };
      }
      if (!roles.includes(user.role as string)) {
        set.status = 403;
        return { success: false, message: "Forbidden" };
      }
    });
