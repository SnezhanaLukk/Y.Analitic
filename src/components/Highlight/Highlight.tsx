import useStore from '../../api/slice';
import ReportCell from '../ReportCell/ReportCell';
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
            <ReportCell text='общие расходы в галактических кредитах' value={receivedData.total_spend_galactic} />
            <ReportCell text='количество обработанных записей' value={receivedData.rows_affected} />
            <ReportCell text='день года с минимальными расходами' value={receivedData.less_spent_at} />
            <ReportCell text='цивилизация с максимальными расходами' value={receivedData.big_spent_civ} />
            <ReportCell text='цивилизация с минимальными расходами' value={receivedData.less_spent_civ} />
            <ReportCell text='день года с максимальными расходами' value={receivedData.big_spent_at} />
            <ReportCell text='максимальная сумма расходов за день' value={receivedData.big_spent_value} />
            <ReportCell text='средние расходы в галактических кредитах' value={receivedData.average_spend_galactic} />
        </div>
    )

}
export default Highlight;