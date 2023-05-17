const productNameInput = document.getElementById("product-name");
const skuInput = document.getElementById("sku");
const priceInput = document.getElementById("price");
const statusInput = document.querySelector(".status");
const descriptionInput = document.getElementById("description");
const urlInput= document.getElementById("url");


const messageElement = document.getElementById("message");
const btnSave = document.getElementById("btn-save");

btnSave.addEventListener("click",saveProduct);
async function saveProduct(e){
  e.preventDefault();
  const productName = productNameInput.value;
  const sku =skuInput.value;
  const price =priceInput.value;
  let statusValue = '';

  for (let i = 0; i < statusInput.length; i++) {
  if (statusInput[i].checked) {
    statusValue = statusInput[i].value;
    break;
  }
  }

  const description =descriptionInput.value;
  const url =urlInput.value;

  
  if (!productName || !sku || !price) {
    messageElement.textContent="Please fill all the fields";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 2000); // hide message after 10 seconds
    return;
  }
  const result = await fetch("/admin/add-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName,
      sku,
      price,
      description,
      url,
      statusValue
    }),
  }).then((res) => {
    console.log("Server response:", res);
    return res.json();
  });
  console.log(result)
  if (result.status === "success"){
    window.location.href = "/admin/admin-collection";
  
  } else {
    messageElement.textContent = "product already exists";
  }
}
