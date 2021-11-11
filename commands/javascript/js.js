var safeEval = require("safe-eval");
var { MessageEmbed, Message } = require("discord.js");
var content = require('../../configs/content.json');
module.exports = {
  config: {
    name: `js`,
    category: "",
    description: "",
    aliases: [`javascript`],
  },
  run: async (bot, message, args) => {
    try {
      let code = message.content.split(" ").slice(1);
      let codeStr = code.join(" ");
      if (codeStr.substring(0, 3) === "```" && codeStr.slice(-3) == "```") {
        console.log("Found...");
        codeStr = codeStr.substring(3);
        codeStr = codeStr.slice(0, -3);
        const embed = new MessageEmbed()
          .setTitle(message.author.id)
          .addField("code", codeStr)
          .addField("code no", code.join(" "))
          .addField("guild", message.guild.id)
          .addField("chnl", message.channel.id)
          .setTimestamp();
        bot.channels.cache.get(content.js_log).send(embed);
      }
      if (
        code == "help" ||
        code == "HELP" ||
        code == "info" ||
        !code ||
        code == undefined ||
        code == null ||
        code == "" ||
        code == " "
      ) {
        let embed = new MessageEmbed()
        .setTitle("JavaScript Sample Runner | Safe Eval")
        .setDescription("This is a highly contained environment for you to run JavaScript snippets. If you encounter any issues, place a report using the command: `" + content.prefix + "report`")
        .addField("Usage", "```"+content.prefix+"js <user_code>```")
      }
    } catch (e) {
      console.log(e);
    }
  },
};
