let index = 0;
const lessons = document.querySelector(".lesson-list");
const addButton = document.querySelector(".add");

addButton.addEventListener("click", updateHtml);
addButton.addEventListener("click", calculateGeneralAverage);
addButton.addEventListener("click", calculateTermAverage);
lessons.addEventListener("change", calculateGeneralAverage);
lessons.addEventListener("change", calculateTermAverage);
document.querySelector(".credit").addEventListener("input", calculateGeneralAverage);
document.querySelector(".credit").addEventListener("input", calculateTermAverage);
document.querySelector(".average").addEventListener("input", calculateGeneralAverage);
document.querySelector(".average").addEventListener("input", calculateTermAverage);

const grades = `
<option value="0">Not</option>
<option value="4">AA</option>
<option value="3.75">BA+</option>
<option value="3.5">BA</option>
<option value="3.25">BB+</option>
<option value="3">BB</option>
<option value="2.75">CB+</option>
<option value="2.5">CB</option>
<option value="2.25">CC+</option>
<option value="2">CC</option>
<option value="1.75">DC+</option>
<option value="1.5">DC</option>
<option value="1.25">DD+</option>
<option value="1">DD</option>
<option value="0">FF</option>
`
const credits = `
    <option value="0">Kredi</option>
    <option value="1">1</option>
    <option value="1.5">1.5</option>
    <option value="2">2</option>
    <option value="2.5">2.5</option>
    <option value="3">3</option>
    <option value="3.5">3.5</option>
    <option value="4">4</option>
    <option value="4.5">4.5</option>
    <option value="5">5</option>
`

function updateHtml() {
    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("lesson");
    lessons.append(lessonDiv);
    
    const lessonName = document.createElement("input");
    lessonName.type = "text";   
    lessonName.name = "lesson-name-" + index;
    lessonName.placeholder = "Ders İsmi"
    lessonName.classList.add("input", "lesson-item");

    const lessonGrade = document.createElement("select");
    lessonGrade.name = "lesson-grade-" + index;
    lessonGrade.classList.add("select", "lesson-item", "lesson-grade");
    lessonGrade.innerHTML = grades;
    
    const lessonCredit = document.createElement("select");
    lessonCredit.name = "lesson-credit-" + index;
    lessonCredit.classList.add("select", "lesson-item", "lesson-credit");
    lessonCredit.innerHTML = credits;

    const removeButton = document.createElement("span");
    removeButton.innerText = "delete";
    removeButton.classList.add("material-symbols-outlined", "icon", "lesson-item");
    removeButton.addEventListener("click", function() {
        lessonDiv.remove();
        calculateGeneralAverage();
        calculateTermAverage();
    });

    const retakeLabel = document.createElement("label");
    retakeLabel.innerText = "Tekrar?"
    retakeLabel.htmlFor = "retake-" + index;
    retakeLabel.classList.add("lesson-item", "retake-label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("lesson-item", "checkbox");
    checkbox.id = "retake-" + index;
    
    const retakeGrade = document.createElement("select");
    retakeGrade.classList.add("lesson-item", "select", "retake-grade");
    retakeGrade.disabled = true;

    checkbox.addEventListener("change", function() {
        calculateGeneralAverage();
        calculateTermAverage();
        if(checkbox.checked) {
            retakeGrade.disabled = false;
        } else {
            retakeGrade.disabled = true;
        }
    })

    retakeGrade.innerHTML = grades;

    lessonDiv.append(lessonName, lessonGrade, lessonCredit, retakeLabel, checkbox, retakeGrade, removeButton);
    index++;
    calculateGeneralAverage();
    calculateTermAverage();
}

function calculateGeneralAverage() {
    const creditInput = document.querySelector(".credit");
    const averageInput = document.querySelector(".average");
    let previousCredit = 0;
    let previousAverage = 0;
    if (creditInput.value === "") {
        previousCredit = 0;
    } else {
        previousCredit = parseFloat(creditInput.value);
    }

    if (averageInput.value === "") {
        previousAverage = 0;
    } else {
        previousAverage = parseFloat(averageInput.value);
    }
    
    let creditSum = previousCredit;
    let gradeSum = previousAverage * previousCredit;
    let average = 0

    const lessonList = document.querySelectorAll(".lesson");

    for (let i = 0; i < lessonList.length; i++) {
        const lessonGrade = parseFloat(lessonList[i].querySelector(".lesson-grade").value);
        const lessonCredit = parseFloat(lessonList[i].querySelector(".lesson-credit").value);
        const checkbox = lessonList[i].querySelector(".checkbox");

        if (checkbox.checked) {
            const retakeGrade = parseFloat(lessonList[i].querySelector(".retake-grade").value);
            creditSum -= lessonCredit;
            gradeSum -= retakeGrade * lessonCredit;
        }

        gradeSum += lessonGrade * lessonCredit;
        creditSum += lessonCredit;
    }

    if (creditSum > 0) {
        average = gradeSum / creditSum;
    }

    const result = document.querySelector("#general-average");
    result.innerText = "Genel Not Ortalaması: " + average.toFixed(2);
}

function calculateTermAverage() {
    let creditSum = 0;
    let gradeSum = 0;
    let average = 0

    const lessonList = document.querySelectorAll(".lesson");

    for (let i = 0; i < lessonList.length; i++) {
        const lessonGrade = parseFloat(lessonList[i].querySelector(".lesson-grade").value);
        const lessonCredit = parseFloat(lessonList[i].querySelector(".lesson-credit").value);
        gradeSum += lessonGrade * lessonCredit;
        creditSum += lessonCredit;
    }

    if (creditSum > 0) {
        average = gradeSum / creditSum;
    }

    const result = document.querySelector("#term-average");
    result.innerText = "Dönem Not Ortalaması: " + average.toFixed(2);
}
