/**
 * Created by zezhang on 2015/6/11.
 */
var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
util = require('util');

exports.list = function(req, res) {
  Photo.find({}, function(err, photos) {
      if (err) return next(err);
      res.render('photos', {
          title: 'Photos',
          photos: photos
      })
  })
};

exports.form = function(req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.submit = function(dir) {
    if (dir == null) return next(err);
    return function(req, res, next) {
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var dstPath = join(dir, img.name);
        //rename the file to dstPath by streaming
        var readStream = fs.createReadStream(img.path)
        var writeStream = fs.createWriteStream(dstPath);
        util.pump(readStream, writeStream, function() {
           // fs.unlinkSync(req.files.upload.path);
            //save photo info to mongoDB
            Photo.create({
                name: name,
                path: img.name}, function(err) {
                if (err) return next(err);
                res.redirect('/');
            })
        }, function(err) {
            if (err) return next(err);

        })


    }
};

exports.download = function(dir){
    return function(req, res, next) {
        var id = req.params.id;
        Photo.findById(id, function(err, photo) {
            if (err) return next(err);
            var path = join(dir, photo.path);
            res.sendFile(path);
        })
    }
}