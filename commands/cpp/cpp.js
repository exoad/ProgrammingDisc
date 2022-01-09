var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var content = require("../../configs/content.json");
var token = require("../../configs/token.json");

module.exports = {
  config: {
    name: `gcc`,
    category: "",
    description: "",
    aliases: [`g++`, `c++`, `cpp`, `cxx`],
  },
  run: async (bot, message, args) => {
    try {
      // var codeStr removes the prefix  and the command
      var code = message.content.split(" ").slice(1);
      var codeStr = code.join(" ");
      console.log(codeStr);
      
      
      if (
        code == "INFO" ||
        code == "help" ||
        code == "info" ||
        code == "HELP" ||
        code == undefined ||
        !code ||
        code == null ||
        code == "" ||
        code == " "
      ) {
        const embed = new MessageEmbed()
          .setTitle("C++ Runner withOUT Input")
          .setDescription(
            "This is a basic C++ interpreter that **does not take input**)"
          )
          .addField("Usage", "```" + content.prefix + "cpp [user_code_here]```")
          .addField(
            "user_code_here",
            "You will input your C++ Code here or command parameters like this one (see [additional_usages])"
          )
          .addField(
            "Example Usage",
            '**COMMAND**\n```cpp\n$cpp #include <iostream>\nusing namespace std;\nint main() {\n cout << "Hello World"\n}```\n**OUTPUT**\n`Hello World!`'
          )
          .addField("Additional parameters", "None, this does not take inputs")
          .addField(
            "Constraints",
            "Do to security reasons, the runtime constraint for non-input programs will be 10 seconds, if your program runs longer, it will be automatically killed"
          )
          .addField(
            "Additional Notes",
            "You may use markdown code syntax with ``` but do not follow it with cpp or c"
          )
          .addField("[additional_usages]", "`help`")
          .setFooter("Pre-build");
        message.channel.send({ embeds: [embed]});
      } else if (code || codeStr) {
        var options = { stats: true };
        compiler.init(options);
        var linterX = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 5000 },
        };
        compiler.compileCPP(linterX, codeStr, function (data) {
          var out;
          if (data.output == undefined || !data.output)
            out = "Unhandled Exception | Contact my developer";
          if (data.error) {
            const embed = new MessageEmbed()
              .setTitle("C++ Program Runner | Exception Caught")
              .setDescription(
                "Your program had an error! *Not supposed to happen? Place a report using `" +
                  content.prefix +
                  "report`"
              )
              .addField("Error", `\`\`\`${data.error}\`\`\`\``)
              .setColor("RED");
            message.reply({ embeds: [embed] });
            const embed2 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField(
                "code",
                codeStr.length > 200
                  ? codeStr.substring(0, 200) + "..."
                  : codeStr
              )
              .addField("Server", message.guild.id)
              .addField("Error", `\`\`\`${data.error}\`\`\`\``)
              .setColor("RED");
            bot.channels.cache.get(content.cpp_log).send({ embeds: [embed2] });
            console.log(data.error);
          } else {
            console.log(data.output);
            const embed = new MessageEmbed()
              .setTitle("C++ Program Runner | Success!")
              .setDescription(
                "See anomalies in the output or its an incorrect output? Place a report using `" +
                  content.prefix +
                  "report`"
              )
              .addField("Output", "```\n" + data.output + "```")
              .addField("Tags", "`cpp`, `no_input`, `10s_constraint`")
              .setFooter("Action submitted by " + message.author.username)
              .setColor("GREEN");

            message.reply({ embeds: [embed] });
            const embed2 = new MessageEmbed()
              .setTitle(message.author.id)
              .addField(
                "code",
                codeStr.length > 200
                  ? codeStr.substring(0, 200) + "..."
                  : codeStr
              )
              .addField(
                "Out",
                data.output == null
                  ? "```\n" + data.output + "```"
                  : "```\n" + data.output + "```"
              )
              .addField("server", message.guild.id)
              .addField("channel", message.channel.id);
            bot.channels.cache.get(content.cpp_log).send({ embeds: [embed2] });
          }
          // @ts-ignore
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
