
const loginFormHandler = async (event) => {
  event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#psw').value.trim();
    const error = document.querySelector('#login-error');

    if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          error.textContent = 'Failed to log in: E-mail or password is incorrect.';
        }
      }
}
document.getElementById('loginbtn').addEventListener('click', loginFormHandler);