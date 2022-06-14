import React from 'react';
import { Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../helper';

const ForgotPage = (props) => {
    const navigate = useNavigate();

    const handleForgot = async () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container d-flex flex-column align-items-center my-5 py-5'>
            <span className="material-icons my-3" style={{ color: "#48dbfb", fontSize: "200px" }}>
                contact_mail
            </span>
            <h5 className='text-muted text-center'>
                Input your email for receive reset password link
            </h5>
            <Input className='my-3 text-center' type='text' style={{ width: "250px" }} placeholder='Your email' />
            <Button color='warning'
                type='button'
                outline
                className='my-3'
                onClick={handleForgot}
            >
                Request Reset Password
            </Button>
        </div>
    )
}

export default ForgotPage;