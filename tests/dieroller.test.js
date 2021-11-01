const test = require('tape');

const bot = require('../dierollr/dierollr');

const DIE_ROLLS = {
  d6: [" d6["],
  "3d8+2d6+4": [" 3d8[", " 2d6[", "] 4"],
  "bs": [" d8[", "] 1"],
  "cbs": [" 2d8[", "] 2"],
  "d% // attack Balrog": [" d%["]
}


test("DIE_ROLLS", function(t) {
  for (let [command, expectedResult] of Object.entries(DIE_ROLLS) ) {
    let results = callBot(`/r ${command}`);
    // console.dir(results);
    for (let r of expectedResult)
      t.true(results[1].includes(r));
  }

  t.end();
});


test("comment & results", function(t) {
  let results = callBot(`/r d% // attack Balrog`);
  t.equals(results[0], "player: test  // attack balrog");
  t.true(results[2].startsWith("result: "));
  t.end();
});


function callBot(line) {
  let results = bot({
    content: line,
    author: "test"
  })
  return results.split('\n');
}
