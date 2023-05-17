const checkoutButton = document.querySelector('.checkout')
const priceInputs = document.querySelectorAll('.price');
const quantityInputs = document.getElementById('quantity-input');
const productsId = document.querySelectorAll('.remove');
const productNameInputs = document.querySelectorAll('.cart__product-title');
const cartTotalPriceInputs = document.querySelectorAll('.cart-total-price');
const image = document.querySelectorAll('.image');
checkoutButton.addEventListener('click', async () => {
  console.log("checkout button clicked")
  const quantity = quantityInputs.value;
  const productIds = [];
  productsId.forEach(input => {
    productIds.push(input.value);
  });
  console.log(productIds)
  // Store data in localStorage
  const cartData = {
    productIds:"64646db3daffc341cb24ad0f" ,
    quantity: quantity,
  };
  localStorage.setItem('cartData', JSON.stringify(cartData));
 
  const response = await fetch(`/product/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
     productIds
     
    }),
  })
  console.log(response)
  if (response.ok) {
 
  window.location.href = `/product/checkout`;
  } else {
    console.error("Failed to get product");
  }
})
