import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button, Modal, ModalHeader } from 'reactstrap';
import ModalDetail from '../Components/ModalDetail';

const ProductsAdmin = (props) => {

    const [dbProducts, setDbProducts] = React.useState([]);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [selectedIdx, setSelectedIdx] = React.useState(null);

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

    const printProducts = () => {
        return dbProducts.map((value, index) => {
            let totalStocks = 0;
            value.stock.forEach(val => totalStocks += val.qty);

            return <tr key={value.id} className="align-middle">
                <th>{index + 1}</th>
                <td><img alt={`${value.id}-${value.nama}`} width="150px" src={value.images[0]} /></td>
                <td>
                    <h5 className='fw-bold'>
                        {value.nama}
                    </h5>
                    <p className='text-muted'>{value.kategori}</p>
                </td>
                <td>{totalStocks.toLocaleString()}</td>
                <td>IDR. {value.harga.toLocaleString()}</td>
                <td >
                    <Button
                        color='info'
                        className='w-100 my-2'
                        outline
                        onClick={() => handleDetail(index)}
                    >
                        Detail
                    </Button>
                    <Button
                        type='button'
                        color='warning'
                        className='w-100 my-2'
                        outline
                        onClick={() => handleDelete(value.id)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        })
    }

    const handleDelete = (id) => {
        // 1. Menghapus data pada server berdasarkan parameter id data
        Axios.delete(`${API_URL}/products/${id}`)
            .then((response) => {
                // 2. Jika berhasil, get ulang data
                getProducts();
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleDetail = (idx) => {
        setSelectedIdx(idx);
        setOpenDetail(!openDetail);
    }

    const handleToggle = () => {
        setSelectedIdx(null);
        setOpenDetail(!openDetail);
    }

    return (
        <div className='container py-4'>
            <h3>Products Admin</h3>
            {
                selectedIdx >= 0 && selectedIdx != null ?
                    <ModalDetail
                        openDetail={openDetail}
                        toggle={handleToggle}
                        data={dbProducts[selectedIdx]}
                    />
                    :
                    null
            }
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
                                <th>Stocks</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {printProducts()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductsAdmin;