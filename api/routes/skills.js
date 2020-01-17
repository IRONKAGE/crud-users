'use strict'
/**
 * @typedef Skills
 * @property {string} soft_skill.required
 */
var express = require('express');
var skillsRouter = express.Router();
var skillsController = require('../controllers/crud.skills.controllers');


skillsRouter.get('/', skillsController.default)
/**
 * @typedef UserUpdate
 * @property {string} id.required
 * @property {string} soft_skill.required
 */


skillsRouter.get('/list', skillsController.getAllSkills)
/**
 * This function gets all skills skills
 * @route GET /list
 * @group Users - Operations about skills
 * @param {string} orderBy.query.required - OrderBy
 * @param {string} order.query.required - Order
 * @param {number} page.query.required - Page
 * @param {number} perPage.query.required - Per Page Items
 * @returns {object} 200 - An array of skills info
 * @returns {Error}  default - Unexpected error
 */

skillsRouter.get('/list/:id', skillsController.getSkillsById)
/**
 * This function gets skills
 * @route GET /list/{id}
 * @group Users - Operations about skills
 * @param {string} id.path.required - Skills id
 * @returns {object} 200 - Skills info
 * @returns {Error}  default - Unexpected error
 */


skillsRouter.post('/list', skillsController.createSkills)
/**
 * This function create skills
 * @route POST /list
 * @group Users - Operations about skills
 * @param {Skills.model} soft_skill.body.required - the new skills soft_skill
 * @returns {object} 200 - Skills created
 * @returns {Error}  default - Unexpected error
 */

skillsRouter.patch('/list/:id', skillsController.patchSkills)
/**
 * This function updates a skills
 * @route PUT /list/{id}
 * @group Users - Operations about skills
 * @param {UserUpdate.model} skills.body.required - the new skills model
 * @returns {object} 200 - Skills updated
 * @returns {Error}  default - Unexpected error
 */


skillsRouter.delete('list/:id', skillsController.patchSkills)
/**
 * This function delete a skills
 * put just whole new skills body to update
 * @route DELETE /list/{id}
 * @group Users - Operations about skills
 * @param {string} id.path.required - ID of skills to delete
 * @returns {object} 200 - Skills deleted
 * @returns {Error}  default - Unexpected error
 */


module.exports = skillsRouter;