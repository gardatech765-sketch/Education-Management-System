import * as authService from "../services/authService";

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerHandler = async ({ body, set }: any) => {
  try {
    const user = await authService.register(body);
    set.status = 201;
    return { success: true, message: "Registrasi berhasil", data: user };
  } catch (e: any) {
    set.status = e.message === "Email sudah terdaftar" ? 409 : 400;
    return { success: false, message: e.message };
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginHandler = async ({ body, jwt, request, set }: any) => {
  try {
    const ip_address =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      undefined;
    const user_agent = request.headers.get("user-agent") || undefined;

    const result = await authService.login(
      body,
      { ip_address, user_agent },
      jwt.sign.bind(jwt)
    );

    return { success: true, message: "Login berhasil", data: result };
  } catch (e: any) {
    set.status = 401;
    return { success: false, message: e.message };
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logoutHandler = async ({ headers, set }: any) => {
  try {
    const authorization = headers["authorization"] || "";
    const token = authorization.replace("Bearer ", "").trim();

    if (!token) {
      set.status = 400;
      return { success: false, message: "Token tidak ditemukan" };
    }

    await authService.logout(token);
    return { success: true, message: "Logout berhasil" };
  } catch (e: any) {
    set.status = 500;
    return { success: false, message: e.message };
  }
};

// ─── Get Me ───────────────────────────────────────────────────────────────────
export const getMeHandler = async ({ user, set }: any) => {
  try {
    const data = await authService.getMe(user.id);
    return { success: true, data };
  } catch (e: any) {
    set.status = 404;
    return { success: false, message: e.message };
  }
};
