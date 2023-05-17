const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageElement = document.getElementById("message");
const loginButton = document.querySelector(".button");
loginButton.addEventListener("click", loginUser);
async function loginUser(e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email || !password) {
    messageElement.textContent = "Please enter both username and passwords.";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 2000); // hide message after 10 seconds
    return;
  }
  const result = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
console.log(result)
  if (result.status === "success") {
    localStorage.setItem("token", JSON.stringify(result.token));
    localStorage.setItem("user", JSON.stringify(result.email));
    localStorage.setItem("userId", JSON.stringify(result.id));
    localStorage.setItem("role", JSON.stringify(result.role));


    messageElement.textContent = "You are logged in";
    if (localStorage.getItem("token")) {
      const storedRole = JSON.parse(localStorage.getItem("role"));
    
      if (storedRole === "admin") {
        // Redirect to the admin page
        window.location.href = "/admin/admin-collection";
      } else {
        // Redirect to the home page
        window.location.href = "/product/home";
      }
    }
    
  } else {
    messageElement.textContent = "check mailid and password";
  }
}
