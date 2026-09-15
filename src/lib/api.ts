import type { UserProfile, ScoredScheme } from "./matching";
import type { StudentProfile, ScoredScholarship } from "./scholarshipMatching";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function postMatch<T>(path: string, profile: unknown): Promise<T[]> {
  if (!API_URL) throw new Error("VITE_API_URL is not configured");
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.success || !Array.isArray(data?.matches)) {
    throw new Error(data?.message || `API request failed (${response.status})`);
  }
  return data.matches as T[];
}

export function fetchEntrepreneurMatches(profile: UserProfile) {
  return postMatch<ScoredScheme>("/api/match", profile);
}

export function fetchScholarshipMatches(profile: StudentProfile) {
  return postMatch<ScoredScholarship>("/api/scholarships/match", profile);
}

export { API_URL };
