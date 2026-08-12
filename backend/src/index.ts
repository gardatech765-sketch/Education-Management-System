import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { logger } from "@grotto/logysia";
import { authRoutes } from "./routes/auth";
import { courseRoutes } from "./routes/course";

const app = new Elysia()
  // Logger
  .use(logger())
  // Swagger Documentation
  .use(
    swagger({
      path: "/swagger",
      provider: "swagger-ui",
      documentation: {
        info: {
          title: "EMS API Documentation",
          version: "1.0.0",
          description: "Education Management System API for private tutoring",
        },
        tags: [
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Admin", description: "Admin related endpoints" }
        ],
      },
    })
  )
  // JWT Configuration
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "super_secret_jwt_key_here",
    })
  )
  // Mount Routes
  .group("/api", (app) => app.use(authRoutes).use(courseRoutes))
  
  .get("/", () => "Hello EMS Backend")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
