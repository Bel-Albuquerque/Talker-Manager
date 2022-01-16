const fs = require('fs');

const getTalkers = (req, res) => {
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  res.status(200).send(dataTalker);
};

module.exports = getTalkers;
