import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../Context/Contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, []);
  const onChangeHandler = (e) => {
    console.log("hello:::", e.target.value);
    if (text.current.value) {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts...."
        onChange={onChangeHandler}
      />
    </form>
  );
};

export default ContactFilter;
