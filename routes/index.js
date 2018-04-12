var express = require('express');
var router = express.Router();

var quickControler = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quickControler.question);
router.get('/quizes/answer', quickControler.answer);

module.exports = router;
