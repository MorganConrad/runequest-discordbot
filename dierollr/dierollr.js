const ABBREVS = require('./abbrevs.js');
const MACROS = require('./macros.js');

const PERCENTILES = ['%', '00'];
const HELP_URL = "https://github.com/MorganConrad/runequest-discordbot/blob/main/dierollr/README.md";


function handleUserInput(message) {
  let lineLowerCase = message.content.substr(2).toLowerCase(); // drop the leading /r
  let [command, comment] = lineLowerCase.split('//');

  command = command.replace(/ +/g, '');  // eliminate all spaces

  if (!command || (command === 'help'))
    return `For help, see ` + HELP_URL;

  let expanded = expandAllAbbreviations(command);
  let tokens = expanded.split(/([+-])/);
  let parsed = tokens.map(parseToken);
  let result = computeResult(parsed);

  comment = comment ? "  // " + comment.trim() : "";
  return `player: ${message.author}${comment}\nrolls: ${result.rolls}\nresult: ${result.sum}`
}


function expandAllAbbreviations(line) {
  line = doAbbrevs(line, MACROS);
  line = doAbbrevs(line, ABBREVS);
  return line;
}


function parseToken(token) {
  if (token === '+')
    return { sign: 1 };
  else if (token === '-')
    return { sign: -1};

  else if (token.includes('d'))
    return handleDieCommand(token);

  else return {  // it's a constant
    rolls: token,
    sum: parseInt10(token)
  }
}


function computeResult(parsed) {
  let sign = 1;
  let rolls = "";
  let sum = 0;

  for (let p of parsed) {
    if (p.sign)
      sign = p.sign;
    else {
      rolls = rolls + " " + p.rolls;
      sum = sum + (sign * p.sum);
    }
  }

  return {
    rolls,
    sum
  }
}


/**
 * Handle a string like 2d8
 * @param dieCommand string, e.g. "2d8" or "d%"
 * @returns {{rolls, sum}}
 */
function handleDieCommand(dieCommand) {
  let [countStr, sidesStr] = dieCommand.split('d');
  let count = parseInt10(countStr || '1');  // might be missing, default to 1
  let sides = PERCENTILES.includes(sidesStr) ? 100 : parseInt10(sidesStr);
  return roll(count, sides, dieCommand);
}


function roll(count, sides, dieCommand) {
  let rolls = [];
  let sum = 0;
  for (let i = 0; i < count; i++) {
    rolls[i] = Math.floor(Math.random() * sides) + 1;
    sum += rolls[i]
  }

  return { rolls: dieCommand + JSON.stringify(rolls), sum };
}


function doAbbrevs(str, map = {}) {
  for (let [k, v] of Object.entries(map))
    str = str.replace(k, v);

  return str;
}


function parseInt10(s) {
  let val = parseInt(s, 10);
  if (Number.isNaN(val)) {
    let msg = `Error: cannot parse ${s} as an integer`;
    console.error(msg);
    // throw new Error(msg); just keep going for now...
  }

  return val;
}


module.exports = handleUserInput;
