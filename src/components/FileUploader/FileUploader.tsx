import { useState, useRef } from 'react';
import styles from './FileUploader.module.css';
import useFileUpload from '../FileUploadContext/hooks/useFileUpload';

import useStore from '../../store/slice';

interface FileUploaderProps {
    onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
    const { status, setStatus, fileName, setFileName } = useFileUpload();
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { resetData } = useStore();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = () => {
        setIsDragOver(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };
    const handleFile = (file: File) => {
        if (!file.name.endsWith('.csv')) {
            setStatus('error');
            setFileName(file.name);
            return;
        }

        setStatus('uploaded');
        setFileName(file.name);
        onFileSelected(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleRemove = () => {
        setStatus('empty');
        setFileName(null);

        resetData();

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const renderButtonContent = () => {
        switch (status) {
            case 'empty':
                return 'Загрузить файл';
            case 'uploading':
                return <div className={styles.loader}></div>;
            case 'uploaded':
            case 'done':
            case 'error':
                return fileName;
        }
    };

    return (
        <div
            className={`${styles.wrapper} ${isDragOver ? styles.dragOver : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={styles.buttonsContainer}>
                <label className={`${styles.button} ${styles[status]}`} htmlFor='fileInput'>
                    {' '}
                    {renderButtonContent()}
                </label>

                {status !== 'empty' && status !== 'uploading' && (
                    <div className={styles.close} onClick={handleRemove}>
                        ×
                    </div>
                )}
            </div>

            <input
                id='fileInput'
                ref={inputRef}
                type='file'
                accept='.csv'
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {status === 'empty' && <p className={styles.text}>или перетащите сюда</p>}
            {status === 'uploaded' && <p className={styles.info}>файл загружен!</p>}
            {status === 'uploading' && <p className={styles.info}>идёт парсинг файла</p>}
            {status === 'done' && <p className={styles.info}>готово!</p>}
            {status === 'error' && <p className={styles.errorMessage}>упс, не то...</p>}
        </div>
    );
};

export default FileUploader;
