const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // La ruta que se redirigirá al servidor de Django
    createProxyMiddleware({
      target: 'http://teraflex.cl:90', // La URL del servidor de Django
      changeOrigin: true,
    })
  );
};