let addStudentBtn = document.getElementById('addStudent');
let createTeamsBtn = document.getElementById('createTeams');
let table = document.getElementsByTagName('tbody')[0];
let studentName = document.getElementById('studnetName');
let studentInputField = document.getElementById('studnetName');
let generatedTables = document.getElementsByClassName('generated-tables')[0];
let numberOfTeams = document.getElementById('teamCount');
let addRandomBtn = document.getElementById('addRandom');
let addAllBtn = document.getElementById('addAll');
let studentArr = [];
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
        while (student.selected === true) {
            student = studentArr[Math.floor(Math.random() * studentArr.length)];
        }

        studentArr[student.id].selected = true;
        let wListStudent = document.getElementById(`tableRow${student.id}`);
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
        if (studentArr[i].selected === false) {
            counterUnselected++;
        }
    }
    while (counterUnselected > 0) {
        addRandom();
        counterUnselected--;
    }
}



function addStudentToTable(studentNode) {
    const maxSize = Math.ceil(studentArr.length / numberOfTeams.value);
    let teamNumber = Math.floor(Math.random() * numberOfTeams.value);
    let studentTable = document.getElementsByClassName('lower')[teamNumber];
    let teamSize = studentTable.childElementCount;
    while (maxSize < teamSize) {
        teamNumber = Math.floor(Math.random() * numberOfTeams.value);
        studentTable = document.getElementsByClassName('lower')[teamNumber];
        teamSize = studentTable.childElementCount;
    }

    studentTable.appendChild(studentNode);
}

function addStundent(studentBubbleName) {
    if (studentBubbleName) {
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `<td>${studentBubbleName.innerText}</td>`;
        tableRow.id = `tableRow${studentBubbleName.id}`
        table.appendChild(tableRow)
        studentName.value = null;
        studentArr[studentBubbleName.id].selected = false;
    }
    else if (studentName.value) {
        studentArr.push({
            id: counter,
            name: studentName.value,
            group: 0,
            selected: false
        })
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `<td>${studentName.value}</td>`;
        tableRow.id = `tableRow${counter}`
        table.appendChild(tableRow)
        studentName.value = null;
        counter++;
    }
}

function reassignIds() {
    let trNodeCollection = document.getElementsByTagName('tr');

    for (let i = 0; i < trNodeCollection.length; i++) {
        trNode.id = `tableRow1${i}`
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



//double click can edit student 