const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('Form Submission and Validation with Debugging and Log Output', async ({ page }) => {
    // Enable verbose logging
    page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

    // Navigate to the cats page
    console.log('Navigating to the cats page: http://localhost:3000/cats');
    await page.goto('http://localhost:3000/cats');
    console.log('Cats page loaded');

    // Verify the page title
    console.log('Verifying page title');
    await expect(page).toHaveTitle(/Angular Full Stack ST/);
    console.log('Page title verified');

    // Verify the page content
    console.log('Verifying page content');
    await expect(await page.locator('h4.card-header:has-text("Current cats")').innerText()).toContain('Current cats');
    console.log('Page content verified');

    // Generate dynamic data using faker
    console.log('Generating dynamic data using faker');
    const catName = faker.animal.cat(); // Generate a random cat name
    const catAge = faker.number.int({ min: 1, max: 15 }); // Generate a random age between 1 and 15
    const catWeight = faker.number.float({ min: 1, max: 10, multipleOf: 0.1 }); // Generate a random weight with 0.1 multiple
    console.log(`Generated data - Name: ${catName}, Age: ${catAge}, Weight: ${catWeight}`);

    // Fill out the form fields with dynamic data
    console.log('Filling out the form fields');
    await page.fill('input[name="name"]', catName);
    await page.fill('input[name="age"]', catAge.toString()); // Ensure age is converted to string
    await page.fill('input[name="weight"]', catWeight.toString()); // Ensure weight is converted to string
    console.log('Form fields filled');

    // Submit the form
    console.log('Submitting the form');
    await page.click('app-add-cat-form button[type="submit"]'); // Adjust selector based on your actual HTML
    console.log('Form submitted');

    // Wait for the form submission to complete and the new cat to appear in the list
    console.log('Waiting for the new cat to appear in the list');
    await page.waitForSelector('tbody > tr:has(td:has-text("' + catName + '"))');
    console.log('New cat appeared in the list');

    // Validate that the new cat appears in the list with correct data
    console.log('Validating the new cat data');
    const newCatRow = page.locator('tbody > tr:has(td:has-text("' + catName + '"))');
    await expect(newCatRow).toContainText(catName);
    await expect(newCatRow).toContainText(catAge.toString());
    await expect(newCatRow).toContainText(catWeight.toString());
    console.log('New cat data validated');
});
