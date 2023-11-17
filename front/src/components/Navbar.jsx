// Navbar.js
import React from 'react';
import { Navbar as MyNav, Nav, Container } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { logoutUserAction } from '../action/AuthAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storageUserinfo = JSON.parse(localStorage.getItem('user'));
    const isAdmin = storageUserinfo && storageUserinfo.role === 'admin';
    const isDeliveryPerson = storageUserinfo && storageUserinfo.role === 'livreur';
    const isClient = storageUserinfo && storageUserinfo.role === 'client';


    const handleLogout = () => {
        dispatch(logoutUserAction());
        navigate('/');
    };

    return (
        <MyNav bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <MyNav.Brand as={Link} to="/">Accueil</MyNav.Brand>
                <MyNav.Toggle aria-controls="responsive-navbar-nav" />
                <MyNav.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">



                        {storageUserinfo ? (
                            <>
                              {isAdmin && (
                            <Nav.Link as={Link} to="/admin-dashboard">Dashboard Admin</Nav.Link>
                        )}

                        {isDeliveryPerson && (
                            <Nav.Link as={Link} to="/livreur">Dashboard Livreur</Nav.Link>
                        )}
                        {isClient && (
                            <>

                            <Nav.Link as={Link} to="/client">Suivie Commande</Nav.Link>
                            <Nav.Link as={Link} to="/commande">Commande</Nav.Link>
                            </>
                        )}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </MyNav.Collapse>
            </Container>
        </MyNav>
    );
};

export default Navbar;
