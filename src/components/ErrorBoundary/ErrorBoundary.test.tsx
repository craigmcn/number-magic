import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ErrorBoundary from "./ErrorBoundary";

let shouldThrow = false;

function Flaky() {
  if (shouldThrow) throw new Error("Boom");
  return <div>Recovered child</div>;
}

describe("ErrorBoundary", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders with children", () => {
    render(
      <ErrorBoundary>
        <div>Test error child</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Test error child")).toBeDefined();
  });

  it("shows the fallback, then recovers on Start over", async () => {
    // React logs caught errors; keep the test output clean.
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    const onReset = vi.fn();
    shouldThrow = true;

    render(
      <ErrorBoundary onReset={onReset}>
        <Flaky />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Boom");

    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: "Start over" }));

    expect(onReset).toHaveBeenCalledOnce();
    expect(screen.getByText("Recovered child")).toBeInTheDocument();
  });
});
