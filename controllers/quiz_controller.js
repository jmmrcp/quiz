var models = require('../models/models');

exports.load = function (req, res, next, quizid) {
  models.Quiz.findById(quizid).then(
    function (quiz) {
      if (quizid) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId=' + quizid));
      }
    }
  ).catch(function (error) {
    next(Error);
  })
};

exports.index = function (req, res) {
  models.Quiz.findAll().then(
    function (quizes) {
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
  res.render('quizes/answer.ejs', {
    quiz: req.quiz,
    respuesta: resultado
  });
};