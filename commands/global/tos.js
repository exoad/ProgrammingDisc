var content = require("../../configs/content.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: `tos`,
    category: "",
    description: "",
    aliases: [`rules`],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setTitle("Terms of Services | Rules")
        .setDescription(
          "In order to maintain stability of the bot, and for fair use among the communities utilizing this bot, there will be limitations."
        )
        .addField(
          "Code of Conduct",
          "1. Your code should not be trying to stress test the bot\n2. Code should be written properly and avoid going into hidden infinite loops\n3. Your code shall not cause malicious intentss that can disrupt this bot's processes\n4. Code processed shall be in their degsinated languages and not in a similar packaged language\n5. Your code shall follow the latest conventions of that language\n6. Exploitations including the usage of none-standard IO (using File IO, etc.) is prohibited [see punishments]"
        )
        .addField(
          "Data & Logging",
          "All code processed and executed will be logged along with the input(s) if there are any. This is to check for the security and integrity of the code"
        )
        .addField(
          "Punishments",
          "Failure to follow any conduct specified and not specified will result in a ban from the usage of the bot."
        )
        .setFooter(
          "Thank you for understanding. Have a question? Contact my developer: ex-exoad#9292"
        );
      message.channel.send(embed);
    } catch (e) {
      console.log(e);
    }
  },
};
