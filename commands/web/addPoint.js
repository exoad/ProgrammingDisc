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
      function sendError() {
        const embed = new MessageEmbed()
          .setTitle("Unable to parse")
          .setDescription("I was unable to parse the desired operation")
          .addField(
            "Usage",
            "```\n" + content.prefix + "potd [user] [operation] [points]```"
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
      var cs_sections = ["cs", "usaco", "programming", "coding", "code"];
      var es_sections = ["es", "earth_science", "earth_sci", "earth", "useso"];
      var nc_sections = ["chem", "chemistry", "usnco"];
      var am_sections = ["math", "usamo", "maths", "amo"];
      var bo_sections = ["usabo", "bio", "biology"];
      var aa_sections = ["aa", "astro", "astronomy", "space", "usaaao"];
      var ph_sections = ["f=ma", "physics", "physic", "usapho"];
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
            params.cs_pts += points;
            bruh = params.cs_pts;
          }
          if (includesInside(es_sections, sec)) {
            params.es_pts += points;
            bruh = params.es_pts;
          }
          if (includesInside(am_sections, sec)) {
            params.ma_pts += points;
            bruh = params.ma_pts;
          }
          if (includesInside(bo_sections, sec)) {
            params.bo_pts += points;
            bruh = params.bo_pts;
          }
          if (includesInside(aa_sections, sec)) {
            params.aa_pts += points;
            bruh = params.aa_pts;
          }
          if (includesInside(ph_sections, sec)) {
            params.ph_pts += points;
            bruh = params.ph_pts;
          }
          if (includesInside(nc_sections, sec)) {
            params.nc_pts += points;
            bruh = params.nc_pts;
          }
          db.set(user.id, params);
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
            .addField(
              "They now have this many points in that cat.!",
              bruh
            )
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
