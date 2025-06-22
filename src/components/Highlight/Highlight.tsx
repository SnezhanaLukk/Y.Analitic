import useStore from '../../store/slice';
import ReportCell from '../ReportCell/ReportCell';
import { CELL_REPORT_TEXT } from '../ReportCell/constants';
import styles from './highlight.module.css';
import { useFileUpload } from '../FileUploadContext/FileUploadContext';


function Highlight() {
    const { status } = useFileUpload();
    const { receivedData } = useStore();

    if (!receivedData || status === 'empty') {
        return (
            <div className={styles.wrapperPlug}>
                <div className={styles.text}>Здесь</div>
                <div className={styles.text}>появятся хайлайты</div>
            </div>
        );
    }
    return (
        <div className={styles.wrapper}>
            {Object.entries(receivedData).map(([key, value]) => (<ReportCell textKey={key as keyof typeof CELL_REPORT_TEXT} value={value} />))}
        </div>
    )

}
export default Highlight;