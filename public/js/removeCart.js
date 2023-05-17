const removeProduct = document.querySelectorAll('.line-item__remove');
const productIds = document.querySelector('.remove').value;
removeProduct.forEach((button, index) => {
  button.addEventListener('click', async() => {
  console.log("delete btn clicked")
  const response = await fetch(`/product/removeItem/${productIds}`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({ 
    id:productIds
     
    }),
  })
  console.log(response)
  if (response.status === 200) {
   console.log("product was deleted successfully")
    // const row = statusInput.closest("tr");
    //  row.remove();
    window.location.reload();
  } else {
    // handle any errors
    console.log(`Error deleting product: ${response.statusText}`)
  }
})
})