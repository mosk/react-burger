import { FC } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  closeHandler: () => void;
}

const ModalOverlay:FC<IModalOverlayProps> = ({ closeHandler }) => {
  return <div className={styles.overlay} onClick={closeHandler}></div>;
};

export default ModalOverlay;
