let modal = document.getElementById("addToCart");
modal.addEventListener("show.bs.modal", function (event) {
     // COMMENT: grabbing the data from the button to pass to the modal
     let button = event.relatedTarget;
     let productId = button.getAttribute("data-product-id");
     let productName = button.getAttribute("data-product-name");
     let productPrice = button.getAttribute("data-product-price");
     let productDescription = button.getAttribute("data-product-description");
     let productQty = Number(button.getAttribute("data-product-qty"));
     let vendorName = button.getAttribute("data-vendor-name");
     let vendorImg = button.getAttribute("data-vendor-img");
     let vendorId = button.getAttribute("data-vendor-id");

     // COMMENT: Grabbing the elements from the modal
     let vendorImage = document.getElementById("vendorImage");
     let vendorNameDiv = document.getElementById("vendorName");
     let productPriceP = document.getElementById("productPrice");
     let productDescriptionP = document.getElementById("productDescription");
     let productQtyP = document.getElementById("productQuantity");
     let quantityInput = document.getElementById("chooseQuantity");
     let totalCostP = document.getElementById("totalCost");
     let errorMessageP = document.getElementById("errorMessage");

     addToCartLabel.textContent = "Add " + productName + " to cart?";
     vendorImage.src = vendorImg;
     vendorNameDiv.innerHTML = `<a href="/products/${vendorId}">${vendorName} <i class="fa fa-text-height" aria-hidden="true"></i></a>`;
     productDescriptionP.textContent = productDescription;
     productQtyP.textContent = "Quantity Available: " + productQty;
     productPriceP.textContent = "$" + productPrice;

     quantityInput.value = 0; // Reset the quantity input field
     quantityInput.setAttribute("max", productQty); // Set the max attribute to productQty
     totalCostP.textContent = "Total Cost: $" + 0; // Reset the total cost
     errorMessageP.textContent = ""; // Reset the error message

     quantityInput.addEventListener("input", function () {
          let quantity = quantityInput.value;
          let totalCost = quantity * productPrice;
          totalCostP.textContent = "Total Cost: $" + totalCost;

          // If the entered quantity is greater than the available quantity, display an error message
          if (quantity > productQty) {
               errorMessageP.textContent = "The entered quantity is greater than the available quantity.";
          } else {
               errorMessageP.textContent = "";
          }
     });

     // TODO: add to cart
     let addToCartBtn = document.getElementById("addToCartBtn");
     addToCartBtn.addEventListener("click", async function () {
          let quantity = quantityInput.value;

          // If the entered quantity is greater than the available quantity, display an error message
          if (quantity > productQty) {
               errorMessageP.textContent = "The entered quantity is greater than the available quantity.";
               return;
          }
          errorMessageP.textContent = "";

          // COMMENT: POST request to add the product to the cart
          try {
               let response = await fetch("api/cart/", {
                    method: "POST",
                    body: JSON.stringify({ product_id: productId, quantity: quantity }),
                    headers: { "Content-Type": "application/json" },
               });
               if (response.ok) {
                    window.location.reload();
               } else {
                    alert("Failed to add product to cart.");
               }
          } catch (error) {
               console.log(error);
          }
     });
});
