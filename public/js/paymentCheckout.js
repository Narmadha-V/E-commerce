const checkoutButton = document.querySelector('.payCheckout')
checkoutButton.addEventListener('click', async () => {
  console.log("checkout button clicked")
  const quantity = quantityInputs.value;
const response = await fetch(`/product/payment`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ 
  //  id:productIds,
  //  price,
  //  quantity,
  //  productName,
  //  cartTotalPrice,
   
  }),
})
console.log(response)
if (response.ok) {

// window.location.href = `/product/payment`;
} else {
  console.error("Failed to get product");
}
})
