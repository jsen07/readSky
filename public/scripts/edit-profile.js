const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user_id = document.getElementById('form-label').getAttribute('value');
    console.log(user_id);
  
    // Get form input values
    const firstName = document.getElementById('profile-first_name').value;
    const lastName = document.getElementById('profile-last_name').value;
    const username = document.getElementById('profile-username').value;
    const email = document.getElementById('profile-email').value;
    const password = document.getElementById('profile-password').value;
  
    // Create a data object with the updated user details
    const data = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password
    };
    console.log(data);
  
    try {
      const response = await fetch(`/api/profile/${user_id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
    
        window.location.href = `/api/profile/${user_id}`;
      } else {

        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', handleSubmit);
  

