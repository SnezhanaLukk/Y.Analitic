import { createPortal } from 'react-dom';
import ReportCell from '../ReportCell/ReportCell';
import styles from './modal.module.css'
import type { HistoryDataType } from '../types/HistoryTypes';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: HistoryDataType,
};

function Modal({ isOpen, onClose, data }: ModalProps) {
    if (!isOpen) return null;
    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <ReportCell text='общие расходы в галактических кредитах' value={data.total_spend_galactic} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='количество обработанных записей' value={data.rows_affected} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='день года с минимальными расходами' value={data.less_spent_at} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='цивилизация с максимальными расходами' value={data.big_spent_civ} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='цивилизация с минимальными расходами' value={data.less_spent_civ} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='день года с максимальными расходами' value={data.big_spent_at} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='максимальная сумма расходов за день' value={data.big_spent_value} variant="pink" className={styles.pinkSpecial} />
                <ReportCell text='средние расходы в галактических кредитах' value={data.average_spend_galactic} variant="pink" className={styles.pinkSpecial} />

            </div>
            <div className={styles.closeButton__container}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                >
                    ×
                </button>
            </div>
        </div>,
        document.body
    )
}
export default Modal;