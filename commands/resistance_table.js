function doHandle(userCommand, args, utils, subBot) {
  if (args.length < 2)
    return null;

  let att = parseInt(args[0], 10);
  let def = parseInt(args[1], 10);
  let chance = 5*(att-def)+50;

  return `Resistance Table: ${att} vs. ${def} => ${chance}`;
}




module.exports = {
  name: "Resistance Table",
  aliases: ['rt', 'resistancetable'],
  data: [],
  doHandle,
  help: '<attacker ability> <defender abuility>'
}
