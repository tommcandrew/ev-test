import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import styles from "./index.module.scss";

const ConfirmActionButton = ({
  onConfirm,
  modalTitle,
  modalText,
  modalButtonText,
  buttonClassName,
  children,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmClick = () => {
    setShowModal(false);
    onConfirm();
  };

  const renderButton = () => {
    return (
      <button className={buttonClassName} onClick={() => setShowModal(true)}>
        {children}
      </button>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        title={modalTitle}
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      >
        <p className={styles.modalText}>{modalText}</p>
        <div className={styles.button__wrapper}>
          <button className="btn--danger" onClick={handleConfirmClick}>
            {modalButtonText}
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      {renderButton()}
      {renderModal()}
    </div>
  );
};

ConfirmActionButton.propTypes = {
  modalText: PropTypes.string,
  modalButtonText: PropTypes.string,
  buttonClassName: PropTypes.string,
};

ConfirmActionButton.defaultProps = {
  modalText: "Are you sure you want to delete?",
  modalButtonText: "Confirm",
  buttonClassName: "btn--danger",
};

export default ConfirmActionButton;
