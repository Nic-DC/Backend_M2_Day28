import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Navbar bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} expand="lg">
      <Navbar.Brand href="#home">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant={isDarkMode ? "outline-warning" : "outline-dark"}>Search</Button>
        </Form>
        <Button className="ml-2" variant={isDarkMode ? "light" : "warning"} onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
