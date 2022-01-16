const fs = require('fs');

function DataValidator(data) {
  const RegExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  return RegExpData.test(data);
}

const ifErro = (err) => {
  if (err) {
    return console.error(err);
  }
};

const returnNewTalker = (objTalker, id) => {
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const newId = Number(id);
  const talker = { id: newId, ...objTalker };
  dataTalker.splice(newId, 1, talker);
  fs.writeFile('./talker.json', JSON.stringify(dataTalker), (err) => ifErro(err));
  return talker;
};

function putTalker(req, res) {
  const { talk } = req.body;
  const { id } = req.params;

  if (!DataValidator(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
console.log();
  return res.status(200).json(returnNewTalker(req.body, id));
}

module.exports = putTalker;
