import { type Page, type Locator } from '@playwright/test';
function parseNumericText(text: string | null): number {
    if (!text) return 0;
    const numericString = text.replace(/[^\d]/g, '');
    return parseInt(numericString, 10) || 0;
}

export async function resultsAccumulation(
    page: Page,
    locator: Locator,
    expectedValue: number,
    options: { timeout?: number; interval?: number } = {},
) {
    const timeout = options.timeout || 60000;
    const interval = options.interval || 1000;

    let lastValue = 0;
    let reached = false;
    const startTime = Date.now();

    while (!reached && Date.now() - startTime < timeout) {
        await page.waitForTimeout(interval);

        const text = await locator.textContent();
        const currentValue = parseNumericText(text);

        if (currentValue > lastValue) {
            lastValue = currentValue;
        } else {
            throw new Error(`Значение уменьшилось с ${lastValue} до ${currentValue}`);
        }

        if (currentValue === expectedValue) {
            reached = true;
        }
    }

    if (!reached) {
        throw new Error(
            `Значение не достигло ${expectedValue} за ${timeout} мс. Последнее значение: ${lastValue}`,
        );
    }

    return true;
}
