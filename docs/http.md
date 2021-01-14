## HTTP/REST Resource Examples

_Note - many names and IDs have been redacted to protect privacy_

### Guilds
Path: `guilds/{guild.id}`

```
GET https://discordapp.com/api/v8/guilds/:guildID
User-Agent: DiscordBot
Authorization: Bot <your secret here>
```
Returns a [Guild](https://discord.com/developers/docs/resources/guild#guild-resource)

[Example Guilds Result](guilds.json)

 - In Discord.js, you'd get this information via `client.guilds.fetch('guildID')`

### Guild Channels
Path: `guilds/:guildID/channels`

Returns an array of [Channel](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)

[Example Channels Result](channels.json)

[Discord Channel Documentation](https://discord.com/developers/docs/resources/channel)

[Discord.js Channel Documentation](https://discord.js.org/#/docs/main/stable/class/Channel)

### Specific Channel
Path: `channels/{channelID}`

- In Discord.js, you'd get this information via `client.channels.fetch('channelID')`

Note that this example is a voice channel
 - type 2  (2 means voice)
 - bitrate

```
https://discordapp.com/api/v8/channels/:channelID`

{
    "id": "REDACTED_NUMERIC_ID",
    "type": 2,
    "name": "General",
    "position": 0,
    "parent_id": "REDACTED_NUMERIC_ID",
    "bitrate": 64000,
    "user_limit": 0,
    "guild_id": "REDACTED_NUMERIC_ID",
    "permission_overwrites": [],
    "nsfw": false
}
```

### "Pinned" messages on a Channel
Path: `channels/:channelID/pins`

`https://discordapp.com/api/v8/channels/:channelID/pins`

Returns an array of [Discord Message](https://discord.com/developers/docs/resources/channel#message-object)

[Discord.js Message Documentation](https://discord.js.org/#/docs/main/stable/class/Message)

[Example Pins result](channel_pins.json)

### Recent messages for a Channel
Path: `channels/:channelID/messages`

Returns an array of [Message](https://discord.com/developers/docs/resources/channel#message-object)

[Example Message with a "mention"](messageWithMentions.json)

### User
Path: `users/:userID`

- In Discord.js, you'd get this information via `client.users.fetch('userID')`


Returns a [Discord User](https://discord.com/developers/docs/resources/user#user-object)

[Discord.js User Documentation](https://discord.js.org/#/docs/main/stable/class/User)
```
https://discordapp.com/api/v8/users/:userID

{
    "id": "REDACTED_NUMERIC_ID",
    "username": "morganconrad",
    "avatar": "REDACTED_HEX_ID",
    "discriminator": "1234",
    "public_flags": 0
}
```
