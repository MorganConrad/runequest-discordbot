const ABBREVS = require('./abbrevs.js');
const MACROS = require('./macros.js');

const PERCENTILES = ['%', '00'];

let op = "+";
let temps = {}

function handleUserInput(message) {
  // console.log("in dierollr");
  // console.dir(message);
  let [line, comment] = message.content.substr(2).split('//');

  line = line.replace(/ +/g, '');  // eliminate all spaces
  if (line.startsWith('='))
    return addTemp(line, message.author);
  line = doAbbrevs(line, temps);
  line = doAbbrevs(line, MACROS);
  line = doAbbrevs(line, ABBREVS);
  // console.log(line);
  let parts = line.split(/([+-])/);
  // console.dir(parts);
  let parsed = parts.map(parse1);
  // console.dir(parsed);
  let result = parsed.reduce(addEmUp, { rolls: "", sum: 0 });

  comment = comment ? "  // " + comment.trim() : "";
  return `player: ${message.author}${comment}\nrolls: ${result.rolls}\nresult: ${result.sum}`
}


function addEmUp(prev, curr) {
  if (curr.op) {
    op = curr.op;
    return prev;
  }
  else {
    return {
      rolls: prev.rolls + " " + curr.rolls,
      sum: add(prev, curr)
    }
  }
}


function add(prev, curr) {
  switch(op) {
     case '-' : return prev.sum - curr.sum;
     case '+' : return prev.sum + curr.sum;
  }
}

function parse1(s) {
  if ((s === '+') || (s === '-'))
    return { op: s };
  let parts = s.split('d');
  // console.dir(parts);
  if (parts.length === 1) {
    let v = parseInt(parts[0], 10);
    return { rolls:parts[0], sum:v };
  }

  else {
    let count = parseInt(parts[0] || '1', 10);
    let p1 = parts[1];
    let sides = 100;
    if (!PERCENTILES.includes(p1))
      sides = parseInt(parts[1], 10);
    return roll(count, sides, s);
  }
}


function roll(count, sides, str) {
  // console.dir( { count, sides });
  let rolls = [];
  let sum = 0;
  for (let i=0; i<count; i++) {
    rolls[i] = Math.floor(Math.random() * sides) + 1;
    sum += rolls[i]
  }

  // console.dir(rolls);
  return { rolls: str + JSON.stringify(rolls), sum };
}


function doAbbrevs(str, map = {}) {
  for (let [k, v] of Object.entries(map))
    str = str.replace(k, v);

  return str;
}


function addTemp(line, author) {
  let [ignore, k, v] = line.split("=");
  let msg = "";
  if (k === '_clear_') {
    temps = {};
    msg = `${author} cleared temps`;
  }
  else {
    let tested = handleUserInput({content: "/r " + v, author});
    temps[k] = v;
    msg = `MACRO:  ${author} added temporary macro ${k} = ${v}\ntest results o.k.:\n${tested}`;
  }

  // console.log(msg);
  return msg;
}


module.exports = handleUserInput;
