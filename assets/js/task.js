
let token = sessionStorage.getItem('authToken');
let names = [];
let namesInitials = [];
let colours = [];
let array = [];
let expanded = false;
let dropdownOpen = false;
let task = {};

/**
 *Calls `fetchUrl` to retrieve a URL and `fetchUserData` to load user information from a specific API endpoint (`/user`).
 */
async function init() {
  fetchUrl();
  fetchUserData('/user');
}

/**
 * Combines the base URL with the provided path and attaches an authentication token.
*/
function getDatabaseUrl(path) {
  return `${BASE_URL}${path}.json?auth=${token}`;
}

/**
 * Fetches data from Firebase and initializes contact data processing.
*/
async function fetchUrl() {
  let firebaseUrl = await fetch(BASE_URL + ".json?auth=" + token);
  let firebaseUrlAsJson = await firebaseUrl.json();
  let firebaseData = Object.values(firebaseUrlAsJson);
  contactsData(firebaseData[0]);
}

/**
 * Processes contact data from Firebase.
 * Iterates through the provided contact data to extract names and pass each contact to either
 * `wthScndName` or `wthoutScndName`, based on whether they have one or two name parts.
 */
function contactsData(firebase) {
  let contactsLength = Object.values(firebase);
  let objLngth = contactsLength.length;
  setDateDisable();
  for (let i = 0; i < objLngth; i++) {
    const eachName = contactsLength[i].name;
    array.push(contactsLength[i]);
    if (array[i].name.split(' ')[1]) {
      wthScndName(i, eachName);
    }
    else { wthoutScndName(i, eachName); }
  }
}

/**
 * Extracts the color, sanitized name, and initials for each contact with a first and last name, 
 * and appends them to the contacts list with both first and last initials.
 */
function wthScndName(i, eachName) {
  let colour = array[i].color;
  let sanitizedEachName = eachName.replace(/\s+/g, '_');
  let firstName = array[i].name.split(' ')[0].toUpperCase();
  let contact = document.getElementById("allCntcts");
  let lastName = array[i].name.split(' ')[1].toUpperCase();
  let firstNameStart = firstName[0];
  let lastNameStart = lastName[0];
  contact.innerHTML += contactsTemp(sanitizedEachName, colour, eachName, firstNameStart, lastNameStart);
}

/**
 * Extracts the color, sanitized name, and first initial for each contact with only a single name part,
 * appending them to the contacts list with only the first initial.
 */
function wthoutScndName(i, eachName) {
  let colour = array[i].color;
  let sanitizedEachName = eachName.replace(/\s+/g, '_');
  let firstName = array[i].name.split(' ')[0].toUpperCase();
  let contact = document.getElementById("allCntcts");
  let firstNameStart = firstName[0];
  let lastNameStart = '';
  contact.innerHTML += contactsTemp(sanitizedEachName, colour, eachName, firstNameStart, lastNameStart);
}

/**
 * Adds selected contacts to a separate display area.
 * Updates the `selCntcts` container with selected contact initials and colors.
 */
function selectionContact(name, colour) {
  const currenID = document.getElementById(name);
  ifelseLogics(currenID, name, colour);
  let SelectedContactsBoard = document.getElementById('selCntcts');
  SelectedContactsBoard.innerHTML = '';
  for (let i = 0; i < namesInitials.length; i++) {
    const namesInitial = namesInitials[i];
    const color = colours[i];
    SelectedContactsBoard.innerHTML += `<div class="namesInitials b-${color}">${namesInitial}</div>`;
  }
}

/**
 * Manages the display of the selection div for contacts.
 * Shows up to four selected contacts in the UI and displays a "more" button if additional contacts are selected.
 */
function ifelseLogics(currenID, name, colour) {
  if (currenID.checked == true) {
    pushSelection(currenID, name, colour);
  }
  else {
    spliceSelection(currenID, name);
  }
  if (namesInitials.length > 4) {
    document.getElementById('moreIcon').classList.remove("d_noneImg");
  } else {
    document.getElementById('moreIcon').classList.add("d_noneImg");
  }
}

