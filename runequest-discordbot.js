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


/**
 * Create, setup listeners, then login a Discord Client
 * @param loginKey  {string}  required
 * @param userOptions  (optional)
 * @returns {Discord.Client}
 */
function setup(loginKey, userOptions = {}) {
  let _options = Object.assign({}, options, userOptions);

  /* 1. Create */
  let client = new Discord.Client(_options);

  /* 2. setup listeners (length) */
  client.once('ready', () => {
    console.log(config.name + ' is ready!  Existing Guilds:');
    console.dir( { guilds : client.guilds.cache.mapValues((c) => c.name) } );
    return client.user.setActivity(` ${config.prefix}`, { type: 2 });
  });


  // main function for message handling
  client.on('message', function(message) {
    if (message.author.bot)  // ignore other bots (and myself)
      return;

    let guildAndChannel = `${message.channel.guild.name}.${message.channel.name}`;

    if (config.logLevel) {
      let msg = `${guildAndChannel}.${message.author.username}: "${message.content}"`;
      console.log(msg);
    }

    if (!knownGuildChannels.includes(guildAndChannel)) {
      console.log(`New Guild.Channel: ${guildAndChannel} joined at ${new Date()}`);
      knownGuildChannels.push(guildAndChannel);
    }

    let response = null;
    try {
      response = handleUserInput(message.content);
    }
    catch (err) {
      response = "Sorry, there was an error processing your message: " + message.content;
      console.dir({message, err});
      --errorsLeft;
    }

    if (response) {
      message.channel.send(response)
        .then(function() {
          if (errorsLeft <= 0) {
            console.log(`**Exiting**, too many errors at ${new Date()}`);
            process.exit(-1);
          }
        });
    }

  });


  // log when we join a new guild
  client.on("guildCreate", function(guild) {  // doesn't seem to do much...
    console.log("Joined a new guild: " + guild.name);
  });

  /* 3. Log our bot in using the token from https://discord.com/developers/applications */
  client.login(loginKey)
    .then(() => client);

  return client;
}


function handleUserInput(line) {
  line = line.toLowerCase();
  if (line.startsWith(config.prefix) ) {

    let argumentsExcludingMentions = line.split(' ').filter((x) => !x.startsWith('<@!'));
    let [ignored, userCommand, ...args] = argumentsExcludingMentions;

    let response = null;

    // handle 'help', 'info'
    if (!userCommand || (userCommand === 'help'))
      response = doHelp(args);
    else if (userCommand === 'info')
      response = doInfo(args);
    else if (userCommand === 'err') // for testing
      throw new Error('forced error');

    // other commands get delegated
    else
      response = delegateToCommands(userCommand, args);

    return response || 'rq-bot: bad input ' + line;
  }

  return null;
}


function delegateToCommands(userCommand, args) {

  for (let command of allCommands) {
    if (command.aliases.includes(userCommand)) {
      let doHandle = command.doHandle || utils.handler100s;
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
  return acc + `  [${command.aliases}] (${command.name})   ${help} \n`
}


module.exports = { handleUserInput, setup, utils };
