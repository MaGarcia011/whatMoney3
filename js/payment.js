const paymentButton = document.getElementById('payment-button');

paymentButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = localStorage.getItem('email');
  try {
    const request = await fetch("http://localhost:3000/api/usuarios/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    })
    const response = await request.json();
    alert(response.msg)
    window.location.href = '/login.html';
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})