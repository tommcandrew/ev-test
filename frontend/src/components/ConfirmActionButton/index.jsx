import React, { useState } from "react";
import Modal from "../Modal";
import styles from './index.module.scss';

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
        <p className={styles.text}>{modalText}</p>
        <div className={styles.button__wrapper}>
          <button className="buttonDanger" onClick={handleConfirmClick}>
            {modalButtonText}
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="confirmAction__wrapper">
      {renderButton()}
      {renderModal()}
    </div>
  );
};

export default ConfirmActionButton;
