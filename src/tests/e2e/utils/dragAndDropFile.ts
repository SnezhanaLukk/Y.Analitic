import { type Page } from '@playwright/test';

export async function dropFile(page: Page, name: string, content: string, type: string) {
    const fileInput = page.getByTestId('file-input');
    const dropZone = page.locator('[data-testid="drag-drop-container"]');
    await dropZone.dispatchEvent('dragover');

    const dataTransfer = await fileInput.evaluateHandle(
        (_, { name, content, type }) => {
            const dt = new DataTransfer();
            const file = new File([content], name, { type });
            dt.items.add(file);
            return dt;
        },
        { name, content, type },
    );

    await dropZone.dispatchEvent('drop', { dataTransfer });
}
