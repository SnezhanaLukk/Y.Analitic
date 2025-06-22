import useStore from '../store/slice';
import mutationData from './utils/mutationData';
import saveToLocalStorage from './utils/saveToLocalStorage';

const url = 'http://localhost:3000/aggregate?';
const params = new URLSearchParams({ rows: '100000' });

interface ProcessingResult {
    success: boolean;
    error?: string;
}

async function uploadFile(file: File): Promise<ProcessingResult> {
    const formData = new FormData();
    const { setReceivedData } = useStore.getState();
    formData.append('file', file);

    try {
        const response = await fetch(`${url}${params.toString()}`, {
            method: 'POST',
            body: formData,
        });
        if (response.ok && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let intermediateData = '';
            let data = '';

            const read = async () => {
                const { done, value } = await reader.read();

                if (done) {
                    saveToLocalStorage(JSON.parse(data), true, file.name);
                    return {
                        success: true,
                    };
                }

                intermediateData += decoder.decode(value);
                const splitData = intermediateData.split('\n');
                data = splitData[splitData.length - 2];
                setReceivedData(mutationData(JSON.parse(data)));

                return await read();
            };

            const result = await read();

            return result;
        } else {
            const errorText = await response.text();
            saveToLocalStorage(null, false, file.name);
            return {
                success: false,
                error: `Server error: ${response.status} - ${errorText}`,
            };
        }
    } catch (error) {
        saveToLocalStorage(null, false, file.name);
        throw new Error(`Ошибка при отправке запроса: ${error}`);
    }
}

export default uploadFile;
