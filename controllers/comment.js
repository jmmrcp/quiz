var models = require('../models/models.js');


// GET '/comments/new'
exports.new = (req, res, next) => {
  res.render('comments/new.ejs', {
    quizId: req.params.quizId
  });
};


// post '/comments'
exports.create = (req, res, next) => {
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    quizId: req.params.quizId
  });
  if (!comment.texto) {
    res.render('comments/new', { comment: comment });
    return;
  }
  comment
    .save()
    .then(() => {
      res.redirect('/quizes/' + req.params.quizId);
    })
    .catch((error) => {
      next(error)
    });
};