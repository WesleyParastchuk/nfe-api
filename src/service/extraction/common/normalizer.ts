// Sempre CAPSLOCK para facilitar a normalização
const unitMapping = {
  KG: ["KG"],
  UN: ["UN"],
};

export function normalizeUnit(input: string): string {
  const normalized = input.trim().toUpperCase();
  for (const [key, aliases] of Object.entries(unitMapping)) {
    if (aliases.includes(normalized)) return key;
  }
  return "";
}
