'use strict'
/**
 * @typedef CrudUsers
 * @property {id} _id.required
 * @property {string} first_name.required
 * @property {string} last_name.required
 */
var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');
var Crud_Users = require('../models/crud.user.models');


/**
 * This function gets main
 * @route GET /users
 * @group CrudUsers - Operations about all Users
 * @returns {object} 200 - All User
 * @returns {Error}  default - Unexpected error
 */
userRouter.get('/', (request, response, next) => {
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


/**
 * This function gets user
 * @route GET /users/{id}
 * @group CrudUsers - Operations about users
 * @param {string} id.path.required - User id
 * @returns {object} 200 - User info
 * @returns {Error}  default - Unexpected error
 */
userRouter.get('/:userId', (request, response, next) => {
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


/**
 * This function create users
 * @route POST /users
 * @group CrudUsers - Operations about users
 * @param {CrudUsers.model} first_name.body.required - the new user name
 * @returns {object} 200 - User created
 * @returns {Error}  default - Unexpected error
 */
userRouter.post('/', (request, response, next) => {
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


/**
 * This function updates a user
 * @route PUT /users/{id}
 * @group CrudUsers - Operations about users
 * @param {CrudUsers.model} id.body.required - the new user model
 * @returns {object} 200 - User updated
 * @returns {Error}  default - Unexpected error
 */
userRouter.put('/:userId', (request, response, next) => {
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


/**
 * This function delete a users
 * @route DELETE /users/{id}
 * @group CrudUsers - Operations about users
 * @param {string} id.path.required - ID of users to delete
 * @returns {object} 200 - User deleted
 * @returns {Error}  default - Unexpected error
 */
userRouter.delete('/:userId', (request, response, next) => {
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

module.exports = userRouter;