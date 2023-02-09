import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData: ", formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Control
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
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
        Login
      </Button>
    </Form>
  );
};
export default Login;
