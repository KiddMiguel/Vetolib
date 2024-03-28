import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../utils/AuthContext";


const Header = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const { user } = useAuth();

  console.log(isAuthenticated);
  console.log(localStorage.getItem('token'));
  return (
    <Navbar collapseOnSelect className="bg-success fixed-top">
      <Container fluid className="d-flex">
        <Navbar.Brand href="/">
          <img
            src="../../public/images/logo.png"
            width="10%"
            className="d-inline-block align-top"
            alt=""
          />
          <img src="../../public/images/logo-text.png" width="15%" height="15%" className="d-inline-block" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <Dropdown className='me-5 pe-3'>
              <Dropdown.Toggle className='bg-primary' id="dropdown-basic">
                <i className="bi bi-person-fill"></i> {user && user.nom}
              </Dropdown.Toggle>

              <Dropdown.Menu className='w-25'>
                <Dropdown.Item href="#/action-1"><i className="bi bi-person-fill"></i> Mon profil </Dropdown.Item>
                <Dropdown.Item onClick={logout} className='text-danger'> <i className="bi bi-box-arrow-left text-danger"></i> Déconnecter</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav>
              <Nav.Link href="/inscription" className="mt-2 fw-semibold text-white">
                Vous êtes un vétérinaire ?
              </Nav.Link>
              <Nav.Link eventKey={2} href="/connexion">
                <Button className="btn-primary">
                  Connexion
                </Button>
              </Nav.Link>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;