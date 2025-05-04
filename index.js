const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const addContactBtn = document.querySelector("#addContactBtn");
const contactList = document.querySelector("#contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;

    li.innerHTML = `
      <strong>${contact.firstName} ${contact.lastName}</strong><br>
      Телефон: ${contact.phone}<br>
      Email: ${contact.email}
      <div>
        <button class="edit">Редагувати</button>
        <button class="delete">Видалити</button>
      </div>
    `;

    contactList.appendChild(li);
  });
}

addContactBtn.addEventListener("click", () => {
  const newContact = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };

  if (
    newContact.firstName &&
    newContact.lastName &&
    newContact.phone &&
    newContact.email
  ) {
    contacts.push(newContact);
    saveContacts();
    renderContacts();

    firstNameInput.value = "";
    lastNameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
  } else {
    alert("Будь ласка, заповніть всі поля!");
  }
});

contactList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const index = li.dataset.index;
  const contact = contacts[index];

  if (e.target.classList.contains("delete")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }

  if (e.target.classList.contains("edit")) {
    const updatedFirstName =
      prompt("Нове ім'я:", contact.firstName) || contact.firstName;
    const updatedLastName =
      prompt("Нове прізвище:", contact.lastName) || contact.lastName;
    const updatedPhone =
      prompt("Новий телефон:", contact.phone) || contact.phone;
    const updatedEmail =
      prompt("Нова електронна адреса:", contact.email) || contact.email;

    contacts[index] = {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      phone: updatedPhone,
      email: updatedEmail,
    };

    saveContacts();
    renderContacts();
  }
});

renderContacts();
