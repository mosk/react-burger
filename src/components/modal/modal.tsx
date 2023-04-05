import { useEffect, FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

import { TKeyboardEvent } from "../../types/types";

const modalRoot = document.getElementById("modals") as HTMLElement;

interface IModalProps {
  title: string;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<IModalProps>> = ({ title, onClose, children }) => {
  const KEY_NAME_ESC = `Escape`;
  const KEY_EVENT_TYPE = `keyup`;

  const handleEscKey = (e: TKeyboardEvent) => {
    if (e.key === KEY_NAME_ESC) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal}`}>
        <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
        <div className={`${styles.content}`}>{children}</div>
        <button className={`${styles["button--close"]}`} onClick={onClose}>
          <CloseIcon type="primary" />
          <span className="visually-hidden">Закрыть окно</span>
        </button>
      </div>
      <ModalOverlay closeHandler={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
