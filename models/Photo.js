/**
 * Created by zezhang on 2015/6/11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://beacon:bc3000@localhost/photo_app?authSource=photo_app");

var schema = new Schema(
    {
        name: String,
        path: String,
        hash: String,
        cameraId: String,
		id: String
    }
);

schema.static("findbyhashid", function(hash, cameraId, id, callback) {

    return this.find({hash: hash, cameraId: cameraId, id: id}, callback);

});


module.exports = mongoose.model('Photo', schema);
