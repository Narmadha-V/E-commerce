const updateBtn = document.querySelector('.btn-save');
const startDateInput = document.querySelector('.startDate');
const endDateInput = document.querySelector('.endDate');
const discountValueInput = document.querySelector('.discountValue');
const discountCodeInput = document.querySelector('.discountCode');
const productId = document.querySelector('input[name="id"]').value;
const statusInput = document.querySelectorAll(".status");

updateBtn.addEventListener('click', async () => {
  console.log("updateBtn clicked")
  const endDate = endDateInput.value;
  const discountCode =discountCodeInput.value;
  const discountValue =discountValueInput.value;
  const startDate =startDateInput.value;
  let status;
  statusInput.forEach(input => {
    if (input.checked) {
      status = input.value;
    }
  });

  console.log(status)
  const response = await fetch(`/admin/edit-discount/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      discountCode,
      discountValue,
      startDate,
      endDate,
      status,
    }),
  }).then((res) => {
    console.log("Server response:", res);
    return res.json();
  });
  console.log(response)
  if (response.status === "success") {
    window.location.href = "/admin/discount";
  } else {
    // Display an error message if the server returned an error
    const error = await response.text();
  }
});