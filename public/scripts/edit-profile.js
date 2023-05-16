const editFirstName = async (event) => {
    event.preventDefault();
    const first_name = document.querySelector('#first_name').value.trim();

    if(first_name == "") {
    alert('fill in the name');
    return
    }

    if(first_name) {
        const response = await fetch ('/api/users/edit', {
            method: 'POST',
            body: JSON.stringify({ first_name }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/');
        }
        else {
            alert('response not ok');
        }
    }
}

document.getElementById('edit-firstbtn').addEventListener('click', editFirstName);