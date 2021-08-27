const express = require('express');
const router = express.Router();
const controller = require('../controller/api/apiUser');

router.get('/' , controller.list);
router.get('/:id' , controller.show);








module.exports = router