const getStaticFileFromUrl = require('./get_static_file_from_url.js');
const logError = require('./log_error.js');

const staticCallback = async ({
  contentType,
  request,
  response
}) => {
  try {
    const staticFile = await getStaticFileFromUrl(request.url);
    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': Buffer.byteLength(staticFile)
    });
    response.write(staticFile);
    response.end();
  }
  catch(error) {
    const code = 404;
    response.writeHead(code);
    response.end();
    logError({ request, code, error });
  }
};

module.exports = staticCallback;
