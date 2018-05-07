var express = require('express');
var router = express.Router();

var quickControler = require('../controllers/quiz');
var commentControler = require('../controllers/comment');

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

router.get('/quizes', quickControler.index);
router.get('/quizes/:quizId(\\d+)', quickControler.show);
router.get('/quizes/:quizId(\\d+)/answer', quickControler.answer);
router.get('/quizes/new', quickControler.new);
router.post('/quizes/create', quickControler.create);
router.get('/quizes/:quizId(\\d+)/edit', quickControler.edit);
router.put('/quizes/:quizId(\\d+)', quickControler.update);
router.delete('/quizes/:quizId(\\d+)', quickControler.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentControler.new);
router.post('/quizes/:quizId(\\+d)/comments', commentControler.create);

/*
router.get('/goback', redirectBack);
// Rutas GET que no acaban en /new, /edit, /play, /check, /session, o /:id.
router.get(/(?!\/new$|\/edit$|\/play$|\/check$|\/session$|\/(\d+)$)\/[^\/]*$/, (req, res, next) => {
  req.session.backURL = req.url;
  next();
});
 
function redirectBack(req, res, next) {
  var url = req.session.backURL || "/";
  delete req.session.backURL;
  res.redirect(url);
} */

module.exports = router;
