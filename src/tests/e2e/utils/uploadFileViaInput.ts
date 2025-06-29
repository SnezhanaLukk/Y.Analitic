import { type Page } from '@playwright/test';

export async function uploadFileViaInput(page: Page, name: string, content: string, type: string) {
    const file = {
        name,
        mimeType: type,
        buffer: Buffer.from(content),
    };

    const fileInput = page.getByTestId('file-input');
    await fileInput.setInputFiles(file);
}
