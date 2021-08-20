const { Client, Intents } = require("discord.js");
const fetch = require("node-fetch");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
require("dotenv").config();

const PREFIX = "!";

const baseURL = `https://api.ssis.nu/cal/?room=`;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content === `${PREFIX}schema`) {
    const response = await fetch(`${baseURL}Te21a`);
    const json = await response.json();
    let replyString = "";
    json.forEach((lesson) => {
      replyString =
        replyString +
        `Ämne: ${lesson.subject}\n  Börjar: ${lesson.start_time}\n Slutar: ${lesson.end_time}\n\n`;
    });
    msg.channel.send(replyString);
  }
});

client.login(process.env.TOKEN);
