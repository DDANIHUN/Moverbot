const tUM = require("../lib/tUM.js");
const log = require("../lib/log.js");
const loadConfig = require("../lib/loadConfig.js");

module.exports = async (client, oldMember, newMember) => {
  //Created for Yogcast_Cyan and idle AFK-channel.
  //Disconnected
  if (newMember.voiceChannelID == null) return;

  if (newMember.voiceChannel != newMember.guild.afkChannel) {
    return;
  }
  //Load config
  data = {};
  data.guild = newMember.guild;
  loadConfig(data, client.dbGuild, function(config) {
    newChannelId = "";

    for (var key in config.alias) {
      if (config.alias[key].includes("AFKIDLECHANNEL")) {
        newChannelId = key;
        break;
      }
    }
    if (newChannelId == "") {
      //No channel found.
      return;
    }

    newMember.setVoiceChannel(newChannelId);

    log(
      client,
      newMember.user.username,
      newMember.id,
      newMember.guild.id,
      "AFK-moved to: '" +
        newMember.guild.channels.find(val => val.id === newChannelId).name +
        "':" +
        newChannelId
    );
    tUM(client, 1);
  });
};
