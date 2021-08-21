import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner1 from "../layouts/Spinner";
import ContactItem from "./ContactItem";

import ContactContext from "../Context/Contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContact, loading } = contactContext;

  useEffect(() => {
    getContact();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((i, key) => (
                <CSSTransition key={i.id} timeout={500} classNames="item">
                  <ContactItem contact={i} key={key} />
                </CSSTransition>
              ))
            : contacts.map((i, key) => (
                <CSSTransition key={i.id} timeout={500} classNames="item">
                  <ContactItem contact={i} key={key} />
                </CSSTransition>
              ))}
          {/* {contacts.map((i, key) => (
        <ContactItem contact={i} key={key} />
      ))} */}
        </TransitionGroup>
      ) : (
        <Spinner1 />
      )}
    </Fragment>
  );
};

export default Contacts;
