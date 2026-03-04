"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, GraduationCap } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "parent" | "teacher">("student");
  const [year, setYear] = useState<"10" | "11" | "">("10");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, unknown> = { name, email, password, role };
      if (role === "student" && year) body.year = parseInt(year, 10);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registration failed.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (() => {
    if (!password) return null;
    if (password.length < 8) return { label: "Too short", color: "bg-red-400", width: "25%" };
    if (password.length < 10) return { label: "Weak", color: "bg-orange-400", width: "50%" };
    if (password.length < 12) return { label: "Good", color: "bg-yellow-400", width: "75%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  })();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-black">Join FLENschool</h1>
            <p className="text-purple-200 text-sm mt-1">Create your free account to get started</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-sm text-red-700" role="alert">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:border-purple-400 focus:ring-0 outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:border-purple-400 focus:ring-0 outline-none transition-colors"
                />
              </div>

              {/* Role */}
              <div>
                <span className="block text-sm font-semibold text-gray-700 mb-2">I am a…</span>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Account type">
                  {(["student", "parent", "teacher"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      role="radio"
                      aria-checked={role === r}
                      className={`py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all capitalize ${
                        role === r
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {r === "student" ? "🎒 Student" : r === "parent" ? "👪 Parent" : "📋 Teacher"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year group (students only) */}
              {role === "student" && (
                <div>
                  <span className="block text-sm font-semibold text-gray-700 mb-2">Year group</span>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Year group">
                    {(["10", "11"] as const).map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => setYear(y)}
                        role="radio"
                        aria-checked={year === y}
                        className={`py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all ${
                          year === y
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Year {y}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm focus:border-purple-400 focus:ring-0 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Password strength indicator */}
                {passwordStrength && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{passwordStrength.label}</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className={`w-full border-2 rounded-2xl px-4 py-3 text-sm focus:ring-0 outline-none transition-colors ${
                    confirmPassword && confirmPassword !== password
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-purple-400"
                  }`}
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !name || !email || !password || !confirmPassword || password !== confirmPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl py-3.5 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Creating account..." />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" aria-hidden="true" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Your data is stored securely and never shared.
        </p>
      </div>
    </div>
  );
}
