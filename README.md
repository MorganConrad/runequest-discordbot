
# runequest-discordbot

A Discord bot to support [Chaosium's](https://www.chaosium.com/) fantasy role playing game
[Runequest](https://www.chaosium.com/runequest/).
Listens for commands with the prefix /rq.  Mentions are ignored.

## Commands

Many commands take options numbers in the range 01-100 (00 also means 100), or "x" to mean pick one at random
```
 - cf        roll a random Chaotic Feature`
 - cf NN x   Chaotic Feature NN, and also roll one at random
 - ct        roll a random Curset of Thed
 - ct NN     Curse of Thed NN
 - fa        roll a random Fumbled Attack
 - fp        roll a random Fumbled Parry
 - fu        roll a random Fumble and show both results
 - fa,fp, and fu also take an optional NN
 - rt AA DD  calculate resistance table percent for Attacker (AA) vs. Defender (DD)
 - ar SS RR  show ability result (Success, Critical, etc.) for skill SS and roll RR
 - help      help
 - info      information
```
## Examples (notes in parentheses)

```
/rq ar 56 58    (skill 56, roll 58)
Ability: 56  Roll: 58 => Failure

/rq cf @abc 77  (chaotic feature 77, the mention is ignored)
ChaosFeature #77: Functional extra appendage or body part. Modify hit locations accordingly.

/rq rt 14 12
Resistance Table: 14 vs. 12 => 60

/rq ct 54 x x  (Curse of Thed 54, plus 2 random ones)
CurseOfThed #54: Add +3 to damage of all weapons hitting the victim.*
CurseOfThed #63: Victim becomes physically indistinguishable from caster of spell.
CurseOfThed #48: All foes have +30% chance to hit victim.*

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
```

## Installation

### The bot may or may not be running on my Raspberry pi.

To try that, use the invite link
[https://discord.com/oauth2/authorize?client_id=791106265283690497&scope=bot](https://discord.com/oauth2/authorize?client_id=791106265283690497&scope=bot)

Please don't overdo it!
 - Currently, this server only collects and logs information on errors.

### Create your own version
This requires a basic familiarity with javascript and node.js.
 1. Download the code
 2. `npm install`
 3. Login to discord, go to the developers page, and create your app.
    - You should get a different magic number than in the above link.
     - also note the "secret"
     - Invite it to your server or channel.  It should show up as offline
 4. On the computer with the code. `node index.js SECRET`
    - or store secret in the `RQ_DiscordBotKey` environment variable
 5. The rq bot should shortly appear as "online".

### Configuration

see config.js.  You can change the prefix there.

## Design Notes
### The main bot code is in runequest-discordbot.js.  It
  - reads all the command bots in the subdirectory './commands'
  - `setup()` does initial login, and installing listeners
  - checks for the prefix "/rq"
  - gets tha arguments, filtering out any mentions
  - checks for and handles "help" and "info"
  - most commands are handled via `delegateToCommands()`

### Writing your own command

To add your own command, follow the overall design in any of the existing commands.  You must export

 - name:    a user-friendly name, e.g. "ChaosFeature",
 - aliases: an array of commands you support, e.g. ['cf', 'chaosfeature']
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


## TODOs

 - better permanent server
 - ~~allow multiple arguments to some commands, like `cf 56 33 88` to show three chaotic features~~ done as of v0.1.1
 - more commands TBD
 - fix bugs TBD

<br>
<a href="https://www.buymeacoffee.com/flyingspaniel" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
