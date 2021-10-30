import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Modal, ModalBody, Button,FormGroup,Label,Input,Form } from 'reactstrap';
import { connect } from 'react-redux';

const RSModal = (props) => {
    let form = (
        <div>
            <Form>
                <FormGroup>
                    <p className='text-danger'>{props.message}</p>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Enter name" value={props.TempRecord.name || ''} onChange={(event)=>props.handleSidebarChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="eg. abc@xyz.com"  value={props.TempRecord.email || ''} onChange={(event)=>props.handleSidebarChange(event)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="textarea" name="address" id="address"  value={props.TempRecord.address || ''} onChange={(event)=>props.handleSidebarChange(event)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Enter phone number"  value={props.TempRecord.phone || ''} onChange={(event)=>props.handleSidebarChange(event)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="website">Website</Label>
                    <Input type="text" name="website" id="website" placeholder="eg. www.abc.com"  value={props.TempRecord.website || ''} onChange={(event)=>props.handleSidebarChange(event)}/>
                </FormGroup>
                <Button className='btn btn-info ml-4 col-sm-5' onClick={(event) => props.onConfirm(event)}>Confirm</Button>{' '}
                <Button className='btn btn-danger ml-3 col-sm-5' onClick={(event) => props.setShowModal(false)}>Cancel</Button>
            </Form>
        </div>

    );

    return (
            <div>
                <Modal isOpen={props.showModal} toggle={props.setShowModal}>
                    <ModalBody>
                        {form}
                    </ModalBody>
                </Modal>
            </div>
    );
}

const mapStateToProps = state => {
    return {
        message:state.message,
        showModal: state.showModal,
        Details: state.Details,
        TempRecord: state.TempRecord
    };
};

const mapDispatchToProps = dispatch => {
    return {
                setShowModal: (value) =>dispatch({type: 'SET_SHOW_MODAL', payload: value}),
                onConfirm:(event)=>dispatch({type:'ON_CONFIRM', payload:event}),
                handleSidebarChange:(event)=>dispatch({type:'HANDLE_SIDEBAR_CHANGE', payload:event})
            };
};
export default connect(mapStateToProps, mapDispatchToProps)(RSModal);