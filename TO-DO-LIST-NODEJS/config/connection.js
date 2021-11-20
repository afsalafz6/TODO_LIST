const mongoose = require("mongoose");

var state = {
    db: null,
};

exports.connected = function (url, done) {
    if (state.db) return done()
    mongoose.connect(url, function (err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
};
