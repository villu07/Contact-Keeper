import React, { useContext, useEffect } from "react";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../Context/Auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
