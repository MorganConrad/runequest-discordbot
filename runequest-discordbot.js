// Import the discord.js module
const Discord = require('discord.js');
const utils = require('./utils');
const config = require('./config');

// Create an instance of a Discord client
const client = new Discord.Client();

const fs = require('fs');
const filenames =  fs.readdirSync('./commands').filter((filename) => filename.endsWith('.js'));
const allCommands = filenames.map((filename) => require(`./commands/${filename}`) );

let errorsLeft = config.errorMax || 20;

function setup(loginKey) {

  // Only _after_ this will your bot start reacting to information received from Discord
  client.once('ready', () => {
    console.log('I am ready!');

    client.user.setActivity(` ${config.prefix}`, { type: 2 });
  });

  // Create an event listener for messages
  client.on('message', function(message) {
    if (message.author.bot)  // ignore other bots
      return;

    // console.dir(message);

    let response = null;
    try {
      response = handleUserInput(message.content);
    }
    catch (err) {
      console.dir( { message, err });
      if (--errorsLeft < 0) {
        console.log("too many errors");
        process.exit(-1);
      }
      else
        response = "Sorry, there was an error processing your message: " + message.content;
    }
    if (response)
      message.channel.send(response);
  });

  // Log our bot in using the token from https://discord.com/developers/applications
  client.login(loginKey);
}


function handleUserInput(line) {
  line = line.toLowerCase();
  if (line.startsWith(config.prefix) ) {
    let argumentsExcludingMentions = line.split(' ').filter((x) => !x.startsWith('<@!'));
    let [ignored, userCommand, ...args] = argumentsExcludingMentions;
    // console.dir({userCommand, args});

    let response = null;
    if (!userCommand || (userCommand === 'help'))
      response = doHelp(args);
    else if (userCommand === 'info')
      response = doInfo(args);
    else if (userCommand === 'err') // for testing
      throw new Error('forced error');
    else
      response = delegateToCommands(userCommand, args);

    return response || 'rq-bot: bad input ' + line;
  }

  return null;
}


function delegateToCommands(userCommand, args) {

  for (let command of allCommands) {
    if (command.aliases.includes(userCommand)) {
      let doHandle = command.doHandle || handler100;
      return doHandle(userCommand, args, utils, command);
    }
  }

  return null;
}


function doHelp(args) {
  let head = `All commands start with ${config.prefix}, followed by a command and options\n`;
  args = args.length ? args : allCommands;
  return args.reduce( helpForCommand, head);
}

function doInfo() {
  return `${config.name} v${config.version}`;
}

function helpForCommand(acc, command) {
  let help = command.help || 'No help available';
  return acc + `[${command.aliases}] (${command.name})   ${help} \n`
}

function handler100(userCommand, args, utilsIgnored, command) {
  let setRoll = args[0] ? parseInt(args[0], 10) : 0;
  let { effect, roll } = utils.pick(command.data, setRoll);
  let nicelyFormattedRoll = utils.formatRoll(roll);

  return `${command.name} #${nicelyFormattedRoll}: ${effect}`;
}


module.exports = { handleUserInput, setup, utils };
