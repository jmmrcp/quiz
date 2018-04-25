var scheduler = require('node-schedule');
var models = require('../models/models');

var rule = new scheduler.RecurrenceRule();
rule.minute = 0;

var dailyJob = scheduler.scheduleJob(rule, () => {
  models.Quiz.create({
    pregunta: new Date().getHours(),
    respuesta: 'Done'
  })
});