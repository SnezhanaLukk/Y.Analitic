import mutationData from "./mutationData";
import type { InputData } from "./mutationData";


function historyDataMutation(data: InputData | null, success: boolean, fileName: string) {

    const now = new Date();
    const formattedDate = [
        now.getDate().toString().padStart(2, '0'),
        (now.getMonth() + 1).toString().padStart(2, '0'),
        now.getFullYear()
    ].join('.');


    return {
        id: new Date().getTime(),
        name: fileName,
        date: formattedDate,
        isSuccess: success,
        data: success && data ? mutationData(data) : null
    }
}
export default historyDataMutation;