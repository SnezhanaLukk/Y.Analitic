import { test, expect } from '@playwright/test';

test('Проверка загрузки сгенерированного файла', async ({ page }) => {
    await page.goto('http://localhost:5173/generate');
    await page.locator('button:has-text("Начать генерацию")').click();
    const [download] = await Promise.all([page.waitForEvent('download')]);

    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toMatch(/.*\.csv$/);

    const path = await download.path();
    expect(path).not.toBeNull();
});
