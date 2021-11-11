var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
const talkedRecently = new Set();

const content = require("../../configs/content.json");
const token = require("../../configs/token.json");

module.exports = {
  config: {
    name: `icpp`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      if (
        talkedRecently.has(message.author.id)
      ) {
        message.channel.send("This command is on a 5 minute cooldown.");
      } else {
        let filter = (m) => m.author.id === message.author.id;

        var code = message.content.split(" ").slice(1);
        var codeStr = code.join(" ");
        if (codeStr.substring(0, 3) === "```" && codeStr.slice(-3) == "```") {
          console.log("Found...");
          codeStr = codeStr.substring(3);
          codeStr = codeStr.slice(0, -3);
        }
        if (
          code == "INFO" ||
          code == "help" ||
          code == "info" ||
          code == "HELP" ||
          code == undefined ||
          !code
        ) {
          const embed = new MessageEmbed()
            .setTitle("C++ Runner with Input")
            .setDescription(
              "This is a basic C++ interpreter that **takes input**)"
            )
            .addField(
              "Usage",
              "```" + content.prefix + "icpp [user_code_here]```"
            )
            .addField(
              "user_code_here",
              "You will input your C++ Code here or command parameters like this one (see [additional_usages])"
            )
            .addField(
              "Example Usage",
              "**COMMAND**\n```cpp\n$icpp #include <iostream>\nusing namespace std;\nint main() {\n int a;\ncin >> a;\n cout << a << endl;\n}```\n**OUTPUT**\n`Hello World!`"
            )
            .addField(
              "Additional parameters",
              "After you have entered your code, you must specify your input, you will have 10 seconds to make a decision before your code will be invalidated. Then you must include your input in **ONE MESSAGE**"
            )
            .addField(
              "Constraints",
              "Do to security reasons, all program runtime constraints for with input will be 15 seconds, if your program runs longer, it will be automatically killed.\nThis command also has a 1 minute cooldown"
            )
            .addField(
              "Additional Notes [PLEASE READ]",
              "It is best to run this command in the same channel as someone else!\nMake sure to always include a line after the command\nYou may use markdown code syntax but do not follow it with `cpp` or `c`"
            )
            .addField("[additional_usages]", "`help`")
            .setFooter("Pre-build");
          message.channel.send(embed);
        } else if (
          code == undefined ||
          !code ||
          code == null ||
          code == "" ||
          code == " "
        ) {
          const embed = new MessageEmbed()
            .setTitle("C++ Runner with Input")
            .setDescription(
              "This is a basic C++ interpreter that **takes input**)"
            )
            .addField(
              "Usage",
              "```" + content.prefix + "icpp [user_code_here]```"
            )
            .addField(
              "user_code_here",
              "You will input your C++ Code here or command parameters like this one (see [additional_usages])"
            )
            .addField(
              "Example Usage",
              "**COMMAND**\n```cpp\n$icpp #include <iostream>\nusing namespace std;\nint main() {\n int a;\n cin >> a;\n cout << a << endl;\n}```\n**Input | Ouput (stdout)**\n`4 | 4`"
            )
            .addField(
              "Additional parameters",
              "After you have entered your code, you must specify your input, you will have 10 seconds to make a decision before your code will be invalidated. Then you must include your input in **ONE MESSAGE**"
            )
            .addField(
              "Constraints",
              "Do to security reasons, all program runtime constraints for with input will be 15 seconds, if your program runs longer, it will be automatically killed"
            )
            .addField(
              "Additional Notes [PLEASE READ]",
              "It is best to run this command in the same channel as someone else!\nMake sure to always include a line after the command\nYou may use markdown code syntax but do not follow it with `cpp` or `c`"
            )
            .addField("[additional_usages]", "`help`")
            .setFooter("Pre-build");
          message.channel.send(embed);
        } else {
          var options = { stats: true };
          compiler.init(options);
          var linterX = {
            OS: token.os,
            cmd: token.cmd_cpp,
            options: { timeout: 15000 },
          };
          const embed4 = new MessageEmbed()
            .setTitle("Enter input! | 10 Second limit")
            .setDescription(
              "Enter your inputs for your program below. You have a 10 second window.\n*Program shouldn't have input? Try using the command `" +
                content.prefix +
                "cpp`! Or place a report using `"+content.prefix+"report`"
            )
            .setColor("YELLOW");

          message.channel.send(embed4).then(() => {
            message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ["time"],
              })
              .then((message) => {
                message = message.first();
                compiler.compileCPPWithInput(
                  linterX,
                  codeStr,
                  message.toString(),
                  function (data) {
                    const embed = new MessageEmbed()
                      .setTitle("C++ Program Runner (with inputs) | Success!")
                      .setDescription(
                        "Your program was executed properly!\n*Is this not correct and is an anomaly? Place a report using `"+content.prefix+"report`"
                      )
                      .addField(
                        "OUTPUT (stdout)",
                        "```\n" + data.output + "```"
                      )
                      .addField(
                        "Input(s) (stdin)",
                        "```\n" + message.toString() + "```"
                      )
                      .addField("Tags", "`15s_constraint`,`c++`,`withinput`")
                      .setColor("GREEN")
                      .setFooter(
                        "Action submitted by " + message.author.username
                      );
                    message.channel.send(embed);
                  }
                );
              })
              .catch((collected) => {
                message.channel.send("Operation Cancelled after 10 seconds");
              });
          });
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 60000);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
