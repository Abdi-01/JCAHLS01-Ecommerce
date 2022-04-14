import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';

const ProductsAdmin = (props) => {

    const [dbProducts, setDbProducts] = React.useState([]);

    React.useEffect(() => {
        getProducts()
    }, []);

    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                console.log(response.data)
                setDbProducts(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const printProducts=()=>{
        
    }

    return (
        <div className='container py-4'>
            <h3>Products Admin</h3>
            <div className='row'>
                <div className='col-3'>

                </div>
                <div className='col-9'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Products</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Stocks</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductsAdmin;