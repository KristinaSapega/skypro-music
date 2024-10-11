import React from "react";
import styles from "./BurgerMenu.module.css";

interface BurgerMenuProps {
    toggleMenu: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({toggleMenu}) => {
    return (
        <div className={styles.navBurger} onClick={toggleMenu}>
      <span className={styles.burgerLine}></span>
      <span className={styles.burgerLine}></span>
      <span className={styles.burgerLine}></span>
    </div>
    );
}
 