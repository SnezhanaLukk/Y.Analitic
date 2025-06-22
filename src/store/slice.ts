import { create } from 'zustand'

export type AggregatedData = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: string;
    big_spent_at: string;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: string;
    less_spent_civ: string;
}

type Store = {
    receivedData: AggregatedData | null;
    setReceivedData: (receivedData: AggregatedData) => void;
    resetData: () => void;
}
const useStore = create<Store>((set) => ({
    receivedData: null,
    setReceivedData: (receivedData: AggregatedData) => set(() => ({ receivedData })),
    resetData: () => set(() => ({ receivedData: null }))
}))

export default useStore;