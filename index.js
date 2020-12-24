const discordbot = require('./runequest-discordbot');

let secretKey = process.argv[2] || process.env.RQ_DiscordBotKey;

discordbot.setup(secretKey);
