const updateBtn = document.querySelector('.updateBtn');
const productNameInput = document.getElementById("productName");
const skuInput = document.getElementById("sku");
const priceInput = document.getElementById("price");
const statusInput = document.querySelector(".status");


const descriptionInput = document.getElementById("description");
const urlInput= document.getElementById("url");

updateBtn.addEventListener('click', async () => {
  console.log("updateBtn clicked")

  const productId = document.querySelector('input[name="id"]').value;
  const productName = productNameInput.value;
  const sku = skuInput.value;
  const price = priceInput.value;
  const status = statusInput.checked ? "Active" : "Inactive";
  // console.log('dsd',status)
  const description = descriptionInput.value;
  const url = urlInput.value;


  const response = await fetch(`/admin/edit-product/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      productName,
      sku,
      price,
      description,
      status,
      url,

    }),
  }).then((res) => {
    console.log("Server response:", res);
    return res.json();
  });
  console.log(response)
  if (response.status === "success") {
    window.location.href = "/admin/admin-collection";
  } else {
    // Display an error message if the server returned an error
    const error = await response.text();
  }
});























































//   const productName = productNameInput.value;
//   const sku =skuInput.value;
//   const price =priceInput.value;
//   const status =statusInput.value;
//   const url = urlInput.value;
//   const description= descriptionInput.value;

//   const response = await fetch(`/admin/edit-product/:prodId`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ 
//       productName,
//       sku,
//       price,
//       description,
//       status,
//       url
     
//     }),
//   }).then((res) => {
//     console.log("Server response:", res);
//     return res.json();
//   });
//   console.log(response)
//   if (response.status === "ok") {
//     // Reload the page if the products were successfully deleted
//     window.location.href = "/admin/admin-collection";
//   } else {
//     // Display an error message if the server returned an error
//     const error = await response.text();
//   }
// });





