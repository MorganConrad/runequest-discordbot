const test = require('tape');
const bot = require('../runequest-discordbot');


const EDGE_CASES = [
  [47, 9, "Special"],
  [47, 10, "Normal"],
  [48, 10, "Special"],

  [69, 4, "Special"],
  [70, 4, "Critical"],
];

test("edge cases", function(t) {
  for (let [ab, roll, expectedResult] of EDGE_CASES) {
    let testResult = callBot(`/rq ar ${ab} ${roll}`);
    t.true(testResult.endsWith(expectedResult), testResult)
  }

  t.end();
});



test("96 and over", function(t) {
  for (let roll = 96; roll < 100; roll++) {
    let testResult = callBot(`/rq ar 150 ${roll}`);
    t.true(testResult.endsWith("Failure"), testResult);
  }
  let testResult = callBot(`/rq ar 167 100`);
  t.true(testResult.endsWith("Fumble"), testResult);
  t.end();
});

test("5 and under", function(t) {
  for (let roll = 5; roll > 1; roll--) {
    let testResult = callBot(`/rq ar 3 ${roll}`);
    t.true(testResult.endsWith("Normal"), testResult);
  }
  let testResult = callBot(`/rq ar 3 1`);
  t.true(testResult.endsWith("Critical"), testResult);
  t.end();
});


test("resistance table", function(t) {
  const rnd10_19 = Math.floor(Math.random() * 10) + 10;
  let testResult = callBot(`/rq rt ${rnd10_19} ${rnd10_19+2}`);
  t.true(testResult.endsWith("40"));
  testResult = callBot(`/rq rt ${rnd10_19+3} ${rnd10_19}`);
  t.true(testResult.endsWith("65"));

  // note - results > 100 and < 0  now supported
  testResult = callBot(`/rq rt ${rnd10_19+12} ${rnd10_19}`);
  t.true(testResult.endsWith("110"));
  testResult = callBot(`/rq rt ${rnd10_19-12} ${rnd10_19}`);
  t.true(testResult.endsWith("-10"));
  t.end();

})


function callBot(line) {
  return bot.handleUserInput({
    content: line,
    author: "test"
  })
}
