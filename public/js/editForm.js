const toggleBox = document.querySelector("#toggleBox");
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

// put request for product forms

//TODO: category_id needs to be fixed

const forms = document.querySelectorAll("#devView");

const formSubmitHandler = async (event) => {
  event.preventDefault();
  const form = event.target;
  const dataId = parseInt(form.getAttribute("data-id"));
  const description = form.querySelector(".Desc").value;
  const name = form.querySelector(".Nam").value;
  const price = parseFloat(form.querySelector(".Pric").value);
  const quant = parseInt(form.querySelector(".Quant").value);
  const category_id = 20;

  const response = await fetch(`/api/vendors/products/${dataId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      stock: quant,
      category_id: category_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
};

forms.forEach((form) => {
  form.addEventListener("submit", formSubmitHandler);
});
