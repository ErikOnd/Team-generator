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

addAllBtn.addEventListener('click', function () {
    addAll()
})

function addRandom() {
    if (studentArr.length !== selectedStudentsArr.length) {
        let student = studentArr[Math.floor(Math.random() * studentArr.length)];
        while (selectedStudentsArr.includes(student)) {
            student = studentArr[Math.floor(Math.random() * studentArr.length)];
        }
        console.log(student)
        selectedStudentsArr.push(student);
        student.selectedPos = selectedStudentsArr.indexOf(student);
        let wListStudent = document.getElementById(`tableRow${student.id}`);
        wListStudent.remove();
        let studentNode = document.createElement('div');
        studentNode.addEventListener('dblclick', function (event) {
            let student = this;
            console.log(this)

            addStundent(student);
            this.remove();
        })
        studentNode.classList.add('student-bubble');
        studentNode.id = student.id;
        studentNode.innerText = student.name;
        addStudentToTable(studentNode)
    }
}

function addAll() {
    console.log('test')
    for (let i = 0; i < studentArr.length; i++) {
        addRandom()
    }
}



function addStudentToTable(studentNode) {
    const maxSize = Math.ceil(studentArr.length / numberOfTeams.value);
    let teamNumber = Math.floor(Math.random() * numberOfTeams.value);
    let studentTable = document.getElementsByClassName('lower')[teamNumber];
    let teamSize = studentTable.childElementCount;
    console.log(maxSize, teamSize);
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
        selectedStudentsArr.splice(studentBubbleName.selectedPos, 1);
    }
    else if (studentName.value) {
        studentArr.push({
            id: counter,
            name: studentName.value,
            group: 0,
            selectedPos: 0
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