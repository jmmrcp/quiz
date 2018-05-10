var models = require('../models/models');


exports.load = (req, res, next, commentId) => {
  models.Comment.find({
    where: { id: Number(commentId) }
  })
    .then((comment) => {
      if (comment) {
        req.comment = comment;
        next();
      } else {
        throw new Error('No existe commentId=' + commentId);
      }
    })
    .catch((error) => {
      next(error);
    });
};


// GET '/comments/new'
exports.new = (req, res, next) => {
  res.render('comments/new.ejs', {
    QuizId: req.params.quizId
  });
};


// post '/comments'
exports.create = (req, res, next) => {
  var comment = {
    texto: req.body.texto,
    QuizId: req.params.quizId
  };
  if (!comment.texto) {
    res.render('comments/new', { QuizId: req.params.quizId });
    return;
  }
  comment = models.Comment.create(comment);
  res.redirect('/quizes/' + req.params.quizId);
};


exports.publish = (req, res, next) => {
  req.comment.publicado = true;
  req.comment
    .save({
      fields: ["publicado"]
    })
    .then(() => {
      res.redirect('/quizes/' + req.params.quizId);
    })
    .catch((error) => {
      next(error);
    })
};

exports.destroy = (req, res, next) => {
  req.comment
    .destroy()
    .then(() => {
      res.redirect('/quizes/' + req.params.quizId);
    })
    .catch((error) => {
      next(error)
    });
};
