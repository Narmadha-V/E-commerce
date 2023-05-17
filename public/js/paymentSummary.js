const cartTotalPriceElement = document.querySelector('.cart__total-price');
const discountElement = document.querySelector('.cart-subtotal__price ');
const subtotalElement = document.querySelector('.subtotal');
// const totalElement = document.querySelector('.cart__total-price span:first-child');
const priceInput = document.querySelectorAll('.price');
const totalPriceElement = document.querySelectorAll('.totalPrice');
const quantityInput = document.querySelectorAll('.product-thumbnail__quantity');
const quantityInputs = document.querySelectorAll('.product-thumbnail_quantity');
const totalElement = document.querySelector('.totalpriceAll');

// Get the stored values from local storage
const storedQuantity = localStorage.getItem('quantity');
const storedPrice = localStorage.getItem('price');
const storedTotalPrice = localStorage.getItem('totalPrice');
const storedCartTotalPrice = localStorage.getItem('cartTotalPrice');
const discountValue = localStorage.getItem('discountValue'); // get the discount value from localStorage

// Update the elements with the stored values

if (storedQuantity !== null) {
  quantityInput.forEach((input, index) => {
    input.textContent = storedQuantity;
  });

}if (storedQuantity !== null) {
  quantityInputs.forEach((input, index) => {
    input.textContent = storedQuantity;
  });

}
if (storedPrice !== null) {
  priceInput.forEach((input, index) => {
    input.value = storedPrice;
  });
}

if (storedTotalPrice !== null) {
  totalPriceElement.forEach((element, index) => {
    element.textContent = storedTotalPrice;
  });
}

if (storedCartTotalPrice !== null) {
  if (discountValue !== null) { // if there's a discount value stored in localStorage
    totalElement.textContent = storedCartTotalPrice;

    const storedDisTotalPrice = Number(storedCartTotalPrice.replace('$', ''));
    const cartTotalPrice = parseFloat(storedDisTotalPrice);
    const discount = parseFloat(discountValue);
    const discountedPrice = cartTotalPrice - (cartTotalPrice * (discount / 100));
    
    // Update the cart total price and discount element with the discounted price
    cartTotalPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
    discountElement.textContent = `-$${(cartTotalPrice - discountedPrice).toFixed(2)}`;
  } else {
    // Otherwise, update the cart total price with the stored value
    cartTotalPriceElement.textContent = storedCartTotalPrice;
  }
  
  // subtotalElement.textContent = storedCartTotalPrice; // Update the subtotal
  quantityInput.textContent = storedQuantity;
  quantityInputs.textContent = storedQuantity;
  totalElement.textContent = storedCartTotalPrice;

  
  const subtotal = parseFloat(storedCartTotalPrice) + 20;
  totalElement.textContent = `€${subtotal.toFixed(2)}`;
}



// PAY NOW BUTTON FUNCTION
const payNow  = document.querySelector('.payNow');
const nameOnCardInput  = document.querySelector('#nameOnCard');
const expDateInput  = document.querySelector('#expDate');
const securityCodeInput = document.querySelector('#securityCode');
const cardNumberInput  = document.querySelector('#cardNumber');
const messageElement  = document.getElementById("message");



payNow .addEventListener('click', (e) => {
  // Prevent the form from submitting and reloading the page
  e.preventDefault();

  console.log("payment btn clicked")
  // Get the input values from the form

  const cardNumber =cardNumberInput.value ;
  const nameOnCard =nameOnCardInput.value ;
  const securityCode = securityCodeInput.value;
  const expDate = expDateInput.value;

if (!cardNumber|| !nameOnCard || !securityCode || !expDate ) {
  // Display error message
  messageElement.textContent = 'Please fill all the fields.';
}else {
  

// Redirect the user to the confirmation page
window.location.href = '/product/order-success';
}
})