let addStudentBtn = document.getElementById('addStudent');
let createTeamsBtn = document.getElementById('createTeams');
let table = document.getElementsByTagName('tbody')[0];
let studentInputField = document.getElementById('studnetName');
let generatedTables = document.getElementsByClassName('generated-tables')[0];
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
    if (studentName.value) {
        studentArr.push(studentName.value);
        const studentIndex = (element) => element === studentName.value;
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `<th scope="row">${studentArr.findIndex(studentIndex) + 1}</th>
        <td>${studentName.value}</td>`;
        tableRow.addEventListener('dblclick', function (event) {
            console.log(event.target)
        })
        table.appendChild(tableRow)
        studentName.value = null;
    }
}


function createTeams() {
    let numberOfTeams = document.getElementById('teamCount')
    let studentTables = document.createElement('div');
    studentTables.classList.add('student-tables');
    generatedTables.appendChild(studentTables);
    for (let i = 0; i < numberOfTeams.value; i++) {
        let studentGroup = document.createElement('div');
        studentGroup.classList.add('lower', 'content');
        studentTables.appendChild(studentGroup);
        let groupHeader = document.createElement('div');
        groupHeader.innerHTML = i + 1;
        groupHeader.classList.add('group-number');
        studentGroup.appendChild(groupHeader);
    }
}



//double click can edit student 


/*

studentArr = [
    {
        index: 0,
        name: 'erik ondra',
        group: '3',
    },

    {
        index: 1,
        name: 'peter paker',
        group: '3',
    },

    {
        index: 2,
        name: 'shawn mendas',
        group: '3',
    },

    ]

*/