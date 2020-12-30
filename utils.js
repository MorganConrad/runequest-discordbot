/**
  Pick an effect from the array effects, handling '"' which means "ditto"
**/
function pick(effects, roll) {
  let effect = effects[roll];
  while (effect === '"')
    effect = effects[--roll];

  return effect;
}

/**
  Format a roll to two characters.  5 -> "05", 100 -> "00"
**/
function formatRoll(roll) {
  return ('0' + roll).substr(-2);
}


/**
  Parse an incoming string
  non-numberic input, e.g. "x", will usually get converted to a random number, 1..max
**/
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

/**
  Select a random number 1..max (inclusive)
**/
function random_1_based(max = 100) {
  return Math.floor(Math.random() * max) + 1;
}

module.exports = {
  pick,
  formatRoll,
  parseRoll,
  random_1_based
}
