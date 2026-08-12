import type { Context } from "elysia";
import { registerUser, authenticateUser } from "../services/authService";

export const register = async ({ body, set }: any) => {
  const { email, password, name, role } = body;

  const res = await registerUser({ email, password, name, role });

  if (!res.success) {
    set.status = res.message === "Email already registered" ? 400 : 500;
    return { success: false, message: res.message };
  }

  return {
    success: true,
    message: "User registered successfully",
    user: res.user,
  };
};

export const login = async ({ body, jwt, set }: any) => {
  const { email, password } = body;

  const res = await authenticateUser({ email, password });

  if (!res.success) {
    set.status = 401;
    return { success: false, message: res.message };
  }

  const token = await jwt.sign({ id: res.user.id, role: res.user.role });

  return {
    success: true,
    message: "Login successful",
    token,
    user: res.user,
  };
};
