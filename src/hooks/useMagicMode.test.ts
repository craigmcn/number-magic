import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MAGIC_MODE_KEY, useMagicMode } from "./useMagicMode";

describe("useMagicMode", () => {
  it("defaults to magic mode", () => {
    const { result } = renderHook(() => useMagicMode());

    expect(result.current[0]).toBe(true);
  });

  it("stores changes under the namespaced key", () => {
    const { result } = renderHook(() => useMagicMode());

    act(() => result.current[1](false));

    expect(result.current[0]).toBe(false);
    expect(localStorage.getItem(MAGIC_MODE_KEY)).toBe("false");
  });

  it("carries over a cards-mode choice from the old manual key", () => {
    localStorage.setItem("manual", "true");

    const { result } = renderHook(() => useMagicMode());

    expect(result.current[0]).toBe(false);
  });

  it("prefers the namespaced key over the old manual key", () => {
    localStorage.setItem("manual", "true");
    localStorage.setItem(MAGIC_MODE_KEY, "true");

    const { result } = renderHook(() => useMagicMode());

    expect(result.current[0]).toBe(true);
  });
});
