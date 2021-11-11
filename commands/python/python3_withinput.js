var compiler = require("compilex");
const { MessageEmbed } = require("discord.js");
var tio = require("tio.js");
var content = require("../../configs/content.json");
var token = require("../../configs/token.json");

module.exports = {
  config: {
    name: `ipython3`,
    category: "",
    description: "",
    aliases: [`ipy3`],
  },
  run: async (bot, message, args) => {
    try {
      if (
        codeStr.includes("http") ||
        codeStr.includes("https") ||
        codeStr.includes("://")
      )
        message.channel.send("Operation Terminated.");
    } catch (e) {
      console.log(e);
    }
  },
};
