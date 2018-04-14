module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Quiz', {
    pregunta: DataTypes.STRING,
    respuesta: DataTypes.STRING
  });
}