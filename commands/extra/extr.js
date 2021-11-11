const { MessageEmbed } = require("discord.js");
const content = require("../../configs/content.json");

module.exports = {
  config: {
    name: `editor`,
    category: "",
    description: "",
    aliases: [`text`],
  },
  run: async (bot, message, args) => {
    try {
      var code = message.content.split(" ").slice(1);
      var codeStr = code.join(" ");
      if (
        code == "INFO" ||
        code == "info" ||
        code == "help" ||
        code == "HELP" ||
        code == "?"
      ) {
        const embed = new MessageEmbed()
          .setTitle("Code Language Viewer")
          .setDescription(
            "Remove backquotes from your code (remove code syntax in markdown)"
          )
          .addField(
            "Supported Fields [parameter]",
            "`remove_backquotes`"
          )
          .addField("Usage", "```" + content.prefix + "editor [parameter]```")
          .addField(
            "Example Usage",
            "**INPUT**\n```" +
              content.prefix +
              "editor remove_backquotes #include <iostream>\nusing namespace std;\nint main() {\n int a;\ncin >> a;\n cout << a << endl;\n}```"
          )
          .setColor("RANDOM")
          .setTimestamp();
        message.channel.send(embed);
      } else if (code == "remove_backquotes") {
        if (codeStr.substring(0, 3) === "```" && codeStr.slice(-3) == "```") {
          console.log("Found...");
          codeStr = codeStr.substring(3);
          codeStr = codeStr.slice(0, -3);
          const embed = new MessageEmbed()
            .setTitle(
              "Code Language Viewer | Successfully removed backquotes! (`)"
            )
            .addField("OUTPUT", codeStr)
            .setFooter("Action requested by " + message.author.username)
            .setColor("GREEN");
          message.channel.send(embed);
          bot.channels.cache.get(content.editor_log).send(embed);
        } else {
          const embed = new MessageEmbed()
            .setTitle(
              "Code Language Viewer | Error: Didn't find any backquotes"
            )
            .setDescription(
              "I didn't find any tick marks in your code! Is this an error? Contact my developer here: `ex-exoad#9292`"
            )
            .addField("Your Input", code.join(" "))
            .setColor("RED");
          message.channel.send(embed);
          bot.channels.cache.get(content.editor_log).send(embed);
        }
      } else if(code == "" || code == " " || code == undefined || code == null || !code) {
        const embed = new MessageEmbed()
        .setTitle("Code Language Viewer | Exception Caught")
        .setDescription("Hmmm, no arguments and parameters were passed and this command needs arguments! Use `help` after the command to know more about this command!\n *Is this not correct? Contact my developer: ex-exoad#9292*")
        .setColor("RED")
        message.channel.send(embed);
      } 
    } catch (e) {
      console.log(e);
    }
    function replaceAll(str, obj, replaceWith) {
      return str.split(obj).join(replaceWith);
    }
  },
};
