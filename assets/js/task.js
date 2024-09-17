

let base_Url = "https://join-3edee-default-rtdb.europe-west1.firebasedatabase.app/";
let names = [];
let namesInitials = [];
let colours = [];
let array = [];

function init() {
  fetchUrl();
}

async function fetchUrl() {
  let firebaseUrl = await fetch(base_Url + ".json");
  let firebaseUrlAsJson = await firebaseUrl.json();
  let firebaseData = Object.values(firebaseUrlAsJson);
  contactsData(firebaseData[0]);
}


function contactsData(firebase) {
  let contactsLength = Object.values(firebase);

  let objLngth = contactsLength.length;
  let contact = document.getElementById("checkboxes");
  for (let i = 0; i < objLngth; i++) {
    const eachName = contactsLength[i].name;
    array.push(contactsLength[i]);
    let colour = array[i].color;
    const sanitizedEachName = eachName.replace(/\s+/g, '_');
    const firstName = array[i].name.split(' ')[0].toUpperCase();
    const lastName = array[i].name.split(' ')[1].toUpperCase();
    const firstNameStart = firstName[0];
    const lastNameStart = lastName[0];
    contact.innerHTML += `<label class="labelInfo" for="${sanitizedEachName}">
    <input type="checkbox" class="checkboxDesign" id="${sanitizedEachName}" onchange="selectionContact('${sanitizedEachName}', '${colour}')">
    <div class="namesInitials" style="background-color:${colour}">${firstNameStart}${lastNameStart}</div>
    ${eachName}<span class="checkmark"></span>
    </label>`;
  }
}

function selectionContact(name, colour) {
  const abc = document.getElementById(name);
  if (abc.checked == true) {
    names.push(name);
    const nameArray = name.split('_');
    const firstName = nameArray[0].toUpperCase();
    const lastName = nameArray[1].toUpperCase();
    let firstNameStart = firstName[0];
    let lastNameStart = lastName[0];
    namesInitials.push(firstNameStart + lastNameStart);
    colours.push(colour);
  }
  else {
    const currentName = names.indexOf(name);
    names.splice(currentName, 1);
    namesInitials.splice(currentName, 1);
    colours.splice(currentName, 1);
  }
  let SelectedContactsBoard = document.getElementById('selCntcts');
  SelectedContactsBoard.innerHTML = '';
  for (let i = 0; i < namesInitials.length; i++) {
    const namesInitial = namesInitials[i];
    const color = colours[i];
    SelectedContactsBoard.innerHTML += `<div class="namesInitials" style="background-color:${color}">${namesInitial}</div>`;
  }

}


function renderSubTask() {
  if (!document.getElementById('inputField')) {
    document.getElementById('inputSubClass').innerHTML = `<div class="smallHead">Subtasks</div>
    <div class="inputWrapper">
    <input id="inputField" class="subtasksTxt" placeholder="Add  new subtask" type="text" onfocus="renderSubTask()">
    <div class="tsksBtns"><img class="inputIcon" src="/assets/img/subTaskCancel.svg" onclick="resetInput()"><img onclick="addList()" class="inputIcon2" src="/assets/img/subTaskEnter.svg"></div>
</div>`;
  }
  document.getElementById('inputField').style.backgroundImage = 'none';
}

function resetInput() {
  document.getElementById('inputField').value = '';
  document.getElementById('inputSubClass').innerHTML = `<div class="smallHead">Subtasks</div>
  <div  onclick="renderSubTask()"><input class="subtasksTxt" placeholder="Add new subtask" type="text"><img class="tsksGen" src="/assets/img/subTaskIcon.svg"></div>`;
}

function addList() {
  let subTaskInput = document.getElementById('inputField').value;
  let subTaskBoard = document.getElementById('subTsksBoard');
  if (subTaskInput) {
    subTaskBoard.innerHTML += `<li onmouseover="hoverEffect(this)" onmouseleave="normalEffect(this)" ondblclick="editsubTask(this)">
  <div class="leftPart"><span class="bullet"></span>${subTaskInput}</div>
  <div class="btns subTaskIcon">
  <img onclick="editsubTask(this, '${subTaskInput}')" class="inputIcon" src="/assets/img/SubtasksEdit.svg">
  <img onclick="delsubTask(this)" class="deleteIcon" src="/assets/img/SubtasksDel.svg">
</div></li>`;
  }
  document.getElementById('inputField').value = '';
  document.getElementById('inputSubClass').innerHTML = `  <div class="smallHead">Subtasks</div>
  <input class="subtasksTxt" placeholder="Add new subtask" type="text" onfocus="renderSubTask()">`;
}

function hoverEffect(element) {
  let buttons = element.querySelector('.btns');
  buttons.classList.remove('subTaskIcon');
}


function normalEffect(element) {
  let buttons = element.querySelector('.btns');
  buttons.classList.add('subTaskIcon');
}

function editsubTask(element, index) {
  let parent = element.closest('li');
  parent.innerHTML = `<div class="wrapper">
  <input type="text" value="${index}" class="subTaskInput"></input> 
  <div class="btns subTaskIcon subTaskEdit">
  <img class="inputIcon" onclick="delsubTask(this)" src="/assets/img/SubTaskDelete.svg">
  <img class="deleteIcon" onclick="newSubTask(this)" src="/assets/img/SubTaskDone.svg">
</div></div>`;
}

