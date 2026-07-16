import { test, expect } from "@playwright/test";

test("reveals the chosen number after answering yes to every card", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Think of a number between 1 and 64" }),
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
    page.getByRole("heading", { name: "Think of a number between 1 and 64" }),
  ).toBeVisible();
});

test("reveals the chosen number after answering no to every card", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Got it!" }).click();

  const noButton = page.getByRole("button", { name: "No" });

  for (let i = 0; i < 6; i += 1) {
    await expect(noButton).toBeEnabled();
    await noButton.click();
  }

  await expect(
    page.getByRole("heading", { name: "Your number is" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "64" })).toBeVisible();
});
