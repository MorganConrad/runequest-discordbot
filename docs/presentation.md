# Writing your own Discord Bot

Based on notes from a presentation given to the Port Townsend Web Developers Meetup on Jan 13 2021.

## Discord
Discord is an American VoIP, instant messaging and digital distribution platform designed for creating communities. Users communicate with voice calls, video calls, text messaging, media and files in private chats or as part of communities called "servers." Servers are a collection of persistent chat rooms and voice chat channels.

Much like Slack but more focused on gaming than business.  Some overlap.

 - Some limited integrations, Twitch and YouTube   (gamer oriented)
 - Supports webhooks, ie. from Github
 - more focus on "bots"

The Discord desktop and web client is built on the Electron framework.


## Discord Libraries

[Officially Vetted Libraries for Integration with many languages](https://discord.com/developers/docs/topics/community-resources#libraries-discord-libraries)

[Discord API Docs](https://github.com/discord/discord-api-docs)

This example code uses Discord.js

[Discord.js Docs](https://discord.js.org/#/docs/main/stable/general/welcome)

### Another exanple bot

https://github.com/chalda/DiscordBot

## Technical Notes

### Security

Bots have an
 - ID
 - public key
 - secret key
 - token   (used to invite them to a guild)

OAuth supported (required?) for larger bots

Uses [Twitter "snowflake"](https://github.com/twitter-archive/snowflake/tree/snowflake-2010) for IDs.
see https://discord.com/developers/docs/reference#snowflakes

### Consistency

"True consistency is impossible." ["Eventually consistent."](https://en.wikipedia.org/wiki/Eventual_consistency)
You may receive events 0-N times.
"Clients should operate on events and results from the API in as much of an idempotent behavior as possible."

Some things are done via HTTP.  Most via websockets

### More Info

#### Discord.js library
https://discordjs.guide

https://discord.js.org/#/docs/main/stable/general/welcome

#### Discord, Websocket Specific

https://discord.com/developers/docs/topics/gateway#gateways

https://discord.com/developers/docs/topics/gateway#list-of-intents

https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events


## Discord HTTP Resources

 - REST interface, results as JSON
 - https://discordapp.com/api/v8/{path-to-resource}
 - User-Agent required
 - Authorization header required, `Bot <your secret>`

e.g., to access a specific Guild
```
GET https://discordapp.com/api/v8/guilds/:guildID
User-Agent: DiscordBot
Authorization: Bot <your secret here>
```

[Some HTTP/REST examples](http.md)


## Web Socket Events

You will mainly be dealing with these [Gateway Events](https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events)

Alternatively, check out the list of events fired by a [Discord.js Client](https://discord.js.org/#/docs/main/stable/class/Client)

As you can see, there are a lot, but bots tend to work most with these:  (most also have update and delete)

  CLIENT_READY: 'ready',
  MESSAGE_CREATE: 'message',
  GUILD_CREATE: 'guildCreate',
  CHANNEL_CREATE: 'channelCreate',

The inner payload is a [Message](https://discord.com/developers/docs/resources/channel#message-object), [Guild](https://discord.com/developers/docs/resources/guild), or [Channel](https://discord.com/developers/docs/resources/channel)

[Example Message](messageWithMentions.json)


