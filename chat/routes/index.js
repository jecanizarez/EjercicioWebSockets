var express = require('express');
var router = express.Router();

const Joi = require('joi');
var Message = require('../models/message');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/chat/api/messages', function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/chat/api/messages', function (req, res, next) {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({ message: req.body.message, author: req.body.author }).then(
    (result) => {
      res.send(result);
    }
  );
});

router.get('/chat/api/messages/:id', (req, res) => {
  Message.findByPk(req.params.id).then((response) => {
    if (response === null)
      return res
        .status(404)
        .send('The Message with the given id was not found.');
    res.send(response);
  });
});


router.put('/chat/api/messages/:id', (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.update(req.body, { where: { id: req.params.id } }).then((response) => {
    if (response[0] !== 0) res.send({ message: 'Message updated' });
    else res.status(404).send({ message: 'Message was not found' });
  });
});

router.delete('/chat/api/messages/:id', (req, res) => {
  Message.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) res.status(204).send();
    else res.status(404).send({ message: 'Message was not found' });
  });
});

const validateMessage = (message) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().regex(new RegExp("/[a-zA-Z]+ [a-zA-Z]+$/")).required(),
  });

  return schema.validate(message);
};


module.exports = router;
