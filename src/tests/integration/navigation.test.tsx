import { vi, test, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import HistoryList from '../../components/HistoryList/HistoryList';
import '@testing-library/jest-dom';

vi.mock('../../src/pages/MainPage/MainPage', () => ({
    default: () => <div data-testid='main-page'>Main Page Content</div>,
}));

vi.mock('../../src/pages/GeneratorPage/GeneratorPage', () => ({
    default: () => <div data-testid='generator-page'>Generator Page Content</div>,
}));

vi.mock('../../src/pages/History/History', () => ({
    default: () => <div data-testid='history-page'>History Page Content</div>,
}));

vi.mock('../../src/pages/Page404/Page404', () => ({
    default: () => <div data-testid='404-page'>404 Page Content</div>,
}));

vi.mock('../../src/components/Header/Header', () => ({
    default: () => <header data-testid='app-header'>Header</header>,
}));

describe('Проверка навигационных ссылок приложения', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    const routes = ['/', '/generate', '/history', '/non-existing-route'];

    test.each(routes)('Шапка приложения видна на странице "%s"', async (route) => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>,
        );
        expect(await screen.findByTestId('app-header')).toBeInTheDocument();
    });

    test('Навигационные ссылки с правильным именем и URL-ами', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        );

        const homeLink = await screen.findByRole('link', { name: /csv аналитик/i });
        const generatorLink = await screen.findByRole('link', { name: /csv генератор/i });
        const historyLink = await screen.findByRole('link', { name: /история/i });

        expect(homeLink).toHaveAttribute('href', '/');
        expect(generatorLink).toHaveAttribute('href', '/generate');
        expect(historyLink).toHaveAttribute('href', '/history');
    });

    test.each([
        { route: '/', expectedPage: 'main-page' },
        { route: '/generate', expectedPage: 'generator-page' },
        { route: '/history', expectedPage: 'history-page' },
        { route: '/unknown', expectedPage: '404-page' },
    ])(
        'По ссылке: "$route" отображается страница: "$expectedPage"',
        async ({ route, expectedPage }) => {
            render(
                <MemoryRouter initialEntries={[route]}>
                    <App />
                </MemoryRouter>,
            );
            expect(await screen.findByTestId(expectedPage)).toBeInTheDocument();
        },
    );

    test('Кнопка "Сгенерировать больше" ведет на страницу генерации', () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        const generateLink = screen.getByRole('link', { name: /сгенерировать больше/i });
        expect(generateLink).toHaveAttribute('href', '/generate');
    });
});
