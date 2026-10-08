import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { MAGIC_MODE_KEY } from "../../hooks";
import OffCanvas from "./OffCanvas";

describe("OffCanvas", () => {
  it("renders", () => {
    render(<OffCanvas open={false} close={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Number Magic" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close menu" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "craigmcn" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Magic" })).toBeInTheDocument();
  });

  it("shows Magic on by default and stores the change when toggled off", async () => {
    const user = userEvent.setup();
    render(<OffCanvas open={true} close={vi.fn()} />);

    const magicSwitch = screen.getByRole("checkbox", { name: "Magic" });
    expect(magicSwitch).toBeChecked();

    await user.click(magicSwitch);

    expect(magicSwitch).not.toBeChecked();
    expect(localStorage.getItem(MAGIC_MODE_KEY)).toBe("false");
  });
  it("is inert while closed", () => {
    const { rerender } = render(<OffCanvas open={false} close={vi.fn()} />);
    const panel = screen.getByRole("dialog", { name: "Menu" });

    expect(panel).toHaveAttribute("inert");

    rerender(<OffCanvas open={true} close={vi.fn()} />);

    expect(panel).not.toHaveAttribute("inert");
  });

  it("moves focus to the close button when opened", () => {
    render(<OffCanvas open={true} close={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveFocus();
  });

  it.each([
    [
      "Escape",
      (user: ReturnType<typeof userEvent.setup>) => user.keyboard("{Escape}"),
    ],
    [
      "the close button",
      (user: ReturnType<typeof userEvent.setup>) =>
        user.click(screen.getByRole("button", { name: "Close menu" })),
    ],
  ])("closes on %s and returns focus to the menu button", async (_, act) => {
    const user = userEvent.setup();
    const close = vi.fn();
    const returnFocusRef = createRef<HTMLButtonElement>();
    render(
      <>
        <button ref={returnFocusRef}>Open menu</button>
        <OffCanvas open={true} close={close} returnFocusRef={returnFocusRef} />
      </>,
    );

    await act(user);

    expect(close).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("ignores Escape while closed", async () => {
    const user = userEvent.setup();
    const close = vi.fn();
    render(<OffCanvas open={false} close={close} />);

    await user.keyboard("{Escape}");

    expect(close).not.toHaveBeenCalled();
  });
});
