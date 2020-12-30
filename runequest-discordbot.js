const Discord = require('discord.js');
const utils = require('./utils');
const config = require('./config');
let knownGuildChannels = [];

const options = {};
if (config.intents)
  options.ws = { intents: config.intents };

const fs = require('fs');
const filenames =  fs.readdirSync('./commands').filter((filename) => filename.endsWith('.js'));
const allCommands = filenames.map((filename) => require(`./commands/${filename}`) );

let errorsLeft = config.errorMax || 20;

function setup(loginKey, userOptions = {}) {
  let _options = Object.assign({}, options, userOptions);

  let client = new Discord.Client(_options);

  // Only _after_ this will your bot start reacting to information received from Discord
  client.once('ready', () => {
    client.user.setActivity(` ${config.prefix}`, { type: 2 });

    // console.dir(client);

    console.log(config.name + ' is ready!  Existing Guilds:');
    console.dir( { guilds : client.guilds.cache.mapValues((c) => c.name) } );
  });



  client.on('message', function(message) {
    if (message.author.bot)  // ignore other bots (and myself)
      return;

    let guildAndChannel = `${message.channel.guild.name}.${message.channel.name}`;

    if (config.logLevel) {
      let msg = `${guildAndChannel}.${message.author.username}: "${message.content}"`;
      console.log(msg);
    }

    if (!knownGuildChannels.includes(guildAndChannel)) {
      console.log("New Guild.Channel: " + guildAndChannel);
      knownGuildChannels.push(guildAndChannel);
    }

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


  client.on("guildCreate", function(guild) {  // doesn't seem to do much...
    console.log("Joined a new guild: " + guild.name);
  });

  // Log our bot in using the token from https://discord.com/developers/applications
  client.login(loginKey);

  return client;
}


function handleUserInput(line) {
  line = line.toLowerCase();
  if (line.startsWith(config.prefix) ) {
    let argumentsExcludingMentions = line.split(' ').filter((x) => !x.startsWith('<@!'));
    let [ignored, userCommand, ...args] = argumentsExcludingMentions;

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
      let doHandle = command.doHandle || handler100s;
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

function handler100s(userCommand, args, utilsIgnored, command) {
  if (!args.length)
    args = ['x'];
  return args.map((x) => handler100(userCommand, x, utilsIgnored, command)).join('\n');
}


function handler100(userCommand, rollString, utilsIgnored, command) {
  let roll = utils.parseRoll(rollString);
  let effect = utils.pick(command.data, roll);
  let nicelyFormattedRoll = utils.formatRoll(roll);

  return `${command.name} #${nicelyFormattedRoll}: ${effect}`;
}


module.exports = { handleUserInput, setup, utils };
