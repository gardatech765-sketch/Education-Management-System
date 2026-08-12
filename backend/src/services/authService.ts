import prisma from "../prisma/client";

export const registerUser = async ({ email, password, name, role }: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { success: false, message: "Email already registered" };
  }

  const hashedPassword = await Bun.password.hash(password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "STUDENT",
      },
    });

    if (user.role === "TUTOR") {
      await prisma.tutorProfile.create({ data: { userId: user.id } });
    } else if (user.role === "STUDENT") {
      await prisma.studentProfile.create({ data: { userId: user.id } });
    } else if (user.role === "PARENT") {
      await prisma.parentProfile.create({ data: { userId: user.id } });
    }

    const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role };

    return { success: true, user: safeUser };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

export const authenticateUser = async ({ email, password }: any) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  const isMatch = await Bun.password.verify(password, user.password);

  if (!isMatch) {
    return { success: false, message: "Invalid email or password" };
  }

  const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role };

  return { success: true, user: safeUser };
};

export default { registerUser, authenticateUser };
