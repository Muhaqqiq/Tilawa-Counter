const studentList = document.getElementById("studentList");

function addStudent() {

const completeSound = document.getElementById("completeSound");

  const nameInput = document.getElementById("studentName");
  const targetInput = document.getElementById("targetCount");

  const name = nameInput.value.trim();
  const target = parseInt(targetInput.value);

  if(name === ""){
    alert("Enter student name");
    return;
  }

  if(!target || target <= 0){
    alert("Enter valid target");
    return;
  }

  let count = 0;

  const card = document.createElement("div");
  card.className = "student-card";

  card.innerHTML = `
    <h2>${name}</h2>

    <div class="count">0 / ${target}</div>

    <div class="buttons">
      <button class="add-btn">+1</button>
      <button class="minus-btn">-1</button>
    </div>

    <div class="buttons">
      <button class="reset-btn">Reset</button>
      <button class="delete-btn">Delete</button>
    </div>

    <div class="status"></div>
  `;

  const countDisplay = card.querySelector(".count");
  const addBtn = card.querySelector(".add-btn");
  const minusBtn = card.querySelector(".minus-btn");
  const resetBtn = card.querySelector(".reset-btn");
  const deleteBtn = card.querySelector(".delete-btn");
  const status = card.querySelector(".status");

  addBtn.addEventListener("click", function(){

    if(count < target){

      count++;

      countDisplay.textContent = count + " / " + target;

      if(count === target){
        status.innerHTML =
          "<div class='finished'>Completed ✅</div>";
          completeSound.play();
      }

    }

  });

  minusBtn.addEventListener("click", function(){

    if(count > 0){

      count--;

      countDisplay.textContent = count + " / " + target;

      if(count < target){
        status.innerHTML = "";
      }

    }

  });

  resetBtn.addEventListener("click", function(){

    count = 0;

    countDisplay.textContent = "0 / " + target;

    status.innerHTML = "";

  });

  deleteBtn.addEventListener("click", function(){

    const confirmDelete = confirm(
      "Are you sure you want to delete " + name + "?"
    );

    if(confirmDelete){
      card.remove();
    }

  });

  studentList.appendChild(card);

  nameInput.value = "";
  targetInput.value = "";

}
