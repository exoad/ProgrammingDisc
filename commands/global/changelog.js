const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: `changelog`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
      .setTitle("Changelog")
      .setDescription("__**Bot's Changelog**__\n- Fixed command `icpp` having wrong output syntax\n- Fixed a lot of spelling errors\n- Added bot-info command using `info`\n- Added a help argument for every command\n- Auto Flush code, destroy all code pieces that were saved onto the device\n- Command `report` a trust system for users to submit issues that they encountered\n- Command `tos` let the user view the services and the terms of the bot\n- Started working on a python interpreter\n- Added Cooldowns for commands that required secondary inputs of up to 1 minute\n- Command `editor` for users to be able to format and remove backquotes")
      .addField("Version Information", "`Version #:` 1.0 beta")
      message.channel.send(embed);
    } catch (e) {
      console.log(e);
    }
  },
};
