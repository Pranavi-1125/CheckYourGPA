function DeleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

const tableBody = document.getElementById("subjectTableBody");
const addSub = document.getElementById("addSubject");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

addSub.addEventListener("click", function() {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" name="subject" placeholder="Subject"></td>
        <td><input type="number" name="credit" placeholder="Credit" min="1" max="4"></td>
        <td>
            <select name="grade">
                <option value="O">O</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
            </select>
        </td>
        <td><button id="deleteBtn" type="button" onclick="DeleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
});

const gradePoints = {
    "O": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "E": 5
};

calculateBtn.addEventListener("click", function() {
        let val = 0;
        let cal = 0
        let num = 0;    
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(function(row) {
            const credit = row.querySelector('input[type="number"]').value;
            const grade = row.querySelector("select").value;
            cal += parseInt(credit);
            val += parseInt(credit) * gradePoints[grade];
            num = val / cal;
            num = num.toFixed(2);
            resultDiv.innerHTML =
                "Total Points: " + val +
                "<br>Total Credits: " + cal +
                "<br>Your SGPA is: " + num;
});
});

// --------------------------------------------------

const semesterTableBody = document.getElementById("semesterTableBody");
const addSemester = document.getElementById("addSemester");
const calculateCGPABtn = document.getElementById("calculateCGPABtn");
const cgpaResult = document.getElementById("cgpaResult");

let semesterCount = 1;

// Add semester
addSemester.addEventListener("click", function() {
    semesterCount++;

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>Semester ${semesterCount}</td>

        <td>
            <input 
                class="sgpa-input" 
                type="number" 
                step="0.01" 
                min="0" 
                max="10" 
                placeholder="SGPA"
            >
        </td>

        <td>
            <input 
                class="semester-credit-input" 
                type="number" 
                min="1" 
                placeholder="Credits"
            >
        </td>

        <td>
            <button 
                type="button" 
                onclick="deleteSemester(this)"
                id="deleteBtn"
            >
                Delete
            </button>
        </td>
    `;

    semesterTableBody.appendChild(newRow);
});


// Delete semester
function deleteSemester(button) {
    const row = button.parentNode.parentNode;
    row.remove();
}


// Calculate CGPA
calculateCGPABtn.addEventListener("click", function() {

    let totalWeightedPoints = 0;
    let totalCredits = 0;

    const rows = semesterTableBody.querySelectorAll("tr");

    rows.forEach(function(row) {

        const sgpa = parseFloat(
            row.querySelector(".sgpa-input").value
        );

        const credits = parseFloat(
            row.querySelector(".semester-credit-input").value
        );

        if (!isNaN(sgpa) && !isNaN(credits)) {

            totalWeightedPoints += sgpa * credits;
            totalCredits += credits;

        }
    });

    if (totalCredits === 0) {
        cgpaResult.innerHTML = "Please enter SGPA and credits.";
        return;
    }

    const cgpa = totalWeightedPoints / totalCredits;

    cgpaResult.innerHTML =
        "Total Credits: " + totalCredits +
        "<br>Your CGPA is: " + cgpa.toFixed(2);
});