window.onload = function () {
     const toggleBox = document.querySelector("#toggleCart");
     const toggleableElements = document.querySelectorAll(".d-none, .display");
     const offcanvasCart = document.querySelector("#offcanvasDarkNavbar");

     toggleBox.addEventListener("click", () => {
          const checkoutBtn = document.querySelector("#checkoutBtn");
          checkoutBtn.classList.toggle("d-none");
          toggleableElements.forEach((element) => {
               element.classList.toggle("d-none");
               element.classList.toggle("display");
          });
          toggleBox.classList.toggle("not-toggled");
     });

     const newAmountHandler = async (event) => {
          event.preventDefault();
          const button = event.target;
          if (button.classList.contains("updateCart")) {
               const productId = button.dataset.id;
               const newQuant = parseInt(button.closest(".d-flex").querySelector(`#newQuant${productId}`).value);
               const response = await fetch("/api/cart/", {
                    method: "POST",
                    body: JSON.stringify({ product_id: productId, quantity: newQuant }),
                    headers: { "Content-Type": "application/json" },
               });
               window.location.reload(true);
          }
     };

     offcanvasCart.addEventListener("shown.bs.offcanvas", () => {
          offcanvasCart.addEventListener("click", newAmountHandler);
     });

     const links = document.querySelectorAll("a");
     links.forEach((link) => {
          if (link.getAttribute("href") === window.location.pathname) {
               link.classList.add("active");
          }
     });
     
     checkoutBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          window.location.href = "/checkout";
     });
};
