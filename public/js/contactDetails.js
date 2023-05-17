// Get the form element

const nameInput = document.querySelector('#name');
const emailInput  = document.querySelector('#email');
const mobileInput  = document.querySelector('#mobile');
const addressInput  = document.querySelector('#address');
const postalCodeInput  = document.querySelector('#postalCode');
const messageElement  = document.getElementById("message");
const proceedPay  = document.querySelector('.proceedPay');
  
  proceedPay.addEventListener('click', (e) => {
  // Prevent the form from submitting and reloading the page
  e.preventDefault();

  console.log("payment btn clicked")
  // Get the input values from the form

  const name = nameInput.value ;
  const email = emailInput.value ;
  const phone = mobileInput.value ;
  const address = addressInput.value ;
  const postalCode = postalCodeInput.value;
  
  if (!name|| !email || !phone || !address || !postalCode) {
    // Display error message
    messageElement.textContent = 'Please fill all the fields.';
  }else {
    // Save the contact information to Local Storage
    const contactInfo = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      postalCode: postalCode
    };
    
    localStorage.setItem('UserContactInfo', JSON.stringify(contactInfo));

  // Redirect the user to the confirmation page
  window.location.href = '/product/payment';
}
});