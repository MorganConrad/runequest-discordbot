const KNOCKED_79_82 = `knocked away (roll 1D6 for number of meters it travels,
and roll 1D8 for compass direction it goes;
with 1=north, 2=northeast, 3=east, 4=southeast, 5=south, 6=southwest, 7=west, 8=northwest).`;
const SHATTERED_83_86 = `shattered (100% chance if unenchanted;
10% less for each point of battle magic spell on weapon,
and 20% less for each point of Rune magic spell on weapon).`
const HIT_NEAREST_FRIEND = 'Hit nearest friend (hit self if no friend near); do ';
const WIDE_OPEN = 'Wide open; foe automatically hits with ';

const Fumbles = ["0 filler",   // indoces are off by 10
'Lose next parry.',
'"',
'"',
'"',
'"',
'Lose next attack.',
'"',
'"',
'"',
'"',
'Lose next attack and parry.',
'"',
'"',
'"',
'"',
'Lose next attack, parry, and any Dodge.',
'"',
'"',
'"',
'"',
'Lose next 1D3 attacks.',
'"',
'"',
'"',
'"',
'Lose next 1D3 attacks and parries.',
'"',
'"',
'"',
'"',
'Shield strap breaks; lose shield immediately.',
'"',
'"',
'"',
'"',
'Shield strap breaks; lose shield immediately, and lose next attack.',
'"',
'"',
'"',
'"',
'Armor strap breaks and armor comes loose (roll for hit location to determine which piece of armor is lost).',
'"',
'"',
'"',
'"',
'Armor strap breaks, armor comes loose (roll for hit location to determine which piece), and lose next attack and parry.',
'"',
'"',
'"',
'"',
'Fall and lose parry this round (takes 1D3 rounds to get up).',
'"',
'"',
'"',
'"',
'Twist ankle; lose half movement rate for 5D10 rounds.',
'"',
'"',
'"',
'"',
'Twist ankle and fall; lose parry this round, takes 1D3 rounds to get up, half movement rate for 5D10 rounds.',
'"',
'"',
'Vision impaired; lose 25% effectiveness on attacks and parries (takes 1D3 rounds unengaged to clear vision).',
'"',
'"',
'"',
'Vision impaired; lose 50% effectiveness on attacks and parries (takes 1D6 rounds unengaged to clear vision).',
'"',
'"',
'Vision blocked; lose all attacks and parries (takes 1D6 rounds unengaged to clear vision).',
'"',
'Distracted; foes attack at +25% effectiveness for next round.',
'"',
{ a: 'Weapon used in attack dropped (takes 1D3 rounds to recover).', p: 'Parrying weapon or shield dropped (takes 1D3 rounds to recover).'},
'"',
'"',
'"',
{ a: 'Weapon ' + KNOCKED_79_82, p: 'Parrying weapon or shield ' + KNOCKED_79_82 },
'"',
'"',
'"',
{ a: 'Weapon ' + SHATTERED_83_86, p: 'Parrying weapon or shield ' + SHATTERED_83_86 },
'"',
'"',
'"',
{ a: HIT_NEAREST_FRIEND + 'rolled damage.', p: WIDE_OPEN + 'normal damage.'},
'"',
'"',
{ a: HIT_NEAREST_FRIEND + 'do full possible damage.', p: WIDE_OPEN + 'normal damage.'},
'"',
{ a: HIT_NEAREST_FRIEND + 'critical hit.', p: WIDE_OPEN + 'normal damage.'},
{ a: 'Hit self; do rolled damage.', p: WIDE_OPEN + 'full possible damage.'},
'"',
'"',
{ a: 'Hit self; do full possible damage.', p: WIDE_OPEN + 'critical hit.'},
'"',
{ a: 'Hit self; do critical hit.', p: WIDE_OPEN + 'critical hit.'},
'Blow it; roll twice on this table, and apply both results.\nIf this result is rolled again, continue rolling until two otherresults are achieved.',
'Blow it badly; roll three times on this table, and apply all three results.\nIf this result is rolled again, continue rolling'
]



function doHandle(userCommand, args, utils, subBot) {
  let setRoll = args[0] ? parseInt(args[0], 10) : 0;
  let { effect, roll } = utils.pick(subBot.data, setRoll);
  let nicelyFormattedRoll = utils.formatRoll(roll);
  let effectMessage = effectAttackOrParry(effect, userCommand)

  return `${subBot.name} #${nicelyFormattedRoll}: ${effectMessage}`;
}


function effectAttackOrParry(rawEffect, userCommand) {
  if (typeof rawEffect === 'string')
    return rawEffect;
  switch(userCommand) {
    case 'fa': case 'fumbledattack':
      return rawEffect.a;
    case 'fp': case 'fumbledparry':
      return rawEffect.p;
    default:
      return `\n  Attack: ${rawEffect.a}\n  Parry:  ${rawEffect.p}`
  }
}

module.exports = {
  name: "Fumble",
  aliases: ['fa', 'fp', 'fu', 'fumble', 'fumbledattack', 'fumbledparry'],
  data: Fumbles,
  doHandle,
  help: 'todo'
}

