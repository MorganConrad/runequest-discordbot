/**
 * Calculate the chance of success on the Resistance Table
 * args = [ attacker characteristic (e.g. "15"), defender characteristic (e.g. "14")]
 */


function doHandle(userCommand, args, utils, command) {
  if (args.length < 2)
    return null;

  let att = parseInt(args[0], 10);
  let def = parseInt(args[1], 10);
  let chance = 5 * (att - def) + 50;

  /* allow values <5 and >95
  if (chance < 5)
    chance = 5;
  else if (chance > 95)
    chance = 95;
  */

  return `Resistance Table: ${att} vs. ${def} => ${chance}`;
}




module.exports = {
  name: "Resistance Table",
  aliases: ['resistance', 'rt', 'resistancetable'],
  doHandle,
  help: '<attacker characteristic> <defender characteristic>'
};
