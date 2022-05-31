import React from 'react';
import { Input, Button, FormGroup, Label } from 'reactstrap';
import { API_URL } from '../helper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartAction } from '../redux/actions/usersAction';
const CartPage = (props) => {
    const dispatch = useDispatch();

    const { role, id, cart } = useSelector((state) => {
        return {
            role: state.usersReducer.role,
            id: state.usersReducer.id,
            cart: state.usersReducer.cart
        }
    })

    const printCart = () => {
        return cart.map((value, index) => {
            return (
                <div className="row shadow p-2 mb-3 bg-white rounded" >
                    <div className="col-2 ">
                        <img src={value.img} width="100%" />
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-center flex-column">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.nama}</h5>
                        <h6 style={{ fontWeight: 'bolder' }}>Rp {value.harga.toLocaleString()}</h6>
                    </div>
                    <div className="col-1 d-flex align-items-center">
                        <h6 className="text-muted">{value.type}</h6>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ width: '50%' }}>
                                <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => onBtDec(index)}>
                                        remove
                                    </span>
                                    <Input placeholder="qty" value={value.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => onBtInc(index)}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <h6>Rp {(value.harga * value.qty).toLocaleString()}</h6>
                        </div>
                        <Button color="warning" size="sm" style={{ border: 'none', marginLeft: "1vw" }} onClick={() => this.onBtRemove(index)}>Remove</Button>
                    </div>
                </div>
            )
        })
    }

    const onBtInc = async (index) => {
        console.log(index)
        try {
            let temp = [...cart];
            console.log(temp[index].qty)
            temp[index].qty += 1
            console.log(temp[index].qty)

            let res = await axios.patch(`${API_URL}/users/${id}`, {
                cart:temp
            })
            console.log(res.data.cart)
            dispatch(updateCartAction(res.data.cart))

        } catch (error) {
            console.log(error)
        }
    }

    const onBtDec = async (index) => {
        try {
            let temp = [...cart];
            if (temp[index].qty > 1) {
                temp[index].qty -= 1
            } else {
                // this.props.deleteCart(temp[index].idcart);
            }

            let res = await axios.patch(`${API_URL}/users/${id}`, {
                cart:temp
            })
            dispatch(updateCartAction(res.data.cart))

        } catch (error) {
            console.log(error)
        }
    }

    const onBtRemove = (index) => {
        let temp = [...cart];
        // this.props.deleteCart(temp[index].idcart);
    }

    const totalPayment = () => {
        let total = 0;

        cart.forEach((value, index) => total += value.harga * value.qty)
        return total
    }

    const onBtCheckOut = () => {
        let date = new Date()
        // yang disimpan = iduser, username, invoice=#INV/ Date getTime(), date, note, total_payment, detail=array, status="Menunggu konfirmasi"
        // axios.post(`${API_URL}/transactions/checkout`, {
        //     invoice: `#INV/${date.getTime()}`,
        //     date: date.toLocaleString(),
        //     note: this.note.value,
        //     total_price: this.totalPayment() - this.state.ongkir,
        //     ongkir: this.state.ongkir,
        //     tax: this.totalPayment() * 0.1,
        //     detail: [...this.props.cart]
        // })
        //     .then((res) => {
        //         this.props.updateUserCart([], this.props.iduser)
        //         this.setState({ ongkir: 0 })
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }
    return <div className='container'>
        <h1 className="text-center mt-5">Keranjang Belanja</h1>
        <div className="row m-1">
            <div className="col-12 col-md-9">
                {printCart()}
            </div>
            <div className="col-12 col-md-3">
                <div className="shadow p-4 mb-3 bg-white rounded">
                    <h3 style={{}}>Total Payment</h3>
                    <h2 style={{ fontWeight: 'bold' }}>Rp. {totalPayment().toLocaleString()}</h2>
                    <FormGroup>
                        <Label for="ongkir">Biaya Pengiriman</Label>
                        <Input type="text" id="ongkir" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">Notes</Label>
                        <Input type="textarea" id="note" />
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                        <Button type="button" color="success" onClick={onBtCheckOut}>Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CartPage;