var models = require('../models/models.js');


// GET '/comments/new'
exports.new = (req, res, next) => {
  res.render('comments/new.ejs', {
    quizId: req.params.quizId
  });
};


// post '/comments'
exports.create = (req, res, next) => {
  var comment = {
    texto: req.body.texto,
    QuizId: req.params.quizId
  };
  if (!comment.texto) {
    res.render('comments/new', { comment: comment });
    return;
  }
  comment = models.Comment.create(comment);
  res.redirect('/quizes/' + req.params.quizId);
};