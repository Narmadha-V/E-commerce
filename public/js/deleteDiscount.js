const deleteButton = document.querySelectorAll('.delete-button')

deleteButton.forEach((button, index) => {
  button.addEventListener('click', async() => {
  console.log("delete btn clicked")
  const href = button.getAttribute('href');
  const prodId = href.substring(href.lastIndexOf('/') + 1);
  // const prodId = // retrieve the product ID for the product to be deleted
  const response = await fetch(`/admin/delete-discount/${prodId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({ 
      
     
    }),
  })
  console.log(response)
  if (response.status === 200) {
  //  console.log("discount was deleted successfully")
    
    window.location.reload();
  } else {
    // handle any errors
    console.log(`Error deleting product: ${response.statusText}`)
  }
})
})