import React, { useState } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../helper';

const Banner = (props) => {

    const [bannerList, setBannerList] = useState([])

    // componentDidMount pada functional component
    React.useEffect(() => {
        getBanner();
    }, [])

    const getBanner = () => {
        Axios.get(`${API_URL}/banner/get`)
            .then((response) => {
                console.log("From Functional Component :", response.data)
                setBannerList(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='container'>
            <UncontrolledCarousel
                className='shadow-sm'
                items={bannerList}
            />
        </div>
    )
}

export default Banner;