function doHandle(userCommand, args, utils, commandIgnored) {
  if (args.length < 2)
    return null;

  let ability = utils.parseRoll(args[0]);
  let roll = utils.parseRoll(args[1]);
  let niceRoll = utils.formatRoll(roll);
  let result = failOrFumble(ability, roll);
  if (!result) {
    let crit = Math.round(ability / 20);
    if (roll <= crit)
      result = "Critical";
  }
  if (!result) {
    let special = Math.round(ability / 5);
    if (roll <= special)
    result = "Special";
  }
  if (!result)
    result = (roll <= Math.max(ability, 5)) ? "Success" : "Failure";

  return `Ability: ${ability}  Roll: ${niceRoll} => ${result}`;
}


function failOrFumble(ability, roll) {
  if (ability >= 100) {
    if (roll === 100)
      return "Fumble";
  }

  else { // skill <100
    let critPct = Math.round((100 - ability) / 20);
    if ((roll + critPct) >= 100)
      return "Fumble";
  }

  return (roll > 95) ? "Failure" : null;
}


module.exports = {
  name: "Ability Results Table",
  aliases: ['ar', 'art', 'abilityresults'],
  data: [],
  doHandle,
  help: '<ability> <roll>'
}
