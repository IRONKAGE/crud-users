var CrudUsers = require('../models/crud.user.models');

exports.default = ((request, response, next) => {
    response.status(200).json({
        message: "Інфа про користувачів - витягнена"
    });
});