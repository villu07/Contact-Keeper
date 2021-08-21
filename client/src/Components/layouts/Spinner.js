import React, { Fragment } from "react";
import { Spinner, Container } from "react-bootstrap";
const Spinner1 = () => {
  return (
    <Fragment>
      <Container fluid="md">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
      </Container>
    </Fragment>
  );
};

export default Spinner1;
