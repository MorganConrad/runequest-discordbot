/**
 * Command to determine the result of a die roll
 *   args = [ability% (e.g. 95), die roll (e.g. 18)]
 *
 */

const CRITICAL = "Critical";
const SPECIAL = "Special";
const NORMAL = "Normal";
const FAILURE = "Failure";
const FUMBLE = "Fumble";


function doHandle(userCommand, args, utils, commandIgnored) {
  if (args.length < 2)
    return null;

  let ability = utils.parseRoll(args[0]);
  let roll = utils.parseRoll(args[1]);
  let niceRoll = utils.formatRoll(roll);
  let result = failOrFumble(ability, roll) || alwaysSomeChance(ability, roll);

  if (!result) {
    let critPct = Math.round(ability / 20);
    if (roll <= critPct)
      result = CRITICAL;
  }
  if (!result) {
    let specialPct = Math.round(ability / 5);
    if (roll <= specialPct)
    result = SPECIAL;
  }
  if (!result)
    result = (roll <= Math.max(ability, 5)) ? NORMAL : FAILURE;

  return `Ability: ${ability}  Roll: ${niceRoll} => ${result}`;
}


function failOrFumble(ability, roll) {
  if (ability >= 100) {
    if (roll === 100)
      return FUMBLE;
  }

  else { // skill <100
    let fumblePct = Math.round((100 - ability) / 20);
    if ((roll + fumblePct) >= 100)
      return FUMBLE;
  }

  return (roll > 95) ? FAILURE : null;
}


// for abilities <= 5
function alwaysSomeChance(ability, roll) {
  if (ability > 5)
    return null;

  if (roll === 1)
    return CRITICAL;
  else if (roll <= 5)
    return NORMAL;
  else
    return null;
}


module.exports = {
  name: "Ability Results Table",
  aliases: ['success', 'level', 'ar', 'abilityresults'],
  data: [],
  doHandle,
  help: '<ability> <roll>'
}
