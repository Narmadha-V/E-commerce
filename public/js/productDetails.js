// const User = require("../../models/usermodel");

const productNameInput = document.querySelector(".productName");
const skuInput = document.querySelector(".productSku");
const urlInput = document.querySelector(".url");

const priceInput = document.querySelector(".productPrice");
const descriptionInput = document.querySelector(".productDescription");
const addToCartInput = document.querySelector(".addToCart");
const quantityInput = document.getElementById('quantity-input');
const productId = document.querySelector('input[name="id"]').value;


addToCartInput.addEventListener("click",addToCart);
async function addToCart(e){
  e.preventDefault();
  console.log("add to cart btn clicked")
  const user = localStorage.getItem('userId');
  if (!user) {
    alert('Please login or create an account to apply a coupon.');
    return;
  }
  console.log(user)
  const productName = productNameInput.value;
  const sku =skuInput.value;
  const price =priceInput.value;
  const description =descriptionInput.value;
  if (localStorage.getItem('quantity')) {
    quantityInput.value = localStorage.getItem('quantity');
  }
  const quantity =quantityInput.value;
console.log(quantity)
    const response = await fetch(`/admin/edit-cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        isAddToCart: true,
        productName,
        sku,
        price,
        quantity,
        user
      }),
    }).then((result) => {
      console.log("Server response:", result);
      return result.json();
    });
    console.log(response)
    if (response.status==="success") {
      let getPrice = response.price
     localStorage.setItem(`Price-${productId}`,getPrice);
     let getSKU = response.sku
    localStorage.setItem(`SKU-${productId}`,getSKU);
      console.log("ok you added to bag")
      addToCartInput.textContent = "Added to bag";
      let getCartItem = response.savedCartItem
      localStorage.setItem('CartItem', JSON.stringify(getCartItem));
       
    window.location.href = `/product/cart`;
    } else {
      console.error("Failed to update product");
    }
  };

 
  
