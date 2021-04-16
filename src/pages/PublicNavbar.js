import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Navbar, Nav, } from "react-bootstrap";
import { Link } from "react-router-dom";
// import githubIco from "../images/github_icon.png";
// import logo from "../images/logo.svg";

const PublicNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" style={{ minWidth: 700 }}>
    <Navbar.Brand href="#home">
        suicide
    </Navbar.Brand>
    
    <Nav className="mr-auto">
    <Nav.Link as={Link} to="/">
            Home
    </Nav.Link >
    <Nav.Link as={Link} to= "/reading">
        reading
    </Nav.Link >
    </Nav>
     {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
    </Form> */}
</Navbar>

);
  
};

  

export default PublicNavbar;

