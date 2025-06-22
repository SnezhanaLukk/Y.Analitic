import { NavLink } from "react-router-dom";
import HistoryItem from "./HistoryItem/HistoryItem"
import styles from "./historyList.module.css"
import type { HistoryItemType } from "../types/HistoryTypes"
import { useState, useCallback, useEffect } from "react";


function HistoryList() {
    const [historyList, setHistoryList] = useState<HistoryItemType[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem('history');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setHistoryList(parsedData);
            } catch (error) {
                console.error("Ошибка при парсинге данных из localStorage:", error);
                // setHistoryList(storedData);
            }
        }
    }, []);


    const deleteHistoryItem = (id: string) => {
        const newItems = historyList.filter(item => item.id !== id);
        setHistoryList(newItems);
        if (newItems.length > 0) {
            localStorage.setItem('history', JSON.stringify(newItems));
        } else {
            localStorage.removeItem('history');
        }
    };
    const handleClearAll = useCallback(() => {
        setHistoryList([]);
        localStorage.removeItem('history');
    }, []);


    return (
        <div className={styles.wrapper}>
            {historyList.length === 0 ? (
                <div className={styles.text}>История пуста</div>
            ) : historyList.map((item) => (
                <HistoryItem
                    id={item.id}
                    key={item.id}
                    fileName={item.name}
                    dateCreation={item.date}
                    isSuccess={item.isSuccess}
                    onDelete={deleteHistoryItem}
                    data={item.data}
                />
            ))}
            <div className={styles.wrapButton}>
                <NavLink
                    to="/generate">
                    <button className={styles.buttonMore} >Сгенерировать больше</button>
                </NavLink>

                {historyList.length === 0 ?
                    null : <button className={styles.buttonClear} onClick={handleClearAll}>Отчистить всё</button>
                }
            </div>
        </div >
    )
}
export default HistoryList
