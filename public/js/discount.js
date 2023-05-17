const discountCodeInput = document.querySelector(".discountCode");
const discountValueInput= document.querySelector(".discountValue");
const statusInput= document.querySelectorAll(".status");
const appliesToInput = document.querySelectorAll(".appliesTo");
const specificbtn = document.getElementById("specific");

const startDateInput = document.querySelector('.startDate');
const endDateInput = document.querySelector('.endDate');
const messageElement = document.getElementById("message");
const btnSave = document.getElementById("btn-save");

specificbtn.addEventListener("click", getProduct);
async function getProduct(e) {
  e.preventDefault();
  console.log("specific button clicked");
 
 } 



btnSave.addEventListener("click", saveDiscount);

async function saveDiscount(e) {
  e.preventDefault();
  console.log("save button clicked");

  const discountCode = discountCodeInput.value;
  const discountValue = discountValueInput.value;
  let statusValue = "";
  for (let i = 0; i < statusInput.length; i++) {
    if (statusInput[i].checked) {
      statusValue = statusInput[i].value;
      break;
    }
  }
  console.log(statusValue)
  let appliesToValue = "";
  for (let i = 0; i < appliesToInput.length; i++) {
    if (appliesToInput[i].checked && appliesToInput[i].value === "All Products") {
      appliesToValue = appliesToInput[i].value;
      break;
    }else{
      if (appliesToInput[i].checked && appliesToInput[i].value === "Specific products") {
        appliesToValue = appliesToInput[i].value;
        break;
    }
  }
}
  console.log(appliesToValue);

  const startDate = new Date(startDateInput.value);
  if (isNaN(startDate)) {
    messageElement.textContent = "Please enter a valid start date";
    return;
  }

  const endDate = new Date(endDateInput.value);
  if (isNaN(endDate)) {
    messageElement.textContent = "Please enter a valid end date";
    return;
  }

  if (!discountCode || !discountValue) {
    messageElement.textContent = "Please fill all the fields";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 2000); // hide message after 10 seconds
    return;
  }
 
  
  

  const result = await fetch("/admin/creatediscount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      discountCode,
      discountValue,
      status: statusValue,
      startDate: startDate,
      endDate: endDate,
      appliesTo:appliesToValue,
    }),
  }).then((res) => {
    console.log("Server response:", res);
    return res.json();
  });

  console.log(result);

  if (result.status === "success") {
    console.log("redirecting...");
    window.location.href = "/admin/discount";
  } else {
    if(result.message){
      messageElement.textContent = result.message;
    }else{
      messageElement.textContent="Discount Already Exists"
    }
   
  }
}

