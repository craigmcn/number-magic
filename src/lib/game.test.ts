import { describe, expect, it } from "vitest";
import { type GameState, gameReducer, initialGameState } from "./game";

const deck = [[1], [2], [4]];

const play = (...answers: boolean[]) =>
  answers.reduce<GameState>(
    (state, isYes) =>
      gameReducer(gameReducer(state, { type: "answer", isYes }), {
        type: "advance",
      }),
    gameReducer(initialGameState, { type: "start", deck }),
  );

describe("gameReducer", () => {
  it("starts on the first card of the deck", () => {
    expect(gameReducer(initialGameState, { type: "start", deck })).toEqual({
      phase: "card",
      current: [1],
      remaining: [[2], [4]],
      yesCards: [],
    });
  });

  it("ignores a start with an empty deck", () => {
    expect(gameReducer(initialGameState, { type: "start", deck: [] })).toBe(
      initialGameState,
    );
  });

  it("records a yes answer and waits for the transition", () => {
    const state = gameReducer(play(), { type: "answer", isYes: true });

    expect(state).toMatchObject({ phase: "transitioning", yesCards: [[1]] });
  });

  it("ignores answers during a transition", () => {
    const transitioning = gameReducer(play(), { type: "answer", isYes: true });

    expect(gameReducer(transitioning, { type: "answer", isYes: true })).toBe(
      transitioning,
    );
  });

  it("moves to the next card after the transition", () => {
    expect(play(false)).toMatchObject({
      phase: "card",
      current: [2],
      remaining: [[4]],
      yesCards: [],
    });
  });

  it("ends with the yes cards after the last card", () => {
    expect(play(true, false, true)).toEqual({
      phase: "result",
      yesCards: [[1], [4]],
    });
  });

  it("ignores an advance outside a transition", () => {
    const state = play();

    expect(gameReducer(state, { type: "advance" })).toBe(state);
  });

  it("resets to the start screen from any phase", () => {
    expect(gameReducer(play(true, true, true), { type: "reset" })).toBe(
      initialGameState,
    );
  });
});
