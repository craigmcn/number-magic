import { test, expect } from "@playwright/test";

test("reveals the chosen number after answering yes to every card", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Think of a number between 1 and 63" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Got it!" }).click();

  const yesButton = page.getByRole("button", { name: "Yes!" });

  for (let i = 0; i < 6; i += 1) {
    await expect(yesButton).toBeEnabled();
    await yesButton.click();
  }

  await expect(
    page.getByRole("heading", { name: "Your number is" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "63" })).toBeVisible();

  await page.getByRole("button", { name: "Play again" }).click();

  await expect(
    page.getByRole("heading", { name: "Think of a number between 1 and 63" }),
  ).toBeVisible();
});

test("explains an answer of no to every card", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Got it!" }).click();

  const noButton = page.getByRole("button", { name: "No" });

  for (let i = 0; i < 6; i += 1) {
    await expect(noButton).toBeEnabled();
    await noButton.click();
  }

  await expect(
    page.getByRole("heading", { name: "Your number wasn’t on any card" }),
  ).toBeVisible();
  await expect(page.getByText("Was it between 1 and 63?")).toBeVisible();
});

test("shows the cards instead of the number with Magic switched off", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  const magicSwitch = page.getByRole("checkbox", { name: "Magic" });
  await expect(magicSwitch).toBeChecked();
  // The styled slider covers the checkbox, so click the label as a user would.
  await page.getByText("Magic", { exact: true }).click();
  await expect(magicSwitch).not.toBeChecked();
  await page.getByRole("button", { name: "Close menu" }).click();

  await page.getByRole("button", { name: "Got it!" }).click();

  const yesButton = page.getByRole("button", { name: "Yes!" });

  for (let i = 0; i < 6; i += 1) {
    await expect(yesButton).toBeEnabled();
    await yesButton.click();
  }

  await expect(page.getByRole("button", { name: "Play again" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your number is" }),
  ).not.toBeVisible();
  // 63 is on every card, so the six "yes" cards each show it once.
  await expect(page.getByText("63", { exact: true })).toHaveCount(6);
});
