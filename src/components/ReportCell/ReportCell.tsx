import cn from 'classnames'
import styles from './reportCell.module.css'
import { CELL_REPORT_TEXT } from './constants';

interface CellReportProps {
    value: string | number;
    textKey: keyof typeof CELL_REPORT_TEXT;
    className?: string;
    variant?: 'default' | 'pink';
}

function ReportCell({ value, className, variant = 'default', textKey }: CellReportProps) {
    return CELL_REPORT_TEXT[textKey] ? (
        <div className={cn(
            styles.baseStyle,
            {
                [styles.defaultVariant]: variant === 'default',
                [styles.pinkVariant]: variant === 'pink'
            },
            className
        )}>
            <div className={styles.result}>{value}</div>
            <div className={styles.name}>{CELL_REPORT_TEXT[textKey]}</div>
        </div>
    ) : null
}
export default ReportCell;