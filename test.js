// for command line testing outside of discord

const bot = require('./runequest-discordbot.js');

let args = process.argv.slice(2);

let message = {
  content: args.join(' '),
  author: "test"
};

// console.dir(message);
console.log(bot.handleUserInput(message));

process.exit(0);
