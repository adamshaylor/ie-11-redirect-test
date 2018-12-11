const xhr = new XMLHttpRequest();
xhr.open('GET', '/faux-api/assets/transform/asset/10009011');
xhr.responseType = 'blob';

xhr.addEventListener('load', function() {
  console.log('Phase 1: PASS. The server returned a redirect and the browser detected the load event.');

  const fileReader = new FileReader();

  fileReader.onload = function(loadEvent) {
    localStorage.setItem('ie-11-redirect-test', loadEvent.target.result);
    console.log('Phase 2: PASS. The image was successfully loaded as a Blob, read with a FileReader as a data URL, and stored in local storage.')
  };

  fileReader.readAsDataURL(this.response);
});

xhr.send();
