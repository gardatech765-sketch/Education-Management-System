import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { verifyToken } from "../middlewares/authMiddleware";
import * as controller from "../controllers/auth";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_here";

// ─── Route publik ─────────────────────────────────────────────────────────────
const publicRoutes = new Elysia()
  .use(jwt({ name: "jwt", secret: JWT_SECRET }))
  .post("/register", (ctx) => controller.registerHandler(ctx), {
    body: t.Object({
      email: t.String({ format: "email", error: "Email tidak valid" }),
      password: t.String({ minLength: 6, error: "Password minimal 6 karakter" }),
      role_id: t.String({ minLength: 1, error: "role_id wajib diisi" }),
    }),
    detail: { tags: ["Auth"], summary: "Register user baru" },
  })
  .post("/login", (ctx) => controller.loginHandler(ctx), {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 1 }),
    }),
    detail: { tags: ["Auth"], summary: "Login user" },
  });

// ─── Route protected (derive langsung di sini, bukan dari plugin) ─────────────
const protectedRoutes = new Elysia()
  .derive(async ({ headers }) => {
    const user = await verifyToken(headers as Record<string, string | undefined>);
    return { user };
  })
  .onBeforeHandle(({ user, set }: any) => {
    if (!user) {
      set.status = 401;
      return { success: false, message: "Unauthorized. Harap login terlebih dahulu." };
    }
  })
  .post("/logout", (ctx) => controller.logoutHandler(ctx), {
    detail: {
      tags: ["Auth"],
      summary: "Logout user",
      security: [{ BearerAuth: [] }],
    },
  })
  .get("/me", (ctx) => controller.getMeHandler(ctx), {
    detail: {
      tags: ["Auth"],
      summary: "Data user yang sedang login",
      security: [{ BearerAuth: [] }],
    },
  });

// ─── Gabung ke prefix /auth ───────────────────────────────────────────────────
export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(publicRoutes)
  .use(protectedRoutes);
