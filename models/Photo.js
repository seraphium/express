/**
 * Created by zezhang on 2015/6/11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/photo_app');

var schema = new Schema(
    {
        name: String,
        path: String,
        hash: String
    }
);

schema.static("findbyhash", function(hash, callback) {

    return this.find({hash: hash}, callback);

});


module.exports = mongoose.model('Photo', schema);
