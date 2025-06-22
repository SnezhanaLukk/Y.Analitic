import { useState } from 'react';
import styles from './generator.module.css';
type LoadingStatus = "empty" | "loading" | "done" | "error";
import generateFile from '../../services/generateFile';

function Generator() {
    const [status, setStatus] = useState<LoadingStatus>("empty");

    const renderButtonContent = () => {
        switch (status) {
            case "empty":
                return "Начать генерацию";
            case "loading":
                return <div className={styles.loader}></div>;
            case "done":
                return "Done!"
            case "error":
                return "Ошибка";
        }
    };

    const handleGenerateFile = async () => {
        setStatus('loading');
        await generateFile().then((res) => setStatus(res));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                Сгенерируйте готовый csv-файл нажатием одной кнопки
            </div>
            <div className={styles.buttonWrapper}>
                <button className={`${styles.button} ${styles[status]}`}
                    onClick={handleGenerateFile}
                    disabled={status === 'loading'}
                >{renderButtonContent()}</button>
                {(status !== "empty" && status !== "loading") && (
                    <button type="button" className={styles.close} onClick={() => setStatus("empty")}>
                        ×
                    </button>
                )}
            </div>

            {status === "loading" && <p className={styles.info}>идёт процесс генерации</p>}
            {status === "done" && <p className={styles.info}>файл сгенерирован!</p>}
            {status === "error" && <p className={styles.errorMessage}>упс, не то...</p>}
        </div >
    )
}
export default Generator;