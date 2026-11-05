const emailContact = document.querySelector(".email-contact");
const emailAddress = emailContact.querySelector("input");
const emailStatus = emailContact.querySelector(".email-status");

emailContact.querySelector(".copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress.value);
    emailStatus.textContent = "Email address copied.";
  } catch {
    emailAddress.focus();
    emailAddress.select();
    emailStatus.textContent = "Copy the selected email address.";
  }
});

emailContact.addEventListener("toggle", () => {
  emailStatus.textContent = "";
});

document.addEventListener("click", (event) => {
  if (!emailContact.contains(event.target)) {
    emailContact.open = false;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && emailContact.open) {
    emailContact.open = false;
    emailContact.querySelector("summary").focus();
  }
});
