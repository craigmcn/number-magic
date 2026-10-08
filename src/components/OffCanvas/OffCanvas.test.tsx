import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
});
