const registerFormHandler = async (event) => {
    event.preventDefault();
    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#psw').value.trim();
    const pwRepeat = document.querySelector('#psw-repeat').value.trim();
    const error = document.querySelector('#error-pw');

    if(password === pwRepeat) { 
        if(first_name && last_name && username && email && password) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ first_name, last_name, username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            })
            if(response.ok) {
                document.location.replace('/login');
            }
            else {
                console.log('Failed to sign up');
            }
        }
    }
//     if (first_name || last_name || username || email || password == " ") {

//         error.textContent='All fields must be filled with matching password.';
// }
}


document.getElementById('registerbtn').addEventListener('click', registerFormHandler);
