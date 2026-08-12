import prisma from "../prisma/client";


//  tambah data course baru
export const createCourse = async (data:{
    title: string;
    description?: string;
}) => {
    return prisma.course.create({ data });
};


//  mendapatkan semua data course
export const getCourses = async () => {
    return prisma.course.findMany();
};


// mendapatkan data corse berdasarkan id
export const getCourseById = async (id: number) => {
    return prisma.course.findUnique({ where: { id } });
};


//  mengupdate data course berdasarkan id
export const updateCourse = async (
    id : number,
    data: { title?: string; description?: string },
) => {
    return prisma.course.update ({ where: { id }, data});
};


// menghapus data course berdasarkan id
export const deleteCourse = async (id: number) => {
    return prisma.course.delete ({ where: { id}})
}




export default {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};

