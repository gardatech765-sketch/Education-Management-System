import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connectionString = process.env.DATABASE_URL || "mysql://fansya:Fansya123!@localhost:3306/ems";
const adapter = new PrismaMariaDb(connectionString);

const prisma = new PrismaClient({ adapter });

export default prisma;
