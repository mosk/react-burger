import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals");

const Modal = ({ title, onClose, children }) => {
  const KEY_NAME_ESC = `Escape`;
  const KEY_EVENT_TYPE = `keyup`;

  const handleEscKey = (e) => {
    if (e.key === KEY_NAME_ESC) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
