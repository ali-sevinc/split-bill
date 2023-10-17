import { ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonType {
  children: ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonType) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
