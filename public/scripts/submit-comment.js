const addComment = async (event) => {
    event.preventDefault();
    // const comment = document.querySelector('#text').value.trim();
    const comment = event.target.previousElementSibling.children[1].value.trim();
    const buttonid = event.target.id;
    const post_id = buttonid.replace('com','');

    if(comment == "") {
    alert('add a comment to submit');
    return
    }
  
    if(comment) {
        const response = await fetch ('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
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
 

  $('a[id^="post"]').click(function (event) {

    const oldId = event.target.id;
    const wrapper = event.target.nextElementSibling;
    if(wrapper.style.display == 'none') {
      event.target.innerText = 'Close';
      wrapper.style.display = 'block';
    }
    else{ 
      event.target.innerText = 'Add a comment';
      wrapper.style.display = 'none';
    }

    const id = oldId.replace('post','');
    // $('button[id^="comment-sbm"]').attr('id', 'comment-sbm'+ id);
    //   console.log($(this));


    //  $(this).attr('id', 'comment-sbm'+ id);
    // });
    // const button = event.target.nextElementSibling;
    const button = event.target.nextElementSibling.lastElementChild;
    button.setAttribute('id', 'com'+id);
    button.addEventListener('click', addComment);
    });

  


  // document.getElementById('comment-sbm').addEventListener('click', addComment);