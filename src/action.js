export const LOAD_EMPLOYEE_INFO_SUCCESS = "@@employee/LOAD_EMPLOYEE_INFO_SUCCESS"
export const FILTERED_EMPLOYEE_SUCCESS = "@@employee/FILTERED_EMPLOYEE_SUCCESS"

export const loadEmployeeInfo = () => async (dispatch, getState) => {
    try {
        let query=await fetch(`/api/v1/employees`,{
            method: 'GET',
        }).catch(err => console.log('Err ', err));

        let result = await query.json();
        dispatch({type: LOAD_EMPLOYEE_INFO_SUCCESS, payload: result })
    } catch (err) {
        console.log(err);
    }

}

export const searchEmployee = (name,age) => async (dispatch, getState) => {
    let empList= getState().employeeList
    let resultList=empList;
    if(name){
        resultList=resultList.filter(emp=> {
            let value = emp.employee_name.toLowerCase();
            value = value.substring(0,name.length);
            if (value === name )
                return emp;
        })
    }
    if(age){ 
        switch(age){
            case 0:
            resultList=resultList;
            break;
            case 1:
            resultList=resultList.filter(emp=> emp.employee_age>15 &&  emp.employee_age<20)
            break;
            case 2:
            resultList=resultList.filter(emp=> emp.employee_age>20 &&  emp.employee_age<30 )
            break;
            case 3:
            resultList=resultList.filter(emp=> emp.employee_age>30 &&  emp.employee_age<40 )
            break;
            default:
        }
    }
   dispatch({type: FILTERED_EMPLOYEE_SUCCESS, payload: resultList});
}
