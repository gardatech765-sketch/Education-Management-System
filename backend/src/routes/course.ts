import  { Elysia, t } from "elysia";
import  * as controller from "../controllers/course";

export const courseRoutes = new Elysia({ prefix: "/courses" })
    .get("/", async () => controller.list(), { detail: { tags: ["Course"] } })
    .post("/", async (context) => controller.create(context), {
        body: t.Object({ title: t.String(), description: t.Optional(t.String
        ()) }),
        detail: { tags: ["Course"] },
    })
    .get("/:id", async (context) => controller.detail(context))
    .put("/:id", async (context) => controller.update(context))
    .delete("/:id", async (context) => controller.remove(context)); 

