

function contactsTemp(sanitizedEachName, colour, eachName, firstNameStart, lastNameStart) {
    return `<label>
    <input type="checkbox"class="checkboxDesign" id="${sanitizedEachName}" onchange="selectionContact('${sanitizedEachName}', '${colour}')">
    <span value="${sanitizedEachName}"></span>${eachName}
    <div class="namesInitials b-${colour}">${firstNameStart}${lastNameStart}</div>
    </label>`;
}

function subTaskTemp() {
    return `<div class="smallHead">Subtasks</div>
    <div class="inputWrapper">
    <input id="inputField" class="subtasksTxt" placeholder="Add  new subtask" type="text" onfocus="renderSubTask()">
    <div class="tsksBtns"><img class="inputIcon" src="/assets/img/subTaskCancel.svg" onclick="resetInput()"><img onclick="addList()" class="inputIcon2" src="/assets/img/subTaskEnter.svg"></div>
</div>`;
}

function generatedList(subTaskInput) {
    return `<li onmouseover="hoverEffect(this)" onmouseleave="normalEffect(this)" ondblclick="editsubTask(this)">
    <div class="leftPart"><span class="bullet"></span>${subTaskInput}</div>
    <div class="btns subTaskIcon">
    <img onclick="editsubTask(this, '${subTaskInput}')" class="inputIcon" src="/assets/img/SubtasksEdit.svg">
    <img onclick="delsubTask(this)" class="deleteIcon" src="/assets/img/SubtasksDel.svg">
  </div></li>`;
}

function emptyField() {
    return `<div class="smallHead">Subtasks</div>
    <div class="inputWrapper" onclick="renderSubTask()"><input class="subtasksTxt" placeholder="Add new subtask" type="text">
    <img class="tsksGen" src="/assets/img/subTaskIcon.svg"></div>`;
}

// reseting Global Variables
function resetingGlobalVariable() {
    expanded = false;
    names = [];
    namesInitials = [];
  }
  
  // reseting Local Variables
  function resetingLocalVariables() {    
    document.getElementById('assignHeading').innerHTML = `Select task category <img class="arrow" id="arrowRight" src="../img/dropArrow.svg" style="transform: rotate(0deg)">`;
    document.getElementById('allCntcts').style.display = "none";
    document.getElementById('arrow').style.transform = "rotate(0deg)";
    document.getElementById('subTsksBoard').innerHTML = '';
    document.getElementById('selCntcts').innerHTML = '';
  }