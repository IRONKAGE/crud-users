var mongoose = require('mongoose');

var crudSkillSchema = mongoose.Schema([{
    _id: mongoose.Schema.Types.ObjectId,
    soft_skill: String,
    hard_skill: String
}]);

module.exports = mongoose.model('Crud_Skill_Schema', crudSkillSchema);