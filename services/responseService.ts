import { AttackResult } from "../types";
import { POOR_RESPONSES, RICH_RESPONSES, WHALE_RESPONSES } from "../constants";

// Helper to pick random item
const pick = (arr: AttackResult[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateGoddessAttack = async (
  actionContext: string
): Promise<AttackResult> => {
  
  // Simulate a short "thinking" delay for game rhythm (0.6s)
  // This makes the "Charging" animation visible but feels snappy
  await new Promise(resolve => setTimeout(resolve, 600));

  // Logic based on keywords in the context key
  // We matched these keys in constants.ts
  
  // 1. HIGH TIER (Hermes)
  if (actionContext.includes("hermes")) {
    // 80% chance of good response, 20% still mean
    if (Math.random() > 0.2) return pick(WHALE_RESPONSES);
    return pick(RICH_RESPONSES);
  }

  // 2. MID TIER (Car, 520)
  if (actionContext.includes("car") || actionContext.includes("520")) {
    // 50% chance of mid response, 50% still poor/mean
    if (Math.random() > 0.5) return pick(RICH_RESPONSES);
    return pick(POOR_RESPONSES);
  }

  // 3. LOW TIER (Default)
  return pick(POOR_RESPONSES);
};

