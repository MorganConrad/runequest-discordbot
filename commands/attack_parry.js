/**
 * Determine the result of a given attack vs. a parry
 * args = [ attack level (e.g. "Special"), parry level (e.g. "Failure")]
 *
 * @see config.successAliases
 */

const D_1HP = "Defender’s parrying weapon takes 1 HP damage if rolled damage is greater than its current HP";
const A_1HP = "Defender rolls parrying weapon’s normal damage.\nAttacking weapon’s HP is reduced by 1 HP if damage over its current HP";
const A_XHP = "Defender rolls parrying weapon’s special damage.\nAttacking weapon’s HP is reduced by any damage over its current HP";
const A_MAXHP = "Defender rolls parrying weapon’s special damage.\nAttacking weapon’s HP reduced by the damage rolled";

const DEFENDER_EXCESS_HIT_LOCATION_ROLLED = "Any excess damage goes to rolled hit location";
const DEFENDER_EXCESS_HIT_LOCATION_ADJACENT = "Any excess damage goes to the adjacent hit location";
const DEFENDER_HIT_LOCATION_ROLLED = "Defender takes damage to rolled hit location";

const NO_ARMOR = ", with no armor protection";
const AND_FUMBLES = ", and rolls on FUmble Table";

const ATTACK_DAMAGE_NORMAL = "Attacker rolls normal damage";
const ATTACK_DAMAGE_SPECIAL_MAX = "Attacker inflicts max special damage";
const ATTACK_DAMAGE_SPECIAL = "Attacker rolls special damage";
const ATTACK_PARRIED = "Attack parried or deflected";
const ATTACK_FUMBLED = "Attacker rolls on Fumbles table";

const HELP = `Please supply an attack and a parry result from [cr,sp,n,m,fu]
    e.g. cr m    means critical attack vs. a missed parry.`;

const RESULTS = {

  critical: {
    critical: [ATTACK_DAMAGE_NORMAL, D_1HP, DEFENDER_EXCESS_HIT_LOCATION_ROLLED],
    special:  [ATTACK_DAMAGE_SPECIAL_MAX, D_1HP, DEFENDER_EXCESS_HIT_LOCATION_ADJACENT + NO_ARMOR],
    normal:   [ATTACK_DAMAGE_SPECIAL_MAX, "Defender’s parrying weapon HP reduced by the damage rolled", DEFENDER_EXCESS_HIT_LOCATION_ADJACENT + NO_ARMOR],
    failure:  [ATTACK_DAMAGE_SPECIAL_MAX, DEFENDER_HIT_LOCATION_ROLLED + NO_ARMOR],
    fumble:   [ATTACK_DAMAGE_SPECIAL_MAX, DEFENDER_HIT_LOCATION_ROLLED + NO_ARMOR, AND_FUMBLES],
  },

  special: {
    critical: [ATTACK_PARRIED, A_1HP],
    special:  [ATTACK_DAMAGE_NORMAL, D_1HP, DEFENDER_EXCESS_HIT_LOCATION_ROLLED],
    normal:   [ATTACK_DAMAGE_SPECIAL, "Defender’s parrying weapon takes damage over its HP,\nwith same amount of damage going to adjacent hit location"],
    failure:  [ATTACK_DAMAGE_SPECIAL, DEFENDER_HIT_LOCATION_ROLLED],
    fumble:   [ATTACK_DAMAGE_SPECIAL, DEFENDER_HIT_LOCATION_ROLLED, AND_FUMBLES]
  },

  normal:  {
    critical: [ATTACK_PARRIED, A_XHP],
    special:  [ATTACK_PARRIED, A_1HP],
    normal:   [ATTACK_DAMAGE_NORMAL, D_1HP, DEFENDER_EXCESS_HIT_LOCATION_ROLLED],
    failure:  [ATTACK_DAMAGE_NORMAL, DEFENDER_HIT_LOCATION_ROLLED],
    fumble:   [ATTACK_DAMAGE_NORMAL, DEFENDER_HIT_LOCATION_ROLLED, AND_FUMBLES],
  },

  failure:  {
    critical: [ATTACK_PARRIED, A_MAXHP],
    special:  [ATTACK_PARRIED, A_XHP],
    normal:   [ATTACK_PARRIED, A_1HP],
    failure:  ["Attacker misses.  Defender misses."],
    fumble:   [ATTACK_DAMAGE_NORMAL, DEFENDER_HIT_LOCATION_ROLLED, AND_FUMBLES]
  },

  fumble:  {
    critical: [ATTACK_FUMBLED, A_MAXHP],
    special:  [ATTACK_FUMBLED, A_XHP],
    normal:   [ATTACK_FUMBLED, A_1HP],
    failure:  [ATTACK_FUMBLED, "Defender misses."],
    fumble:   [ATTACK_FUMBLED, "Defender rolls on Fumble table"]
  }
};

function doHandle(userCommand, args, utils, commandIgnored) {
  if (args.length < 2)
    return HELP;

  let attackerSuccess = utils.levelOfSuccess(args[0]);
  let defenderSuccess = utils.levelOfSuccess(args[1]);

  if (!attackerSuccess || !defenderSuccess)
    return HELP;

  let result = RESULTS[attackerSuccess][defenderSuccess].join(".\n");

  return `Attack ${attackerSuccess} vs. Parry ${defenderSuccess}:\n${result}.`;
}


module.exports = {
  name: "Attack and Parry Results",
  aliases: ['melee', 'ap', 'avp', 'attackparry'],
  data: [],
  doHandle,
  help: HELP
};
