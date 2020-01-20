'use strict'
/**
 * @typedef CrudSkills
 * @property {id} _id.required
 * @property {string} soft_skill.required
 * @property {string} hard_skill.required
 */
var express = require('express');
var skillsRouter = express.Router();
var skillsController = require('../controllers/crud.skills.controllers');


/**
 * This function gets main
 * @route GET /skills/test
 * @group CrudSkills - Operations about skills
 */
skillsRouter.get('/test', skillsController.default)


/**
 * This function gets all skills
 * @route GET /skills
 * @group CrudSkills - Operations about skills
 * @returns {object} 200 - An array of skills info
 * @returns {Error}  default - Unexpected error
 */
skillsRouter.get('/', skillsController.getAllSkills)


/**
 * This function gets skills
 * @route GET /skills/{id}
 * @group CrudSkills - Operations about skills
 * @param {string} id.path.required - Skills id
 * @returns {object} 200 - Skills info
 * @returns {Error}  default - Unexpected error
 */
skillsRouter.get('/:id', skillsController.getSkillsById)


/**
 * This function create skills
 * @route POST /skills
 * @group CrudSkills - Operations about skills
 * @param {CrudSkills.model} soft_skill.body.required - the new skills soft_skill
 * @returns {object} 200 - Skills created
 * @returns {Error}  default - Unexpected error
 */
skillsRouter.post('/', skillsController.createSkills)


/**
 * This function updates a skills
 * @route PUT /skills/{id}
 * @group CrudSkills - Operations about skills
 * @param {CrudSkills.model} soft_skill.body.required - the new skills model
 * @returns {object} 200 - Skills updated
 * @returns {Error}  default - Unexpected error
 */
skillsRouter.put('/:id', skillsController.patchSkills)


/**
 * This function delete a skills
 * put just whole new skills body to update
 * @route DELETE /skills/{id}
 * @group CrudSkills - Operations about skills
 * @param {string} id.path.required - ID of skills to delete
 * @returns {object} 200 - Skills deleted
 * @returns {Error}  default - Unexpected error
 */
skillsRouter.delete('/list/:id', skillsController.deleteSkills)

module.exports = skillsRouter;