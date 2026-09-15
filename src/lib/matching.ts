import { SCHEMES, Scheme, Category, Stage, Sector, LocationType } from "../data/schemes";

export interface UserProfile {
  categories: Category[];
  stage: Exclude<Stage, "any">;
  sector: Exclude<Sector, "any">;
  location: Exclude<LocationType, "any">;
  fundingMin: number;
  fundingMax: number;
  businessName?: string;
}

export interface ScoredScheme {
  scheme: Scheme;
  score: number;
  reasons: string[];
}

function categoryScore(user: Category[], scheme: Scheme): { score: number; reason: string } {
  const meaningfulUser = user.filter((c) => c !== "general");
  const schemeOpen = scheme.categories.includes("general");
  const matched = meaningfulUser.filter((c) => scheme.categories.includes(c));

  if (matched.length > 0) {
    if (!schemeOpen) {
      return { score: 1, reason: "Specifically targets your community" };
    }
    return { score: 0.8, reason: "Open scheme with priority for your category" };
  }
  if (meaningfulUser.length === 0) {
    return schemeOpen
      ? { score: 0.75, reason: "Open to all entrepreneurs" }
      : { score: 0.25, reason: "Targeted scheme — limited fit" };
  }
  return schemeOpen
    ? { score: 0.45, reason: "Open scheme, no special targeting for you" }
    : { score: 0.1, reason: "Targets a different community" };
}

function listScore<T extends string>(userVal: T, list: T[]): number {
  if (list.includes(userVal)) return 1;
  if ((list as string[]).includes("any")) return 1;
  return 0.3;
}

function fundingScore(userMin: number, userMax: number, scheme: Scheme): number {
  const overlap = Math.min(userMax, scheme.loanMax) - Math.max(userMin, scheme.loanMin);
  if (overlap > 0) return 1;
  const gap =
    userMax < scheme.loanMin ? scheme.loanMin - userMax : userMin - scheme.loanMax;
  return Math.max(0.15, 1 - gap / 40);
}

export function computeMatches(profile: UserProfile): ScoredScheme[] {
  const results: ScoredScheme[] = SCHEMES.map((scheme) => {
    const cat = categoryScore(profile.categories, scheme);
    const stageS = listScore(profile.stage, scheme.stages);
    const sectorS = listScore(profile.sector, scheme.sectors);
    const locS = listScore(profile.location, scheme.locations);
    const fundS = fundingScore(profile.fundingMin, profile.fundingMax, scheme);

    const total =
      cat.score * 0.35 + stageS * 0.15 + sectorS * 0.15 + locS * 0.1 + fundS * 0.25;

    const reasons: string[] = [cat.reason];
    if (stageS === 1) reasons.push("Matches your business stage");
    if (sectorS === 1) reasons.push("Fits your business sector");
    if (fundS === 1) reasons.push("Funding range matches your need");
    if (locS === 1) reasons.push("Available in your location type");

    return {
      scheme,
      score: Math.round(Math.min(0.98, Math.max(0.04, total)) * 100),
      reasons,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
