import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReadLocalStorage } from "usehooks-ts";
import Result from "./Result";

vi.mock("usehooks-ts", () => ({
  useReadLocalStorage: vi.fn(),
}));

afterEach(() => vi.clearAllMocks());

const result = [[1], [2], [3]];
const handleAgain = vi.fn();

describe("Result", () => {
  it("does not render without a result array", () => {
    // @ts-expect-error intentionally testing missing required prop
    expect(() => render(<Result handleAgain={handleAgain} />)).toThrow(
      "Cannot read properties of undefined (reading 'reduce')",
    );
  });

  it("renders with no cards selected", () => {
    render(<Result result={[]} handleAgain={handleAgain} />);

    expect(
      screen.getByRole("heading", { name: "Your number is" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "64" })).toBeInTheDocument(); // default
    expect(
      screen.getByRole("button", { name: "Play again" }),
    ).toBeInTheDocument();
  });

  it("renders with content", () => {
    render(<Result result={result} handleAgain={handleAgain} />);

    expect(
      screen.getByRole("heading", { name: "Your number is" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "6" })).toBeInTheDocument(); // total of `result`
    expect(
      screen.getByRole("button", { name: "Play again" }),
    ).toBeInTheDocument();
  });

  it("renders with manual content", () => {
    vi.mocked(useReadLocalStorage).mockReturnValue(true);
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

  it("renders with non-manual content", () => {
    vi.mocked(useReadLocalStorage).mockReturnValue(false);
    render(<Result result={result} handleAgain={handleAgain} />);

    expect(
      screen.getByRole("heading", { name: "Your number is" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "6" })).toBeInTheDocument(); // total of `result`
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
