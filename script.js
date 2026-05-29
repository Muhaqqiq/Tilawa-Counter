const studentList =
document.getElementById(
"studentList"
);

const completeSound =
document.getElementById(
"completeSound"
);

const searchInput =
document.getElementById(
"searchStudent"
);

const menuBtn =
document.getElementById(
"menuBtn"
);

const menuPanel =
document.getElementById(
"menuPanel"
);

const soundToggle =
document.getElementById(
"soundToggle"
);

const clearAllBtn =
document.getElementById(
"clearAllBtn"
);

const exportCSVBtn =
document.getElementById(
"exportCSV"
);

const exportTXTBtn =
document.getElementById(
"exportTXT"
);

let students =
JSON.parse(
localStorage.getItem(
"students"
)
) || [];

let addCounter =
parseInt(
localStorage.getItem(
"addCounter"
)
) || 0;

let soundEnabled =
JSON.parse(
localStorage.getItem(
"soundEnabled"
)
);

if(soundEnabled===null){

soundEnabled=true;

}

soundToggle.checked =
soundEnabled;

soundToggle.onchange=()=>{

soundEnabled=
soundToggle.checked;

localStorage.setItem(
"soundEnabled",
JSON.stringify(
soundEnabled
)
);

};

menuBtn.onclick=()=>{

menuPanel.classList.toggle(
"show"
);

};

function saveStudents(){

localStorage.setItem(
"students",
JSON.stringify(
students
)
);

}

async function showRewardAd() {

  try {

    const rewardAd =
    new admob.RewardedAd({

      adUnitId:
      "ca-app-pub-2537959556073486/2144209965"

    });

    await rewardAd.load();

    await rewardAd.show();

    console.log(
    "Reward ad completed"
    );

  } catch (err) {

    console.log(
    "Ad failed:",
    err
    );

  }

}

function renderStudents(){

studentList.innerHTML="";

const keyword=
searchInput.value
.toLowerCase();

students
.filter(s=>

s.name
.toLowerCase()
.includes(keyword)

)

.forEach(student=>{

const card=
document.createElement(
"div"
);

card.className=
"student-card";

card.innerHTML=`

<h2>${student.name}</h2>

<div class="count">

${student.count}
/
${student.target}

</div>

<div class="buttons">

<button class="add-btn">

+1

</button>

<button class="minus-btn">

-1

</button>

</div>

<div class="buttons">

<button class="reset-btn">

Reset

</button>

<button class="delete-btn">

Delete

</button>

</div>

<div class="status">

${student.count>=student.target?

"<div class='finished'>Completed ✅</div>"

:""}

</div>

`;

const countDisplay=
card.querySelector(
".count"
);

const status=
card.querySelector(
".status"
);

card.querySelector(
".add-btn"
).onclick=()=>{

if(student.count
<student.target){

student.count++;

if(
navigator.vibrate
){

navigator.vibrate(
30
);

}

countDisplay.textContent=

student.count+
" / "+
student.target;

if(
student.count===
student.target
){

if(
soundEnabled
){

completeSound.play();

}

status.innerHTML=

"<div class='finished'>Completed ✅</div>";

}

saveStudents();

}

};

card.querySelector(
".minus-btn"
).onclick=()=>{

if(student.count>0){

student.count--;

status.innerHTML="";

saveStudents();

renderStudents();

}

};

card.querySelector(
".reset-btn"
).onclick=()=>{

student.count=0;

saveStudents();

renderStudents();

};

card.querySelector(
".delete-btn"
).onclick=()=>{

if(confirm(

"Delete "+
student.name+
" ?"

)){

students=
students.filter(
s=>s!==student
);

saveStudents();

renderStudents();

}

};

studentList.appendChild(
card
);

});

}

function addStudent(){

const name=
document
.getElementById(
"studentName"
)
.value.trim();

const target=
parseInt(

document
.getElementById(
"targetCount"
)
.value

);

if(!name){

alert(
"Enter name"
);

return;

}

if(!target){

alert(
"Enter target"
);

return;

}

students.push({

name:name,

target:target,

count:0

});

addCounter++;

localStorage.setItem(

"addCounter",

addCounter

);

if(addCounter % 3 === 0){

showRewardAd();

}

saveStudents();

renderStudents();

document
.getElementById(
"studentName"
).value="";

document
.getElementById(
"targetCount"
).value="";

}

searchInput.addEventListener(

"input",

renderStudents

);

clearAllBtn.onclick=()=>{

if(confirm(

"Delete all records?"

)){

students=[];

addCounter=0;

localStorage.clear();

renderStudents();

}

};

exportCSVBtn.onclick=()=>{

let csv=

"Name,Progress,Target\n";

students.forEach(s=>{

csv+=

s.name+

","+

s.count+

","+

s.target+

"\n";

});

const blob=
new Blob(
[csv]
);

const a=
document.createElement(
"a"
);

a.href=
URL.createObjectURL(
blob
);

a.download=
"records.csv";

a.click();

};

exportTXTBtn.onclick=()=>{

let text="";

students.forEach(s=>{

text+=

s.name+

" : "+

s.count+

"/"+

s.target+

"\n";

});

const blob=
new Blob(
[text]
);

const a=
document.createElement(
"a"
);

a.href=
URL.createObjectURL(
blob
);

a.download=
"records.txt";

a.click();

};

renderStudents();
