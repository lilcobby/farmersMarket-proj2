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
// put route
const newAmountHandler = async (event) => {
  event.preventDefault();
  const button = event.currentTarget;
  const hiddenDiv = button.closest(".hidden");
  const productId = hiddenDiv.dataset.id;
  const newQuant = parseInt(
    hiddenDiv.querySelector(`#newQuant${productId}`).value
  );

  const response = await fetch("/api/cart/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity: newQuant }),
    headers: { "Content-Type": "application/json" },
  });
};

document.querySelectorAll(".updateBtn").forEach((button) => {
  button.addEventListener("click", newAmountHandler);
});

checkoutBtn.addEventListener("click", (window.location.href = "/checkout"));
// delete route
// add to cart function
