import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import UploadfileModal from './UploadfileModal';
import { Link } from 'react-router-dom';


function AppNavbar() {
    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand><Link to="/" style={{textDecoration:'none',color:'black'}}>Fabrik</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <UploadfileModal/>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default AppNavbar