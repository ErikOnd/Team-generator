const addStudentBtn = document.getElementById('addStudent');
const createTeamsBtn = document.getElementById('createTeams');
const table = document.getElementsByTagName('tbody')[0];
const studentName = document.getElementById('studnetName');
const studentInputField = document.getElementById('studnetName');
const generatedTables = document.getElementsByClassName('generated-tables')[0];
const numberOfTeams = document.getElementById('teamCount');
const cpyBtn = document.getElementsByClassName('cpy-btn')[0];
const addRandomBtn = document.getElementById('addRandom');
const addAllBtn = document.getElementById('addAll');
const reloadBtn = document.getElementsByClassName('reload-btn')[0]
const studentArr = [];
let counter = 0;

reloadBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to reload everyting? All the names will be lost')) {
        document.location.reload()
    }
});

studentInputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addStundent();
    }
});

addStudentBtn.addEventListener('click', function () {
    addStundent();
});

createTeamsBtn.addEventListener('click', function () {
    createTeams();
});

addRandomBtn.addEventListener('click', function () {
    addRandom();
});

addAllBtn.addEventListener('click', function () {
    addAll();
});

function addRandom() {
    let counterUnselected = 0;
    for (let i = 0; i < studentArr.length; i++) {
        if (studentArr[i].selected === false && studentArr[i].deleted === false) {
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
        studentNode.addEventListener('dblclick', function () {
            addStundent(this);
            this.remove();
        })
        studentNode.classList.add('student-bubble');
        studentNode.draggable = true;
        studentNode.id = student.id;
        studentNode.innerText = student.name;
        studentNode.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
        //hier weiter machen 
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
            smallestTeams.push(team);
        }
    }
    let teamNumber = Math.floor(Math.random() * smallestTeams.length);
    studentArr[studentNode.id].group = teamNumber + 1;
    smallestTeams[teamNumber].appendChild(studentNode);
}


function addAllStudents() {
    for (const student of studentArr) {
        if (student.deleted === false && student.selected === true) {
            let tableRow = document.createElement('tr');
            tableRow.addEventListener('dblclick', function () {
                studentArr[(parseInt(this.id))].deleted = true;
                studentName.value = this.innerText;
                studentName.focus();
                this.remove();
            })
            tableRow.innerHTML = `<td>${student.name}</td>`;
            tableRow.id = `${student.id}_tableRow`;
            table.appendChild(tableRow);
            studentName.value = null;
            student.selected = false;
            student.group = 0;
        }
    }
}


function addStundent(studentBubbleName) {
    if (studentBubbleName) {
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', function () {
            studentArr[(parseInt(this.id))].deleted = true;
            studentName.value = this.innerText;
            studentName.focus();
            this.remove();
        })
        tableRow.innerHTML = `<td>${studentBubbleName.innerText}</td>`;
        tableRow.id = `${studentBubbleName.id}_tableRow`;
        table.appendChild(tableRow);
        studentName.value = null;
        studentArr[studentBubbleName.id].selected = false;
        studentArr[studentBubbleName.id].group = 0;
    }
    else if (studentName.value) {
        studentArr.push({
            id: counter,
            name: studentName.value,
            group: 0,
            selected: false,
            deleted: false,
        });
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', function () {
            studentArr[(parseInt(this.id))].deleted = true;
            studentName.value = this.innerText;
            studentName.focus();
            this.remove();
        })
        tableRow.innerHTML = `<td>${studentName.value}</td>`;
        tableRow.id = `${counter}_tableRow`;
        table.appendChild(tableRow);
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
        studentGroup.id = `${i + 1}_table`
        studentGroup.addEventListener('dragover', function (event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        });
        studentGroup.addEventListener('drop', function (event) {
            event.preventDefault;
            const readID = event.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(readID);
            event.target.appendChild(draggedElement);
        })
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
                createTable();
                addAllStudents();
            } else {
                return;
            }
        }
        else {
            createTable();
        }
    }
}


function myFunction() {
    let studentTables = document.getElementsByClassName('lower');
    let counter = 1;
    let copyText = '';
    for (const studentTable of studentTables) {
        copyText += `Team ${counter}: `;
        for (let i = 1; i < studentTable.children.length; i++) {
            copyText += `${studentTable.children[i].innerHTML}`
            if (i !== studentTable.children.length - 1) {
                copyText += ', '
            }
        }
        copyText += '\n';
        counter++;
    }
    console.log(copyText)
    navigator.clipboard.writeText(copyText);
}
