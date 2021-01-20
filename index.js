const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
// const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";
const API_SERVICE_URL = "https://api.exchangeratesapi.io/latest" ; 

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('Enye project .');
 });



 // Proxy endpoints for testing proxy
// app.use('/json_placeholder', createProxyMiddleware({
//     target: API_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/json_placeholder`]: '',
//     },
//  }));

function onProxyRes(proxyRes, req, res) {
    // proxyRes.headers['x-added'] = 'foobar'; // add new header to response
    // delete proxyRes.headers['x-removed']; // remove header from response
    console.log(proxyRes.method);
  }


proxyOptions = createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    selfHandleResponse: true , 
    pathRewrite: {
        ['/api/rates']: '',
    },
    onProxyRes: onProxyRes , 
})

app.use('/api/rates', proxyOptions)





  



//  app.use('/api/rates', createProxyMiddleware({
//      target: API_SERVICE_URL,
//      changeOrigin: true,
//      selfHandleResponse : true,
//      pathRewrite:{
//          [`^/api/rates`]: "" ,
//      } 
//  } ,
//   )
//  )


  // Authorization
app.use('', (req, res, next) => {
    // if (req.headers.authorization) {
    //     next();
    // } else {
    //     res.sendStatus(403);
    // }
    res.send("Go to the /json_placeholder address")
 });


 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });