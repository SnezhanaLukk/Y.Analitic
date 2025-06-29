import useStore from '../../store/slice';
import ReportCell from '../ReportCell/ReportCell';
import { CELL_REPORT_TEXT } from '../ReportCell/constants';
import styles from './highlight.module.css';

function Highlight() {
    const { receivedData, status } = useStore();

    if (!receivedData || (status !== 'done' && status !== 'uploading')) {
        return (
            <div className={styles.wrapperPlug} data-testid='report-clean'>
                <div className={styles.text}>Здесь</div>
                <div className={styles.text}>появятся хайлайты</div>
            </div>
        );
    }
    return (
        <div className={styles.wrapper} data-testid='report-container'>
            {Object.entries(receivedData).map(([key, value]) => (
                <ReportCell
                    textKey={key as keyof typeof CELL_REPORT_TEXT}
                    value={value}
                    key={key}
                />
            ))}
        </div>
    );
}
export default Highlight;
