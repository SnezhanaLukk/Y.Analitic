import { useState } from 'react';
import type { MouseEvent } from 'react';
import Modal from '../../Modal/Modal';
import styles from './historyItem.module.css';
import file from '../../../image/akar-icons_file.svg'
import smile from '../../../image/Smile.svg';
import smileLight from "../../../image/SmileLigth.svg"
import sadness from '../../../image/Vector.svg';
import sadLihgt from '../../../image/SagLight.svg'
import trash from '../../../image/Trash.svg'
import type { HistoryDataType } from '../../types/HistoryTypes';

interface HistoryItemProps {
    id: string;
    fileName: string,
    dateCreation: string,
    isSuccess: boolean
    onDelete: (id: string) => void;
    data: HistoryDataType | null;
}

function HistoryItem({ id, fileName, dateCreation, isSuccess, onDelete, data }: HistoryItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onDelete(id);
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.itemWrapper}
                    onClick={() => isSuccess && setIsModalOpen(true)}
                >
                    <div className={styles.item}>
                        <img src={file} alt="File icon" />
                        <span>{fileName}</span>
                    </div>

                    <div className={styles.item}>{dateCreation}</div>

                    <div className={isSuccess ? styles.item : styles.failItem}>
                        <span>Обработан успешно</span>
                        {isSuccess ? <img src={smile} alt="Success" /> : <img src={smileLight} alt="Not success" />}
                    </div>

                    <div className={!isSuccess ? styles.item : styles.failItem}>
                        <span>Не удалось обработать</span>
                        {isSuccess ? <img src={sadLihgt} alt="Failure" /> : <img src={sadness} alt="Not failure" />}
                    </div>
                </div>

                <div className={styles.trash} onClick={handleDelete}>
                    <img src={trash} alt="Delete" />
                </div>
            </div>
            {isModalOpen && isSuccess && data && (<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={data} />)}
        </>
    )
}

export default HistoryItem;