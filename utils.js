function pick(effects, setRoll = 0, max = 100) {
  let roll = setRoll || Math.floor(Math.random() * max) + 1; // 1-based
  let effect = effects[roll];
  while (effect === '"')
    effect = effects[--roll];

  return { effect, roll }
}

function formatRoll(roll) {
  return ('0' + roll).substr(-2);
}

module.exports = {
  pick,
  formatRoll
}
