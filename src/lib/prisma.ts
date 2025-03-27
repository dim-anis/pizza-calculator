import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.DATABASE_URL}`,
  authToken: `${process.env.DATABASE_AUTH_TOKEN}`,
});

export const prisma = new PrismaClient({
  adapter: new PrismaLibSQL(libsql),
});
