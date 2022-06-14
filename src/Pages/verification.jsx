import React from 'react';
import { Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/usersAction';

const VerificationPage = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleVerified = async () => {
        console.log(params)
        try {
            let res = await Axios.patch(`${API_URL}/users/verified`, {}, {
                headers: {
                    'Authorization': `Bearer ${params.token}`
                }
            })

            if (res.data.success) {
                dispatch(loginAction(res.data));
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='container d-flex flex-column align-items-center my-5 py-5'>
            <span className="material-icons my-3" style={{ color: "#48dbfb", fontSize: "200px" }}>
                beenhere
            </span>
            <h5 className='text-muted text-center'>
                After Register, you can acces all feature with verified acoount
            </h5>
            <Button color='success'
                type='button'
                outline
                className='my-5'
                onClick={handleVerified}
            >
                Verified Your Account
            </Button>
        </div>
    )
}

export default VerificationPage;