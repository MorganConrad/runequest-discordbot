
const test = require('tape');

const bot = require('../runequest-discordbot');

const SOME_KNOWN_SPIRITS = {
  25: 'Ancestral Spirit #25: Friendly, POW 1D6+6, 1 Spirit Spell, 0 Rune Points',
  26: 'Ancestral Spirit #26: Neutral, POW 5D6+6, 3D3 Spirit Spells, 2D6 Rune Points',
  70: 'Ancestral Spirit #70: Neutral, POW 1D6+6, 0 Spirit Spells, 0 Rune Points',
  71: 'Ancestral Spirit #71: Malign, POW 1D6+6, 0 Spirit Spells, 0 Rune Points',
};

const SOME_KNOWN_SPELLS = {
  37: "Disruption",
  38: "Dullblade",
  39: "Extinguish",
  74: "Spirit Screen"
}


test("some known spirits", function(t) {
  for (let [nn, expectedResult] of Object.entries(SOME_KNOWN_SPIRITS) ) {
    let result = bot.handleUserInput(`/rq summon ${nn}`).split('\n')[0];
    t.equals(result, expectedResult);
  }

  // test multiple
  let result = bot.handleUserInput(`/rq summon 26 70`).split('\n');
  t.equals(result[0], SOME_KNOWN_SPIRITS[26]);
  t.equals(result[1], SOME_KNOWN_SPIRITS[70]);

  t.end();
});


test("some known spells", function(t) {
  for (let [nn, expectedResult] of Object.entries(SOME_KNOWN_SPELLS) ) {
    let result = bot.handleUserInput(`/rq spell ${nn}`).split('\n')[0].substr(18);  // strip leading stuff
    t.equals(result, expectedResult);
  }

  // test multiple
  let result = bot.handleUserInput(`/rq spell 39 74`).split('\n');
  t.equals(result[0].substr(18), SOME_KNOWN_SPELLS[39]);
  t.equals(result[1].substr(18), SOME_KNOWN_SPELLS[74]);

  t.end();
});
