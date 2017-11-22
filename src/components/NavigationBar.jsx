import * as React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = () => {
        return (
            <Navbar inverse={true}>
                <Navbar.Header>
                    <NavbarBrand>
                        <LinkContainer to="/">
                            <a href="#">Spotlight</a>
                        </LinkContainer>
                    </NavbarBrand>
                </Navbar.Header>
                <Nav pullRight={true}>
                    <LinkContainer to="/about">
                        <NavItem eventKey={1} href="#">About</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <NavItem eventKey={2} href="#">Contact</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <NavItem eventKey={3} href="#">Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                    <NavItem eventKey={4} href="#">Login</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        );
    };

export default NavigationBar;