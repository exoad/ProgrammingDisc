const { ReactionManager } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const content = require("../../configs/content.json");
const talkedRecently = new Set();
module.exports = {
  config: {
    name: `report`,
    category: "Info",
    description:
      "Suggest something for the bot and your suggestion will be sent to the dev!",
    aliases: [`issue`],
  },
  run: async (bot, message, args) => {
    let code = args[0];
    if (args[0] == "help" || !args[0] || args[0] == null || args[0] == undefined) {
      const embed4324 = new MessageEmbed()
      .setTitle("Yttrium Reports")
      .setDescription("If you found an error or issue witht he bot, use this command to report your issue")
      .addField("Usage", "```\n"+content.prefix+"report [user_report]```")
      .addField("[user_report]", "Place your issue here using the format below")
      .addField("Proper Issue Report Format", "```\nYour Discord: \nBrief Description: \nLanguage: ```")
      .addField("Additional Notes", "This is a serious command, if you are suspected of using this command maliciously or in an opposing intent, you will be punished")
      .addField("TOS", "Read additional notes about the services provided using the command `"+content.prefix+"tos`")
      message.channel.send(embed4324);
    } else {
      if (
        talkedRecently.has(message.author.id) &&
        message.author.id != content.owner
      ) {
        message.channel.send("This command is on a 5 minute cooldown.");
      } else {
        const embed = new MessageEmbed()
          .setTitle("Yttrium Reports Handler")
          .setDescription(
            "By clicking ✅ you are signifying you have understood the following.\n\nBy clicking ❎ you disagree with the TOS\n\n~exoad"
          )
          .addField(
            "What is this?",
            "This command is used to submit issues with the bot."
          )
          .addField(
            "TOS",
            "Read the tos with the command `" + content.prefix + "tos`"
          )
          .addField(
            "Additional Help",
            "Type this command with the word `help` to find out more about this command!"
          )
          .setFooter("Thanks for helping!")
          .setColor("RANDOM");

        message.reply(embed);

        // Reacts so the user only have to click the emojis
        message.react("✅").then((r) => {
          message.react("❎");
        });

        // First argument is a filter function
        message
          .awaitReactions(
            (reaction, user) =>
              user.id == message.author.id &&
              (reaction.emoji.name == "✅" || reaction.emoji.name == "❎"),
            { max: 1, time: 30000 }
          )
          .then((collected) => {
            if (collected.first().emoji.name == "✅") {
              message.channel.send(
                "**Your report has been marked.**\nIf your compliance with the TOS is broken, your report will be discarded and punishments according to the TOS will occur"
              );
              const xter = `New Report! \n **${message.author.username}#${
                message.author.discriminator
              }** (${
                message.author.id
              }) has reported the following:\n~~--------------------------------~~\n${args.join(
                " "
              )}\n~~--------------------------------~~\nOn the server: **${
                message.guild.name
              }**\nServer ID: **${message.guild.id}**`;
              bot.channels.cache.get(content.issues_log).send(`${xter}`);
            } else
              message.reply(
                "Thank you for your honesty.\nYour report will not be marked."
              );
          });
      }
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 300000);
    }
  },
};
