document.getElementById('add-contact-btn').addEventListener('click', function () {
    document.getElementById('overlay').classList.add('show');
});

document.getElementById('addContactSmall').addEventListener('click', function () {
    document.getElementById('overlay').classList.add('show');
});

document.getElementById('cancel-icon').addEventListener('click', function () {
    document.getElementById('overlay').classList.remove('show');
});

document.getElementById('close-btn').addEventListener('click', function () {
    reloadAdd();
});

document.getElementById('overlay').addEventListener('click', function (event) {
    if (event.target === document.getElementById('overlay')) {
        reloadAdd();
    }
});


function overlay2(i, initials) {
    return `
                     <div id="EditAreaStop" class="popupEdit">
                         <div class="popupEditLeft">
                             <div class="logoEdit">
                                 <img src="../img/Joinlogowhite.png" alt="Logo">
                             </div>
                             <h2>Edit contact</h2>
                             
                             <img class="strichEdit" src="../img/unterstrichvector.png">
                         </div>
                         <div class="popupEditRight">
                             <div >
                                <span class="contact-ellipse2 b-${array[i].color}">${initials}</span>
                             </div>
                                 
                             <form id="contactFormEdit">
                                 <div class="EditInput">
                                     <div class="input-container"><input id="name2" class="input" type="text" placeholder="Name" ></div>
                                     <div class="input-container"><input id="email2" class="input" type="email" placeholder="Email" ></div>
                                     <div id="failEmailEdit" class="fail d_none "><span>Please enter a correct email, example alex@test.de</span></div>
                                     <div class="input-container"><input id="phone2" class="input" type="tel" placeholder="Phone"></div>
                                     <div id="failPhoneEdit" class="fail d_none "><span>Please enter a correct number, just a number.</span></div>
                                    <div id="failAllEdit" class="fail d_none"><span>Please enter a name, email and phone number.</span></div>
                                 </div>
                                 <div class="popup-actions">
                                     <button onclick="deleteEdit(${i})" type="button" id="cancel-icon" class="deleteBtnEditContact">Delete</button>
                                     <button type="button" onclick="editContactData(${i})" class="createbuttoncontact" type="submit">Save <img src="../img/checkaddcontact.png"></button>
                                 </div>
                             </form>
                             <div onclick="editContactOff()" class="closeBtnEdit">
                                     <img src="../img/Close.png">
                                 </div>
                         </div>
</div>`}

function loadContactDetails(i, initials, number) {
    return `
        <div class="contact-ellipse">
        <img onclick="showContactList(${i})" class="arrowContact" src="../img/arrow-left-line.png">
            <span class="contact-ellipse2 b-${array[i].color}">${initials}</span>
            <div class="contact-mini">
                <h1>${array[i].name}</h1>
                <div id="editArea" class="editimage">
                    <img onclick="editContact(${i})" class="editimages" src="../img/editcontacts.png">
                    <img onclick="deleteContact(${number})" class="editimages2" src="../img/Deletecontact.png">
                </div>
            </div>
        </div>
        <div class="contact-info">
            <span class="CI-info">Contact Information</span>
            <p><b>Email</b></p>
            <div class="changemycolor">${array[i].email}</div>
            <p><b>Phone</b></p>
            ${array[i].rufnummer || ''}
        </div>

        <button id="editBtn" onclick="editMenuOn()" class="mini-add-contact">
                    <img  src="../img/MenuContactoptions.png">
        </button>

        <div id="editImage2" class="d_none">
        <div  class="editimage2 ">
                    <img onclick="editContact(${i})" class="editimages" src="../img/editcontacts.png">
                    <img onclick="deleteContact(${number})" class="editimages2" src="../img/Deletecontact.png">
                </div>
                </div>
`}

function loadContactData(i, initials) {
    return `<div class="contact-group">
                <div class="contact-item active2" onclick="showContactDetails(${i}, '${initials}')">
                    <div class="avatar"><span class="b-${array[i].color}">${initials}</span></div>
                    <div class="details">
                        <div class="name">${array[i].name}</div>
                        <div class="email changemycolor">${array[i].email}</div>
                    </div>
                </div>
            </div>`;
}