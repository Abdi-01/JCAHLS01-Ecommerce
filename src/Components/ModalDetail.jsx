import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col, InputGroup, InputGroupText, CardImg } from 'reactstrap';

const ModalDetail = (props) => {
    let { openDetail, toggle, data } = props;
    const [nama, setNama] = React.useState(data.nama);
    const [deskripsi, setDeskripsi] = React.useState(data.deskripsi);
    const [kategori, setKategori] = React.useState(data.kategori);
    const [brand, setBrand] = React.useState(data.brand);
    const [harga, setHarga] = React.useState(data.harga);
    const [stocks, setStocks] = React.useState([...data.stock]);
    const [images, setImages] = React.useState([...data.images]);

    const printStock = () => {
        if (stocks) {
            return stocks.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" defaultValue={item.type} placeholder={`Type-${index + 1}`} onChange={(e) => handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" defaultValue={item.qty} placeholder={`Stock-${index + 1}`} onChange={(e) => handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger btn-sm" onClick={() => onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    const printImages = () => {
        if (images) {
            return images.map((item, index) => {
                return <div className='col-6 p-1' key={index}>
                    <CardImg src={item} alt="" style={{ maxHeight:"189px", objectFit:"cover" }} />
                    <InputGroup >
                        <Input type="text" defaultValue={item} placeholder={`Images-${index + 1}`} onChange={(e) => handleImages(e, index)} />
                        <InputGroupText>
                            <a className="btn btn-outline-danger btn-sm" onClick={() => onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>
                        </InputGroupText>
                    </InputGroup>
                </div>


            })
        }
    }

    const handleImages = (e, index) => {
        let temp = [...images]
        temp[index].url = e.target.value
        setImages(temp)
    }

    const handleType = (e, index) => {
        let temp = [...stocks]
        temp[index].type = e.target.value
        setStocks(temp)
    }

    const handleStock = (e, index) => {
        let temp = [...stocks]
        temp[index].qty = parseInt(e.target.value)
        setStocks(temp)
    }

    const onBtDeleteStock = (index) => {
        let temp = [...stocks]
        temp.splice(index, 1)
        setStocks(temp)
    }

    const onBtDeleteImage = (index) => {
        let temp = [...images]
        temp.splice(index, 1)
        setImages(temp)
    }

    const onBtAddStock = () => {
        let temp = [...stocks]
        temp.push({ type: null, qty: null })
        setStocks(temp)
    }

    const onBtAddImages = () => {
        let temp = [...images]
        temp.push("")
        setImages(temp)
    }

    const btSave = () => {
        let newData = {
            ...data,
            nama,
            kategori,
            brand,
            deskripsi,
            harga: parseInt(harga),
            stock: stocks,
            images
        }

        console.log(newData)

    }


    return <Modal size='lg' isOpen={openDetail} toggle={toggle} >
        <ModalHeader>
            <h5 className='fw-bold my-0'>{data.nama}</h5>
            <p className='text-muted small my-0'>{data.kategori}</p>
        </ModalHeader>
        <ModalBody>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input type="text" id="textNama" defaultValue={nama} onChange={(e) => setNama(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input type="textarea" defaultValue={deskripsi} id="textDes" onChange={(e) => setDeskripsi(e.target.value)} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textBrand">Brand</Label>
                                <Input type="select" id="selectBrand" defaultValue={brand} onChange={(e) => setBrand(e.target.value)}>
                                    <option value={null} >Choose...</option>
                                    <option value="IKEA" >IKEA</option>
                                    <option value="ACE" >ACE</option>
                                    <option value="Mr. DIY" >Mr. DIY</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input type="select" id="selectBrand" defaultValue={kategori} onChange={(e) => setKategori(e.target.value)}>
                                    <option value={null} >Choose...</option>
                                    <option value="Livingroom" >Livingroom</option>
                                    <option value="Kitchen" >Kitchen</option>
                                    <option value="Bedroom" >Bedroom</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input type="number" defaultValue={harga.toLocaleString()} id="textHarga" onChange={(e) => setHarga(e.target.value)} />
                    </FormGroup>
                </div>
                <div className='col-12 col-md-6'>
                    <FormGroup>
                        <Label>Stock</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={onBtAddStock}>Add Stock</Button>
                        <div className='mt-2'>
                            {printStock()}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Images</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={onBtAddImages}>Add Image</Button>
                        <div className='row mt-2'>
                            {printImages()}
                        </div>
                    </FormGroup>
                </div>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" >Cancel</Button>
            <Button type="button" color="primary" onClick={btSave}>Save</Button>
        </ModalFooter>
    </Modal>
}

export default ModalDetail;