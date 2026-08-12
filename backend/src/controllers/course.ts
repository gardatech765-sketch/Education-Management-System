import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../services/courseService";

export const create = async ({ body, set }: any) => {
    const course = await createCourse(body);
    return { success: true, course } ;
};


export const list = async () => {
    const course = await getCourses();
    return { success: true, course };
}

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
