const logoutButtonHandler = async () => {
  await fetch("api/users/logout", {
    method: "POST",
  });
  window.location.reload();
};

const logoutbtn = document.querySelector("#logout");

logoutbtn.addEventListener("click", logoutButtonHandler);
