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
        var hash = req.body.photo.hash;
        var cameraId = req.body.photo.cameraId;
		var id = req.body.photo.id;
        var dstPath = join(dir, img.name);
        //rename the file to dstPath by streaming
        var readStream = fs.createReadStream(img.path)
        var writeStream = fs.createWriteStream(dstPath);
        util.pump(readStream, writeStream, function() {
           // fs.unlinkSync(req.files.upload.path);
            //save photo info to mongoDB
            Photo.create({
                name: name,
                hash: hash,
                cameraId: cameraId,
				id: id,
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
        var hash = req.params.hash;
        var cameraId = req.params.cameraId;
		var id = req.params.id;
        Photo.findbyhashid(hash, cameraId, id, function(err, photo) {
            if (err) return next(err);
            if (photo.length > 0)
            {
                var path = join(dir, photo[0].path);
                res.sendFile(path);
            }
            else
            {
                var err = new Error("照片尚未获取，请稍候再试");
                err.status = 500;
                next(err);
            }

        })
    }
}