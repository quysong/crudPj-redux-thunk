import React, { Component } from 'react';
// import { employees } from './mockData';
import Employee from './Employee';
import PopupEmployee from './PopupEmployee';

import { connect } from 'react-redux'
import axios from 'axios';
import * as actions from './../../redux/Employee/actions'

class ListEmployee extends Component {
  constructor(props) {
    super(props);
    const newEmployee= {
      Id:0,
      Name:'',
      Email:'',
      Address:'',
      Phone:''
  }
    this.state = {
      newEmployee:newEmployee,
      employeesArr: [],
      visible: false,
      add0edit1: 0,
      employeeEditing:newEmployee,
      searchContent:''
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  openAddPopup = () => {
    this.setState({
      add0edit1: 0,
      visible:true,
      employeeEditing:this.state.newEmployee
    });
  }
  openEditPopup = (id) => {
    // const _employeeEditing=this.props.employees.filter((item,index)=>{
    //   return item.Id===id
    // })[0];
    this.props.onGetEmployeeById(id);
    this.setState({
      add0edit1: 1,
      visible:true
    });
  }
  onDeleteAnEmployee=(id)=>{
    let newArr=this.state;
    var foundIndex = newArr.employeesArr.findIndex(x => x.Id === id);
    newArr.employeesArr.splice(foundIndex,1);
    this.setState(newArr);
    localStorage.setItem('myData', JSON.stringify(newArr.employeesArr));
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleChange=(event)=>{
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => ({
      [name]: value
    }))
  }
  onClosePopup=()=>{
    this.handleCancel();
  }
  onSave=(objEmployee)=>{
    let newArr=this.state;
    if(this.state.add0edit1===0){
      //Add
      let newId=0;
      var length=newArr.employeesArr.length;
      if(length>0){
        newId= newArr.employeesArr[length-1].Id+1;
      }
      objEmployee.Id=newId;
      newArr.employeesArr.push(objEmployee);
    }else{
      //Edit
      var foundIndex = newArr.employeesArr.findIndex(x => x.Id === objEmployee.Id);
      newArr.employeesArr[foundIndex] = objEmployee;
    }
    this.setState(newArr);
    sessionStorage.setItem('myData', JSON.stringify(newArr.employeesArr));
    this.handleCancel();
  }
  componentDidMount() {
    this.props.onGetEmployee();
  }

  doSearch=(e)=>{
    e.preventDefault();
    const keyword=this.refs.keyword.value;
    this.setState({searchContent:keyword});
  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps props',props);
  }

  render() {
    var employeesArr = this.props.employees;

    if(this.state.searchContent.trim().length>0){
      employeesArr=employeesArr.filter((item,index)=>{
        return item.Name.toLowerCase().indexOf(this.state.searchContent)!==-1
      })
    }
    const employeesRows = [];
    if (employeesArr && employeesArr.length > 0) {
      employeesArr.map((item, index) => {
        employeesRows.push(
          <Employee key={index} detailsEmployee={item} editEmployee={this.openEditPopup} deleteEmployee={this.onDeleteAnEmployee}></Employee>
        )
      })
    }
    
    return (
      <>
      <PopupEmployee _add0edit1={this.state.add0edit1} isShow={this.state.visible} closePopup={this.onClosePopup} save={this.onSave} _employeeEditing={this.state.employeeEditing}>
      </PopupEmployee>
        <div>
          <div className="container">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6 customCss">
                    <h2>Manage <b>Employees</b></h2>
                  </div>
                  <div className="col-sm-6">
                    <a className="btn btn-success" onClick={this.openAddPopup}><i className="material-icons"></i> <span>Add New Employee</span></a>
                  </div>
                </div>
              </div>
              <div>
              <form className="navbar-form" role="search" onSubmit={this.doSearch}>
  <div className="input-group">
    <input type="text" className="form-control" placeholder="Search by name" ref="keyword" onChange={this.handleChange} />
    <div className="input-group-btn">
      <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search" /></button>
    </div>
  </div>
</form>

              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesRows}

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    employees:state.employee.employeeArr,
    employeeEditing:state.employee.employeeEditing
  }
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    onGetEmployee: ()=>{
      dispatch(actions.getEmployee());
    },
    onGetEmployeeById: (id)=>{
      dispatch(actions.getEmployeeById(id));
    }
  }
}

// export default ListEmployee;
export default connect(mapStateToProps,mapDispatchToProps)(ListEmployee)