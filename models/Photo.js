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
        hash: String,
		id: String
    }
);

schema.static("findbyhashid", function(hash, id, callback) {

    return this.find({hash: hash, id: id}, callback);

});


module.exports = mongoose.model('Photo', schema);
