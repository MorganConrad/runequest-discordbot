[![Build Status](https://secure.travis-ci.org/MorganConrad/runequest-discordbot.png)](https://travis-ci.org/MorganConrad/runequest-discordbot)
[![License](https://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/runequest-discordbot)
# runequest-discordbot

A [Discord](https://discord.com/) bot to support [Chaosium's](https://www.chaosium.com/) fantasy role playing game
[Runequest](https://www.chaosium.com/runequest/).
Listens for commands with the prefix /rq.  
 - All text is converted to lowercase
 - Mentions (e.g. @JohnDoe) are ignored.

## Commands

Many commands take optional numbers in the range 01-100 (00 also means 100), or use "x" to mean pick one at random

### Game System (Resistance Table, Abilities, Attack, Parry, Dodge)
```
 - rt AA DD  calculate resistance table percent for Attacker (AA) vs. Defender (DD)
 - ar SS RR  show ability result (Success, Critical, etc.) for skill SS and roll RR
 - ad AR DR  show end result for Attacker level of success (e.g. special) vs. Dodge level (e.g. critical)
 - ap AR DP  show end result for Attacker level of success (e.g. special) vs. Parry level (e.g. failure)
```

#### Alternatives (aliases) for Levels of Success (save typing)
```
 - critical: cr, crit
 - special:  sp, impale, slash, crush
 - normal:   n, ok, hit, parry, dodge, success
 - failure:  m, miss
 - fumble:   fu, fa, fp, fd
```
### Fumbles
```
 - fa        roll a random Fumbled Attack
 - fp        roll a random Fumbled Parry
 - fu        roll a random Fumble and show both results
 - fa,fp, and fu also take an optional NN

```

### Chaos
```
 - cf        roll a random Chaotic Feature`
 - cf NN x   Chaotic Feature NN, and also roll one at random
 - ct        roll a random Curse of Thed
 - ct NN     Curse of Thed NN
```

### Spirits and Spirit Magic
```
 - sp        summon a random ancestral spirit
 - sp NN     ancestral spirit NN
 - sm NN x   generate spirit magic NN, and one at random
```

### Miscelaneous
```
 - help      help
 - info      information
```
## Examples (notes in parentheses)

```
/rq ar 56 58    (skill 56, roll 58)
Ability: 56  Roll: 58 => Failure

/rq ad sp m     (special attack vs. missed dodge)
Attack special vs. Dodge failure:
Attack does special success damage.

/rq ap m sp     (missed attack vs. special parry)
Attack failure vs. Parry special:
Attack parried or deflected..
Defender rolls parrying weapon’s special damage.
Attacking weapon’s HP is reduced by any damage over its current HP.

/rq fu          (Random fumble, show both attack and parry result)
Fumble #83:
  Attack: Weapon shattered (100% chance if unenchanted;
10% less for each point of battle magic spell on weapon,
and 20% less for each point of Rune magic spell on weapon).
  Parry:  Parrying weapon or shield shattered (100% chance if unenchanted;
10% less for each point of battle magic spell on weapon,
and 20% less for each point of Rune magic spell on weapon).

/rq fa 83      (Fumbled attack 83)
Fumble #83: Weapon shattered (100% chance if unenchanted;
10% less for each point of battle magic spell on weapon,
and 20% less for each point of Rune magic spell on weapon).

/rq rt 14 12
Resistance Table: 14 vs. 12 => 60


/rq cf @abc 77  (chaotic feature 77, the mention is ignored)
ChaosFeature #77: Functional extra appendage or body part. Modify hit locations accordingly.

/rq ct 54 x x  (Curse of Thed 54, plus 2 random ones)
CurseOfThed #54: Add +3 to damage of all weapons hitting the victim.*
CurseOfThed #63: Victim becomes physically indistinguishable from caster of spell.
CurseOfThed #48: All foes have +30% chance to hit victim.*

/rq sp          (random spirit)
Ancestral Spirit #37: Neutral, POW 3D6+6, 1D3 Spirit Spells, 0 Rune Points
Use /rq ss ... to generate random spirit spells

/rq sm x x      (generate 2 random spirit magic spells)
Spirit Magic #90: Visibility
Spirit Magic #72: Spirit Screen
```

## Installation

### The bot may or may not be running on my Raspberry pi.

To try that, use the invite link
[https://discord.com/oauth2/authorize?client_id=791106265283690497&scope=bot](https://discord.com/oauth2/authorize?client_id=791106265283690497&scope=bot)

Please don't overdo it!  Currently, this server only collects and logs information on
 - servers ("guilds") at startup.
 - errors.
 - when it is used on a new server or channel.

### Create your own version
This requires a basic familiarity with javascript and node.js.
 1. Download the code
 2. `npm install`
 3. Login to Discord, go to the developers page, and create your app.
    - You should get a different magic number than in the above link.
     - also note the "secret"
     - Invite it to your server or channel.  It should show up as offline
 4. On the computer with the code. `node index.js SECRET`
    - or, better, store secret in the `RQ_DiscordBotKey` environment variable
 5. The rq bot should shortly appear as "online".

### Configuration

see config.js.  You can change the prefix (and other things) there.

## Design Notes

### The main bot code is in runequest-discordbot.js.  It
  - reads all the command bots in the subdirectory './commands'
  - `setup()` does initial login, and installing listeners
  - converts the input to lowercase
  - checks for the prefix "/rq"
  - gets the arguments, filtering out any mentions
  - checks for and handles "help" and "info"
  - most commands are handled via `delegateToCommands()`

### Writing your own command

To add your own command, follow the overall design in any of the existing commands.  You must export

 - name:    a user-friendly name, e.g. "ChaosFeature",
 - aliases: an array of commands you support, e.g. ['cf', 'chaosfeature']
    - use lowercase, since the input has been converted toLowerCase.
    - don't conflict with other ones!
 - help:    a help string

You should export **one** of the following
 - `data[]`:  an array of 101 strings. Useful if this is just a random table like Chaos Features.
   - 0 is filler.
   - `'"'` means "ditto" to save typing.
 - `doHandle(userCommand, args, utils, command)` for something more complex.
   - userCommand: the command they used, e.g. "cf"
   - args[]:  any remaining args, e.g. ['65', '89']
   - utils: some utiity functions
   - command: your command (sort of `this`, usually ignored`)

#### Testing

`test.js` is a command line utility to test your command handler.

 `node test.js /rq mycommand arg0 arg1`

The tests folder holds some very basic unit tests.

## TODOs

 - better permanent server
 - ~~allow multiple arguments to some commands, like `cf 56 33 88` to show three chaotic features~~ done as of v0.1.1
 - more commands TBD
 - fix bugs TBD

<br>
<a href="https://www.buymeacoffee.com/flyingspaniel" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
