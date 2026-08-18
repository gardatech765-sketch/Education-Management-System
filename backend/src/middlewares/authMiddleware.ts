import { jwtVerify } from "jose";
import prisma from "../prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_here";
const secret = new TextEncoder().encode(JWT_SECRET);

/**
 * Fungsi helper: verifikasi token dari header Authorization.
 * Dipakai langsung di dalam derive() di setiap route yang butuh auth.
 */
export const verifyToken = async (headers: Record<string, string | undefined>) => {
  try {
    const authorization = headers["authorization"];
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return null;
    }

    const token = authorization.slice(7).trim();

    // Verifikasi signature JWT
    const { payload } = await jwtVerify(token, secret);

    // Cek session di DB: harus aktif dan belum expired
    const session = await prisma.userSession.findFirst({
      where: {
        token_jwt: token,
        is_active: true,
        OR: [
          { expired_at: null },
          { expired_at: { gt: new Date() } },
        ],
      },
    });

    if (!session) return null;

    // Update last_active
    await prisma.userSession.update({
      where: { id: session.id },
      data: { last_active: new Date() },
    });

    return payload as Record<string, any>;
  } catch {
    return null;
  }
};
