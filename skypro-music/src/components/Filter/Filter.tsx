import styles from "./filter.module.css";

interface FilterProp {
    filterList: string[];
    onItemClick: (item: string) => void;
    selectedItems: string[];
}

export default function Filter({ filterList, onItemClick, selectedItems }: FilterProp) {
    return (
        <div className={styles.filterList}>
            <div className={styles.wrapper}>
                {filterList.map((listItem, index) => (
                   <div
                   key={index}
                   className={`${styles.filterItem} ${
                     selectedItems.includes(listItem) ? styles.selected : ""
                   }`}
                   onClick={() => onItemClick(listItem)}
                 >
                   {listItem}
                 </div>
               ))}
            </div>
        </div>
    );
}
