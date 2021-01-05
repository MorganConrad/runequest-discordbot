/**
 * Determine the result of a given attack vs. a dodge
 * args = [ attack level (e.g. "Special"), dodge level (e.g. "Failure")]
 *
 * @see config.successAliases
 */

const HELP = `Please supply an attack and a dodge result from [cr,sp,n,m,fu]
    e.g. cr m    means critical attack vs. a missed dodge.`;

const ATTACK_MAX_SPECIAL = "Attack does maximum special success damage";
const ATTACK_SPECIALS = "Attack does special success damage";
const ATTACK_NORMAL = "Attack does normal damage";
const ATTACK_DODGED = "Attack is dodged";
const ATTACK_MISSES = "Attack Misses";
const IGNORE_ARMOR = ", ignoring armor";
const ATTACKER_FUMBLES = "Attacker rolls on Fumble table";
const DEFENDER_FUMBLES = "Defender rolls on Fumble table";

const RESULTS = {

  critical: {
    critical: [ATTACK_DODGED],
    special:  [ATTACK_SPECIALS],
    normal:   [ATTACK_SPECIALS + IGNORE_ARMOR],
    failure:  [ATTACK_MAX_SPECIAL + IGNORE_ARMOR],
    fumble:   [ATTACK_MAX_SPECIAL + IGNORE_ARMOR, DEFENDER_FUMBLES],
  },

  special: {
    critical: [ATTACK_DODGED],
    special:  [ATTACK_DODGED],
    normal:   [ATTACK_SPECIALS],
    failure:  [ATTACK_SPECIALS],
    fumble:   [ATTACK_SPECIALS, DEFENDER_FUMBLES]
  },

  normal:  {
    critical: [ATTACK_DODGED],
    special:  [ATTACK_DODGED],
    normal:   [ATTACK_DODGED],
    failure:  [ATTACK_NORMAL],
    fumble:   [ATTACK_NORMAL, DEFENDER_FUMBLES],
  },

  failure:  {
    critical: [ATTACK_MISSES],
    special:  [ATTACK_MISSES],
    normal:   [ATTACK_MISSES],
    failure:  [ATTACK_MISSES],
    fumble:   [ATTACK_NORMAL, DEFENDER_FUMBLES]
  },

  fumble:  {
    critical: [ATTACKER_FUMBLES],
    special:  [ATTACKER_FUMBLES],
    normal:   [ATTACKER_FUMBLES],
    failure:  [ATTACKER_FUMBLES],
    fumble:   [ATTACKER_FUMBLES, DEFENDER_FUMBLES]
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

  return `Attack ${attackerSuccess} vs. Dodge ${defenderSuccess}:\n${result}.`;
}


module.exports = {
  name: "Attack and Dodge Results",
  aliases: ['meleedodge', 'ad', 'avd', 'attackdodgeresults'],
  data: [],
  doHandle,
  help: HELP,
};
