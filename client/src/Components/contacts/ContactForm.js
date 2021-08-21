import { set } from "mongoose";
import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../Context/Contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrentContact, updateContact, current } =
    contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [temp, setTemp] = useState(false);
  const { name, email, phone, type } = contact;

  const onChangeHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
    setTemp(!temp);
  };
  const clearAll = () => {
    clearCurrentContact();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearAll();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      {current ? (
        <h2 className="text-primary">Edit Contact</h2>
      ) : (
        <h2 className="text-primary">Add Contact</h2>
      )}
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChangeHandler}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChangeHandler}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChangeHandler}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChangeHandler}
        checked={type === "personal"}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChangeHandler}
        checked={type === "professional"}
      />
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Edit Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
