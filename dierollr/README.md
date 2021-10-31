# Dice Roller (DieRollr)

This is a new beta feature for doing [Runequest](https://www.chaosium.com/runequest/) related doe rolls.  _Use at you own risk._

 - All commands start with `/r `  (see config.js dierollPrefix to change)
 - All commands are converted to lowercase
 - Text following a // is treated as a comment and will be echoed

### Syntax

Following the opening `/r ` is a string describing the die roll

|example|description|
|-------|-----------|
|d6|roll a d6 (a 6 sided die)|
|2d8+3|roll two d8m and add 3 to the result|
|d8-3+d4|roll a d8, a d4, and subtract 3|
|d% // attack Balrog|roll a pencentile die (d100) and note that this is for my attack of the Balrog|

### Shortcuts

Certain common weapons are included as two letter abbreviations

|shortcut|meaning|
|-------|-----------|
|bs|Broadsword|
|gs|Greatsword|
|ba|Battle Ax|
|ga|Great Ax|
|cb|Composite Bow|

 - add an extra "s" at the end to roll "Special" damage

### Examples

<pre>
/r d%        Roll a percentil die, e.g. to hit or for Spell Resistance
/r bs+4      Broadsword with 4 extra damage (e.g. Bladesharp 4)
/r gss+d4-2  Greatsword Special and you have a d4 damage bonus, but Dullblade 2
/r cb+3      Comp Bow with Speedart
</pre>
