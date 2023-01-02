let addStudentBtn = document.getElementById('addStudent');
let createTeamsBtn = document.getElementById('createTeams');
let table = document.getElementsByTagName('tbody')[0];
let studentInputField = document.getElementById('studnetName');
let generatedTables = document.getElementsByClassName('generated-tables')[0];
let numberOfTeams = document.getElementById('teamCount');
let addRandomBtn = document.getElementById('addRandom');
let studentArr = [];
let selectedStudentsArr = [];
let counter = 0;


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

addRandomBtn.addEventListener('click', function () {
    addRandom()
})

function addRandom() {
    let student = studentArr[Math.floor(Math.random() * studentArr.length)];
    if (studentArr.length !== selectedStudentsArr.length) {
        while (selectedStudentsArr.includes(student)) {
            student = studentArr[Math.floor(Math.random() * studentArr.length)];
        }
        selectedStudentsArr.push(student);
        let wListStudent = document.getElementById(`tableRow${student.id}`);
        wListStudent.remove();
        let teamNumber = Math.floor(Math.random() * numberOfTeams.value);
        let studentNode = document.createElement('div');
        studentNode.classList.add('student-bubble');
        studentNode.innerText = student.name;
        console.log(teamNumber)
        let studentTable = document.getElementsByClassName('lower')[teamNumber];
        studentTable.appendChild(studentNode);
    }
}
function addStundent() {
    let studentName = document.getElementById('studnetName');
    if (studentName.value) {
        studentArr.push({
            id: counter,
            name: studentName.value,
            group: 0
        })
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `<td>${studentName.value}</td>`;
        tableRow.id = `tableRow${counter}`
        tableRow.addEventListener('dblclick', function (event) {
            console.log(event.target)
        })
        table.appendChild(tableRow)
        studentName.value = null;
        counter++;
    }
}

function createTable() {
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


function createTeams() {
    if (numberOfTeams.value) {
        if (document.getElementsByClassName('group-number').length > 0) {
            console.log(document.getElementsByClassName('group-number').length)
            if (confirm("You have already created teams, do you wan't to delete them and create new ones?")) {
                generatedTables.innerHTML = '';
                createTable()
            } else {
                return
            }
        }
        else {
            createTable()
        }
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