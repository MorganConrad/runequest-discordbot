function pick(effects, roll) {
  let effect = effects[roll];
  while (effect === '"')
    effect = effects[--roll];

  return effect;
}

function formatRoll(roll) {
  return ('0' + roll).substr(-2);
}

// note, always returns a number unless you set max to < 1 (unusual)
function parseRoll(rollString, max = 100) {
  let roll = parseInt(rollString, 10);
  if (!roll) {
    if (roll === 0)
      roll = 100;
    else if (max > 0)
      roll = random_1_based(max);
  }

  return roll;
}


function random_1_based(max = 100) {
  return Math.floor(Math.random() * max) + 1;
}

module.exports = {
  pick,
  formatRoll,
  parseRoll,
  random_1_based
}
