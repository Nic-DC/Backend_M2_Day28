import React from "react";
import { Container, Row, Col, Image, Jumbotron } from "react-bootstrap";
import Register from "../forms/Register";

const HomePage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={8}>
          <Jumbotron>
            <h1>Welcome to My App!</h1>
            <Image src="https://picsum.photos/300/100" rounded />
          </Jumbotron>
        </Col>
        <Col xs={6} md={4}>
          <Register />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
