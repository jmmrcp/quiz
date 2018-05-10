var models = require('../models/models');

exports.load = (req, res, next, quizId) => {
  models.Quiz.find({
    where: { id: Number(quizId) },
    include: [{ model: models.Comment }]
  })
    .then((quiz) => {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        throw new Error('No existe quizId=' + quizId);
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.index = (req, res, index) => {
  models.Quiz.findAll()
    .then(quizes => {
      res.render('quizes/index', {
        quizes: quizes
      });
    })
};

exports.show = (req, res, next) => {
  res.render('quizes/show', {
    quiz: req.quiz
  });
};

exports.answer = (req, res, next) => {
  var resultado = 'Incorrecto';
  if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {
    quiz: req.quiz,
    respuesta: resultado
  });
};

exports.new = (req, res, next) => {
  var quiz = models.Quiz.build({
    pregunta: '',
    respuesta: ''
  })
  res.render('quizes/new', {
    quiz: {
      pregunta: 'Introduce la Pregunta',
      respuesta: 'Introduce la Respuesta'
    }
  });
};

// POST /quizes/create
exports.create = (req, res, next) => {
  var quiz = {
    pregunta: req.body.question,
    respuesta: req.body.answer
  };
  // Validar que no estan vacios
  if (!quiz.pregunta || !quiz.respuesta) {
    res.render('quizes/new', { quiz: quiz });
    return;
  }
  // guarda el nuevo quiz
  quiz = models.Quiz.create(quiz);
  res.redirect('/quizes');
};

exports.edit = (req, res, next) => {
  var quiz = req.quiz;
  res.render('quizes/edit', { quiz: quiz });
};

exports.update = (req, res, next) => {
  req.quiz.pregunta = req.body.question;
  req.quiz.respuesta = req.body.answer;

  // Validar que no estan vacios
  if (!req.quiz.pregunta || !req.quiz.respuesta) {
    res.render('quizes/edit', { quiz: req.quiz });
    return;
  }

  req.quiz
    .save({
      fields: ["pregunta", "respuesta"]
    })
    .then(() => {
      res.redirect('/quizes');
    })
};

exports.destroy = (req, res, next) => {
  req.quiz
    .destroy()
    .then(() => {
      res.redirect('/quizes');
    })
    .catch((error) => {
      next(error)
    });
};

exports.play = (req, res, next) => {

};

exports.check = (req, res, next) => {

};