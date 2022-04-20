import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../helper';

const ModalAddProduct = (props) => {

    const [stocks, setStocks] = React.useState([]);
    const [images, setImages] = React.useState([]);

    onBtDeleteStock = (index) => {
        stocks.splice(index, 1)
        setStocks(stocks)
    }

    onBtDeleteImage = (index) => {
        images.splice(index, 1)
        setImages(stocks)
    }

    const printStock = () => {
        if (stocks.length > 0) {
            return stocks.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    const printImages = () => {
        if (images.length > 0) {
            return images.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="file" placeholder={`Select Images-${index + 1}`}
                            onChange={(e) => handleImages(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    return <Modal isOpen={true}  >
        <ModalHeader >Add Product</ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label for="textNama">Nama Product</Label>
                <Input type="text" id="textNama" />
            </FormGroup>
            <FormGroup>
                <Label for="textDes">Deskripsi</Label>
                <Input type="text" id="textDes" />
            </FormGroup>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="selectBrand">Brand</Label>
                        <Input type="select" id="selectBrand" >
                            <option value={null} >Choose...</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="textKategori">Kategori</Label>
                        <Input type="select" id="selectBrand" >
                            <option value={null} >Choose...</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="textHarga">Harga</Label>
                <Input type="number" id="textHarga" />
            </FormGroup>
            <FormGroup>
                <Label>Stock</Label>
                <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={onBtAddStock}>Add Stock</Button>
                {printStock()}
            </FormGroup>
            <hr />
            <FormGroup>
                <Label>Images</Label>
                <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={onBtAddImages} >Add Image</Button>
                <div className='row'>
                    {printImages()}
                </div>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button type="button" color="primary">Submit</Button>{' '}
            <Button color="secondary" >Cancel</Button>
        </ModalFooter>
    </Modal>
}

export default ModalAddProduct;