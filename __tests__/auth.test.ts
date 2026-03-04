import {
  validateEmail,
  validatePassword,
  validateName,
  signToken,
  verifyToken,
  findUserByEmail,
  createUser,
  toPublicUser,
  verifyPassword,
} from "../src/lib/auth";

describe("validateEmail", () => {
  it("accepts a valid email", () => {
    expect(validateEmail("student@school.ac.uk")).toBe(true);
    expect(validateEmail("alex+test@demo.com")).toBe(true);
  });

  it("rejects emails without @ or domain", () => {
    expect(validateEmail("notanemail")).toBe(false);
    expect(validateEmail("missing@")).toBe(false);
    expect(validateEmail("@nodomain.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validateEmail("")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("rejects passwords shorter than 8 characters", () => {
    expect(validatePassword("short").ok).toBe(false);
    expect(validatePassword("1234567").ok).toBe(false);
  });

  it("accepts passwords of 8 or more characters", () => {
    expect(validatePassword("longpass").ok).toBe(true);
    expect(validatePassword("a-very-secure-password!").ok).toBe(true);
  });

  it("returns a helpful error message for short passwords", () => {
    const result = validatePassword("abc");
    expect(result.message).toContain("8 characters");
  });
});

describe("validateName", () => {
  it("accepts names with 2 or more characters", () => {
    expect(validateName("Al")).toBe(true);
    expect(validateName("Alexander")).toBe(true);
  });

  it("rejects names shorter than 2 characters (after trim)", () => {
    expect(validateName("A")).toBe(false);
    expect(validateName(" ")).toBe(false);
    expect(validateName("")).toBe(false);
  });
});

describe("signToken / verifyToken", () => {
  const mockUser = {
    id: "u-test-1",
    name: "Test Student",
    email: "test@demo.com",
    passwordHash: "hashed",
    role: "student" as const,
    year: 10 as const,
    createdAt: new Date().toISOString(),
  };

  it("signs a token and verifies it successfully", () => {
    const token = signToken(mockUser);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3); // valid JWT has 3 parts

    const payload = verifyToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.sub).toBe(mockUser.id);
    expect(payload?.email).toBe(mockUser.email);
    expect(payload?.name).toBe(mockUser.name);
    expect(payload?.role).toBe(mockUser.role);
  });

  it("returns null for an invalid token", () => {
    expect(verifyToken("not.a.valid.token")).toBeNull();
    expect(verifyToken("")).toBeNull();
  });

  it("returns null for a tampered token", () => {
    const token = signToken(mockUser);
    const tampered = token.slice(0, -5) + "XXXXX";
    expect(verifyToken(tampered)).toBeNull();
  });
});

describe("findUserByEmail", () => {
  it("finds the seeded demo student by email (case-insensitive)", async () => {
    const user = await findUserByEmail("alex@demo.com");
    expect(user).toBeDefined();
    expect(user?.name).toBe("Alex");
    expect(user?.role).toBe("student");
  });

  it("finds the seeded demo parent by email", async () => {
    const user = await findUserByEmail("PARENT@DEMO.COM");
    expect(user).toBeDefined();
    expect(user?.role).toBe("parent");
  });

  it("returns undefined for an unknown email", async () => {
    const user = await findUserByEmail("nobody@nowhere.com");
    expect(user).toBeUndefined();
  });
});

describe("verifyPassword", () => {
  it("verifies the correct demo password", async () => {
    const user = await findUserByEmail("alex@demo.com");
    expect(user).toBeDefined();
    const valid = await verifyPassword("demo1234", user!.passwordHash);
    expect(valid).toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const user = await findUserByEmail("alex@demo.com");
    expect(user).toBeDefined();
    const valid = await verifyPassword("wrongpassword", user!.passwordHash);
    expect(valid).toBe(false);
  });
});

describe("createUser", () => {
  const unique = `testuser_${Date.now()}@test.com`;

  it("creates a new user and returns it", async () => {
    const user = await createUser("New User", unique, "securepass123", "student", 11);
    expect(user.name).toBe("New User");
    expect(user.email).toBe(unique.toLowerCase());
    expect(user.role).toBe("student");
    expect(user.year).toBe(11);
    expect(user.id).toBeTruthy();
    expect(user.passwordHash).not.toBe("securepass123"); // must be hashed
  });

  it("throws EMAIL_TAKEN if email already registered", async () => {
    await expect(
      createUser("Duplicate", unique, "anotherpass1", "student")
    ).rejects.toThrow("EMAIL_TAKEN");
  });
});

describe("toPublicUser", () => {
  it("strips the passwordHash from the user object", () => {
    const user = {
      id: "u1",
      name: "Alex",
      email: "alex@demo.com",
      passwordHash: "secret_hash",
      role: "student" as const,
      year: 10 as const,
      createdAt: new Date().toISOString(),
    };
    const pub = toPublicUser(user);
    expect(pub).not.toHaveProperty("passwordHash");
    expect(pub.id).toBe("u1");
    expect(pub.name).toBe("Alex");
    expect(pub.email).toBe("alex@demo.com");
    expect(pub.role).toBe("student");
    expect(pub.year).toBe(10);
  });
});
