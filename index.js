const http = require('http');
const getStaticFileFromUrl = require('./lib/get_static_file_from_url.js');
const logError = require('./lib/log_error.js');
const staticCallback = require('./lib/static_callback.js');

const port = 3000;
const redirectUrl = 'https://madetoordertest.blob.core.windows.net/assets/transformed/uploaded-assets/10009011/cache-1543877721272.png';

const requestCases = [
  {
    name: 'Faux API',
    test: request => /api\//.test(request.url),
    callback: (request, response) => {
      response.writeHead(301, {
        'Location': redirectUrl
      });
      response.end();
    }
  },
  {
    name: 'Home',
    test: request => request.url === '/',
    callback: (request, response) => staticCallback({
      contentType: 'text/html',
      request: Object.assign({}, request, { url: '/index.html' }),
      response
    })
  },
  {
    name: 'Static HTML',
    test: request => /\.html$/.test(request.url),
    callback: (request, response) => staticCallback({
      contentType: 'text/html',
      request,
      response,
    })
  },
  {
    name: 'Static JS',
    test: request => /\.js$/.test(request.url),
    callback: (request, response) => staticCallback({
      contentType: 'text/javascript',
      request,
      response
    })
  }
];

const defaultCase = {
  name: 'Not found',
  test: () => undefined,
  callback: (request, response) => {
    const code = 404;
    response.writeHead(code);
    response.end();
    logError({ request, code });
  }
};

const server = http.createServer((request, response) => {
  const matchingCase = requestCases.find(({ test }) => test(request)) || defaultCase;
  console.log(`${ request.method } ${ request.url } => Case: "${ matchingCase.name }"`);
  matchingCase.callback(request, response);
});

server.listen(port, () => console.log(`Open http://localhost:${ port } in IE 11`));

/**
 * START SHIT
 *
 * As it turns out, Koa is shit at overriding default headers. It's all syntactic
 * sugar and no separation of concerns.
 *
 * https://github.com/koajs/koa/issues/1120
 */

// const Koa = require('koa');
// const serve = require('koa-static');
// const router = require('koa-router')();
//
// const app = new Koa();
//
// app.use(serve('views/home'));
//
// router.get('/faux-api/assets/transform/asset/:id', ctx => {
//   ctx.status = 301;
//   ctx.set('Location', redirectUrl);
//
//   // Random stabs in the dark
//   // ctx.set('Access-Control-Allow-Origin', '*');
//   // ctx.set('Access-Control-Allow-Headers', '*');
//   ctx.set('Content-Type', null);
// });
//
// app.use(router.routes());
// app.listen(port);
// console.log(`Open http://localhost:${ port }/ in IE 11`);

/**
 * END SHIT
 */
