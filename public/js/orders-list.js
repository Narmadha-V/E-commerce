
// const myOrderButton = document.querySelector('.my-Order-Btn')
// const totalamount = document.querySelector('.totalamount')
// const date = document.querySelector('.date')

// const orderDate= localStorage.getItem('orderDate');
// const totalAmount = localStorage.getItem('singleProductPrice');

// const orderPlacedDate = new Date(); // Replace with  Date object
// const options = { month: 'short', day: 'numeric', year: 'numeric' };
// const formattedDate = orderPlacedDate.toLocaleDateString('en-US', options);
// console.log(formattedDate); 
// date.textContent = formattedDate
// totalamount.textContent= totalAmount


// myOrderButton.addEventListener('click', async () => {
//   //   console.log("myOrderButton clicked")
// const response =  fetch('/product/orderuser', {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ 
//    orderDate,
//    totalAmount
//   }),
// }).then((result) => {
//   console.log("Server response:", result);
//   return result.json();
// });
// console.log(response)
// if (response.status==="success") {
//   console.log("success")

// }
// })

const myOrderButton = document.querySelector('.my-Order-Btn')
const totalamount = document.querySelector('.totalamount')
const date = document.querySelector('.date')

// const orderDate= localStorage.getItem('orderDate');
// const finalAmount = JSON.parse(localStorage.getItem('cartTotalPrice'));
const user = localStorage.getItem('user');
const UserContactInfos = localStorage.getItem('UserContactInfo');
const discountAmount = localStorage.getItem('UserContactInfo');



// const finalAmt  = Number(finalAmount.replace('USD', ''));

const orderPlacedDate = new Date(); // Replace with  Date object
const options = { month: 'short', day: 'numeric', year: 'numeric' };
const formattedDate = orderPlacedDate.toLocaleDateString('en-US', options);
console.log(formattedDate); 
// date.textContent = formattedDate
// totalamount.textContent= finalAmt

// myOrderButton.addEventListener('click', async () => {
 

myOrderButton.addEventListener('click', async () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const totalPrice = (localStorage.getItem('cartTotalPrice'));
  const quantity = JSON.parse(localStorage.getItem('quantity'));
  const cartdata = JSON.parse(localStorage.getItem('cartData'));
 
  const productId =cartdata.productIds[0];




  try {
    const response = await fetch('/product/getorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userId,
        quantity,
        price: totalPrice,
        formattedDate,
        productId
      }),
    });
    if (response.ok) {
      // Order saved successfully

      window.location.href = '/product/orderuser';
    } else {
      // Failed to save order
      console.error('Failed to save order');
    }
  } catch (error) {
    console.error('Failed to save order:', error);
  }
});


// console.log("order-btn clicked")

// const order = {
//   orderDate: formattedDate,
//   // totalAmount: finalAmt,
//   userId:user,
// };

// try {
//   const response = await fetch('/admin/getorders', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(order),
//   });

//   if (response.ok) {
//     // Order saved successfully
//     window.location.href = '/product/orderuser';
//   } else {
//     // Failed to save order
//     console.error('Failed to save order');
//   }
// } catch (error) {
//   console.error('Failed to save order:', error);
// }
// });