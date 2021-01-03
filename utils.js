
const config = require('./config');



module.exports = {
  handler100s,
  handler100,
  pick,
  formatRoll,
  parseRoll,
  random_1_based,
  levelOfSuccess
};


/**
 * Default handler for 0-n arguments
 * @param userCommand   string e.g. 'fumble'  (often ignored)
 * @param args          array of strings
 * @param utilsIgnored
 * @param command       command object
 * @returns {string}
 */
function handler100s(userCommand, args, utilsIgnored, command) {
  if (!args.length)
    args = ['x'];
  return args.map((x) => handler100(userCommand, x, command)).join('\n');
}


/**
 * Default Handler for a single roll
 * @param userCommand   e.g. "fumble", ignored
 * @param rollString    e.g. "57"
 * @param command       command object
 * @returns {string}
 */
function handler100(userCommand, rollString, command) {
  let roll = parseRoll(rollString);
  let effect = pick(command.data, roll);
  let nicelyFormattedRoll = formatRoll(roll);

  return `${command.name} #${nicelyFormattedRoll}: ${effect}`;
}


/**
 * Pick an effect, handling '"' ("ditto")
 * @param effects  array
 * @param roll     1-based
 * @returns {string}
 */
function pick(effects, roll) {
  let effect = effects[roll];
  while (effect === '"')
    effect = effects[--roll];

  return effect;
}

/**
 * Formats a roll to two characters, e.g. 5 => "05", 100 => "00"
 * @param roll
 * @returns {string}
 */
function formatRoll(roll) {
  return ('0' + roll).substr(-2);
}


/**
 * Parse an incoming string representing a die roll
 *   - 0 gets converted to 100
 *   - non-numberic input, e.g. "x", will usually get converted to a random number, 1..max
 * @param rollString
 * @param max
 * @returns {number}
 */
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
 * Select a random number 1..max (inclusive)
 * @param max {number}  defaults to 100
 * @returns {number}
 */
function random_1_based(max = 100) {
  return Math.floor(Math.random() * max) + 1;
}


/**
 * Translates aliases and shortcuts to "standard" levels of success
 *   e.g. "slash" -> "critical"
 * @param input {string}
 * @returns {string}  or null if nothing matches
 */
function levelOfSuccess(input) {
  for (let [level, aliases] of Object.entries(config.successAliases)) {
    if (aliases.includes(input))
      return level;
  }

  return null;
}

