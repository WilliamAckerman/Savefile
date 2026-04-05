import { test, expect } from '@playwright/test';

test('landingPageToAbout', async ({ page }) => {
    
    // This is the page we start at
    await page.goto('/');

    // Looking for a link with a name of "About"
    // click(): Causes the test to simulate clicking the "About" link
    await page.getByRole('link', { name: "About" }).click();

    // Since we are projected to be on the "About" page, we expect the page to have "About" in the title
    await expect(page).toHaveTitle(/About/);
})