let empPayrollList;
window.addEventListener('DOMContentLoaded',(event) =>{
    
    empPayrollList = getEmpPayrollDataFromStorage();
    createInnerHtml();

    localStorage.removeItem('editEmp');
});

const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(ex){
        return;
    }
}

const createEmployeePayroll = () =>{
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }
    catch(ex){
        setTextValue('.text-error',ex);
    }

    employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[class=checkbox]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
                getInputValueById('#year');

    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];

    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });

    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList = [employeePayrollData]
    }

    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const resetForm = () =>{
    setValue ('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[class=checkbox]');
    setValue('#salary',"40000");
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2022');

}

const unsetSelectedValues= (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue= (id,value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue= (id,value) =>{
    const element = document.querySelector(id);
    element.value = value;
}

const createInnerHtml= () =>{
    
    const headerHtml ="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    if(empPayrollList.length ==0) return;
    let innerHtml = `${headerHtml}`
    for(const empPayrollData of empPayrollList){
         innerHtml=`${innerHtml}
        <tr>
            <td>
                <img class="profile" src="${empPayrollData._profile}" alt="">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getdeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img id="${empPayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img id="${empPayrollData._id}" onclick="uodate(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML=innerHtml;
}

const getdeptHtml =(depttList) => {
    let deptHtml = '';
    for(const dept of depttList){
        deptHtml = `${deptHtml}<div class= 'dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const getEmpPayrollDataFromStorage = () =>{
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const remove = (node) =>{
    let empPayrollData = empPayrollList.find(empData => empData._id == node._id);
    if(!empPayrollData) return;
    const index = empPayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
    
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}














