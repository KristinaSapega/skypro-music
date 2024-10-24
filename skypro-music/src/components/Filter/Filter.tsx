import { useAppSelector } from "@/store/store";
import styles from "./filter.module.css";

interface FilterProp {
    filterList: string[];
}

export default function Filter({filterList}: FilterProp) {
    return (
        <div className={styles.filterList}>
            <div className={styles.wrapper}>
                {filterList.map((listItem, index) => (
                    <div key={index} className={styles.filterItem}>
                        {listItem}
                    </div>
                ))}
            </div>
        </div>
    );
}
