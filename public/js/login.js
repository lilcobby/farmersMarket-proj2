const isCheckbox = document.getElementById("checkbox-signup");

const loginFormHandler = async (event) => {
     event.preventDefault();

     const usernameInput = document.querySelector("#username-login");
     const passwordInput = document.querySelector("#password-login");

     const username = usernameInput.value.trim();
     const password = passwordInput.value.trim();

     if (username && password) {
          const response = await fetch("/api/users/login", {
               method: "POST",
               body: JSON.stringify({ username, password }),
               headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
               usernameInput.classList.add("is-invalid");
               passwordInput.classList.add("is-invalid");
               document.querySelector("#password-login-feedback").textContent = "Invalid username or password.";
               return;
          }

          document.location.replace("/");
          window.location.reload();
     }
};

const signupFormHandler = async (event) => {
     event.preventDefault();
     const checkBox = isCheckbox.checked;

     const usernameInput = document.querySelector("#name-signup");
     const emailInput = document.querySelector("#email-signup");
     const passwordInput = document.querySelector("#password-signup");

     const username = usernameInput.value.trim();
     const email = emailInput.value.trim();
     const password = passwordInput.value.trim();

     if (username && email && password) {
          const checkResponse = await fetch(`/api/users/check/${username}/${email}`);
          const checkData = await checkResponse.json();

          if (checkData.exists) {
               // Display error message
               usernameInput.classList.add("is-invalid");
               emailInput.classList.add("is-invalid");
               return;
          }

          const response = await fetch("/api/users", {
               method: "POST",
               body: JSON.stringify({
                    username,
                    email,
                    password,
                    is_vendor: checkBox,
               }),
               headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
               const errorData = await response.json();
               console.log(errorData);
               return;
          }

          document.location.replace("/");
          window.location.reload();
     }
};

document.getElementById("login-form").addEventListener("submit", loginFormHandler);

document.getElementById("signup-form").addEventListener("submit", signupFormHandler);
