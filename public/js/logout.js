const logoutButtonHandler = async () => {
  await fetch("api/users/logout", {
    method: "POST",
  });
  window.location.href = "/";
};

const logoutbtn = document.querySelector("#logout");

logoutbtn.addEventListener("click", logoutButtonHandler);
