window.addEventListener('DOMContentLoaded',(event) =>{

    createInnerHtml();

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent="";
        }
        catch(ex){
            textError.textContent=ex;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });

    
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
    employeePayrollData.department = getSelectedValues('[name=department]');
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
    unsetSelectedValues('[name=department]');
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
    let innerHtml = `${headerHtml}`
    let empPayrollList = createEmployeePayrollJSON();
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
                <img name="${empPayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img name="${empPayrollData._id}" onclick="uodate(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML=innerHtml;
}

const createEmployeePayrollJSON = () =>{
    let empPayrollListLocal = [
        {
            _name:'Amit Sharma',
            _gender: 'male',
            _department:[
                'Engineering',
                'HR',
                'Others'
            ],
            _salary:'45000',
            _startDate:'15 Jan 2021',
            _notes:'',
            _id: new Date().getTime(),
            _profile:'../assets/profile-images/Ellipse -2.png'
        },
        {
            _name:'Raghini Mate',
            _gender: 'Female',
            _department:[
                'Engineering',
                'HR',
                'Sales'
            ],
            _salary:'25000',
            _startDate:'15 Oct 2021',
            _notes:'',
            _id: new Date().getTime(),
            _profile:'../assets/profile-images/Ellipse -4.png'
        }
    ];
    return empPayrollListLocal;
}

const getdeptHtml =(depttList) => {
    let deptHtml = '';
    for(const dept of depttList){
        deptHtml = `${deptHtml}<div class= 'dept-label'>${dept}</div>`
    }
    return deptHtml;
}

















