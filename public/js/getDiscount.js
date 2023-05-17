const applyCoupon = document.querySelector('.apply-coupon')
const cartTotalPriceInput = document.querySelector('.cart-total-price');
const cartSubTotalPriceInput = document.querySelector('.cart-subtotal__price');
const cartTotalPrice = localStorage.getItem('cartTotalPrice');
const totalDiscountedPrice= document.querySelector('.totalDiscountPrice');
const promoCodeInput = document.querySelector('.promo-code');

applyCoupon.addEventListener('click', async () => {
  console.log("apply coupon  clicked")
  // Check if there is a user in localStorage
  const user = localStorage.getItem('user');
  if (!user) {
    alert('Please login or create an account to apply a coupon.');
    return;
  }
 const promoCode = promoCodeInput.value
    // set the promocode from localStorage
  localStorage.setItem('PromoCode',JSON.stringify(promoCode))
   // Get the cart items from localStorage
   const cartdata = JSON.parse(localStorage.getItem('cartData'));
  const proId =cartdata.productIds;
  cartTotalPriceInput.value = cartTotalPrice;
  const cartTotal = cartTotalPriceInput .value
  const response = await fetch(`/admin/getProductDiscounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
       promoCode: promoCode,
       id:proId
    }),
  }).then((res) => {
    console.log("Server response:", res);
    return res.json();
  });
  console.log(response)
  if (response.success) {
    console.log("success")
    const discount = parseFloat(response.discountValue);
    // check cartTotal is a number
    const CartTotal = Number(cartTotal.replace('$', ''));
    if (isNaN(CartTotal)) {
      console.error('cartTotal is not a number');
      return;
    }
    // Subtract the total discount from the product price to get the discounted price
    const discountedPrice = CartTotal  - (CartTotal  * (discount / 100));
    const discountePrice = (CartTotal  * (discount / 100))
    // check discountedPrice is a number
    if (isNaN(discountedPrice)) {
      console.error('discountedPrice is not a number');
      return;
    }
   
   
    // Update the UI with the discounted price
    totalDiscountedPrice.textContent = `$${discountedPrice.toFixed(2)}`;
   cartSubTotalPriceInput.textContent = `-$${discountePrice.toFixed(2)}`;
   console.log(totalDiscountedPrice.textContent)
    localStorage.setItem('discountValue', response.discountValue);
    localStorage.setItem('discountTotalPrice', totalDiscountedPrice.textContent);
    localStorage.setItem('discountedPrice',   cartSubTotalPriceInput.textContent);


  } else {
    // Display an error message if the server returned an error
    const error = await response.text();
  }
});
