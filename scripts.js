document.addEventListener('DOMContentLoaded', () => {
  const imageCount = 74; 
  const container = document.getElementById('thumbnail-grid');
  const redBox = document.querySelector('.red-box');
  const submitButton = document.getElementById('submit-button');
  const messageInput = document.getElementById('message-input');
  const redOverlay = document.getElementById('red-overlay-message');
  const fontSelect = document.getElementById('font-select');
  const colorSelect = document.getElementById('color-select');
  const saveBtn = document.getElementById('save-redbox-btn');

  // Load thumbnails
  for (let i = 1; i <= imageCount; i++) {
    const img = document.createElement('img');
    img.src = `images/image${i}.png`; 
    img.alt = `Thumbnail ${i}`;
    container.appendChild(img);
  }

  // Click on thumbnails to set background
  container.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      const clickedSrc = event.target.src;
      redBox.style.backgroundImage = `url(${clickedSrc})`;
      redBox.style.backgroundSize = 'cover';
      redBox.style.backgroundPosition = 'center';
    }
  });

  // Submit message
  submitButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
      redOverlay.textContent = message;
    }
  });

  // Font change
  fontSelect.addEventListener('change', () => {
    const selectedFont = fontSelect.value;
    redOverlay.style.fontFamily = selectedFont;
  });

  // Color change
  colorSelect.addEventListener('change', () => {
    const selectedColor = colorSelect.value;
    redOverlay.style.color = selectedColor;
  });

  // Save red box as image using html2canvas
  saveBtn.addEventListener('click', () => {
    html2canvas(redBox).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'ACLetter.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(err => {
      console.error('Failed to capture red box:', err);
    });
  });
});
