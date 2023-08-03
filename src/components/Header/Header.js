import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.css';
import { HashLink } from 'react-router-hash-link';


const Header = () => {
  const { contexts } = useAuth();
  const defImg = 'https://randomuser.me/api/portraits/men/60.jpg';
  return (
    <>
      <Navbar className='header' variant="dark" sticky='top' collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/home"> <span className='fw-bold'>CPL 2023</span></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-text-end fw-normal'>
            <Nav className="ms-auto ">
              <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', marginRight: "5px" }} to='/home'>Home</Link>
            </Nav>
            {!contexts.user.email ? (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-white" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={HashLink}
                  to="/dashboard"
                  className="text-white fw-bold"
                  style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}
                >
                  Dashboard
                </Nav.Link>
                <NavDropdown
                  title={
                    <img
                      className='ms-2'
                      style={{
                        width: "45px",
                        borderRadius: "50%",
                      }}
                      src={contexts.user.photoURL ? contexts.user.photoURL : defImg}
                      alt=""
                    />
                  }
                >
                  <div className="text-center">
                    <h6>{contexts.user.displayName}</h6>
                    <p className="m-0 mb-2">{contexts.user.email}</p>
                    <button onClick={contexts.logOut} className="btn btn-danger fw-bold">
                      Sign Out
                    </button>
                  </div>
                </NavDropdown>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;