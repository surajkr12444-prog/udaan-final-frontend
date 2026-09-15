import {
  SCHOLARSHIPS,
  Scholarship,
  EducationLevel,
  StudentCategory,
  Gender,
} from "../data/scholarships";

export interface StudentProfile {
  studentName?: string;
  educationLevel: EducationLevel;
  category: StudentCategory;
  gender: Gender;
  familyIncome: number; // in Lakhs/yr
  marksPercentage: number; // e.g. 75
  isSingleGirlChild?: boolean;
  isDisability?: boolean;
}

export interface ScoredScholarship {
  scholarship: Scholarship;
  score: number;
  reasons: string[];
  eligible: boolean;
}

export function computeScholarshipMatches(profile: StudentProfile): ScoredScholarship[] {
  const results: ScoredScholarship[] = SCHOLARSHIPS.map((scholarship) => {
    const reasons: string[] = [];
    let score = 0;
    let eligible = true;

    // 1. Gender check
    if (scholarship.gender === "female") {
      if (profile.gender === "female") {
        score += 20;
        reasons.push("Dedicated scholarship for female scholars");
      } else {
        score = 0;
        eligible = false;
        reasons.push("Reserved exclusively for female candidates");
        return { scholarship, score: 5, reasons, eligible: false };
      }
    } else {
      score += 15;
    }

    // 2. Education level check
    if (scholarship.educationLevels.includes(profile.educationLevel)) {
      score += 30;
      reasons.push("Matches your current academic stage");
    } else {
      score += 5;
      reasons.push("Intended for a different education level");
      eligible = false;
    }

    // 3. Category match
    const isCategoryMatch =
      scholarship.categories.includes(profile.category) ||
      (profile.category === "general" && scholarship.categories.includes("general")) ||
      (profile.isSingleGirlChild && scholarship.categories.includes("girl_child")) ||
      (profile.isDisability && scholarship.categories.includes("disability"));

    if (isCategoryMatch) {
      score += 25;
      reasons.push("Matches your reservation / social eligibility criteria");
    } else if (scholarship.categories.includes("general")) {
      score += 15;
      reasons.push("Open to all categories meeting academic & income criteria");
    } else {
      score += 5;
      reasons.push("Targeted for another category, but review for special clauses");
    }

    // 4. Family Income Check
    if (profile.familyIncome <= scholarship.maxAnnualIncome) {
      score += 15;
      if (scholarship.maxAnnualIncome < 90) {
        reasons.push(`Family income (₹${profile.familyIncome}L) is well within the ₹${scholarship.maxAnnualIncome}L ceiling`);
      } else {
        reasons.push("No family income ceiling restriction");
      }
    } else {
      score = Math.max(10, score - 20);
      reasons.push(`Family income exceeds ₹${scholarship.maxAnnualIncome} Lakh annual ceiling`);
      eligible = false;
    }

    // 5. Academic Marks check
    if (profile.marksPercentage >= scholarship.minPercentage) {
      score += 10;
      reasons.push(`Your academic score (${profile.marksPercentage}%) exceeds required cut-off (${scholarship.minPercentage}%)`);
    } else {
      score = Math.max(10, score - 15);
      reasons.push(`Requires minimum ${scholarship.minPercentage}% in qualifying examination`);
    }

    // Bound score between 5 and 99
    const finalScore = Math.min(99, Math.max(10, Math.round(score)));

    return {
      scholarship,
      score: finalScore,
      reasons,
      eligible,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
