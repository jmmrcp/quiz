var express = require('express');
var router = express.Router();

var quickControler = require('../controllers/quiz');
var commentControler = require('../controllers/comment');
var sessionControler = require('../controllers/session');

var schedulers = require('../schedulers/scheduler');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Quiz' });
});

/* GET Página del Autor */
router.get('/author', (req, res, next) => {
  res.render('author');
});

router.param('quizId', quickControler.load);
router.param('commentId', commentControler.load);

router.get('/login', sessionControler.new);
router.post('/login', sessionControler.create);
router.get("/logout", sessionControler.destroy);

router.get('/quizes', quickControler.index);
router.get('/quizes/:quizId(\\d+)', quickControler.show);
router.get('/quizes/:quizId(\\d+)/answer', quickControler.answer);
router.get('/quizes/new', sessionControler.loginRequired, quickControler.new);
router.post('/quizes/create', sessionControler.loginRequired, quickControler.create);
router.get('/quizes/:quizId(\\d+)/edit', quickControler.edit);
router.put('/quizes/:quizId(\\d+)', sessionControler.loginRequired, quickControler.update);
router.delete('/quizes/:quizId(\\d+)', sessionControler.loginRequired, quickControler.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentControler.new);
router.post('/quizes/:quizId(\\d+)/comments', commentControler.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionControler.loginRequired, commentControler.publish)
router.delete('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)', sessionControler.loginRequired, commentControler.destroy);

module.exports = router;
