import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

dotenv.config();
const hour = 60 * 60;
const day = 24 * hour;

const secret = process.env.TOKEN_SECRET || "";

export function generateToken(user_id: string): string {
  const token = jwt.sign(
    {
      data: { user_id },
    },
    secret,
    { expiresIn: 3 * day }
  );
  return token;
}

export function decryptToken(token: string): any {
  const decoded = jwt.verify(token, secret);
  return decoded;
}

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  plainText: string,
  hashedPassword: string
): Promise<boolean> {
  const isSame = await bcrypt.compare(plainText, hashedPassword);
  return isSame;
}
