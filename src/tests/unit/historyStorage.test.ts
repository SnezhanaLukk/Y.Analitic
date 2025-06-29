import { test, expect, describe, beforeEach } from 'vitest';
import saveToLocalStorage from '../../services/utils/saveToLocalStorage';
import type { InputData } from '../../services/utils/mutationData';

describe('Проверка на сохранение в localStorage', () => {
    const mockData: InputData = {
        total_spend_galactic: 12345678,
        rows_affected: 789,
        less_spent_at: 10,
        big_spent_at: 200,
        less_spent_value: 50,
        big_spent_value: 300,
        average_spend_galactic: 100,
        big_spent_civ: 'CivA',
        less_spent_civ: 'CivB',
    };

    const fileName = 'example.csv';

    beforeEach(() => {
        localStorage.clear();
    });

    test('сохраняет успешную запись с преобразованными данными', () => {
        saveToLocalStorage(mockData, true, fileName);

        const history = JSON.parse(localStorage.getItem('history') || '[]');
        expect(history).toHaveLength(1);

        const entry = history[0];

        expect(entry).toMatchObject({
            name: fileName,
            isSuccess: true,
            data: {
                total_spend_galactic: Math.round(mockData.total_spend_galactic),
                rows_affected: Math.round(mockData.rows_affected),
                less_spent_at: expect.any(String),
                big_spent_at: expect.any(String),
                less_spent_value: Math.round(mockData.less_spent_value),
                big_spent_value: Math.round(mockData.big_spent_value),
                average_spend_galactic: Math.round(mockData.average_spend_galactic),
                big_spent_civ: mockData.big_spent_civ,
                less_spent_civ: mockData.less_spent_civ,
            },
        });
    });

    test('сохраняет неудачную запись без данных', () => {
        saveToLocalStorage(null, false, fileName);

        const history = JSON.parse(localStorage.getItem('history') || '[]');
        expect(history).toHaveLength(1);

        const entry = history[0];

        expect(entry).toMatchObject({
            name: fileName,
            isSuccess: false,
            data: null,
        });
    });
});
