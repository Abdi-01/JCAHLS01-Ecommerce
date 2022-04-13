import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, ButtonGroup, Button } from 'reactstrap';
import ModalLogin from './ModalLogin';

import { Link, useNavigate } from 'react-router-dom';

const NavbarComponent = (props) => {

    const navigate = useNavigate();

    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)

    return (
        <div className='bg-light'>
            <ModalLogin
                modalOpen={openLogin}
                toggleOpen={() => setOpenLogin(!openLogin)}
            />
            <Navbar color='light' className='container' light expand="md">
                <NavbarBrand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <span className='fw-bold'>
                        Commerce
                    </span>
                </NavbarBrand>
                <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />
                <Collapse navbar isOpen={openCollapse}>
                    <Nav
                        className='me-auto'
                        navbar
                    >
                        <NavItem>
                            <Link to="/products" className='nav-link'>
                                <span >
                                    Products
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <span className='nav-link'>
                                Promo
                            </span>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <ButtonGroup>
                            <Button type='button'
                                color='primary'
                                onClick={() => setOpenLogin(!openLogin)}>
                                Login
                            </Button>
                            <Button type='button'
                                color='secondary'
                                outline
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </ButtonGroup>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;