/**
 * Adds a contact to the selection list and updates its UI representation.
 * Sets styling for the selected contact and updates arrays based on name structure (single or two-part names).
 */
function pushSelection(currenID, name, colour) {
  currenID.parentElement.style.backgroundColor = "#2A3647";
  currenID.parentElement.style.color = "white";
  currenID.nextElementSibling.style.content = "url(../img/checkButtonSelected.svg)";
  names.push(name);
  const nameArray = name.split('_');
  const firstName = nameArray[0].toUpperCase();
  if (nameArray[1]) {
    clrWthTwoNames(nameArray, firstName, colour);
  }
  else {
    clrWthOneName(firstName, colour);
  }
}

/**
 * Adds contacts with two-part names to initials and colors arrays.
 * Extracts initials from a two-part name and pushes them, along with the color, to the relevant arrays.
 */
function clrWthTwoNames(nameArray, firstName, colour) {
  const lastName = nameArray[1].toUpperCase();
  let firstNameStart = firstName[0];
  let lastNameStart = lastName[0];
  namesInitials.push(firstNameStart + lastNameStart);
  colours.push(colour);
}

/**
 * Adds contacts with single-part names to initials and colors arrays.
 * Extracts the first initial and pushes it, along with the color, to the relevant arrays.
 */
function clrWthOneName(firstName, colour) {
  let firstNameStart = firstName[0];
  let lastNameStart = '';
  namesInitials.push(firstNameStart + lastNameStart);
  colours.push(colour);
}

/**
 * Removes a contact from the selection list and updates its UI representation.
 * Resets styling for the deselected contact and removes the contact from selection arrays.
 */
function spliceSelection(currenID, name) {
  currenID.parentElement.style.backgroundColor = "transparent";
  currenID.parentElement.style.color = "black";
  currenID.nextElementSibling.style.content = "url(../img/CheckbuttonEmpty.png)";
  const currentName = names.indexOf(name);
  names.splice(currentName, 1);
  namesInitials.splice(currentName, 1);
  colours.splice(currentName, 1);
}

/**
 * Renders the subtask input field if it doesn't exist.
*/
function renderSubTask() {
  if (!document.getElementById('inputField')) {
    document.getElementById('inputSubClass').innerHTML = subTaskTemp();
    document.getElementById('inputField').style.backgroundImage = 'none';
  }
}

/**
 * Clears the subtask input field.
*/
function resetInput() {
  document.getElementById('inputField').value = '';
  document.getElementById('inputSubClass').innerHTML = emptyField();
}

/**
 * Adds a new subtask to the subtask board.
 * Appends a new subtask item to the subtask board if the input field has a value, then clears the input field.
 */
function addList() {
  let subTaskInput = document.getElementById('inputField').value;
  let subTaskBoard = document.getElementById('subTsksBoard');
  if (subTaskInput) {
    subTaskBoard.innerHTML += generatedList(subTaskInput);
  }
  document.getElementById('inputSubClass').innerHTML = emptyField();
}

/**
 * Applies a hover effect to a subtask icon.
*/
function hoverEffect(element) {
  let buttons = element.querySelector('.btns');
  buttons.classList.remove('subTaskIcon');
}

/**
 * Removes the hover effect from a subtask icon.
*/
function normalEffect(element) {
  let buttons = element.querySelector('.btns');
  buttons.classList.add('subTaskIcon');
}

/**
 * Enables editing mode for a subtask.
*/
function editsubTask(element) {
  let parent = element.closest('li');
  let currentValue = parent.querySelector('.leftPart').innerText.trim();
  parent.innerHTML = editTempelate(currentValue);
}

/**
 * Deletes a subtask from the list.
*/
function delsubTask(element) {
  element.closest('li').remove();
}

/**
 * Saves a new or edited subtask to the list.
 * Replaces the editable input field with the updated subtask display.
 */
