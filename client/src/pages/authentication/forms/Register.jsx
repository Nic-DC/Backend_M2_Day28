import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  console.log("formData", formData);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const endpoint = "http://localhost:3008/users/register";
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to register user");
      }
      const data = await response.json();
      console.log(data);
      setIsRegistered(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      window.location.href = "/login";
    }
  }, [isRegistered]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Control
          type="text"
          name="firstName"
          placeholder="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Control
          type="text"
          name="lastName"
          placeholder="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="username">
        <Form.Control
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Control type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="outline-dark" type="submit">
        Register
      </Button>
    </Form>
  );
}

export default Register;
