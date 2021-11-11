module.exports = {
  config: {
    name: `ping`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      let c = args[0];
      if (args[0] == "help") {
        message.channel.send("This command shows the bot's latency and ping");
      } else {
        message.channel.send(
          "Latency: " + (Date.now() - message.createdTimestamp) + "ms"
        );
        message.channel.send("API Latency: " + Math.round(bot.ws.ping) + "ms");
      }
    } catch (e) {
      console.log(e);
    }
  },
};
