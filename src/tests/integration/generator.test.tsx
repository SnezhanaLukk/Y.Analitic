import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, describe, beforeEach, it, afterEach } from 'vitest';
import Generator from '../../components/Generator/Generator';

describe('Генерация файла таблиц', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(new Blob(['mock CSV'], { type: 'text/csv' })),
        });

        globalThis.URL.createObjectURL = vi.fn(() => 'blob:http://fake-url');
        globalThis.URL.revokeObjectURL = vi.fn();
        const originalCreateElement = document.createElement.bind(document);

        vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
            if (tagName === 'a') {
                return {
                    href: '',
                    download: '',
                    click: vi.fn(),
                    remove: vi.fn(),
                } as unknown as HTMLAnchorElement;
            }
            return originalCreateElement(tagName);
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('показывает сообщение об успехе при положительном сценарии генерации', async () => {
        render(<Generator />);
        const button = screen.getByRole('button', { name: /начать генерацию/i });

        fireEvent.click(button);

        await waitFor(() => expect(screen.getByText(/файл сгенерирован/i)).toBeInTheDocument());
    });

    it('показывает сообщение об провале при отрицательном сценарии генерации', async () => {
        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
        render(<Generator />);
        const button = screen.getByRole('button', { name: /начать генерацию/i });

        fireEvent.click(button);
        await waitFor(() => expect(screen.getByText(/упс, не то\.\.\./i)).toBeInTheDocument());
    });

    it('отображение состояния загрузки при генерации', async () => {
        globalThis.fetch = vi.fn().mockReturnValue(new Promise(() => {}));
        render(<Generator />);
        const button = screen.getByRole('button', { name: /начать генерацию/i });
        fireEvent.click(button);
        expect(button).toBeDisabled();
        expect(screen.getByText(/идёт процесс генерации/i)).toBeInTheDocument();
    });

    it('возврат к начальном состоянию кнопки при успешном завершении генерации по клику', async () => {
        render(<Generator />);
        const button = screen.getByRole('button', { name: /начать генерацию/i });

        fireEvent.click(button);

        await waitFor(() => expect(screen.getByText(/файл сгенерирован/i)).toBeInTheDocument());
        const buttonCancel = screen.getByRole('button', { name: /×/i });
        fireEvent.click(buttonCancel);
        expect(screen.getByRole('button', { name: /начать генерацию/i }));
    });

    it('возврат к начальном состоянию кнопки при неудачном завершении генерации по клику', async () => {
        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
        render(<Generator />);
        const button = screen.getByRole('button', { name: /начать генерацию/i });

        fireEvent.click(button);
        await waitFor(() => expect(screen.getByText(/упс, не то\.\.\./i)).toBeInTheDocument());
        const buttonCancel = screen.getByRole('button', { name: /×/i });
        fireEvent.click(buttonCancel);
        expect(screen.getByRole('button', { name: /начать генерацию/i }));
    });
});
