import { vi, describe, beforeEach, it, afterEach, expect, type Mock } from 'vitest';
import generateFile from '../../services/generateFile';

describe('скачивание сгенерированного файла', () => {
    let clickMock: ReturnType<typeof vi.fn>;
    let removeMock: ReturnType<typeof vi.fn>;
    let createObjectURLMock: ReturnType<typeof vi.fn>;
    let revokeObjectURLMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        clickMock = vi.fn();
        removeMock = vi.fn();
        createObjectURLMock = vi.fn(() => 'blob:http://localhost/fake');
        revokeObjectURLMock = vi.fn();

        globalThis.fetch = vi.fn();
        globalThis.URL.createObjectURL = createObjectURLMock;
        globalThis.URL.revokeObjectURL = revokeObjectURLMock;

        vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
            if (tagName.toLowerCase() === 'a') {
                return {
                    href: '',
                    download: '',
                    click: clickMock,
                    remove: removeMock,
                } as unknown as HTMLAnchorElement;
            }
            return document.createElement(tagName);
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('скачивание при упешной генерации', async () => {
        const blobMock = new Blob(['test'], { type: 'text/csv' });

        (globalThis.fetch as Mock).mockResolvedValueOnce({
            ok: true,
            blob: () => Promise.resolve(blobMock),
        });

        const result = await generateFile();

        expect(globalThis.fetch).toHaveBeenCalledWith(
            expect.stringContaining('http://localhost:3000/report?'),
        );
        expect(createObjectURLMock).toHaveBeenCalled();
        expect(clickMock).toHaveBeenCalled();
        expect(removeMock).toHaveBeenCalled();
        expect(revokeObjectURLMock).toHaveBeenCalled();
        expect(result).toBe('done');
    });

    it('возрат ошибки при неудачной генерации', async () => {
        (globalThis.fetch as Mock).mockRejectedValueOnce(new Error('network error'));
        const result = await generateFile();
        expect(result).toBe('error');
    });

    it('обрабатывает ответ с ok: false', async () => {
        (globalThis.fetch as Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        const result = await generateFile();
        expect(result).toBe('error');
    });
});
