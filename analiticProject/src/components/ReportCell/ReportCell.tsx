import cn from 'classnames'
import styles from './reportCell.module.css'
interface CellReportProps {
    text: string;
    value: string | number;
    className?: string;
    variant?: 'default' | 'pink';
}
function ReportCell({ text, value, className, variant = 'default' }: CellReportProps) {
    return (
        <div className={cn(
            styles.baseStyle,
            {
                [styles.defaultVariant]: variant === 'default',
                [styles.pinkVariant]: variant === 'pink'
            },
            className
        )}>
            <div className={styles.result}>{value}</div>
            <div className={styles.name}>{text}</div>
        </div>
    )
}
export default ReportCell;