function newSubTask(element) {
  let parent = element.closest('li');
  let newValue = parent.querySelector('.subTaskInput').value;
  parent.innerHTML = newSubTemp(newValue);
}

/**
 * Toggles the display of the contacts dropdown and rotates the arrow icon.
 * If the dropdown is not expanded, it will display it; otherwise, it hides it.
 */
function showCheckBoxes() {
  const allCntcts = document.getElementById("allCntcts");
  if (!expanded) {
    document.getElementById('arrow').style.transform = "rotate(-180deg)";
    allCntcts.style.display = "block";
    expanded = true;
  } else {
    document.getElementById('arrow').style.transform = "rotate(0deg)";
    allCntcts.style.display = "none";
    expanded = false;
  }
}

/**
 * Toggles the visibility of the task category dropdown.
 * Shows the dropdown if it is currently hidden; hides it otherwise.
 */
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  if (!dropdownOpen) {
    dropdown.classList.remove('selectHide');
    clearFailAddCat();
    dropdownOpen = true;
  } else {
    dropdown.classList.add('selectHide');
    dropdownOpen = false;
  }
}

/**
 * Selects an option from the dropdown and updates the displayed value.
 */
function selectOption(element) {
  const customSelect = document.getElementById('customSelect');
  const hiddenSelect = document.getElementById('hiddenSelect');
  customSelect.textContent = element.textContent;
  hiddenSelect.value = element.getAttribute('data-value');
  toggleDropdown();
  customSelect.classList.remove('invalid');
}

/**
 * Resets the form and its associated variables when the reset button is clicked.
*/
function resetAll() {
  deletArray()
  resetingGlobalVariable();
  resetingLocalVariables();
  resetError();
  let allContacts = document.getElementById('allCntcts');
  let allLabels = allContacts.getElementsByTagName('label');
  for (i = 0; i < allLabels.length; i++) {
    let label = allLabels[i];
    let chkBox = label.querySelector('span');
    label.style.backgroundColor = "transparent";
    label.style.color = "black";
    chkBox.style.content = "url(../img/CheckbuttonEmpty.png)";
  }
}

/**
 * Clears all arrays used for storing task-related data.
*/
function deletArray() {
  names = [];
  namesInitials = [];
  colours = [];
  array = [];
}

/**
 * Generates a string representing the color associated with the task category.
*/
function categoryColourGen() {
  let category = document.getElementById('customSelect').innerText;
  return category.slice(0, 4);
}

/**
 * Creates a subtask object from the list of subtasks.
*/
function subtastCreate(list) {
  let subtask = {};
  for (let i = 0; i < list.length; i++) {
    let eachList = list[i];
    let listText = eachList.innerText;
    subtask[`task${i + 1}`] = listText;
  }
  return subtask
}

/**
 * Creates a checked state object for each subtask.
*/
function checkedCreate(list) {
  let checked = {};
  for (let i = 0; i < list.length; i++) {
    checked[`task${i + 1}`] = false;
  }

  return checked;
}

/**
 * Creates a contact object from the names array.
*/
function createContactFire() {
  let contacts = {};
  for (let j = 0; j < names.length; j++) {
    let name = names[j];
    let sanitizedName = name.replace(/_/g, ' ');
    contacts[`contact${j + 1}`] = sanitizedName;
  }
  return contacts;
}

/**
 * Generates a color object from the colours array.
*/
function colorFirebase() {
  let coloursAsObject = {};
  for (let k = 0; k < colours.length; k++) {
    let colour = colours[k];
    coloursAsObject[`color${k + 1}`] = colour;
  }
  return coloursAsObject;
}

/**
 * Scrolls the contact selection area to the right.
*/
function scrollOn() {
  let scrollDiv = document.getElementById('selCntcts');
  scrollDiv.scrollLeft = scrollDiv.scrollWidth;
}

/**
 * Resets global variables related to contacts and their states.
*/
function resetingGlobalVariable() {
  expanded = false;
  names = [];
  namesInitials = [];
}
