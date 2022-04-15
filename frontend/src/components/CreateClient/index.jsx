import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import CREATE_CLIENT from "../../graphql/mutations/createClient.js";
import CLIENTS from "../../graphql/queries/clients";
import Modal from "../Modal";
import NewClientForm from "../NewClientForm";
import styles from './index.module.scss'

const CreateClient = () => {
  const [showModal, setShowModal] = useState(false);

  const [createClient] = useMutation(CREATE_CLIENT, {
    onError: (err) => toast.error(err.message),
    onCompleted: () => setShowModal(false),
    refetchQueries: [
      {
        query: CLIENTS,
      },
    ],
  });

  const handleSaveClient = ({ name, email, company }) => {
    createClient({ variables: { name, email, company } });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button className="button" onClick={() => setShowModal(true)}>
          New
        </button>
      </div>
      <Modal
        title="New Client"
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      >
        <NewClientForm
          handleSaveClient={({ name, email, company }) =>
            handleSaveClient({ name, email, company })
          }
        />
      </Modal>
    </>
  );
};

export default CreateClient;