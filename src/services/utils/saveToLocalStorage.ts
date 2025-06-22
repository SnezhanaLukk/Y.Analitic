import historyDataMutation from './historyDataMutation';
import type { InputData } from './mutationData';

function saveToLocalStorage(data: InputData | null, isSuccess: boolean, fileName: string) {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push(historyDataMutation(data, isSuccess, fileName));
    localStorage.setItem('history', JSON.stringify(history));
}

export default saveToLocalStorage;
