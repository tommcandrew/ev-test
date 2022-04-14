import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

const Modal = ({
  isOpen,
  closeModal,
  title,
  children,
}) => {
  ReactModal.setAppElement("#root");
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
      <div className="modal__layout">
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button className="modal__close" onClick={closeModal}>
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
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
