const fs = require('fs');

// https://www.horadecodar.com.br/2020/12/07/como-verificar-se-variavel-e-float-ou-inteiro-em-javascript/
// para validar se o número é um inteiro

// Gustavo Sant'Anna
function DataValidator(data) {
  const RegExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  return RegExpData.test(data);
}

const ifErro = (err) => {
  if (err) {
    return console.error(err);
  }
};

const returnNewTalker = (objTalker) => {
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const { name, age, talk } = objTalker;
 const id = dataTalker.length + 1;
  const talker = { id, name, age, talk };
  dataTalker.push(talker);
  fs.writeFile('./talker.json', JSON.stringify(dataTalker), (err) => ifErro(err));
  return talker;
};

const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 4) {
   return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
   next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
   }
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
   }
   next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
    }
   
   next();
};

function postTalker(req, res) {
  const { talk } = req.body;

  if (!DataValidator(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return res.status(201).json(returnNewTalker(req.body));
}

module.exports = {
postTalker,
checkAuthorization,
checkName,
checkAge,
checkTalk,
};
