import * as React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logout from '../actions/userActions/logout';


const NavigationBar = () => {
    let jwtToken = sessionStorage.getItem('jwtToken');
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
                    {!sessionStorage.getItem('jwtToken') &&
                        <LinkContainer to="/signup">
                            <NavItem eventKey={3} href="#">Signup</NavItem>
                        </LinkContainer>
                    }
                    {!sessionStorage.getItem('jwtToken') &&
                        <LinkContainer to="/login">
                            <NavItem eventKey={4} href="#">Login</NavItem>
                        </LinkContainer>
                    }
                    {sessionStorage.getItem('jwtToken') &&
                        <LinkContainer to="/search">
                            <NavItem eventKey={5} href="#">Search</NavItem>
                        </LinkContainer>
                    }
                    {sessionStorage.getItem('jwtToken') &&
                        <LinkContainer to="/">
                            <NavItem eventKey={6} href="#" onClick={logout}>Logout</NavItem>
                        </LinkContainer>
                    }
                </Nav>
            </Navbar>
        );
    };

export default NavigationBar;