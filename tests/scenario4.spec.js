const { test, expect } = require('@playwright/test');

test('Intercepting GET Request to /api/cats with Debugging and Log Output', async ({ page }) => {
    // Define mocked cats data
    const mockedCats = [
        {
            "_id": "666aa9298feb05933a18849e",
            "name": "Siberian",
            "weight": 4.4,
            "age": 9,
            "__v": 0
        },
    ];

    // Intercept network requests to the /api/cats endpoint
    await page.route('**/api/cats', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedCats),
        });
    });

    // Navigate to the cats page
    console.log('Navigating to Cats page...');
    await page.goto('http://localhost:3000/cats');

    // Wait for the cats table to be visible
    console.log('Waiting for the cats table to be visible...');
    await page.waitForSelector('table.table');

    // Validate that the mocked cats data appears in the table
    for (const cat of mockedCats) {
        console.log(`Validating cat: ${cat.name}, ${cat.age}, ${cat.weight}`);
        const nameLocator = `tbody > tr:has(td:has-text("${cat.name}"))`;
        const ageLocator = `tbody > tr:has(td:has-text("${cat.age}"))`;
        const weightLocator = `tbody > tr:has(td:has-text("${cat.weight}"))`;

        console.log(`Checking visibility of cat name: ${cat.name}`);
        await expect(page.locator(nameLocator)).toBeVisible();

        console.log(`Checking visibility of cat age: ${cat.age}`);
        await expect(page.locator(ageLocator)).toBeVisible({ timeout: 10000 });

        console.log(`Checking visibility of cat weight: ${cat.weight}`);
        await expect(page.locator(weightLocator)).toBeVisible();
    }

    console.log('Test completed successfully!');
});
