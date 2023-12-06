var modal = document.getElementById("addToCart");
modal.addEventListener("show.bs.modal", function (event) {
     let button = event.relatedTarget;
     let productId = button.getAttribute("data-product-id");
     let productName = button.getAttribute("data-product-name");
     let productPrice = button.getAttribute("data-product-price");
     let productDescription = button.getAttribute("data-product-description");

     var modalBody = modal.querySelector(".modal-body p");

     modalBody.textContent =
          "Product ID: " +
          productId +
          "\nProduct Name: " +
          productName +
          "\nProduct Price: " +
          productPrice +
          "\nProduct Description: " +
          productDescription;

     // TODO: add to cart
});
