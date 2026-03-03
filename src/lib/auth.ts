import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
// In production this MUST come from an environment variable.
// We default to a development-only fallback to keep the demo self-contained.
const JWT_SECRET = process.env.JWT_SECRET ?? "flenSchool_dev_secret_change_in_prod_!x9";
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 10;
export const AUTH_COOKIE_NAME = "flen_auth_token";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "parent" | "teacher";
  year?: 10 | 11;
  createdAt: string;
}

export interface JWTPayload {
  sub: string; // user id
  email: string;
  name: string;
  role: StoredUser["role"];
  iat?: number;
  exp?: number;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: StoredUser["role"];
  year?: 10 | 11;
}

// ---------------------------------------------------------------------------
// In-memory user store (replace with a database in production)
// ---------------------------------------------------------------------------
// Pre-seeded demo accounts so the app works out of the box.
const DEMO_USERS_SEED: Omit<StoredUser, "passwordHash">[] = [
  {
    id: "u1",
    name: "Alex",
    email: "alex@demo.com",
    role: "student",
    year: 10,
    createdAt: "2025-09-01T08:00:00Z",
  },
  {
    id: "u2",
    name: "Parent Demo",
    email: "parent@demo.com",
    role: "parent",
    createdAt: "2025-09-01T08:00:00Z",
  },
  {
    id: "u3",
    name: "Teacher Demo",
    email: "teacher@demo.com",
    role: "teacher",
    createdAt: "2025-09-01T08:00:00Z",
  },
];

// Store is initialised lazily so we can await the bcrypt hashes.
let _store: StoredUser[] | null = null;

async function getStore(): Promise<StoredUser[]> {
  if (_store) return _store;
  // Hash the demo passwords on first access.
  _store = await Promise.all(
    DEMO_USERS_SEED.map(async (u) => ({
      ...u,
      // Demo password for every seed account: "demo1234"
      passwordHash: await bcrypt.hash("demo1234", SALT_ROUNDS),
    }))
  );
  return _store;
}

// ---------------------------------------------------------------------------
// User CRUD helpers
// ---------------------------------------------------------------------------
export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  const store = await getStore();
  return store.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<StoredUser | undefined> {
  const store = await getStore();
  return store.find((u) => u.id === id);
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: StoredUser["role"] = "student",
  year?: 10 | 11
): Promise<StoredUser> {
  const store = await getStore();
  const existing = store.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error("EMAIL_TAKEN");
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user: StoredUser = {
    id: `u${Date.now()}`,
    name,
    email: email.toLowerCase(),
    passwordHash,
    role,
    year,
    createdAt: new Date().toISOString(),
  };
  store.push(user);
  return user;
}

export function toPublicUser(user: StoredUser): PublicUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role, year: user.year };
}

// ---------------------------------------------------------------------------
// Password helpers
// ---------------------------------------------------------------------------
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ---------------------------------------------------------------------------
// JWT helpers
// ---------------------------------------------------------------------------
export function signToken(user: StoredUser): string {
  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Input validation
// ---------------------------------------------------------------------------
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): { ok: boolean; message: string } {
  if (password.length < 8) return { ok: false, message: "Password must be at least 8 characters." };
  return { ok: true, message: "" };
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}
