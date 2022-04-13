import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import { CLIENTS } from "./queries.js";
import Modal from "../Modal";
import "../../styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);
  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  let tableContent;

  if (loading) {
    tableContent = <tr><td colSpan={4}><Skeleton count={5} height={50} /></td></tr>;
  } else if (error) {
    tableContent = <tr><td colSpan={4} className="clients__error"><span>The data could not be loaded.</span></td></tr>;
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
    console.log('name :>> ', name);
    console.log('email :>> ', email);
    console.log('company :>> ', company);
    setShowModal(false)
  };

  return (
    <div>
      <header>
        <div className="clients__title">Client List</div>
      </header>
      <div className="clients__container">
        <div className="clients__buttons">
          <button className="button" onClick={() => setShowModal(true)}>New</button>
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
            <button className="button" onClick={handleSave} type="button">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default App;
