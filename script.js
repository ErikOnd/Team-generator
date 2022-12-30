let addStudentBtn = document.getElementById('addStudent');
let createTeamsBtn = document.getElementById('createTeams');
let table = document.getElementsByTagName('tbody')[0];
let studentInputField = document.getElementById('studnetName');
let studentTables = document.getElementsByClassName('student-tables')[0];
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
    let teamsize = studentArr.length % numberOfTeams.value;
    let assignedStudents = [];
    for (let i = 0; i < numberOfTeams.value; i++) {
        console.log(i)
        let studentGroup = document.createElement('div');
        studentGroup.classList.add('lower', 'content');

        let groupHeader = document.createElement('div');
        groupHeader.innerHTML = i + 1;
        groupHeader.classList.add('group-number');
        studentGroup.appendChild(groupHeader);
        for (j = 0; j < teamsize; j++) {
            let randomStudent = studentArr[Math.floor(Math.random() * studentArr.length)]
            while (assignedStudents.includes(randomStudent)) {
                randomStudent = studentArr[Math.floor(Math.random() * studentArr.length)]
            }
            let student = document.createElement('div');
            student.classList.add('student-bubble');
            student.innerText = randomStudent;
            studentGroup.appendChild(student);
            assignedStudents.push(randomStudent);
        }
        //remaining students?

        studentTables.appendChild(studentGroup);
    }
    assignedStudents = [];
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