
function addID() {

    const comments = document.getElementsByClassName('comment');
    const commentBlock = document.getElementsByClassName('comment-block');
    for (let i = 0; i <= comments.length; i++) {
        comments[i].setAttribute('id', i);
        commentBlock[i].setAttribute('id', 'block'+i);
        // commentBlock[i].style.display = 'none';
        document.getElementById(i).addEventListener('click', displayComments);
    }
}

function displayComments (e)  {

    const id = e.target.id;
    const block = document.getElementById('block'+id);
    if (block.style.display === "none") {
        block.style.display = "block";
      } else {
        block.style.display = "none";
      }
    // if(block.style.display==="block") {
    //     block.style.display = 'none';
    // }
console.log(id);
}

addID();
