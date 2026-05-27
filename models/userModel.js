const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const bcrypt = require("bcryptjs");

const dbUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10) || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1)
});

const prisma = new PrismaClient({ adapter });

const createUser = async (user) => {
  const hash = await bcrypt.hash(user.password, 10);
  return prisma.user.create({
    data: {
      username: user.username,
      password: hash,
    }
  });
};

const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username: username },
  });
};

module.exports = {
  createUser,
  findUserByUsername,
};