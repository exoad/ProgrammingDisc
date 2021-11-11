var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var content = require("../../configs/content.json");
var token = require("../../configs/token.json");

module.exports = {
  config: {
    name: `python3`,
    category: "",
    description: "",
    aliases: [`py3`],
  },
  run: async (bot, message, args) => {
    try {
      let code = message.content.split(" ").slice(1);
      let codeStr = code.join(" ");
      if (
        codeStr.includes("http") ||
        codeStr.includes("https") ||
        codeStr.includes("://")
      ) {
        message.channel.send("Operation Terminated.").then(m => {
          bot.channels.cache.get(content.java_log).send("**User:**")
        });
      }
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
        bot.channels.cache.get(content.cpp_log).send(embed);
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
        const embed = new MessageEmbed()
          .setTitle("Python 3 Program Runner | Documentation menu")
          .setDescription(
            "This is a program runner for **Python 3** and does not take input."
          )
          .addField(
            "Usage",
            "```\n" + content.prefix + "python3 [user_code]```"
          )
          .addField("[user_code]", "You put your Python3 Code here")
          .addField(
            "Example Usage",
            "```python\n" + content.prefix + 'python3\nprint("Hello World")```'
          )
          .addField(
            "Constraints",
            "All Python3 programs that does not require input will have a max time of 10 seconds for execution before a time out is called automatically"
          )
          .addField(
            "Additional Notes",
            "1. You may use ``` for code syntax in Discord\n2. This is Python3 and you must follow all Python3 conventions\n3. Do not write code to cause malicious intents"
          );
        message.channel.send(embed);
      } else {
        var options = { stats: true };
        compiler.init(options);
        var linterX = {
          OS: token.os,
          options: { timeout: 10000 },
        };
        compiler.compilePython(linterX, codeStr, function (data) {
          var checker;
          if (data.error) {
            const embed = new MessageEmbed()
              .setTitle("Python 3 Program Runner | Exception Caught")
              .setDescription(
                "An exception was caught during execution!\n*Doesn't seem right? Place a report using `" +
                  content.prefix +
                  "report`*"
              )
              .addField(
                "ERROR (template <E> stdout@error<T>[OUT] AT mkdir.cpp:",
                "```\n" + data.error + "```"
              )
              .setColor("RED")
              .setFooter(
                "This action has been auto logged and is being automatically repaired if server-sided"
              );
            message.channel.send(embed);
            const embed23 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField("ERR", "```\n" + data.error + "```")
              .addField("CDE", "```\n" + codeStr + "```")
              .addField(
                "XHF",
                `CHNL: ${message.channel.id}\nGLD: ${message.guild.id}`
              )
              .setColor("RED")
              .setTimestamp();
            bot.channels.cache.get(content.java_log).send(embed23);
          } else {
            if (!data.output || data.output == undefined)
              checker = "Output returned Undefined args[0]@2$";
            else checker = data.output;
            const embed = new MessageEmbed()
              .setTitle("Python 3 Program Runner | Execution Success")
              .setDescription(
                "Your program was executed sucessfully!\n*Doesn't seem right? File a report using `" +
                  content.prefix +
                  "report`*"
              )
              .addField("OUTPUT (stdout):", "```\n" + checker + "```")
              .addField("Tags", "`no_input`, `python3`, `10s_constraint`")
              .setColor("GREEN");
            message.channel.send(embed);
            const embed45 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField("OUT", "```\n" + data.output + "```")
              .addField("CDE", "```\n" + codeStr + "```")
              .addField(
                "XHF",
                `CHNL: ${message.channel.id}\nGLD: ${message.guild.id}`
              );
            bot.channels.cache.get(content.java_log).send(embed45);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
