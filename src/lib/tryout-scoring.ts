import {
  TRYOUT_QUESTIONS,
  type QuestionCategory,
  type TryoutOption,
  type TryoutQuestion,
} from "@/data/tryout";

export type TryoutMode = "all" | QuestionCategory;

export interface TryoutScoreBreakdown {
  mode: TryoutMode;
  totalQuestions: number;
  answeredCount: number;
  twkScore: number;
  twkMax: number;
  tiuScore: number;
  tiuMax: number;
  tkpScore: number;
  tkpMax: number;
  totalScore: number;
  totalMax: number;
  projectedTwk: number;
  projectedTiu: number;
  projectedTkp: number;
  passedPassingGrade: boolean;
  details: Array<{
    questionId: string;
    selectedLabel: TryoutOption["label"] | null;
    earnedScore: number;
    maxScore: number;
    bestLabel: TryoutOption["label"];
  }>;
}

export function getQuestionsForMode(mode: TryoutMode): TryoutQuestion[] {
  if (mode === "all") return TRYOUT_QUESTIONS;
  return TRYOUT_QUESTIONS.filter((q) => q.category === mode);
}

export function gradeTryoutAnswers(
  mode: TryoutMode,
  answers: Record<string, string>
): TryoutScoreBreakdown {
  const questions = getQuestionsForMode(mode);
  let twkScore = 0;
  let twkMax = 0;
  let tiuScore = 0;
  let tiuMax = 0;
  let tkpScore = 0;
  let tkpMax = 0;
  let answeredCount = 0;

  const details: TryoutScoreBreakdown["details"] = [];

  for (const q of questions) {
    const selectedRaw = answers[q.id];
    const selectedOpt = q.options.find((opt) => opt.label === selectedRaw) ?? null;
    if (selectedOpt) answeredCount++;

    let bestOpt = q.options[0];
    for (const opt of q.options) {
      if (opt.score > bestOpt.score) bestOpt = opt;
    }

    const earned = selectedOpt ? selectedOpt.score : 0;
    const maxScore = bestOpt.score;

    if (q.category === "TWK") {
      twkScore += earned;
      twkMax += maxScore;
    } else if (q.category === "TIU") {
      tiuScore += earned;
      tiuMax += maxScore;
    } else {
      tkpScore += earned;
      tkpMax += maxScore;
    }

    details.push({
      questionId: q.id,
      selectedLabel: selectedOpt ? selectedOpt.label : null,
      earnedScore: earned,
      maxScore,
      bestLabel: bestOpt.label,
    });
  }

  // Project onto official SKD full scale (TWK 150, TIU 175, TKP 225)
  const projectedTwk = twkMax > 0 ? Math.round((twkScore / twkMax) * 150) : 0;
  const projectedTiu = tiuMax > 0 ? Math.round((tiuScore / tiuMax) * 175) : 0;
  const projectedTkp = tkpMax > 0 ? Math.round((tkpScore / tkpMax) * 225) : 0;

  const passedTwk = twkMax === 0 || projectedTwk >= 65;
  const passedTiu = tiuMax === 0 || projectedTiu >= 80;
  const passedTkp = tkpMax === 0 || projectedTkp >= 166;

  return {
    mode,
    totalQuestions: questions.length,
    answeredCount,
    twkScore,
    twkMax,
    tiuScore,
    tiuMax,
    tkpScore,
    tkpMax,
    totalScore: twkScore + tiuScore + tkpScore,
    totalMax: twkMax + tiuMax + tkpMax,
    projectedTwk,
    projectedTiu,
    projectedTkp,
    passedPassingGrade: passedTwk && passedTiu && passedTkp,
    details,
  };
}
