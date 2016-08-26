var express = require('express');
var router = express.Router();
var photos = require('./photos');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
/* GET home page. */
router.get('/', photos.list);

/* GET/POST photo page*/
router.get('/upload', photos.form);
router.post('/upload', multipartMiddleware, photos.submit(app.get('photos')));

/* Get download page */
router.get('/photo/:hash/:id/download', photos.download(app.get('photos')));
module.exports = router;
