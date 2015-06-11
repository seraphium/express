/**
 * Created by zezhang on 2015/6/11.
 */

var photos = [];
photos.push({
    name: 'node.js logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function(req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
};
