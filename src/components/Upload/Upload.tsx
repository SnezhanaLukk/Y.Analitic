import styles from './upload.module.css';
import FileUpload from '../FileUploader/FileUploader';
import useFileUpload from '../FileUploadContext/hooks/useFileUpload';
import uploadFile from '../../services/uploadFile';
import { useEffect, useState } from 'react';
import useStore from '../../store/slice';

function Upload() {
    const { status, setStatus } = useFileUpload();
    const { resetData } = useStore();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        resetData();
    }, [resetData, selectedFile]);

    const handleFileSelected = (file: File) => {
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;

        setStatus('uploading');
        try {
            const result = await uploadFile(selectedFile);
            setStatus(result.success ? 'done' : 'error');
        } catch {
            setStatus('error');
        }
    };

    const getButtonState = () => {
        switch (status) {
            case 'uploaded':
                return {
                    text: 'Отправить',
                    className: styles.buttonUpload,
                    disabled: false,
                    action: handleSubmit,
                };
            default:
                return {
                    text: 'Отправить',
                    className: styles.buttonBlock,
                    disabled: true,
                    action: () => {},
                };
        }
    };
    const buttonState = getButtonState();
    return (
        <div className={styles.container}>
            <p className={styles.textUpload}>
                Загрузите <strong>csv</strong> файл и получите <strong>полную информацию</strong> о
                нём за сверхнизкое время
            </p>
            <FileUpload onFileSelected={handleFileSelected} />
            {status === 'done' || status === 'error' || status === 'uploading' ? null : (
                <button
                    className={` ${buttonState.className} ${buttonState.disabled ? styles.disabled : ''}`}
                    onClick={buttonState.action}
                    disabled={buttonState.disabled}
                >
                    {buttonState.text}
                </button>
            )}
        </div>
    );
}
export default Upload;
