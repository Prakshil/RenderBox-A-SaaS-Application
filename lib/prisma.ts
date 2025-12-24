import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __renderbox_pool: pg.Pool | undefined;
  // eslint-disable-next-line no-var
  var __renderbox_prisma: PrismaClient | undefined;
}

function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL;
}

export function getPrisma(): PrismaClient {
  if (globalThis.__renderbox_prisma) return globalThis.__renderbox_prisma;

  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool =
    globalThis.__renderbox_pool ??
    new pg.Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });

  globalThis.__renderbox_pool = pool;

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  globalThis.__renderbox_prisma = prisma;
  return prisma;
}
