import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import { connect } from 'react-redux'
import * as actions from './../../redux/Employee/actions'

class PopupEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      employee: {}
    }
  }

  handleChange = (event) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      employee: {
        ...prevState.employee,
        [name]: value
      }
    }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps._add0edit1 === 0) {
      // Get clean from state
      this.setState({
        employee: {
          Id: 0,
          Name: '',
          Email: '',
          Address: '',
          Phone: ''
        }
      })
    } else {
      // Get from store redux
      this.setState({ employee: nextProps._employeeEditing })
    }

  }
  saveEmployee = () => {
    if (this.state.employee.Id === 0) {
      // Add
      this.props.onInsertEmployee(this.state.employee);
    } else {
      // Edit
      this.props.onEditEmployee(this.state.employee);
    }
    this.props.closePopup();

    // this.props.save(this.state.employee);
  }

  render() {
    return (
      <>
        <Modal
          title={this.props._add0edit1 === 0 ? 'Add Employee' : 'Edit Employee'}
          visible={this.props.isShow}
          onCancel={this.props.closePopup}
          footer={[
            <Button key="back" onClick={this.props.closePopup}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.saveEmployee}>
              Save
            </Button>,
          ]}
        >
          <div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" name="Name" onChange={this.handleChange} value={this.state.employee.Name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="Email" onChange={this.handleChange} value={this.state.employee.Email} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea className="form-control" name="Address" onChange={this.handleChange} value={this.state.employee.Address} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" className="form-control" name="Phone" onChange={this.handleChange} value={this.state.employee.Phone} />
            </div>
          </div>

        </Modal>
      </>
    );
  }
}

// export default PopupEmployee;

const mapStateToProps = (state) => {
  return {
    employees: state.employee.employeeArr,
    _employeeEditing: state.employee.employeeEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInsertEmployee: (obj) => {
      dispatch(actions.insertEmployee(obj));
    },
    onEditEmployee: (obj) => {
      dispatch(actions.editEmployee(obj));
    }
  }
}

// export default PopupEmployee;
export default connect(mapStateToProps, mapDispatchToProps
)(PopupEmployee)