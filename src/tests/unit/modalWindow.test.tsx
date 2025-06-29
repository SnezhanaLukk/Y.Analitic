import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../../components/Modal/Modal';

const mockData = {
    total_spend_galactic: 100,
    rows_affected: 1000,
    less_spent_at: '1 января',
    big_spent_at: '5 января',
    less_spent_value: 10,
    big_spent_value: 100,
    average_spend_galactic: 50,
    big_spent_civ: 'Civ1',
    less_spent_civ: 'Civ2',
};

describe('Проверка работы модального окна', () => {
    it('если неуспешно завершены расчеты модалка не открывается', () => {
        const { container } = render(<Modal isOpen={false} onClose={vi.fn()} data={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('если успешно завершены расчеты модалка открывается', () => {
        render(<Modal isOpen={true} onClose={vi.fn()} data={mockData} />);
        expect(screen.getByText(/Civ2/)).toBeInTheDocument();
    });

    it('модальное окно закрывается по клику на кнопку х', () => {
        const handleClose = vi.fn();
        const { container } = render(<Modal isOpen={true} onClose={handleClose} data={mockData} />);

        const closeButton = screen.getByRole('button', {
            name: /закрыть модальное окно/i,
        });
        handleClose.mockClear();

        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(container).toBeEmptyDOMElement();
    });

    it('модальное окно не закрывается при нажатии внутри него', () => {
        const handleClose = vi.fn();
        render(<Modal isOpen={true} onClose={handleClose} data={mockData} />);

        const content = screen.getByText(/Civ2/);
        fireEvent.click(content);

        expect(handleClose).not.toHaveBeenCalled();
        expect(screen.getByText(/Civ2/)).toBeInTheDocument();
    });
});
