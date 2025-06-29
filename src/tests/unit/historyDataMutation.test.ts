import { it, describe, expect, vi } from 'vitest';
import historyDataMutation from '../../services/utils/historyDataMutation';

describe('Проверка функции создания id и обработки даты для корректного сохранения в localStorage', () => {
    it('Корректное форматирование даты (день и месяц с ведущим нулем)', () => {
        vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

        const result = historyDataMutation(null, false, 'date_test.csv');
        expect(result.date).toBe('01.01.2025');
    });

    it('Генерация уникального id на основе временной метки', () => {
        const testTime = new Date('2025-06-30T12:30:00Z').getTime();
        vi.setSystemTime(testTime);

        const result = historyDataMutation(null, false, 'id_test.csv');
        expect(result.id).toBe(testTime);
    });
});
