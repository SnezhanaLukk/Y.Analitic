import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { resultsAccumulation } from '../utils/resultsAccumulation';
import { dropFile } from '../utils/dragAndDropFile';
import { uploadFileViaInput } from '../utils/uploadFileViaInput';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = 'http://localhost:5173/';

test('Drag&Drop загрузка валидного файла', async ({ page }) => {
    await page.goto(BASE_URL);
    await dropFile(page, 'valid.csv', 'id,civ,developer_id,date,spend', 'text/csv');

    await expect(page.locator('text=файл загружен!')).toBeVisible();
    await expect(page.getByText('valid.csv')).toBeVisible();
    await expect(page.locator('button:has-text("Отправить")')).toBeEnabled();
});

test('Drag&Drop загрузка невалидного файла', async ({ page }) => {
    await page.goto(BASE_URL);
    await dropFile(page, 'invalid.txt', 'id,name\n1,test', 'text/plain');

    await expect(page.locator('text=упс, не то...')).toBeVisible();
    await expect(page.getByText('invalid.txt')).toBeVisible();
    await expect(page.locator('button:has-text("Отправить")')).toBeHidden();
});

test('Удаление валидного и невалидного файлов после загрузки', async ({ page }) => {
    await page.goto(BASE_URL);
    const uploadFile = async (name: string, content: string, type: string) => {
        await uploadFileViaInput(page, name, content, type);
        const deleteButton = page.locator('[data-testid="delete-file"]');
        await deleteButton.click();
        await expect(deleteButton).toBeHidden();
        await expect(page.locator('text=Загрузить файл')).toBeVisible();
    };

    uploadFile('valid.csv', 'id,civ,developer_id,date,spend', 'text/csv');
    uploadFile('invalid.txt', 'id,name\n1,test', 'text/plain');
});

test('Полный цикл: загрузка → отправка → удаление', async ({ page }) => {
    await page.goto(BASE_URL);

    await uploadFileViaInput(page, 'valid.csv', 'id,civ,developer_id,date,spend', 'text/csv');
    await page.locator('button:has-text("Отправить")').click();

    const deleteButton = page.locator('[data-testid="delete-file"]');
    await expect(deleteButton).toBeHidden();
    const reportContainer = page.locator('[data-testid="report-container"]');
    await reportContainer.waitFor({ state: 'visible', timeout: 15000 });
    await expect(page.locator('text=готово!')).toBeVisible();

    await deleteButton.click();
    await expect(reportContainer).toBeHidden();
    await expect(page.locator('text=Загрузить файл')).toBeVisible();
    await expect(page.locator('[data-testid="report-clean"]')).toBeVisible();
});

test('Отображение прогресса и аналитики после обработки файла', async ({ page }) => {
    await page.goto(BASE_URL);

    const filePath = path.join(__dirname, '../fixtures/valid-test.csv');
    await page.getByTestId('file-input').setInputFiles(filePath);
    await page.locator('button:has-text("Отправить")').click();

    await expect(page.locator('text=идёт парсинг файла')).toBeVisible();

    const reportContainer = page.locator('[data-testid="report-container"]');
    await reportContainer.waitFor({ state: 'visible', timeout: 15000 });

    const totalSpendLocator = page.locator('[data-testid="report-cell-total_spend_galactic"]');
    const rowsAffectedLocator = page.locator('[data-testid="report-cell-rows_affected"]');

    const [total, rows] = await Promise.all([
        resultsAccumulation(page, totalSpendLocator, 5819),
        resultsAccumulation(page, rowsAffectedLocator, 11),
    ]);

    expect(total).toBeTruthy();
    expect(rows).toBeTruthy();
});

test('Отображение финальных значений отчёта', async ({ page }) => {
    await page.goto(BASE_URL);

    const filePath = path.join(__dirname, '../fixtures/valid-test.csv');
    await page.getByTestId('file-input').setInputFiles(filePath);
    await page.locator('button:has-text("Отправить")').click();

    const reportContainer = page.locator('[data-testid="report-container"]');
    await reportContainer.waitFor({ state: 'visible', timeout: 15000 });

    const cells = reportContainer.locator('[data-testid^="report-cell-"]');
    await expect(cells).toHaveCount(8);

    await expect(page.getByText('5819')).toBeVisible();
    await expect(page.getByText('11')).toBeVisible();
    await expect(page.getByText('monsters')).toBeVisible();
    await expect(page.getByText('humans')).toBeVisible();
    await expect(page.getByText('14 сентября')).toBeVisible();
    await expect(page.getByText('10 октября')).toBeVisible();
    await expect(page.getByText('1445')).toBeVisible();
    await expect(page.getByText('529')).toBeVisible();
    await expect(page.locator('text=готово!')).toBeVisible();
});
