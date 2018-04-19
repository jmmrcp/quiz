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

router.param('quizId', quickControler.load);

router.get('/quizes', quickControler.index);
router.get('/quizes/:quizId(\\d+)', quickControler.show);
router.get('/quizes/:quizId(\\d+)/answer', quickControler.answer);

module.exports = router;
