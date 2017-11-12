import * as React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const NavigationBar = () => {
        return (
            <Navbar>
                <Navbar.Header>
                    <NavbarBrand>
                        <a href="#">Spotlight</a>
                    </NavbarBrand>
                </Navbar.Header>
                <Nav className="pullRight">
                    <NavItem eventKey={1} href="#">About</NavItem>
                    <NavItem eventKey={2} href="#">Contact</NavItem>
                    <NavItem eventKey={3} href="#">Signup</NavItem>
                    <NavItem eventKey={4} href="#">Login</NavItem>
                </Nav>
            </Navbar>
        );
    };

export default NavigationBar;