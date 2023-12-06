const toggleBox = document.querySelector("#toggleCart");

toggleBox.addEventListener("change", () => {
  const hiddenElements = document.querySelectorAll(".hidden");
  const shownElements = document.querySelectorAll(".display");
  const checkoutBtn = document.querySelector("#checkoutBtn");
  if (toggleBox.checked) {
    checkoutBtn.style.display = "none";
    hiddenElements.forEach((element) => {
      element.style.display = "block";
    });
    shownElements.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    checkoutBtn.style.display = "block";
    hiddenElements.forEach((element) => {
      element.style.display = "none";
    });
    shownElements.forEach((element) => {
      element.style.display = "block";
    });
  }
});

// TODO: CHECKOUT ROUTE, CART PUT ROUTES.
