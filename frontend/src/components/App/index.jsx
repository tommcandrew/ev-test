import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLIENTS from "../../graphql/queries/clients";
import CREATE_CLIENT from "../../graphql/mutations/createClient.js";
import DELETE_CLIENT from "../../graphql/mutations/deleteClient.js";
import Modal from "../Modal";
import { LOADING_ERROR, NO_DATA } from "../../constants/notificationMessages";
import "../../styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmActionButton from "../ConfirmActionButton";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  const [createClient] = useMutation(CREATE_CLIENT, {
    onError: (err) => toast.error(err.message),
    onCompleted: () => setShowModal(false),
    refetchQueries: [
      {
        query: CLIENTS,
      },
    ],
  });
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [
      {
        query: CLIENTS,
      },
    ],
  });

  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan={5}>
          <Skeleton count={5} height={50} />
        </td>
      </tr>
    );
  } else if (error) {
    tableContent = (
      <tr>
        <td colSpan={5} className="clients__message">
          <span>{LOADING_ERROR}</span>
        </td>
      </tr>
    );
  } else if (!data.clients.length) {
    tableContent = (
      <tr>
        <td colSpan={5} className="clients__message">
          <span>{NO_DATA}</span>
        </td>
      </tr>
    );
  } else {
    tableContent = data.clients
      .filter((client) =>
        [client.name, client.email, client.company].some((val) =>
          val.toLowerCase().includes(searchText)
        )
      )
      .map((client) => {
        const formattedCreatedDate = new Date(
          Number(client.createdAt)
        ).toLocaleDateString("en-UK");
        return (
          <tr key={client.email} className="clients__row">
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.company}</td>
            <td>{formattedCreatedDate}</td>
            <td>
              <ConfirmActionButton
                onConfirm={() => deleteClient({ variables: { id: client.id } })}
                modalTitle="Delete Client"
                modalText={`Are you sure you want to delete ${client.name}?`}
                buttonClassName="clients__delete"
                modalButtonText="Delete"
              >
                <FaTrashAlt color="white" />
              </ConfirmActionButton>
            </td>
          </tr>
        );
      });
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeCompany = (e) => {
    setCompany(e.target.value);
  };

  const handleSave = () => {
    createClient({ variables: { name, email, company } });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <header>
        <div className="clients__title">Client List</div>
      </header>
      <div className="clients__container">
        <div className="clients__buttons">
          <button className="button" onClick={() => setShowModal(true)}>
            New
          </button>
        </div>
        <table className="clients__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Created</th>
              <th>
                <div className="clients__search">
                  <label htmlFor="search">Search:</label>
                  <input id="search" type="text" onChange={handleSearch} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
      <Modal
        title="New Client"
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      >
        <form>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              type="text"
              id="name"
              onChange={handleChangeName}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              className="form__input"
              type="text"
              id="email"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="company">
              Company
            </label>
            <input
              className="form__input"
              type="text"
              id="company"
              onChange={handleChangeCompany}
            />
          </div>
          <div className="form__footer">
            <button className="button" onClick={handleSave} type="button">
              Save
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;
