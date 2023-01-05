const addStudentBtn = document.getElementById('addStudent');
const createTeamsBtn = document.getElementById('createTeams');
const table = document.getElementsByTagName('tbody')[0];
const studentName = document.getElementById('studnetName');
const studentInputField = document.getElementById('studnetName');
const generatedTables = document.getElementsByClassName('generated-tables')[0];
const numberOfTeams = document.getElementById('teamCount');
const addRandomBtn = document.getElementById('addRandom');
const addAllBtn = document.getElementById('addAll');
const studentArr = [];
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

addAllBtn.addEventListener('click', function () {
    addAll()
})

function addRandom() {
    let counterUnselected = 0;
    for (let i = 0; i < studentArr.length; i++) {
        if (studentArr[i].selected === false) {
            counterUnselected++;
        }
    }
    if (counterUnselected > 0 && document.getElementsByClassName('lower')[0] != null) {
        student = studentArr[Math.floor(Math.random() * studentArr.length)];
        while (student.selected === true || student.deleted === true) {
            student = studentArr[Math.floor(Math.random() * studentArr.length)];
        }
        console.log(student)
        studentArr[student.id].selected = true;
        let wListStudent = document.getElementById(`${student.id}_tableRow`);
        wListStudent.remove();
        let studentNode = document.createElement('div');
        studentNode.addEventListener('dblclick', function (event) {
            let student = this;
            addStundent(student);
            this.remove();
        })
        studentNode.classList.add('student-bubble');
        studentNode.id = student.id;
        studentNode.innerText = student.name;
        addStudentToTable(studentNode);
    }
}

function addAll() {
    let counterUnselected = 0;
    for (let i = 0; i < studentArr.length; i++) {
        if (studentArr[i].selected === false && studentArr[i].deleted === false) {
            counterUnselected++;
        }
    }
    while (counterUnselected > 0) {
        addRandom();
        counterUnselected--;
    }
}



function addStudentToTable(studentNode) {
    let studentTables = document.getElementsByClassName('lower');
    let smallestTeams = [];

    let smallestTeamSize = studentTables[0].childElementCount;
    for (const studentTable of studentTables) {
        if (studentTable.childElementCount < smallestTeamSize) {
            smallestTeamSize = studentTable.childElementCount;
        }
    }

    for (const team of studentTables) {
        if (team.childElementCount === smallestTeamSize) {
            smallestTeams.push(team)
        }
    }
    let teamNumber = Math.floor(Math.random() * smallestTeams.length);
    smallestTeams[teamNumber].appendChild(studentNode)
}

function addStundent(studentBubbleName) {
    if (studentBubbleName) {
        let tableRow = document.createElement('tr')
        tableRow.addEventListener('dblclick', function () {
            if (confirm('Do you want to delete this student?')) {
                studentArr[(parseInt(this.id))].deleted = true;
                this.remove();
            }
        })
        tableRow.innerHTML = `<td>${studentBubbleName.innerText}</td>`;
        tableRow.id = `${studentBubbleName.id}_tableRow`
        table.appendChild(tableRow)
        studentName.value = null;
        studentArr[studentBubbleName.id].selected = false;
    }
    else if (studentName.value) {
        studentArr.push({
            id: counter,
            name: studentName.value,
            group: 0,
            selected: false,
            deleted: false,
        })
        let tableRow = document.createElement('tr')
        tableRow.addEventListener('dblclick', function () {
            if (confirm('Do you want to delete this student?')) {
                studentArr[(parseInt(this.id))].deleted = true;
                this.remove();
            }
        })
        tableRow.innerHTML = `<td>${studentName.value}</td>`;
        tableRow.id = `${counter}_tableRow`
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



function formatArray() {
    //formate completely new array
    //only allow deleting studets when they are all in the waiting list?
}


/*
  tableRow.addEventListener('dblclick', function () {
            if (confirm('Do you want to delete this student?')) {
                studentArr.splice(parseInt(this.id))
                this.remove();
            }
        })

*/
