import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ModalLogin from './ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/actions/usersAction';

const NavbarComponent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropOpen, setDropOpen] = React.useState(false)

    const { username, role, status } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            role: state.usersReducer.role,
            status: state.usersReducer.status
        }
    });

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
                    <img src={require("../Assets/logo.png")} width="100px" alt='logo-commerce' />
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
                        {
                            username ?
                                <Dropdown isOpen={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
                                    <DropdownToggle onClick={() => setDropOpen(!dropOpen)}>
                                        {username}
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem disabled>
                                            <div className='d-flex'>
                                                <span class="material-icons" style={{ color: status == "Verified" ? "#48dbfb" : "red" }}>
                                                  {
                                                    status == "Verified" ?
                                                    "beenhere"
                                                    :
                                                    "gpp_bad"
                                                  }  
                                                </span>
                                                <p>{status}</p>
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem>
                                            Profile
                                        </DropdownItem>
                                        {
                                            role == "user" ?
                                                <>
                                                    <DropdownItem onClick={() => navigate("/cart")}>
                                                        Cart
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => navigate("/transactions")}>
                                                        Transactions
                                                    </DropdownItem>
                                                </>
                                                :
                                                <>
                                                    <DropdownItem onClick={() => navigate("/products/admin")}>
                                                        Management Products
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => navigate("/transactions/admin")}>
                                                        Management Transactions
                                                    </DropdownItem>
                                                </>

                                        }
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => dispatch(logoutAction())}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                :
                                <ButtonGroup>
                                    <Button type='button'
                                        color='secondary'
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
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;