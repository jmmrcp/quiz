var models = require('../models/models');

exports.load = function (req, res, next, quizid) {
  var quiz = models.Quiz.findById(Number(quizId));
  if (quiz) {
    req.quiz = quiz;
    next();
  } else {
    throw new Error('No existe ningún quiz con id=' + quizId);
  }
};

exports.index = function (req, res) {
  models.Quiz.findAll()
    .then(function (quizes) {
      res.render('quizes/index', {
        quizes: quizes
      });
    })
};

exports.show = function (req, res) {
  res.render('quizes/show', {
    quiz: req.quiz
  });
};

exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {
    quiz: req.quiz,
    respuesta: resultado
  });
};

exports.new = function (req, res) {
  var quiz = models.Quiz.build({
    pregunta: 'Pregunta',
    respuesta: 'Respuesta'
  })
  res.render('quizes/new', {
    quiz: quiz
  });
};

// POST /quizzes/create
exports.create = function (req, res, next) {
  var quiz = {
    question: req.body.question,
    answer: req.body.answer
  };
  // Validar que no estan vacios
  if (!quiz.question || !quiz.answer) {
    res.render('quizzes/new', { quiz: quiz });
    return;
  }
  // guarda el nuevo quiz
  quiz = models.Quiz.create(quiz);
  res.redirect('/quizzes/' + quiz.id);
};