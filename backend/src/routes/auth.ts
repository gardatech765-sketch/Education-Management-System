import { Elysia, t } from "elysia";
import { register, login } from "../controllers/auth";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/register", async (context) => register(context), {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
      name: t.String(),
      role: t.Optional(t.Enum({
        ADMIN: "ADMIN",
        TUTOR: "TUTOR",
        OWNER: "OWNER",
        PARENT: "PARENT",
        STUDENT: "STUDENT"
      }))
    }),
    detail: {
      tags: ["Auth"],
      summary: "Register a new user"
    }
  })
  .post("/login", async (context) => login(context), {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String()
    }),
    detail: {
      tags: ["Auth"],
      summary: "Login and receive a JWT token"
    }
  });
