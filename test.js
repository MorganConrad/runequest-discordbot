// for command line testing outside of discord

const bot = require('./runequest-discordbot.js');

let args = process.argv.slice(2);

console.log(bot.handleUserInput(args.join(' ')));

process.exit(0);
