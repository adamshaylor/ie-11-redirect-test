const image = new Image();

// https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
image.crossOrigin = 'use-credentials';

image.onload = function() {
  console.log('Phase 1: PASS. The server returned a redirect and the browser loaded the image from the Location response header.');

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
  document.body.appendChild(canvas);

  try {
    localStorage.setItem('ie-11-redirect-test', canvas.toDataURL('image/png'));
    console.log('Phase 2: PASS. The image was drawn to a canvas and then stored in local storage, which indicates that the canvas is not tainted.');
  }
  catch(error) {
    console.error('Phase 2: FAIL. The image was drawn to a canvas and then threw an error when attempting to store in local storage, which indicates that the canvas is tainted.');
    console.error(error);
  }
};

image.onerror = function(event) {
  console.error('Phase 1: FAIL: The server returned a redirect and the browser DID NOT load the image from the Location response header.');
  console.error(event);
}

image.src = '/faux-api/assets/transform/asset/10009011';
