import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Switch from "./Switch";

describe("Switch", () => {
  it("renders unchecked and reports clicks on the checkbox and label", async () => {
    const user = userEvent.setup();
    const mockChange = vi.fn();
    render(
      <Switch onChange={mockChange} checked={false}>
        Test
      </Switch>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Test" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    await user.click(screen.getByLabelText("Test"));

    expect(mockChange).toHaveBeenCalledTimes(2);
  });

  it("follows the checked prop rather than its own state", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Switch onChange={vi.fn()} checked={true}>
        Test
      </Switch>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Test" });
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    rerender(
      <Switch onChange={vi.fn()} checked={false}>
        Test
      </Switch>,
    );
    expect(checkbox).not.toBeChecked();
  });
});
