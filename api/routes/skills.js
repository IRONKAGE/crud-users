const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Навички витягнено'
    });
});

router.post('/', (request, response, next) => {
    const crudSkill = {
        soft_skill: request.body.soft_skill,
        hard_skill: request.body.hard_skill
    };
    response.status(200).json({
        message: 'Навички створено',
        createdCrudSkill: crudSkill
    });
});

router.get('/:skillId', (request, response, next) => {
    response.status(200).json({
        message: 'Детально про навик',
        skillId: request.params.skillId
    });
});

router.delete('/:skillId', (request, response, next) => {
    response.status(200).json({
        message: 'Видалення навика',
        skillId: request.params.skillId
    });
});

module.exports = router;