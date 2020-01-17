var CrudUsers = require('../models/user');

exports.default = ((request, response, next) => {
    response.status(200).json({
        message: "Інфа про користувачів - витягнена"
    });
});