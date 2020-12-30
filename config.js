module.exports = {
  name: 'runequest-discordbot',
  prefix: '/rq',
  version: '0.1.1',
  errorMax: 20,
  logLevel: 0,
  intents: (1 << 0) | (1 << 6) | (1 << 9) | (1 << 12)   // GUILD_MESSAGES and DIRECT_MESSAGES
}
