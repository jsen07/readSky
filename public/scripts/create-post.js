const popupButton = document.getElementById('popup-button');
// const closeBtn = document.getElementById('close-btn')

let popupContainer;

popupButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/post/create');
    if (response.ok) {
      const popupContent = await response.text();
      popupContainer = document.createElement('div');
      popupContainer.innerHTML = popupContent;
      document.body.appendChild(popupContainer);
    }
  } catch (error) {
    console.error(error);
  }
});


