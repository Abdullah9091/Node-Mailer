const express = require('express');
const router = express.Router();

const userController=require('../controllers/userController');



router.get('/verify',userController.Mailverification)



module.exports = router;
