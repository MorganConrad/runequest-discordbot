module.exports = {
  name: 'runequest-discordbot',
  prefix: '/rq',
  version: '0.2.2',
  errorMax: 20,
  logLevel: 0,
  intents: (1 << 0) | (1 << 6) | (1 << 9) | (1 << 12),   // GUILD_MESSAGES and DIRECT_MESSAGES

  dierollPrefix: "/r",
  successAliases: {
    critical: ['critical', 'cr', 'crit'],
    special:  ['special', 'sp', 'impale', 'slash', 'crush'],
    normal:   ['normal', 'n', 'ok', 'hit', 'parry', 'dodge', 'success'],
    failure:  ['failure', 'm', 'miss'],
    fumble:   ['fumble', 'fu', 'fa', 'fp', 'fd']
  },
};
