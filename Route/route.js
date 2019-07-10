var express = require('express');
var router = express.Router();
var controller = require("../Controller/controller")

router.get('/', controller.getDonne);
router.post('/post', controller.postDonne);
router.get('/zoho', controller.getZoho);
router.post('/postzoho', controller.postZoho);

module.exports = router