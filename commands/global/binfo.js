var content = require("../../configs/content.json");
var { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: `botinfo`,
    category: "",
    description: "",
    aliases: [`info`],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setTitle("About me")
        .setDescription(
          "I am a Discord Bot meant to help people execute code using interpreters!"
        )
        .addField("Prefix", "`" + content.prefix + "`", true)
        .addField("Host Platform", "Ubuntux86-64", true)
        .addField("Developer", "`ex-exoad#9292`")
        .addField("Language", "`C`, `C++`", true)
        .addField(
          "Library",
          "[Click Here](https://github.com/yourWaifu/sleepy-discord)",
          true
        )
        .addField("Languages Supported", "`C++, Python, C`")
        .setColor("RANDOM")
        .setFooter(":D")
        message.channel.send(embed);

    } catch (e) {
      console.log(e);
    }
  },
};
