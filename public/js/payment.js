const inputBox = document.querySelector("input");
const isNum1 = document.querySelector("#num1 input");
const isNum2 = document.querySelector("#num2 input");
const completePaymentButton = document.getElementById("completePayment");

const completeCheckout = async (event) => {
  event.preventDefault();
  if (
    inputBox.value === "" ||
    isNaN(parseInt(isNum1.value)) ||
    isNaN(parseInt(isNum2.value))
  ) {
    console.log("There is an error somewhere. Please try again.");
    return;
  } else {
    const response = await fetch("/api/cart/checkout", {
      method: "POST",
    });
    window.location.href = "/final";
  }
};

completePaymentButton.addEventListener("click", completeCheckout);
