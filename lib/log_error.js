const logError = ({
  request,
  code,
  error
}) => {
  console.error(`${ code }: ${ request.method } ${ request.url }`);
  if (error) {
    console.error(`  ${ error }`);
  }
};

module.exports = logError;
