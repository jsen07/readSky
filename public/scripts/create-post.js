// const popupButton = document.getElementById('popup-button');

// popupButton.addEventListener('click', async () => {
//   try {
//     const response = await fetch('/api/post/create');
//     if (response.ok) {
//       const popupContent = await response.text();
//       const popupContainer = document.createElement('div');
//       popupContainer.innerHTML = popupContent;
//       popupContainer.classList.add('popup', 'active');
//       document.body.appendChild(popupContainer);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

const popupButton = document.getElementById('submit-post');
const closeButton = document.getElementById('close-btn');

popupButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const text = document.getElementById('text').value;
    const response = await fetch('/api/post/create', {
      method: 'POST',
            body: JSON.stringify({ text }),
            headers: { 'Content-Type': 'application/json' },
        });
    
    if (response.ok) {
      document.location.replace('/');
    }

});

closeButton.addEventListener('click', async (event) => {

  const closeThis = document.getElementById('popup');

  closeThis.style.display = 'none';

});