function delsubTask(element) {
  element.closest('li').remove();
}

function newSubTask(element) {
  let parent = element.closest('li');
  let newValue = parent.querySelector('.subTaskInput').value;
  parent.innerHTML = ` <div class="leftPart"><span class="bullet"></span>${newValue}</div>
 <div class="btns subTaskIcon">
 <img onclick="editsubTask(this, '${newValue}')" class="inputIcon" src="/assets/img/SubtasksEdit.svg">
 <img onclick="delsubTask(this)" class="deleteIcon" src="/assets/img/SubtasksDel.svg">
</div>`;
}

function activateUrgent() {
  document.getElementById('btnUrgnt').classList.add("btnUrgnt");
  document.getElementById('btnMed').classList.remove("btnMed");
  document.getElementById('btnLow').classList.remove("btnLow");
  document.getElementById('btnUrgnt').innerHTML = `<div id="btnUrgnt" onclick="activateUrgent()"class=" btnUrgnt">Urgent <img src="/assets/img/prioUrgentUnselected.svg"></div>`;
  document.getElementById('btnMed').innerHTML = ` <div>Medium <img src="/assets/img/prioMedium.svg"></div>`;
  document.getElementById('btnLow').innerHTML = ` <div>Low <img src="/assets/img/prioLow.svg"></div>`;
}

function activateMedium() {
  document.getElementById('btnMed').classList.add("btnMed");
  document.getElementById('btnUrgnt').classList.remove("btnUrgnt");
  document.getElementById('btnLow').classList.remove("btnLow");
  document.getElementById('btnMed').innerHTML = `<div id="btnMed" onclick="activateMedium()"class=" btnMed">Medium <img src="/assets/img/prioMediumUnselected.svg"></div>`
  document.getElementById('btnUrgnt').innerHTML = ` <div>Urgent <img src="/assets/img/prioUrgent.svg"></div>`;
  document.getElementById('btnLow').innerHTML = ` <div>Low <img src="/assets/img/prioLow.svg"></div>`;
}

function activateLow() {
  document.getElementById('btnLow').classList.add("btnLow");
  document.getElementById('btnUrgnt').classList.remove("btnUrgnt");
  document.getElementById('btnMed').classList.remove("btnMed");
  document.getElementById('btnLow').innerHTML = `<div id="btnLow" onclick="activateLow()"class="btnLow">Low <img src="/assets/img/prioLowUnselected.svg"></div>`
  document.getElementById('btnMed').innerHTML = ` <div>Medium <img src="/assets/img/prioMedium.svg"></div>`;
  document.getElementById('btnUrgnt').innerHTML = ` <div>Urgent <img src="/assets/img/prioUrgent.svg"></div>`;
}


//Drop down function for Assigned Contacts
let expanded = false;
function showCheckBoxes() {
  const checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    document.getElementById('arrow').style.transform = "rotate(-180deg)";
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    document.getElementById('arrow').style.transform = "rotate(0deg)";
    checkboxes.style.display = "none";
    expanded = false;
  }
}


// Drop down function for category


function showCategory() {
  let subTaskexpanded = false;
  const select = document.getElementById("slection");
  document.getElementById('assignHeading').innerHTML = `Select task category <img class="arrow" id="arrowRight" src="../img/dropArrow.svg"> `;
  if (!subTaskexpanded) {
    document.getElementById('arrowRight').style.transform = "rotate(-180deg)";
    select.classList.remove("selectHide");
    subTaskexpanded = true;
  } else {
    document.getElementById('arrowRight').style.transform = "rotate(0deg)";
    select.classList.add("selectHide");
    subTaskexpanded = false;
  }
}


function showSelection(element){
  const select = element.innerHTML;
 document.getElementById('assignHeading').innerHTML = `${select}<img class="arrow" id="arrowRight" src="../img/dropArrow.svg">`;
 document.getElementById("slection").classList.add("selectHide");
}

// reseting all
function resetAll() {
  document.getElementById('btnUrgnt').innerHTML = ` <div>Urgent <img src="/assets/img/prioUrgent.svg"></div>`;
  document.getElementById('btnUrgnt').classList.remove("btnUrgnt");
  document.getElementById('btnMed').innerHTML = ` <div>Medium <img src="/assets/img/prioMedium.svg"></div>`;
  document.getElementById('btnMed').classList.remove("btnMed");
  document.getElementById('btnLow').innerHTML = ` <div>Low <img src="/assets/img/prioLow.svg"></div>`;
  document.getElementById('btnLow').classList.remove("btnLow");
  document.querySelector('.select-selected').innerText = `Select task category`;
  document.getElementById('checkboxes').style.display = "none";
  expanded = false;
  document.getElementById('arrow').style.transform = "rotate(0deg)";
  document.getElementById('subTsksBoard').innerHTML = '';
  document.getElementById('selCntcts').innerHTML = '';
  names = [];
  namesInitials = [];
}
