import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Header from "./Header";

describe("Header", () => {
  it("renders", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Number Magic" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close menu" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "craigmcn" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Magic" })).toBeInTheDocument();
  });
  it("reports the menu's state on the menu button", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: "Open menu" });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    const menuId = menuButton.getAttribute("aria-controls");
    expect(menuId).toBeTruthy();
    expect(screen.getByRole("dialog", { name: "Menu" })).toHaveAttribute(
      "id",
      menuId,
    );

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
  });
});
