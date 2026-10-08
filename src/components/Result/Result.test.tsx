import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MAGIC_MODE_KEY } from "../../hooks";
import Result from "./Result";

const result = [[1], [2], [3]];
const handleAgain = vi.fn();

const setMagicMode = (isMagic: boolean) =>
  localStorage.setItem(MAGIC_MODE_KEY, JSON.stringify(isMagic));

describe("Result", () => {
  it.each([true, false])(
    "explains an all-no answer (magic mode: %s)",
    (isMagic) => {
      setMagicMode(isMagic);
      render(<Result result={[]} handleAgain={handleAgain} />);

      expect(
        screen.getByRole("heading", {
          name: "Your number wasn’t on any card",
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("Was it between 1 and 63?")).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Your number is" }),
      ).toBeNull();
      expect(
        screen.getByRole("button", { name: "Play again" }),
      ).toBeInTheDocument();
    },
  );

  it("reveals the number in magic mode by default", () => {
    render(<Result result={result} handleAgain={handleAgain} />);

    expect(
      screen.getByRole("heading", { name: "Your number is" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "6" })).toBeInTheDocument(); // total of `result`
    expect(
      screen.getByRole("button", { name: "Play again" }),
    ).toBeInTheDocument();
  });

  it("shows the cards instead of the number with magic mode off", () => {
    setMagicMode(false);
    render(<Result result={result} handleAgain={handleAgain} />);

    expect(
      screen.queryByRole("heading", { name: "Your number is" }),
    ).toBeNull();
    expect(screen.queryByRole("heading", { name: "6" })).toBeNull();
    expect(screen.getByText("1")).toBeDefined(); // from result array
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Play again" }),
    ).toBeInTheDocument();
  });

  it("calls handleAgain when Play again is clicked", async () => {
    const user = userEvent.setup();
    render(<Result result={result} handleAgain={handleAgain} />);

    await user.click(screen.getByRole("button", { name: "Play again" }));

    expect(handleAgain).toHaveBeenCalledOnce();
  });
});
