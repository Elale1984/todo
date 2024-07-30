const express = require('express')

const UsersController = require('../controllers/usersController')
const router = express.Router();


router.get('/', UsersController.findAll);
router.get('/:id', UsersController.findOne);
router.post('/', UsersController.create);
router.patch('/:id', UsersController.update);
router.delete('/:id', UsersController.destroy);

module.exports = router