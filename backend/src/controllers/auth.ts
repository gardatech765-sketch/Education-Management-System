import prisma from "../prisma/client";
import type { Context } from "elysia";

export const register = async ({ body, set }: any) => {
  const { email, password, name, role } = body;
  
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    set.status = 400;
    return { success: false, message: "Email already registered" };
  }

  // Hash password using Bun's built-in hashing
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

    // Create profile based on role
    if (user.role === "TUTOR") {
      await prisma.tutorProfile.create({ data: { userId: user.id } });
    } else if (user.role === "STUDENT") {
      await prisma.studentProfile.create({ data: { userId: user.id } });
    } else if (user.role === "PARENT") {
      await prisma.parentProfile.create({ data: { userId: user.id } });
    }

    return {
      success: true,
      message: "User registered successfully",
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    };
  } catch (error) {
    set.status = 500;
    return { success: false, message: "Internal server error" };
  }
};

export const login = async ({ body, jwt, set }: any) => {
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    set.status = 401;
    return { success: false, message: "Invalid email or password" };
  }

  const isMatch = await Bun.password.verify(password, user.password);

  if (!isMatch) {
    set.status = 401;
    return { success: false, message: "Invalid email or password" };
  }

  // Generate JWT token
  const token = await jwt.sign({
    id: user.id,
    role: user.role,
  });

  return {
    success: true,
    message: "Login successful",
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  };
};
