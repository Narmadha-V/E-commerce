const deleteButton = document.querySelectorAll('.delete-button')
const editProduct= document.querySelector('.edit__product')
deleteButton.forEach((button, index) => {
  button.addEventListener('click', async() => {
  console.log("delete btn clicked")
  const href = button.getAttribute('href');
  const prodId = href.substring(href.lastIndexOf('/') + 1);
  const response = await fetch(`/admin/delete-product/${prodId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({ 
      
     
    }),
  })
  console.log(response)
  if (response.status === 200) {
   console.log("product was deleted successfully")
    // productName.textContent=""
    // sku.textContent=""
    // price.textContent=""
    // statusInput.textContent=""
    // img.textContent=""
    // // remove the row from the table
    // const row = statusInput.closest("tr");
    //  row.remove();
    window.location.reload();

  } else {
    // handle any errors
    console.log(`Error deleting product: ${response.statusText}`)
  }
})
})