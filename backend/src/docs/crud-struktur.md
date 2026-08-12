# Panduan membuat fitur CRUD sesuai struktur proyek

Dokumen ini memberikan langkah dan contoh implementasi CRUD (Create, Read, Update, Delete) mengikuti struktur proyek yang ada: `controllers` -> `services` -> `prisma`.

Contoh kasus: `Course` resource (mata pelajaran / kelas sederhana)

Struktur file yang akan dibuat:

- `src/controllers/course.ts` — endpoint HTTP
- `src/services/courseService.ts` — logika bisnis
- `src/routes/course.ts` — definisi route dan schema
- `prisma/schema.prisma` — schema model `Course` (jika belum ada)

---

1. Tambah model `Course` di `backend/prisma/schema.prisma`:

```prisma
model Course {
  id        Int      @id @default(autoincrement())
  title     String
  description String?
  createdAt DateTime @default(now())
}
```

Setelah menambahkan model, jalankan:

```bash
cd backend
# kalau hapus tabel
bun prisma migrate reset
# jalanin ulang
bun prisma generate
# tambahin tabel
bun prisma migrate dev --name add_course
```

2. Buat `src/services/courseService.ts`:

```ts
import prisma from "../prisma/client";

export const createCourse = async (data: {
  title: string;
  description?: string;
}) => {
  return prisma.course.create({ data });
};

export const getCourses = async () => {
  return prisma.course.findMany();
};

export const getCourseById = async (id: number) => {
  return prisma.course.findUnique({ where: { id } });
};

export const updateCourse = async (
  id: number,
  data: { title?: string; description?: string },
) => {
  return prisma.course.update({ where: { id }, data });
};

export const deleteCourse = async (id: number) => {
  return prisma.course.delete({ where: { id } });
};

export default {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
```

3. Buat `src/controllers/course.ts`:

```ts
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

export const create = async ({ body, set }: any) => {
  const course = await createCourse(body);
  return { success: true, course };
};

export const list = async () => {
  const courses = await getCourses();
  return { success: true, courses };
};

export const detail = async ({ params, set }: any) => {
  const id = Number(params.id);
  const course = await getCourseById(id);
  if (!course) {
    set.status = 404;
    return { success: false, message: "Not found" };
  }
  return { success: true, course };
};

export const update = async ({ params, body, set }: any) => {
  const id = Number(params.id);
  try {
    const course = await updateCourse(id, body);
    return { success: true, course };
  } catch (e) {
    set.status = 404;
    return { success: false, message: "Not found" };
  }
};

export const remove = async ({ params, set }: any) => {
  const id = Number(params.id);
  try {
    await deleteCourse(id);
    return { success: true };
  } catch (e) {
    set.status = 404;
    return { success: false, message: "Not found" };
  }
};
```

4. Buat `src/routes/course.ts` dan mount ke app (`index.ts`):

```ts
import { Elysia, t } from "elysia";
import * as controller from "../controllers/course";

export const courseRoutes = new Elysia({ prefix: "/courses" })
  .get("/", async () => controller.list(), { detail: { tags: ["Course"] } })
  .post("/", async (context) => controller.create(context), {
    body: t.Object({ title: t.String(), description: t.Optional(t.String()) }),
    detail: { tags: ["Course"] },
  })
  .get("/:id", async (context) => controller.detail(context))
  .put("/:id", async (context) => controller.update(context))
  .delete("/:id", async (context) => controller.remove(context));
```

Kemudian di `src/index.ts` tambahkan:

```ts
import { courseRoutes } from "./routes/course";

// ... setelah mount authRoutes
.group("/api", (app) => app.use(authRoutes).use(courseRoutes))
```

5. Testing manual dengan `curl` atau Postman:

```bash
# create
curl -X POST http://localhost:3000/api/courses -H "Content-Type: application/json" -d '{"title":"Math 1","description":"Basic math"}'

# list
curl http://localhost:3000/api/courses

# detail
curl http://localhost:3000/api/courses/1

# update
curl -X PUT http://localhost:3000/api/courses/1 -H "Content-Type: application/json" -d '{"title":"Math A"}'

# delete
curl -X DELETE http://localhost:3000/api/courses/1
```

---

Catatan:

- Pastikan `prisma` client sudah digenerate dan migrasi sudah diterapkan.
- Gunakan `services` untuk logic yang lebih kompleks (validasi tambahan, event publishing, dsb.).

Jika mau, saya bisa langsung scaffold file `courseService.ts`, `controllers/course.ts`, dan `routes/course.ts` untukmu.
