const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const userRoutes = require('./api/routes/users');
const skilRoutes = require('./api/routes/skills');

mongoose.connect(
    'mongodb+srv://admin:' + 
    process.env.MONGO_ATLAS_PW + 
    '@nodejs-rest-inverita-crudusers-qd2mn.mongodb.net/test?retryWrites=true&w=majority',
    {
        useMongoClient: true
    }
)

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Парсери - приховання шляху на ресурс
app.use((request, response, next) => {
    response.header(
        'Access-Control-Allow-Origin',
        'http://crud-user.inVerita.com'
    );
    response.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (request.method === 'OPTIONS'){
        response.header(
            'Access-Control-Allow-Methods',
            'GET, PUT, POST, PATCH, DELETE'
        );
        return response.status(200).json({});
    }
    next();
});

//Шляхи на сторінки
app.use('/users', userRoutes);
app.use('/skills', skilRoutes);

// Головна сторінка
app.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Сайт працює!'
    });
});

//Опрацювання помилки 404
app.use((request, response, next) => {
    const error = new Error('Не вдалось знайти вказану сторінку');
    error.status(404);
    next(error);
});

// Виведення непередюачуваних помилок
app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;