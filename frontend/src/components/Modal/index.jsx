import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import styles from './index.module.scss'

const Modal = ({ isOpen, closeModal, title, children }) => {
  if (process.env.NODE_ENV !== "test") ReactModal.setAppElement("#root");

  const customStyles = {
    overlay: {
      position: "absolute",
      backgroundColor: "#00507699",
      zIndex: 20,
    },
    content: {
      top: "10%",
      left: "35%",
      right: "auto",
      bottom: "auto",
      width: "30%",
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
    >
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button className={styles.close} onClick={closeModal}>
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
