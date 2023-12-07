const toggleBox = document.querySelector("#toggleBox");
const editForm = document.querySelector("#editForm");
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

const forms = document.querySelectorAll("#devView");

const formSubmitHandler = async (event) => {
     event.preventDefault();
     const form = event.target;
     const dataId = parseInt(form.getAttribute("data-id"));
     const description = form.querySelector(".Desc").value;
     const name = form.querySelector(".Nam").value;
     const price = parseFloat(form.querySelector(".Pric").value);
     const quant = parseInt(form.querySelector(".Quant").value);

     const response = await fetch(`/api/vendors/products/${dataId}`, {
          method: "PUT",
          body: JSON.stringify({
               name: name,
               description: description,
               price: price,
               stock: quant,
          }),
          headers: { "Content-Type": "application/json" },
     });
     window.location.reload(true);

     // const data = await response.json();
     // console.log(data);
};

forms.forEach((form) => {
     form.addEventListener("submit", formSubmitHandler);
});
document.addEventListener("DOMContentLoaded", (event) => {
     // new product form
     const newProdFormEntry = document.querySelector("#newProdFormEntry");

     const newProdFormEntryHandler = async (event) => {
          event.preventDefault();

          const newName = document.querySelector("#newProd-name").value;
          const newDescription = document.querySelector("#newProd-description").value;
          const newPrice = document.querySelector("#newProd-price").value;
          const newQuant = document.querySelector("#newProd-stock").value;
          const newImg = document.querySelector("#newProd-image").value;
          const newCat = document.querySelector("#newProd-category").value;

          const response = await fetch("/api/vendors/addProduct", {
               method: "POST",
               body: JSON.stringify({
                    name: newName,
                    description: newDescription,
                    price: newPrice,
                    stock: newQuant,
                    image_url: newImg,
                    category_id: newCat,
               }),
               headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
               const errorData = await response.json();
               console.error(errorData.errMessage);
               return;
          }

          const data = await response.json();
          console.log("data", data);
     };

     newProdFormEntry.addEventListener("submit", newProdFormEntryHandler);
});

/* FIXME: broke this since i change ids or something
      newProdForm.addEventListener("submit", newProdHandler); */

// submit vendor data
const vendorForm = document.querySelector("#updateForm");
const businessName = document.querySelector("#businessName");
const businessDesc = document.querySelector("#businessDescription");
const businessImg = document.querySelector("#businessImage");
const vendorBtn = document.querySelector("#vendorInfo");

// function to post
const addVendInfo = async (event) => {
     event.preventDefault();

     const name = businessName.value;
     const desc = businessDesc.value;
     const img = businessImg.value;

     const response = await fetch("/api/vendors/profile", {
          method: "PUT",
          body: JSON.stringify({
               name: name,
               description: desc,
               image_url: img,
          }),
          headers: { "Content-Type": "application/json" },
     });
     const data = await response.json();
     const businessForm = document.querySelector("#businessForm");
     businessForm.classList.toggle("d-none");

     // window.location.reload(true);
};
vendorForm.addEventListener("submit", addVendInfo);

const toggleEditInfo = document.querySelector("#toggleEditInfo");
toggleEditInfo.addEventListener("click", () => {
     const businessForm = document.querySelector("#businessForm");
     businessForm.classList.toggle("d-none");

     const newProdForm = document.querySelector("#newProdFormFill");
     const formsContainer = document.querySelector("#formsContainer");
     if (businessForm.classList.contains("d-none") && newProdForm.classList.contains("d-none")) {
          formsContainer.classList.add("d-none");
     } else {
          formsContainer.classList.remove("d-none");
     }
});

const toggleNewProduct = document.querySelector("#addNewProduct");
toggleNewProduct.addEventListener("click", () => {
     const newProdForm = document.querySelector("#newProdFormFill");
     newProdForm.classList.toggle("d-none");

     const businessForm = document.querySelector("#businessForm");
     const formsContainer = document.querySelector("#formsContainer");
     if (businessForm.classList.contains("d-none") && newProdForm.classList.contains("d-none")) {
          formsContainer.classList.add("d-none");
     } else {
          formsContainer.classList.remove("d-none");
     }
});
