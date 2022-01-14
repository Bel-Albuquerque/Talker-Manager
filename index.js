const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkers = (req, res) => {
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  res.status(200).send(dataTalker);
};

app.get('/talker', talkers);

const findTalker = (req, res) => {
  const { id } = req.params;
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talker = dataTalker.find((talkerId) => talkerId.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(talker);
};



app.get('/talker/:id', findTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
