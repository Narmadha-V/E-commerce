
const cartTotalPriceElement = document.querySelector('.cart__total-price');
const discountElement = document.querySelector('.discount-Total-Price ');
const subtotalElement = document.querySelector('.subtotal');
const totalElement = document.querySelector('.totalpriceAll');
const priceInput = document.querySelectorAll('.price');
const totalPriceElement = document.querySelectorAll('.totalPrice');

const quantityInput = document.querySelectorAll('.product-thumbnail__quantity');
const quantityInputs = document.querySelectorAll('.product-thumbnail_quantity');


// Get the stored values from local storage
const storedQuantity = localStorage.getItem('quantity');
const storedPrice = localStorage.getItem('price');
const storedTotalPrice = localStorage.getItem('totalPrice');
const storedCartTotalPrice = localStorage.getItem('cartTotalPrice');
const discountValue = localStorage.getItem('discountValue');
const disTotalPrice = localStorage.getItem('discountedPrice'); // get the discount value from localStorage
 // get the discount value from localStorage

// Update the elements with the stored values
if (storedQuantity !== null) {
  quantityInput.forEach((input, index) => {
    input.textContent = storedQuantity;
  });

}
if (storedQuantity !== null) {
  // quantityInputs.textContent = storedQuantity;
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
    totalElement.textContent = storedCartTotalPrice
    discountElement.textContent=disTotalPrice
    const storedDisTotalPrice = Number(storedCartTotalPrice.replace('$', ''));
    const cartTotalPrice = parseFloat(storedDisTotalPrice);

    const discountTotPrice = Number(disTotalPrice.replace('$-', ''));
    const discountTotalPrice = parseFloat(discountTotPrice);

    const discount = parseFloat(discountValue);
    const discountedPrice = cartTotalPrice - (cartTotalPrice * (discount / 100));
    
    // Update the cart total price and discount element with the discounted price
   
    cartTotalPriceElement.textContent = `€${discountedPrice.toFixed(2)}`;
    // discountElement.textContent = `-$${discountTotalPrice.toFixed(2)}`;
  } else {
    // Otherwise, update the cart total price with the stored value
    cartTotalPriceElement.textContent = storedCartTotalPrice;

  }
  subtotalElement.textContent = storedCartTotalPrice; // Update the subtotal
  quantityInput.textContent = storedQuantity;
  quantityInputs.textContent = storedQuantity;
  totalElement.textContent = storedCartTotalPrice

  
  const subtotal = parseFloat(storedCartTotalPrice) + 20; // Add the shipping fee to the cart total
  totalElement.textContent = `€${subtotal.toFixed(2)}`; // Update the total
}
