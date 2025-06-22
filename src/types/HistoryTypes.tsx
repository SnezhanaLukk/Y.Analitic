export interface HistoryItemType {
    id: string;
    name: string;
    date: string;
    isSuccess: boolean;
    data: HistoryDataType | null;
}
export type HistoryDataType = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: string;
    big_spent_civ: string;
    less_spent_civ: string;
    big_spent_at: string;
    big_spent_value: number;
    average_spend_galactic: number;
    less_spent_value: number;
};
