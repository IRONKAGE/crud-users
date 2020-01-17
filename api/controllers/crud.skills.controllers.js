var CrudSkills = require('../models/crud.skills.models');

exports.default = ((request, response, next) => {
    response.status(200).json({
        message: "Навички користувачів витягнено"
    });
});


exports.getAllSkills = ((request, response, next) => {
    CrudSkills.find({})
        .sort([[request.query.orderBy, request.query.order]])
        .skip(+request.query.page * +request.query.perPage)
        .limit(+request.query.perPage)
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


exports.getSkillsById = ((request, response, next) => {
    const id = request.params.id;
    CrudSkills.findById(id)
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


exports.createSkills = ((request, response, next) => {
    const newCrudSkills = new CrudSkills(request.body);
    newCrudSkills
    .save()
    .then(result => {
        console.log(result);
        response.status(201).json({
            message: "Навички створено",
            createdSkillsUser: result
        });
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            error: error
        });
    });
});


exports.patchSkills = ((request, response, next) => {
    const id = request.params.id;
    const updateOperations = {};
    for (const operations of request.body){
        updateOperations[operations.changeNames] = operations.value;
    }
    CrudSkills.update({_id: id}, {$set: updateOperations})
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


exports.deleteSkills = ((request, response, next) => {
    const id = request.params.id;
    CrudSkills.remove({_id: id})
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