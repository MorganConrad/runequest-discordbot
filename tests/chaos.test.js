
const test = require('tape');

const bot = require('../runequest-discordbot');

const SOME_KNOWN_CHAOS_FEATURES = {
  16: '+2D6 SIZ',
  25: 'Extra sensory organs.',
  35: '+6-point skin (treat as armor)',
  91: 'Capable of leaping up to DEX in meters.',
};

const SOME_KNOWN_CURSE_THED = {
  6: "Lose 3D6 POW",
  14: "Lose 2D6 STR",
  15: "Lose 4D6 STR",
  58: "Victim cannot resist 1- or 2-point spells.",
}


test("some known chaos features", function(t) {
  for (let [nn, expectedResult] of Object.entries(SOME_KNOWN_CHAOS_FEATURES) ) {
    let result = callBot(`/rq cf ${nn}`).split('\n')[0].substr(19);
    t.equals(result, expectedResult);
  }

  // test multiple
  let result = callBot(`/rq chaos 25 35`).split('\n');
  t.equals(result[0].substr(19), SOME_KNOWN_CHAOS_FEATURES[25]);
  t.equals(result[1].substr(19), SOME_KNOWN_CHAOS_FEATURES[35]);

  t.end();
});


test("some known curses of Thed", function(t) {
  for (let [nn, expectedResult] of Object.entries(SOME_KNOWN_CURSE_THED) ) {
    let result = callBot(`/rq ct ${nn}`).split('\n')[0].substr(19);  // strip leading stuff
    t.equals(result, expectedResult);
  }

  // test multiple
  let result = callBot(`/rq thed 14 58`).split('\n');
  t.equals(result[0].substr(19), SOME_KNOWN_CURSE_THED[14]);
  t.equals(result[1].substr(19), SOME_KNOWN_CURSE_THED[58]);

  t.end();
});


function callBot(line) {
  return bot.handleUserInput({
    content: line,
    author: "test"
  })
}
