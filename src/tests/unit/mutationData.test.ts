import { it, describe } from 'vitest';
import mutationData from '../../services/utils/mutationData';
import { expect } from 'vitest';

const mockData = {
    total_spend_galactic: 100345234.434,
    rows_affected: 1000,
    less_spent_at: 0,
    big_spent_at: 364,
    less_spent_value: 10.2234543,
    big_spent_value: 100.7345245,
    average_spend_galactic: 505.3,
    big_spent_civ: 'humans',
    less_spent_civ: 'blob',
};
const mockDataCheck = {
    total_spend_galactic: 100345234,
    rows_affected: 1000,
    less_spent_at: '1 января',
    big_spent_at: '31 декабря',
    less_spent_value: 10,
    big_spent_value: 100,
    average_spend_galactic: 505,
    big_spent_civ: 'humans',
    less_spent_civ: 'blob',
};

describe('Коректное изменеие данных с бекэнда', () => {
    it('Данные подсчитаны корректно', () => {
        expect(JSON.stringify(mutationData(mockData)) === JSON.stringify(mockDataCheck));
    });
});
