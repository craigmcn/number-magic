import { useLocalStorage } from "usehooks-ts";

// Namespaced because every app on craigmcn.com shares one origin, and so one localStorage.
export const MAGIC_MODE_KEY = "number-magic:magic";
const LEGACY_MANUAL_KEY = "manual";

// The old un-namespaced key stored the inverse ("manual"), so carry an existing choice over.
function readLegacyDefault(): boolean {
  try {
    return localStorage.getItem(LEGACY_MANUAL_KEY) !== "true";
  } catch {
    return true;
  }
}

export function useMagicMode() {
  return useLocalStorage<boolean>(MAGIC_MODE_KEY, readLegacyDefault);
}
