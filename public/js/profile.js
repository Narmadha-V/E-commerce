const userName = document.querySelector('.userProfile');
const profileBtn = document.querySelector('.profileBtn');


profileBtn.addEventListener('click', async () => {
  console.log("profileButton clicked")

  // get user email from local storage
  const user = localStorage.getItem('user');
  if (user) {
    // userName.innerHTML = namd;
  window.location.href = `/profile`;

  } else {
    console.log('No user found in local storage');
  }

});
