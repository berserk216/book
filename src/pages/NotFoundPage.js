import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container>
      <Row>
        <Col md= {{span: 6, offset:3}}>
          <h1>404</h1>
          <p>PAGE NOT FOUND </p>
        </Col>
      </Row>
    </Container>

  );
};

export default NotFoundPage;


