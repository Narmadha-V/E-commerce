// const myOrderButton = document.querySelector('.my-Order-Btn')

// myOrderButton.addEventListener('click', async () => {
//   console.log("myOrderButton clicked")
//   const response = await fetch(`/product/order-details`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ 
    
     
//     }),
//   })
//   console.log(response)
//   if (response.ok) {  } else {
//     console.error("Failed to get product details");
//   }
// })

    // Retrieve the necessary values from localStorage
const cartTotals = (localStorage.getItem('cartTotalPrice'));
const discountValue = localStorage.getItem('discountTotalPrice');
const discount =localStorage.getItem('discountValue');
const discountCode =JSON.parse(localStorage.getItem('PromoCode'));
const quantity =localStorage.getItem('quantity');
const productId = document.querySelector('input[name="id"]').value;
const price =localStorage.getItem(`Price-${productId}`);
console.log(price)
console.log(productId)


const taxPercentage =document.querySelector('.taxPercentage')
const myDiscountCode =document.querySelector('.myDiscountCode')
const totalQuantity =document.querySelector('.total-quantity')
const productTotalPrice =document.querySelector('.productTotalPrice')
const orderDate =document.querySelector('.orderDate')
const orderNumber =document.querySelector('.orderNo')




const cartTotal= Number(cartTotals.replace('$', ''));

const discountPrice = Number(discountValue.replace('$', ''));
// Select the relevant table cells
const discountCell = document.querySelector('.discountCellValue');
const totalCell = document.querySelector('.totalUsd');
let tax=10
// Set the textContent of the cells to the retrieved values
const discountCells =  (cartTotal * discount/100);
const taxValue = (discountPrice*tax/100)
finalprice = Number(taxValue +discountPrice).toFixed(2)

const orderPlacedDate = new Date(); // Replace with  Date object
const options = { month: 'short', day: 'numeric', year: 'numeric' };
const formattedDate = orderPlacedDate.toLocaleDateString('en-US', options);
console.log(formattedDate); 
orderDate.textContent = formattedDate

productTotalPrice .textContent =  `$${quantity*price}`
totalQuantity.textContent = quantity
taxPercentage.textContent = `+$${taxValue}`
discountCell.textContent = `-$${discountCells}`
myDiscountCode .textContent = `Discount  (${discountCode})`
totalCell.textContent = `${finalprice} USD`;

 
localStorage.setItem('orderDate',JSON.stringify (formattedDate));
localStorage.setItem('totalAmount',JSON.stringify (totalCell.textContent));
localStorage.setItem(`singleProductPrice-${productId}`,productTotalPrice .textContent);



