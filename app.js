var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressSwagger = require('express-swagger-generator')(app);
var swaggerUi = require('express-swaggerize-ui');


//Шляхи на апки
const userRoutes = require('./api/routes/crud.users.routes');
const skillsRoutes = require('./api/routes/crud.skills.routes');


//Підключення БД
useMongo = require('./api/db/connectMongo');


//Для дебагу у зв'язці з nodemon
app.use(morgan('dev'));


//Парсери - приховання шляху на ресурс
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((request, response, next) => {
    response.header(
        'Access-Control-Allow-Origin', '*'
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
app.use('/skills', skillsRoutes);


// Головна сторінка для тесту =)
app.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Сайт працює!'
    });
});


// Опис документації
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a server for crud users',
            title: 'Swagger',
            version: '1.0.5'
        },
        host: 'localhost:15000',
        basePath: '/',
        produces: ['application/json'],
        schemes: ['http']
    },
    basedir: __dirname, //app absolute path
    files: ['./api/routes/crud.users.routes.js', './api/routes/crud.skills.routes.js'] //Path to the API handle folder
};
expressSwagger(options);


//Шлях на документацію
app.use('/api-docs.json', function (req, res) {
    res.json(require('./path/to/swaggerize/docs.json'));
});
app.use('/api-docs', swaggerUi());


//Опрацювання помилки 404
app.use((request, response, next) => {
    const error = new Error('Не вдалось знайти вказану сторінку');
    error.status(404);
    next(error);
});


// Виведення непередбачуваних помилок
app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;