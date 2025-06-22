export interface InputData {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: string;
    less_spent_civ: string;
}

function mutationData(data: InputData) {

    const getDateFromDay = (dayOfYear: number): Date => {
        const date = new Date(2025, 0);
        date.setDate(dayOfYear);
        return date;
    };

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth();
        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];
        return `${day} ${months[month]}`;
    };

    const minDate = formatDate(getDateFromDay(data.less_spent_at));
    const maxDate = formatDate(getDateFromDay(data.big_spent_at));
    return {
        total_spend_galactic: Math.round(data.total_spend_galactic),
        rows_affected: Math.round(data.rows_affected),
        less_spent_at: minDate,
        big_spent_at: maxDate,
        less_spent_value: Math.round(data.less_spent_value),
        big_spent_value: Math.round(data.big_spent_value),
        average_spend_galactic: Math.round(data.average_spend_galactic),
        big_spent_civ: data.big_spent_civ,
        less_spent_civ: data.less_spent_civ,
    }

}
export default mutationData;