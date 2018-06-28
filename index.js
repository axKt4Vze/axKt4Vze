const Discord = require('discord.js');
const client = new Discord.Client();

  console.log(`Bot is Online!`);
  client.on("ready", function() {
client.user.setActivity(`${client.users.size} פרינקפסים | !help`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = process.env.BOT_PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


});
client.login(process.env.BOT_TOKEN);
