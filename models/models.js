var path = require('path');
var Sequelize = require('sequelize');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;
var sequelize = new Sequelize(DB_name, user, pwd, {
  dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage, // solo SQLite (.env)
  omitNull: true, // solo Postgres
  operatorsAliases: Sequelize.Op,
});

var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(path.join(quiz_path));

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(path.join(comment_path));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment, { onDelete: 'cascade', hooks: true });

exports.Quiz = Quiz;
exports.Comment = Comment;

sequelize.sync()
  .then(() => {
    Quiz.count()
      .then((count) => {
        if (count === 0) {
          Quiz.create({
            pregunta: 'Capital de Italia',
            respuesta: 'Roma'
          });
          Quiz.create({
              pregunta: 'Capital de Portugal',
              respuesta: 'Lisboa'
            })
            .then(() => {
              console.log("Base de datos creada.")
            })
        }
      })
  })