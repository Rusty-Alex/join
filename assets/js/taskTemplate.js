/**
 * Generates an HTML template for displaying a contact item with a checkbox.
*/
function contactsTemp(sanitizedEachName, colour, eachName, firstNameStart, lastNameStart) {
    return `<label>
    <input type="checkbox"class="checkboxDesign" id="${sanitizedEachName}" onchange="selectionContact('${sanitizedEachName}', '${colour}')">
    <span value="${sanitizedEachName}"></span>${eachName}
    <div class="namesInitials b-${colour}">${firstNameStart}${lastNameStart}</div>
    </label>`;
}

/**
 * Generates an HTML template for a subtask input field with accompanying buttons for adding or canceling the subtask.
*/
function subTaskTemp() {
    return `<div class="smallHead">Subtasks</div>
    <div class="inputWrapper">
    <input id="inputField" class="subtasksTxt" placeholder="Add  new subtask" type="text" onfocus="renderSubTask()">
    <div class="tsksBtns"><img class="inputIcon" src="../img/subTaskCancel.svg" onclick="resetInput()"><img onclick="addList()" class="inputIcon2" src="../img/subTaskEnter.svg"></div>
</div>`;
}

/**
 * Generates an HTML list item template for displaying a subtask with edit and delete options.
*/
function generatedList(subTaskInput) {
    return `<li onmouseover="hoverEffect(this)" onmouseleave="normalEffect(this)" ondblclick="editsubTask(this)">
    <div class="leftPart"><span class="bullet"></span>${subTaskInput}</div>
    <div class="btns subTaskIcon">
    <img onclick="editsubTask(this, '${subTaskInput}')" class="inputIcon" src="../img/SubtasksEdit.png">
    <img onclick="delsubTask(this)" class="deleteIcon" src="../img/SubtasksDel.png">
</div></li>`;
}

/**
 * Generates an HTML template for an empty subtask field.
*/
function emptyField() {
    return `<div class="smallHead">Subtasks</div>
    <div class="inputWrapper" onclick="renderSubTask()"><input class="subtasksTxt" placeholder="Add new subtask" type="text">
    <img class="tsksGen" src="../img/subTaskIcon.svg"></div>`;
}

/**
 * Generates an HTML template for editing a subtask, with an input field prefilled with the current subtask value.
*/
function editTempelate(currentValue) {
    return `<div class="wrapper">
  <input type="text" value="${currentValue}" class="subTaskInput"></input> 
  <div class="btns subTaskIcon subTaskEdit">
  <img class="inputIcon" onclick="delsubTask(this)" src="../img/subTaskDelete.svg">
  <img class="deleteIcon" onclick="newSubTask(this)" src="../img/subTaskDone.svg">
</div></div>`;
}

/**
 * Generates an HTML template for displaying a newly added subtask.
*/
function newSubTemp(newValue) {
    return ` <div class="leftPart"><span class="bullet"></span>${newValue}</div>
 <div class="btns subTaskIcon">
 <img onclick="editsubTask(this, '${newValue}')" class="inputIcon" src="../img/SubtasksEdit.png">
 <img onclick="delsubTask(this)" class="deleteIcon" src="../img/SubtasksDel.png">
</div>`;
}