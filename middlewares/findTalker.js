const fs = require('fs');

const HTTP_OK_STATUS = 200;

const findTalker = (req, res) => {
  const { id } = req.params;
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talker = dataTalker.find((talkerId) => talkerId.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(talker);
};
module.exports = findTalker;
