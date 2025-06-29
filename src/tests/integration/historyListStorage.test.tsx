import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HistoryList from '../../components/HistoryList/HistoryList';
import type { HistoryItemType } from '../../types/HistoryTypes';
import { beforeEach, describe, expect, test } from 'vitest';

const mockHistory: HistoryItemType[] = [
    {
        id: '1',
        name: 'test-file-1.csv',
        date: '01.06.2025',
        isSuccess: true,
        data: {
            total_spend_galactic: 1000,
            rows_affected: 100,
            less_spent_at: '1 января',
            big_spent_at: '20 марта',
            less_spent_value: 100,
            big_spent_value: 300,
            average_spend_galactic: 150,
            big_spent_civ: 'Civ A',
            less_spent_civ: 'Civ B',
        },
    },
    {
        id: '2',
        name: 'test-file-2.csv',
        date: '02.06.2025',
        isSuccess: false,
        data: null,
    },
];

describe('Взаимодействие с localStorage в списке историй', () => {
    beforeEach(() => {
        localStorage.setItem('history', JSON.stringify(mockHistory));
    });

    test('отображение элементов localStorage в списке истории', () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        expect(screen.getByText(/test-file-1.csv/i)).toBeInTheDocument();
        expect(screen.getByText(/test-file-2.csv/i)).toBeInTheDocument();
    });

    test('удаление отдельных элементов истории', async () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        const deleteButtons = screen.getAllByAltText('Delete');
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(screen.queryByText(/test-file-1.csv/i)).not.toBeInTheDocument();
        });

        const updatedStorage = JSON.parse(localStorage.getItem('history') || '[]');
        expect(updatedStorage).toHaveLength(1);
        expect(updatedStorage[0].id).toBe('2');
    });

    test('очистка всего localStorage', async () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        const clearButton = screen.getByRole('button', { name: /очистить всё/i });
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.getByText(/история пуста/i)).toBeInTheDocument();
        });

        expect(localStorage.getItem('history')).toBeNull();
    });
});
