import User from "../models/user";
import bcrypt from 'bcrypt';

const hashPassword = (password, salt = 12) => bcrypt.hash(password, salt);

export default async function seedUser() {
  await User.deleteMany({});

  await User.create({
    username: "filipasenra",
    email: "filipa@gmail.com",
    passwordDigest: await hashPassword("123456789"),
  });

  await User.create({
    username: "admin",
    email: "admin@gmail.com",
    passwordDigest: await hashPassword("123456789"),
    isAdmin: true
  });
}
