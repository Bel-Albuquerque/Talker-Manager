const fs = require('fs');

const ifErro = (err) => {
  if (err) {
    return console.error(err);
  }
};

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const dataTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const newDataTalker = dataTalker.filter((obj) => obj.id !== Number(id));
  fs.writeFile('./talker.json', JSON.stringify(newDataTalker), (err) => ifErro(err));

return res.status(204).json();
};

module.exports = deleteTalker;
