let addStudentBtn = document.getElementById('addStudent');
let createTeamsBtn = document.getElementById('createTeams');
let table = document.getElementsByTagName('tbody')[0];
let counter = 1;
let studentInputField = document.getElementById('studnetName');
let studentArr = [];

studentInputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addStundent()
    }
})

addStudentBtn.addEventListener('click', function () {
    addStundent()
})

createTeamsBtn.addEventListener('click', function () {
    createTeams()
})

function addStundent() {
    let studentName = document.getElementById('studnetName');
    if (studentName) {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `<th scope="row">${counter}</th>
        <td>${studentName.value}</td>`;
        table.appendChild(tableRow)
        studentArr.push(studentName.value);
        console.log(studentArr);
        studentName.value = null;
        counter++;
    }
}


function createTeams() {
    let numberOfTeams = document.getElementById('teamCount')
    console.log(numberOfTeams.value);
}