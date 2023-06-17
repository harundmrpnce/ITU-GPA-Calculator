function calculate() {
  var lessons = document.getElementsByClassName("lesson-item");
  var creditSum = 0;
  var gradeSum = 0;

  for (var i = 0; i < lessons.length; i++) {
      var lessonGrade = lessons[i].querySelector(".grades").value;
      var credit = parseFloat(lessons[i].querySelector(".credit").value);

      switch (lessonGrade) {
          case "AA":
              gradeSum += 4 * credit;
              break;
          case "BA":
              gradeSum += 3.5 * credit;
              break;
          case "BB":
              gradeSum += 3 * credit;
              break;
          case "CB":
              gradeSum += 2.5 * credit;
              break;
          case "CC":
              gradeSum += 2 * credit;
              break;
          case "DC":
              gradeSum += 1.5 * credit;
              break;
          case "DD":
              gradeSum += 1 * credit;
              break;
          default:
              break;
      }

      creditSum += credit;
  }

  var previousCredit = parseFloat(document.getElementById("previous-credit").value);
  var previousAverage = parseFloat(document.getElementById("previous-average").value);

  if (isNaN(previousCredit)) {
      previousCredit = 0;
  }

  if (isNaN(previousAverage)) {
      previousAverage = 0;
  }

  creditSum += previousCredit;
  gradeSum += previousCredit * previousAverage;

  var average = 0;
  if (creditSum > 0) {
      average = gradeSum / creditSum;
  }

  document.getElementById("result").innerText = "Ortalama: " + average.toFixed(2);
}

function addLesson() {
  var lessonList = document.getElementById("lesson-list");
  var index = lessonList.getElementsByClassName("lesson-item").length;

  var listItem = document.createElement("div");
  listItem.className = "lesson-item";

  var lessonNameInput = document.createElement("input");
  lessonNameInput.type = "text";
  lessonNameInput.name = "lesson-name-" + index;
  lessonNameInput.placeholder = "Ders İsmi";
  lessonNameInput.className = "lesson-name";

  var lessonGradeInput = document.createElement("select");
  lessonGradeInput.name = "lesson-grade-" + index;
  lessonGradeInput.className = "grades";
  lessonGradeInput.innerHTML = `
      <option value="AA">AA</option>
      <option value="BA">BA</option>
      <option value="BB">BB</option>
      <option value="CB">CB</option>
      <option value="CC">CC</option>
      <option value="DC">DC</option>
      <option value="DD">DD</option>
      <option value="FF">FF</option>
  `;

  var creditInput = document.createElement("select");
  creditInput.name = "credit-" + index;
  creditInput.className = "credit";
  creditInput.innerHTML = `
      <option value="1">1</option>
      <option value="1.5">1.5</option>
      <option value="2">2</option>
      <option value="2.5">2.5</option>
      <option value="3">3</option>
      <option value="3.5">3.5</option>
      <option value="4">4</option>
      <option value="4.5">4.5</option>
      <option value="5">5</option>
  `;

  var removeButton = document.createElement("button");
  removeButton.textContent = "Kaldır";
  removeButton.className = "remove-button";
  removeButton.addEventListener("click", function() {
      listItem.remove();
      calculate();
  });

  listItem.appendChild(lessonNameInput);
  listItem.appendChild(lessonGradeInput);
  listItem.appendChild(creditInput);
  listItem.appendChild(removeButton);
  lessonList.appendChild(listItem);

  calculate(); 

  document.getElementById("add-lesson").removeEventListener("click", addLesson);
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("add-lesson").addEventListener("click", addLesson);

  var lessonList = document.getElementById("lesson-list");
  lessonList.addEventListener("change", function () {
      calculate();
  });
});
