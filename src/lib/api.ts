import type { UserProfile, ScoredScheme } from "./matching";
import type { StudentProfile, ScoredScholarship } from "./scholarshipMatching";

export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const TOKEN_KEY = "udaan_token";

function token() {
  return localStorage.getItem(TOKEN_KEY);
}

async function request(path: string, init: RequestInit = {}) {
  if (!API_URL) throw new Error("VITE_API_URL is not configured");
  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");
  const t = token();
  if (t) headers.set("Authorization", `Bearer ${t}`);

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || `API request failed (${response.status})`);
  }
  return data;
}

async function postMatch<T>(path: string, profile: unknown): Promise<T[]> {
  const data = await request(path, {
    method: "POST",
    body: JSON.stringify({ profile, saveProfile: Boolean(token()) }),
  });
  if (!Array.isArray(data?.matches)) throw new Error("Invalid match response");
  return data.matches as T[];
}

export function fetchEntrepreneurMatches(profile: UserProfile) {
  return postMatch<ScoredScheme>("/api/match", profile);
}

export function fetchScholarshipMatches(profile: StudentProfile) {
  return postMatch<ScoredScholarship>("/api/scholarships/match", profile);
}

export async function saveScheme(frontendId: string, status = "saved") {
  return request("/api/applications", {
    method: "POST",
    body: JSON.stringify({ frontendId, status }),
  });
}

export async function saveScholarship(frontendId: string, status = "saved") {
  return request("/api/scholarship-applications", {
    method: "POST",
    body: JSON.stringify({ frontendId, status }),
  });
}

export async function fetchAccountDashboard() {
  const [profile, history, applications, scholarshipApplications] = await Promise.all([
    request("/api/profile"),
    request("/api/match/history"),
    request("/api/applications"),
    request("/api/scholarship-applications"),
  ]);

  return {
    profile: profile?.profile || null,
    history: history?.history || [],
    applications: applications?.applications || [],
    scholarshipApplications: scholarshipApplications?.applications || [],
  };
}

export async function saveProfile(type: "entrepreneur" | "student", profile: unknown) {
  return request("/api/profile", {
    method: "POST",
    body: JSON.stringify({ type, profile }),
  });
}
