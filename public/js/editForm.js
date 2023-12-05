leBox = document.querySelector("#toggleBox");
const editForm = document.querySelector("#test");
const normalForm = document.querySelector("#normal");
toggleBox.addEventListener("change", () => {
  if (toggleBox.checked) {
    editForm.style.display = "block";
  } else {
    editForm.style.display = "none";
  }
});

// Add the following code to toggle the display of both elements simultaneously
toggleBox.addEventListener("change", () => {
  if (toggleBox.checked) {
    editForm.style.display = "block";
    normalForm.style.display = "none";
  } else {
    editForm.style.display = "none";
    normalForm.style.display = "block";
  }
});
