import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeHandler }) => {
  return <div className={`${styles.overlay}`} onClick={closeHandler}></div>;
};

ModalOverlay.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default ModalOverlay;
