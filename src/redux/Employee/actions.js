import * as Types from './constants'
import axios from 'axios';
import {store} from './../../redux/reduxStore'

const url='http://localhost:8888/api/employee';

axios.defaults.headers.common['Authorization'] = 'ValueToken';
axios.defaults.headers.common['Content-Type'] = 'application/json';

var arrEmployee=[];
store.subscribe(()=>{
  arrEmployee=[...store.getState().employee.employeeArr];
})


export const getEmployee=()=>{
  return (dispatch )=>{
    dispatch({ type: Types.FETCH_EMPLOYEE });
    return axios
      .get(url)
      .then(res => {
        dispatch(getEmployeeSuccess(res.data.data.recordset));
      })
      .catch(err => {
        dispatch(getEmployeeFailure(err.message));
      });
  }
}
const getEmployeeSuccess = data => ({
  type:Types.FETCH_EMPLOYEE_SUCCESS,
  payload: data
});
const getEmployeeFailure = error => ({
  type:Types.FETCH_EMPLOYEE_FAILURE,
  payload: error
});

export const getEmployeeById=(id)=>{
  return (dispatch )=>{
    dispatch({ type: Types.FETCH_EMPLOYEE_BY_ID });
    return axios
      .get(url+"/"+id)
      .then(res => {
        dispatch(getEmployeeByIdSuccess(res.data.data.recordset[0]));
      })
      .catch(err => {
        dispatch(getEmployeeByIdFailure(err.message));
      });
  }
}
const getEmployeeByIdSuccess = employee => ({
  type:Types.FETCH_EMPLOYEE_BY_ID_SUCCESS,
  payload: employee
});
const getEmployeeByIdFailure = error => ({
  type:Types.FETCH_EMPLOYEE_BY_ID_FAILURE,
  payload: error
});

export const insertEmployee=(employee)=>{
  
  return (dispatch )=>{
    if (arrEmployee.length > 0) {
        employee.Id = arrEmployee[arrEmployee.length - 1].Id + 1;
    }else{
        employee.Id = 0;
    }
    dispatch({ type: Types.INSERT_EMPLOYEE });
    return axios
      .post(url,employee)
      .then(res => {
        console.log('employee',employee);
        dispatch(insertEmployeeSuccess(employee));
      })
      .catch(err => {
        dispatch(insertEmployeeFailure(err.message));
      });
  } 
}
const insertEmployeeSuccess = (employee) => ({
  type:Types.INSERT_EMPLOYEE_SUCCESS,
  payload: employee
});
const insertEmployeeFailure = error => ({
  type:Types.INSERT_EMPLOYEE_FAILURE,
  payload: error
});

export const editEmployee=(employee)=>{
  return (dispatch )=>{
    dispatch({ type: Types.UPDATE_EMPLOYEE });
    return axios
      .put(url+"/"+employee.Id,employee)
      .then(res => {
        dispatch(editEmployeeSuccess(employee));
      })
      .catch(err => {
        dispatch(editEmployeeFailure(err.message));
      });
  } 
}
const editEmployeeSuccess = (employee) => ({
  type:Types.UPDATE_EMPLOYEE_SUCCESS,
  payload: employee
});
const editEmployeeFailure = error => ({
  type:Types.UPDATE_EMPLOYEE_FAILURE,
  payload: error
});

export const deleteEmployee=(id)=>{
  return (dispatch )=>{
    dispatch({ type: Types.DELETE_EMPLOYEE });
    return axios
      .delete(url+"/"+id)
      .then(res => {
        dispatch(deleteEmployeeSuccess(id));
      })
      .catch(err => {
        dispatch(deleteEmployeeFailure(err.message));
      });
  }
}
const deleteEmployeeSuccess = id => ({
  type:Types.DELETE_EMPLOYEE_SUCCESS,
  payload: id
});
const deleteEmployeeFailure = error => ({
  type:Types.DELETE_EMPLOYEE_FAILURE,
  payload: error
});