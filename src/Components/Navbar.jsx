import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ModalLogin from './ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/actions/usersAction';
import Axios from 'axios';
import { API_URL } from '../helper';

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

    const handleReVerified = async () => {
        try {
            let token = localStorage.getItem("tokenIdUser")
            if (token) {
                let res = await Axios.get(`${API_URL}/users/reverified`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    alert('Resend verification success ✅')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                                        <DropdownItem onClick={handleReVerified} disabled={status == "Verified"}>
                                            <div className='d-flex'>
                                                <span class="material-icons m-0" style={{ color: status == "Verified" ? "#48dbfb" : "red" }}>
                                                    {
                                                        status == "Verified" ?
                                                            "beenhere"
                                                            :
                                                            "gpp_bad"
                                                    }
                                                </span>
                                                <p className='m-0'>{status}</p>
                                            </div>
                                            {
                                                status != "Verified" && <small className='text-muted'>Request verification</small>
                                            }
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