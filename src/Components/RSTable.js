import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Table,Button } from 'reactstrap';
import { connect } from 'react-redux';
const RSTable = (props) => {

    let details=[...props.Details];
    let data=details.map((user,i)=>(
        <tr key={Math.random()}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>
            <Button onClick={() => {props.onPressAddOrEdit(user,i)}} className='Submit btn btn-info col-sm-5 mr-3'>
                Edit Record
            </Button>{' '}
            <Button onClick={() => {props.deleteRecord(i)}} className='Delete btn btn-danger btn btn-info col-sm-5'>
                Delete Record
            </Button>
          </td>
        </tr>
    ))

    return (
        <div className='container my-5'>
            <Table bordered>
                <thead></thead>
            <tbody>
                <tr>
                    <th>Name</th><th>Email</th><th>Address</th><th>Phone</th><th>Website</th><th>Actions</th>
                </tr>
                {data}
                <tr>
                    <td colSpan='6'>
                        <Button onClick={() => {props.onPressAddOrEdit({},-1)}} className='Add btn btn-danger float-right col-sm-3'>
                            + Add Record
                        </Button>
                    </td>
                </tr>
            </tbody>
            <tfoot></tfoot>
            </Table>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        showModal:state.showModal,
        Details:state.Details,
        TempRecord:state.TempRecord
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      setShowModal: (value) =>dispatch({type: 'SET_SHOW_MODAL', payload: value}),
      onPressAddOrEdit:(record,index)=>dispatch({type: 'ON_PRESS_ADD_OR_EDIT', payload:{record:record, index:index}}),
      deleteRecord:(index)=>dispatch({type: 'DELETE_RECORD', payload:index})
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(RSTable);