var express = require('express');
var router = express.Router();

var quickControler = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET Página del Autor */
router.get('/author', function (req, res, next) {
  res.render('author');
});

router.get('/quizes/question', quickControler.question);
router.get('/quizes/answer', quickControler.answer);

module.exports = router;
