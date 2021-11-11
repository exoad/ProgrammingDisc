const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: `help`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Commands List")
        .setDescription(
          "Here you will find all the commands.\n**Note:** Commands with the letter `i` infront followed by its programming lang means that command is used for when programs need input.\n\nAll commands will have the `help` argument after the command to let you know more about the command"
        )
        .addField("C++", "```icpp, cpp```")
        .addField("Global", "```ping, help, tos, editor, info, report, changelog```")
        .setFooter("2021-2022");
      message.channel.send(embed);
    } catch (e) {
      console.log(e);
    }
  },
};
