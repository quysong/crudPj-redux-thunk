import * as Types from './constants'

var iniState = {
    employeeArr: [],
    employeeEditing: {
        Id: 0,
        Name: '',
        Email: '',
        Address: '',
        Phone: ''
    }
}

var employee = (state = iniState, action) => {
    switch (action.type) {
        case Types.FETCH_EMPLOYEE:
            return { ...state };
        case Types.FETCH_EMPLOYEE_SUCCESS:
            state.employeeArr = action.payload;
            return { ...state };
        case Types.FETCH_EMPLOYEE_FAILURE:
            return { ...state };

        case Types.FETCH_EMPLOYEE_BY_ID:
            return { ...state };
        case Types.FETCH_EMPLOYEE_BY_ID_SUCCESS:
            return { ...state,employeeEditing:action.payload };
        case Types.FETCH_EMPLOYEE_BY_ID_FAILURE:
            return { ...state };

        case Types.INSERT_EMPLOYEE:
            return { ...state };
        case Types.INSERT_EMPLOYEE_SUCCESS:
            var newObj={...action.payload};
            var newArr = [ ...state.employeeArr ];

            

            newArr.push(newObj);
            return {
                ...state,
                employeeArr:newArr
            };
        case Types.INSERT_EMPLOYEE_FAILURE:
            return { ...state };

        case Types.UPDATE_EMPLOYEE:
            return { ...state };
        case Types.UPDATE_EMPLOYEE_SUCCESS:
            var newArr = [ ...state.employeeArr ];
            var foundIndex = newArr.findIndex(x => x.Id === action.payload.Id);
            newArr[foundIndex] = action.payload;
            return {
                ...state,
                employeeArr:newArr
            };
        case Types.UPDATE_EMPLOYEE_FAILURE:
            return { ...state };

        case Types.DELETE_EMPLOYEE:
            return { ...state };
        case Types.DELETE_EMPLOYEE_SUCCESS:
            var newState = { ...state };
            newState.employeeArr=newState.employeeArr.filter(el => el.Id !== action.payload)
            return { ...newState };
        case Types.DELETE_EMPLOYEE_FAILURE:
            return { ...state };
        default:
            return { ...state };
    }
}

export default employee;