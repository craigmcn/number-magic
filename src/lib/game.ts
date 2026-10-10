export type GameState =
  | { phase: "start" }
  | {
      phase: "card" | "transitioning";
      current: number[];
      remaining: number[][];
      yesCards: number[][];
    }
  | { phase: "result"; yesCards: number[][] };

export type GameAction =
  | { type: "start"; deck: number[][] }
  | { type: "answer"; isYes: boolean }
  | { type: "advance" }
  | { type: "reset" };

export const initialGameState: GameState = { phase: "start" };

// Actions that don't fit the current phase return the same state, so a stray click or a
// timer firing late is a no-op rather than a corrupted game.
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "start": {
      const [current, ...remaining] = action.deck;
      if (state.phase !== "start" || !current) return state;
      return { phase: "card", current, remaining, yesCards: [] };
    }

    case "answer":
      if (state.phase !== "card") return state;
      return {
        ...state,
        phase: "transitioning",
        yesCards: action.isYes
          ? [...state.yesCards, state.current]
          : state.yesCards,
      };

    case "advance": {
      if (state.phase !== "transitioning") return state;
      const [current, ...remaining] = state.remaining;
      if (!current) return { phase: "result", yesCards: state.yesCards };
      return { ...state, phase: "card", current, remaining };
    }

    case "reset":
      return initialGameState;
  }
}

// Sorting by random keys is an unbiased shuffle and needs no index juggling.
export const shuffle = <T>(array: readonly T[]): T[] =>
  array
    .map((value) => ({ value, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ value }) => value);
