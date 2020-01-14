const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Crud_Users = require('../models/user');

router.get('/', (request, response, next) => {
    Crud_Users.find()
        .exec()
        .then(documents => {
            console.log(documents);
            if (documents.length >= 0){
                response.status(200).json(documents);
            }else{
                response.status(404).json({
                    message: 'Такої сторінки не знайдено'
                });
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
});

router.post('/', (request, response, next) => {
    const crudUser = new Crud_Users({
        _id: new mongoose.Types.ObjectId(),
        first_name: request.body.first_name,
        last_name: request.body.last_name
    });
    crudUser
    .save()
    .then(result => {
        console.log(result);
        response.status(201).json({
            message: "POST запит",
            createdCrudUser: result
        });
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            error: error
        });
    });
});

// Для роботи з ID
router.get('/:userId', (request, response, next) => {
    const id = request.params.userId;
    Crud_Users.findById(id)
        .exec()
        .then(document => {
            console.log("З Бази данних", document);
            if (document){
                response.status(200).json(document);
            }else{
                response.status(404).json({message: 'Не знайдено данних для данного ID'});
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({error: error});
        });
});

router.patch('/:userId', (request, response, next) => {
    const id = request.params.userId;
    const updateOperations = {};
    for (const operations of request.body){
        updateOperations[operations.changeNames] = operations.value;
    }
    Crud_Users.update({_id: id}, {$set: updateOperations})
        .exec()
        .then(result =>  {
            console.log(response);
            response.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
});

router.delete('/:userId', (request, response, next) => {
    const id = request.params.userId;
    Crud_Users.remove({_id: id})
        .exec().
        then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            console.lof(error);
            response.status(500).json({
                error: error
            });
        });
});

module.exports = router;