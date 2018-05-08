var users = {
  admin: {
    id: 1,
    username: 'Admin',
    password: '1234'
  },
  user: {
    id: 2,
    username: 'User',
    password: '5678'
  }
};

exports.new = (req, res, next) => {
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', {
    errors: errors
  });
};

exports.create = (req, res, next) => {
  var login = req.body.login;
  var password = req.body.password;

  if (users[login]) {
    if (password === users[login].password) {
      req.session.user = {
        id: users[login].id,
        username: users[login].username
      };
      res.redirect(req.session.redir.toString());
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};

exports.destroy = (req, res, next) => {
  delete req.session.user;
  res.redirect(req.session.redir.toString());
};