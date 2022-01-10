const { MessageEmbed, Message } = require("discord.js");
const { Database } = require("secure-db");
module.exports = {
  config: {
    name: `ppt`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      let user = message.mentions.users.first() || message.author;
      let db = new Database("potd_points");
      if (db.has(user.id)) {
        const embed = new MessageEmbed()
          .setTitle(`${user.username}'s POTD Points`)
          .addField(
            "USACO Points",
            "```" + db.get(user.id + ".cs_pts") + "```",
            true
          )
          .addField(
            "USESO Points",
            "```" + db.get(user.id + ".es_pts") + "```",
            true
          )
          .addField(
            "USNCO Points",
            "```" + db.get(user.id + ".nc_pts") + "```",
            true
          )
          .addField(
            "USAMO Points",
            "```" + db.get(user.id + ".ma_pts") + "```",
            true
          )
          .addField(
            "USABO Points",
            "```" + db.get(user.id + ".bo_pts") + "```",
            true
          )
          .addField(
            "USAAAO Points",
            "```" + db.get(user.id + ".aa_pts") + "```",
            true
          )
          .addField(
            "USAPHO Points",
            "```" + db.get(user.id + ".ph_pts") + "```",
            true
          )
          .setColor("RANDOM");
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setTitle("User has no POTD Points")
          .setDescription(`${user.username} doesn't seem to be active in POTD`)
          .setColor("RANDOM");
        message.channel.send({ embeds: [embed] });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
