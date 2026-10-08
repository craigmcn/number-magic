import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ErrorHandler from "./ErrorHandler";

const error = new Error("Test error message");

describe("ErrorHandler", () => {
  it("renders with content", () => {
    render(<ErrorHandler error={error} resetErrorBoundary={vi.fn()} />);

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("An error occurred")).toBeDefined();
    expect(screen.getByText(error.message)).toBeDefined(); // from error object
  });

  it("calls resetErrorBoundary from Start over", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(<ErrorHandler error={error} resetErrorBoundary={reset} />);

    await user.click(screen.getByRole("button", { name: "Start over" }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
