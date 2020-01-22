var CrudSkills = require('../models/crud.skills.models');

exports.min_age = ((request, response, next) => {
    response.status(200).json({
        message: "Навички користувачів витягнено"
    });
});