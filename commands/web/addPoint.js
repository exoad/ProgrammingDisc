const { MessageEmbed, Message } = require("discord.js");
const { send } = require("express/lib/response");
const { Database } = require("secure-db");
const content = require("../../configs/content.json");

module.exports = {
  config: {
    name: `potd`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      var cs_sections = ["cs", "usaco", "programming", "coding", "code"];
      var es_sections = ["es", "earth_science", "earth_sci", "earth", "useso"];
      var nc_sections = ["chem", "chemistry", "usnco"];
      var am_sections = ["math", "usamo", "maths", "amo"];
      var bo_sections = ["usabo", "bio", "biology"];
      var aa_sections = ["aa", "astro", "astronomy", "space", "usaaao"];
      var ph_sections = ["f=ma", "physics", "physic", "usapho"];
      function sendError() {
        const embed = new MessageEmbed()
          .setTitle("Unable to parse")
          .setDescription("I was unable to parse the desired operation")
          .addField(
            "Usage",
            "```\n" + content.prefix + "potd [user] [points] [type]```"
          )
          .addField(
            "Cats.",
            cs_sections.join(", ") +
              ", " +
              es_sections.join(", ") +
              ", " +
              nc_sections.join(", ") +
              ", " +
              am_sections.join(", ") +
              ", " +
              bo_sections.join(", ") +
              ", " +
              aa_sections.join(", ") +
              ", " +
              ph_sections.join(", ")
          )
          .addField(
            "Example Usage",
            "```\n" + content.prefix + "potd @user add 10```"
          )
          .setColor("RED");
        message.channel.send({ embeds: [embed] });
        return;
      }

      function includesInside(arr, vtr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === vtr) return true;
        }
        return false;
      }
      const db = new Database("potd_points");
      var usr = message.author.id;

      if (args[0] == "help") {
        sendError();
        return;
      }

      if (
        message.mentions.users.size <= 0 ||
        isNaN(args[1]) ||
        args[1] == undefined ||
        args[2] == undefined
      ) {
        sendError();
        return;
      }

      if (
        !includesInside(cs_sections, args[2]) &&
        !includesInside(es_sections, args[2]) &&
        !includesInside(nc_sections, args[2]) &&
        !includesInside(am_sections, args[2]) &&
        !includesInside(bo_sections, args[2]) &&
        !includesInside(aa_sections, args[2]) &&
        !includesInside(ph_sections, args[2])
      ) {
        const embed = new MessageEmbed()
          .setTitle("Avaliable Categories")
          .addField(
            "Cats.",
            cs_sections.join(", ") +
              ", " +
              es_sections.join(", ") +
              ", " +
              nc_sections.join(", ") +
              ", " +
              am_sections.join(", ") +
              ", " +
              bo_sections.join(", ") +
              ", " +
              aa_sections.join(", ") +
              ", " +
              ph_sections.join(", ")
          )
          .setColor("RANDOM");
        message.channel.send({ embeds: [embed] });
        return;
      }

      if (
        message.member.roles.cache.some((role) => role.name === "Mod") ||
        message.member.roles.cache.some((role) => role.name === "POTD/POTW") ||
        message.author.username == "exoad"
      ) {
        var user = message.mentions.users.first();
        var points = args[1];
        var sec = args[2];
        try {
          console.log(user.id);
        } catch (e) {
          sendError();
          return;
        }
        if (!db.has(user.id)) {
          var default_params = {
            cs_pts: includesInside(cs_sections, sec) ? points : "0",
            es_pts: includesInside(es_sections, sec) ? points : "0",
            ma_pts: includesInside(am_sections, sec) ? points : "0",
            bo_pts: includesInside(bo_sections, sec) ? points : "0",
            ph_pts: includesInside(ph_sections, sec) ? points : "0",
            aa_pts: includesInside(aa_sections, sec) ? points : "0",
            nc_pts: includesInside(nc_sections, sec) ? points : "0",
          };
          db.set(user.id, default_params);
          const embed = new MessageEmbed()
            .setTitle("Added Points!")
            .setDescription(
              "I have added " +
                points +
                " points to " +
                user.username +
                " in the " +
                sec +
                " category!"
            )
            .addField("User", user.username)
            .addField("Points to add", points)
            .addField("To Check user profile", content.prefix + "ppt @user")
            .setColor("RANDOM");
          message.channel.send({ embeds: [embed] });
        } else {
          var params = db.get(user.id);
          let bruh;
          if (includesInside(cs_sections, sec)) {
            db.sum(user.id + ".cs_pts", parseInt(points));
            bruh = db.get(user.id + ".cs_pts");
          }
          if (includesInside(es_sections, sec)) {
            db.sum(user.id + ".es_pts", parseInt(points));
            bruh = db.get(user.id + ".es_pts");
          }
          if (includesInside(am_sections, sec)) {
            db.sum(user.id + ".ma_pts", parseInt(points));
            bruh = db.get(user.id + ".ma_pts");
          }
          if (includesInside(bo_sections, sec)) {
            db.sum(user.id + ".bo_pts", parseInt(points));
            bruh = db.get(user.id + ".bo_pts");
          }
          if (includesInside(aa_sections, sec)) {
            db.sum(user.id + ".aa_pts", parseInt(points));
            bruh = db.get(user.id + ".aa_pts");
          }
          if (includesInside(ph_sections, sec)) {
            db.sum(user.id + ".ph_pts", parseInt(points));
            bruh = db.get(user.id + ".ph_pts");
          }
          if (includesInside(nc_sections, sec)) {
            db.sum(user.id + ".nc_pts", parseInt(points));
            bruh = db.get(user.id + ".nc_pts");
          }
          const embed = new MessageEmbed()
            .setTitle("Added Points!")
            .setDescription(
              "I have added " +
                points +
                " points to " +
                user.username +
                " in the " +
                sec +
                " category!"
            )
            .addField("User", user.username)
            .addField("Points to add", points)
            .addField("To Check user profile", content.prefix + "ppt @user")
            .setColor("RANDOM");
          message.channel.send({ embeds: [embed] });
        }
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
