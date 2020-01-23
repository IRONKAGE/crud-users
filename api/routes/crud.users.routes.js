var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');

/**
 * @typedef CrudUsers
 * @property {number} _id.required
 * @property {string} first_name.required
 * @property {string} last_name.required
 * @property {number} age.required
 */
var Crud_Users = require('../models/crud.user.models');


/**
 * This function gets main
 * @route GET /users
 * @group CrudUsers - Operations about all Users
 * @param {string} first_name.query - Ім'я
 * @param {string} last_name.query - Прізвище
 * @param {number} age.query - Отримання конкретного віку
 * @param {number} min_age.query - Мінімальний вік
 * @param {number} max_age.query - Максимальний вік
 * @returns {object} 200 - All User
 * @returns {Error}  default - Unexpected error
 */
userRouter.get('/', async (request, response, next) => {
    console.log('request.body :', request.body);
    console.log('request.query :', request.query);

    // Дані, які можна отримати з Crud_Users
    const {
        first_name,
        last_name,
        age,
        min_age = 0,
        max_age = 150
    } = request.query;

    // запити для БД
    let query = {};

    if (first_name) {
        query.first_name = first_name;
    }

    if (last_name) {
        query.last_name = last_name;
    }

    if (min_age && max_age) {
        query.age = {
            $gte: Number(min_age),
            $lte: Number(max_age)
        }
    }

    if (age) {
        query.age = age;
    }

    //  виконання запитів
    try {
        const queryUser = await Crud_Users.find(query);
        response.json(queryUser);
    } catch (error) {
        response.status(500).send(error);
        console.error(error);
    }
});


/**
 * This function gets user
 * @route GET /users/{id}
 * @group CrudUsers - Operations about users
 * @param {string} id.path.required - User id
 * @returns {object} 200 - User info
 * @returns {Error}  default - Unexpected error
 */
userRouter.get('/:userId', async (request, response, next) => {
    const id = request.params.userId;
    try {
        const idUser = await Crud_Users.findById(id)
                            .then(idUser => {
                                console.log("З Бази данних", idUser);
                                if (idUser) {
                                    response.status(200).json(idUser);
                                } else {
                                    response.status(404).json({
                                        message: 'Не знайдено данних для данного ID'
                                    });
                                }
                            })
        response.json(idUser);
    } catch (error) {
        response.status(500).send(error);
        console.error(error);
    }
});


/**
 * This function create users
 * @route POST /users
 * @group CrudUsers - Operations about users
 * @param {CrudUsers.model} first_name.body.required - the new user name
 * @returns {object} 200 - User created
 * @returns {Error}  default - Unexpected error
 */
userRouter.post('/', async (request, response, next) => {
    try {
        const postUser = await new Crud_Users({
                                _id: new mongoose.Types.ObjectId(),
                                first_name: request.body.first_name,
                                last_name: request.body.last_name,
                                age: request.body.age})
                            .save()
                            .then(result => {
                                console.log(result);
                                response.status(201).json({
                                    message: "POST запит",
                                    createdCrudUser: result
                                });
                            })
        response.json(postUser);
    } catch(error) {
        response.status(500).send(error);
        console.error(error);
    }
});


/**
 * This function updates a user
 * @route PUT /users/{id}
 * @group CrudUsers - Operations about users
 * @param {CrudUsers.model} id.body.required - the new user model
 * @returns {object} 200 - User updated
 * @returns {Error}  default - Unexpected error
 */
userRouter.put('/:userId', async (request, response, next) => {
    try {
        const putUser = await  Crud_Users.findByIdAndUpdate({
                                    _id: request.body.id,
                                }, {
                                    $set: request.body,
                                }, {
                                    new: true,
                                })
                            .then(result => {
                                console.log(response);
                                response.status(200).json(result);
                            })
        response.json(putUser);
    } catch(error) {
        response.status(500).send(error);
        console.error(error);
    }
});


/**
 * This function delete a users
 * @route DELETE /users/{id}
 * @group CrudUsers - Operations about users
 * @param {string} id.path.required - ID of users to delete
 * @returns {object} 200 - User deleted
 * @returns {Error}  default - Unexpected error
 */
userRouter.delete('/:userId', async (request, response, next) => {
    const id = request.params.userId;
    try {
        const deleteUser = await Crud_Users.remove({
                                        _id: id
                                    })
                                    .then(result => {
                                        response.status(200).json(result);
                                    })
        response.json(deleteUser);
    } catch(error) {
        response.status(500).send(error);
        console.error(error);
    }
});

module.exports = userRouter;