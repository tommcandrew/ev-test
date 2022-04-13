import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import CLIENTS from "../../graphql/queries/clients";
import CREATE_CLIENT from "../../graphql/mutations/createClient.js";
import Modal from "../Modal";
import { LOADING_ERROR } from "../../constants/notificationMessages";
import "../../styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTrashAlt } from 'react-icons/fa';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);
  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });
  const [createClient] = useMutation(CREATE_CLIENT);

  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan={4}>
          <Skeleton count={5} height={50} />
        </td>
      </tr>
    );
  } else if (error) {
    tableContent = (
      <tr>
        <td colSpan={4} className="clients__error">
          <span>{LOADING_ERROR}</span>
        </td>
      </tr>
    );
  } else {
    tableContent = data.clients.map((client) => {
      const formattedCreatedDate = new Date(
        Number(client.createdAt)
      ).toLocaleDateString("en-UK");
      return (
        <tr key={client.email} className="clients__row">
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.company}</td>
          <td>{formattedCreatedDate}</td>
          <td><button aria-label="delete" className="clients__delete"><FaTrashAlt color="white" /></button></td>
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
    setShowModal(false);
    createClient({ variables: { name, email, company } });
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
              placeholder="Name"
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
              placeholder="Email"
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
              placeholder="Company"
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
    </div>
  );
};

export default App;
