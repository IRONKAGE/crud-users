const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "GET запит"
    });
});

router.post('/', (request, response, next) => {
    const crudUser ={
        crudID: request.body.crudID,
        first_name: request.body.first_name,
        last_name: request.body.last_name
    };
    response.status(200).json({
        message: "POST запит",
        createdCrudUser: crudUser
    });
});

router.patch('/:userId', (request, response, next) => {
    response.status(200).json({
        message: 'Оновлення користувача'
    });
});

router.delete('/:userId', (request, response, next) => {
    response.status(200).json({
        message: 'Видалення користувача'
    });
});

// Бонус - привітання для особливого ID
router.get('/:userId', (request, response, next) => {
    const id = request.params.userId;
    if (id === 'special'){
        response.status(200).json({
            message: 'Маєш ексклюзивний ID',
            id: id
        });
    }else{
        response.status(200).json({
            message: 'Пройшов ID'
        });
    }
});

module.exports = router;