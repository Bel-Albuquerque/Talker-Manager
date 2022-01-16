const fs = require('fs');

const searchTalkers = (req, res) => {
  const { q } = req.query;

  const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filterTalkers = talker.filter((objTalker) => objTalker.name.includes(q));
  res.status(200).json(filterTalkers);
return console.log(q);
};

module.exports = searchTalkers;
