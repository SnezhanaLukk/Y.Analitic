import { createPortal } from 'react-dom';
import ReportCell from '../ReportCell/ReportCell';
import { CELL_REPORT_TEXT } from '../ReportCell/constants';
import styles from './modal.module.css';
import type { HistoryDataType } from '../../types/HistoryTypes';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: HistoryDataType | null;
}

function Modal({ isOpen, onClose, data }: ModalProps) {
    if (!isOpen || !data) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {Object.entries(data).map(([key, value]) => (
                    <ReportCell
                        textKey={key as keyof typeof CELL_REPORT_TEXT}
                        value={value}
                        variant='pink'
                        className={styles.pinkSpecial}
                        key={key}
                    />
                ))}
            </div>
            <div className={styles.closeButton__container}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label='Закрыть модальное окно'
                >
                    ×
                </button>
            </div>
        </div>,
        document.body,
    );
}
export default Modal;
