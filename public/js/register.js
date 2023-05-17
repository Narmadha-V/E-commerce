const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const messageElement = document.getElementById("message");

const signUpButton = document.querySelector(".button");
signUpButton.addEventListener("click", registerUser);
async function registerUser(e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (!email || !password || !confirmPassword) {
    messageElement.textContent = "Please enter both username and passwords";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 2000); // hide message after 10 seconds
    return;
  }

  // Validate the email and password
  if (!isValidEmail(email)) {
    messageElement.textContent = "Invalid email format";
    return;
  }

  if (!isValidPassword(password)) {
    messageElement.textContent = "Password must be at least 8 characters long";
    return;
  }

  const result = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

  if (result.status === "ok") {
    // alert("You are registered!!");
    window.location.href = "/product/home";
  } else {
    messageElement.textContent = "username already exists";
  }
}
function isValidEmail(email) {
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPassword(password) {
  return password.length >= 3;
}
