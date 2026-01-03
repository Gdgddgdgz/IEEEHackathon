// Utility for semantic and fuzzy answer matching
import stringSimilarity from 'string-similarity';

/**
 * Checks if the user answer matches any acceptable answer semantically or exactly.
 * @param userAnswer User's input (string)
 * @param acceptable Array of acceptable answers (strings)
 * @param threshold Similarity threshold (0-1, default 0.7)
 * @returns { isMatch: boolean, isExact: boolean, bestMatch: string, suggestions: string[] }
 */
export function validateAnswer(userAnswer: string, acceptable: string[], threshold = 0.7) {
  const cleaned = userAnswer.trim().toLowerCase();
  const normalized = acceptable.map(a => a.trim().toLowerCase());
  const isExact = normalized.includes(cleaned);
  if (isExact) return { isMatch: true, isExact: true, bestMatch: cleaned, suggestions: [] };

  const { bestMatch, ratings } = stringSimilarity.findBestMatch(cleaned, normalized);
  const isMatch = bestMatch.rating >= threshold;
  const suggestions = ratings
    .filter(r => r.rating >= threshold && r.target !== bestMatch.target)
    .map(r => r.target);
  return { isMatch, isExact: false, bestMatch: bestMatch.target, suggestions };
}
