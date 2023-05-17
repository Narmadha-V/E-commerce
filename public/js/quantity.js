
const quantityInput = document.getElementById('quantity-input');
const productId= document.querySelector('.product-sku');
const nodiscountPrice = document.querySelector('.nodiscountTotalPrice ');
const noProducts = document.querySelector('.noProducts');



const priceInput = document.querySelectorAll('.price');
const totalPriceElement = document.querySelectorAll('.totalPrice');
const cartTotalPriceElement = document.querySelector('.cart-total-price');
const updateButtons = document.querySelectorAll('.updateQuantity');

// Check if there are previously stored input field values and cart total price in local storage
if (localStorage.getItem('quantity')) {
  quantityInput.value = localStorage.getItem('quantity');
}
if (localStorage.getItem('price')) {
  priceInput.value = localStorage.getItem('price');
}
if (localStorage.getItem('totalPrice')) {
  totalPriceElement.textContent = localStorage.getItem('totalPrice');
}
if (localStorage.getItem('cartTotalPrice')) {
  cartTotalPriceElement.textContent = localStorage.getItem('cartTotalPrice');
}
if (localStorage.getItem('cartTotalPrice')) {
  nodiscountPrice.textContent = localStorage.getItem('cartTotalPrice');
}


// Set the cart total price and total price in the DOM and in local storage
updateButtons.forEach((button, index) => {
  button.addEventListener('click', async() => {
    const quantity = quantityInput.value;
    const price = parseFloat(priceInput[index].dataset.currencyUsd.slice(1));
    const totalPrice = price * quantity;
    totalPriceElement[index].textContent =  totalPrice;

    // Calculate the cart total price
    let cartTotalPrice = 0;
    const totalPriceElements = document.querySelectorAll('.totalPrice');
    totalPriceElements.forEach(element => {
      cartTotalPrice += parseFloat(element.textContent);
    });
    cartTotalPriceElement.textContent = `$${cartTotalPrice.toFixed(2)}`;
    nodiscountPrice.textContent = `$${cartTotalPrice.toFixed(2)}`;
    // Store the input field values and calculated total price in local storage
    localStorage.setItem(`quantity`, quantity);
    // localStorage.setItem('prices', priceInput[index].value);
    localStorage.setItem('totalPrice', totalPriceElement[index].textContent);
    localStorage.setItem('cartTotalPrice', cartTotalPriceElement.textContent);
  });
});

// Restore the total price from local storage if it exists
if (localStorage.getItem('totalPrice')) {
  const totalPriceElements = document.querySelectorAll('.totalPrice');
  totalPriceElements.forEach(element => {
    element.textContent = localStorage.getItem('totalPrice');
  });
}

