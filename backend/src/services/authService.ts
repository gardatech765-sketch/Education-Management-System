import prisma from "../prisma/client";
import bcrypt from "bcryptjs";

// ─── Register ─────────────────────────────────────────────────────────────────
export const register = async (data: {
  email: string;
  password: string;
  role_id: string;
}) => {
  // Cek apakah email sudah terdaftar
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error("Email sudah terdaftar");
  }

  // Cek apakah role_id valid
  const role = await prisma.role.findUnique({ where: { id: data.role_id } });
  if (!role) {
    throw new Error("Role tidak ditemukan");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Buat user baru — is_verified langsung true untuk tahap dev
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role_id: data.role_id,
      is_verified: true,
    },
    select: {
      id: true,
      email: true,
      is_verified: true,
      is_active: true,
      created_at: true,
      role: { select: { id: true, nama_role: true } },
    },
  });

  return user;
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = async (
  data: { email: string; password: string },
  meta: { ip_address?: string; user_agent?: string; device_id?: string },
  signFn: (payload: Record<string, unknown>) => Promise<string>
) => {
  // Cari user beserta role-nya
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: { role: { select: { id: true, nama_role: true } } },
  });

  if (!user) throw new Error("Email atau password salah");
  if (!user.is_active) throw new Error("Akun tidak aktif");
  if (!user.is_verified) throw new Error("Akun belum diverifikasi");

  // Verifikasi password
  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Email atau password salah");

  // Generate JWT
  const token = await signFn({
    id: user.id,
    email: user.email,
    role: user.role.nama_role,
    role_id: user.role_id,
  });

  // Simpan session ke DB
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
  await prisma.userSession.create({
    data: {
      user_id: user.id,
      token_jwt: token,
      ip_address: meta.ip_address,
      user_agent: meta.user_agent,
      device_id: meta.device_id,
      expired_at: expiredAt,
      last_active: new Date(),
    },
  });

  // Update last_login
  await prisma.user.update({
    where: { id: user.id },
    data: { last_login: new Date() },
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role.nama_role,
    },
  };
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logout = async (token: string) => {
  // Invalidasi session berdasarkan token
  await prisma.userSession.updateMany({
    where: { token_jwt: token, is_active: true },
    data: { is_active: false },
  });
};

// ─── Get Me ───────────────────────────────────────────────────────────────────
export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      is_verified: true,
      is_active: true,
      last_login: true,
      created_at: true,
      role: { select: { id: true, nama_role: true, deskripsi: true } },
    },
  });

  if (!user) throw new Error("User tidak ditemukan");
  return user;
};
