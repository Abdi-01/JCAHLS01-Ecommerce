import React from 'react';
import {
    Button, FormGroup, Input, InputGroup,
    InputGroupText, Label, Modal, ModalBody
} from 'reactstrap';

const ModalLogin = (props) => {

    const [inForm, setInForm] = React.useState({
        email: '',
        password: ''
    })

    const [visibleForm, setVisibleForm] = React.useState({
        type: "password",
        text: "Show"
    })

    const handleInput = (value, property) => {
        setInForm({ ...inForm, [property]: value })
    }

    const handleVisible = () => {
        if (visibleForm.type === "password") {
            setVisibleForm({
                type: "text",
                text: "Hide"
            })
        } else {
            setVisibleForm({
                type: "password",
                text: "Show"
            })
        }
    }

    const handleLogin = () => {
        alert(`${inForm.email} ${inForm.password}`)
    }

    return (
        <Modal isOpen={props.modalOpen} toggle={props.toggleOpen}>
            <ModalBody>
                <h5 className='mb-4 mt-3 fw-bold'>Login with your account</h5>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='text'
                        value={inForm.email}
                        onChange={(event) => handleInput(event.target.value, "email")} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <Input type={visibleForm.type}
                            value={inForm.password}
                            onChange={(event) => handleInput(event.target.value, "password")} />
                        <InputGroupText className='btn btn-secondary' onClick={handleVisible}>
                            {visibleForm.text}
                        </InputGroupText>
                    </InputGroup>
                    <div className='d-flex justify-content-end'>
                        <a className='btn p-0 text-muted'>Forgot password ?</a>
                    </div>
                </FormGroup>
                <Button type='button' className='w-100 mt-4 mb-3' color='primary' onClick={handleLogin}>
                    Login
                </Button>
            </ModalBody>
        </Modal>
    )
}

export default ModalLogin