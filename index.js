const express = require('express');
const bodyParser = require('body-parser');
const { 
  postTalker, 
  checkAuthorization, 
  checkName, 
  checkAge, 
  checkTalk, 
} = require('./middlewares/postTalker');
const findTalker = require('./middlewares/findTalker');
const login = require('./middlewares/login');
const getTalkers = require('./middlewares/getTalkers');
const putTalker = require('./middlewares/putTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalkers = require('./middlewares/searchTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getTalkers);
app.get('/talker/search', checkAuthorization, searchTalkers);
app.get('/talker/:id', findTalker);
app.post('/login', login);
app.post('/talker', checkAuthorization, checkName, checkAge, checkTalk, postTalker);
app.put('/talker/:id', checkAuthorization, checkName, checkAge, checkTalk, putTalker);
app.delete('/talker/:id', checkAuthorization, deleteTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
