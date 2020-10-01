var express = require('express');
var router = express.Router();

const Joi = require('joi');
var controller = require("../controller/controller");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/chat/api/messages', async function (req, res, next) {
  const messages = await controller.getMessages();
  res.send(messages);
});

router.post('/chat/api/messages', function (req, res, next) {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  const newMessage = controller.insertMessage(req.body);
  res.send(newMessage);
});

router.get('/chat/api/messages/:id', async (req, res) => {
  message = await controller.getMessage(req.params.id);
  res.send(message);
});


router.put('/chat/api/messages/:id', async (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  let message = await controller.update(req.params.id, req.body);
  res.send(message);
});

router.delete('/chat/api/messages/:id', async(req, res) => {

  let respuesta = await controller.deleteMessage(req.params.id);
  res.send(respuesta);
});

const validateMessage = (message) => {
  const schema = Joi.object({
    content: Joi.string().min(5).required(),
    author: Joi.string().regex(new RegExp("[a-zA-Z]+\s[a-zA-Z]+$")).required(),
  });

  return schema.validate(message);
};


module.exports = router;
