const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const ms = require('ms')

  console.log(`Bot is Online!`);
  client.on("ready", function() {
client.user.setActivity(`${client.users.size} פרינקפסים | k!help`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = process.env.BOT_PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if (cmd === `${prefix}mute`){
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Muted:', `${user.username}!${user.discriminator} (${user.id})`)
    .addField('By:', `${message.author.username}!${message.author.discriminator}`)
  
      let muteChannel = message.guild.channels.find(`name`, "logs");
  if(!muteChannel) return message.channel.send("Can't find channel called `logs`");
}
    if (cmd === `${prefix}help`){
  const helpembed = new Discord.RichEmbed()
    .setTitle("Help Commands")
    .setColor("#15f153")
    .setDescription("פקודות לצוות:\n`k!kick` `k!ban` `k!mute` `k!unmute` `k!unban`\n\nפקודות רגילות:\n`k!help` `k!insta` `k!channel`");
message.author.send(helpembed)
message.reply("רשימת הפקודות נשלחה אלייך בהודעה פרטית.")
}
if(cmd === `${prefix}kick`){

  //!kick @user break the rules
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("k!kick [@user] [reason]");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("אין לך גישה לפקודה זו");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("**Kick**")
  .setColor("#d83c3c")
  .addField("User", `${kUser}`)
  .addField("Staff", `<@${message.author.id}>`)
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "logs");
  if(!kickChannel) return message.channel.send("Can't find channel called `logs`");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;
}
  if(cmd === `${prefix}channel`){
    message.reply("https://www.youtube.com/BenKeysar")
  }
  if(cmd === `${prefix}insta`){
    message.reply("https://www.instagram.com/keysar7/")
  }
  if(cmd === `${prefix}ban`){

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("k!ban [@user] [reason]");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("אין לך גישה לפקודה זו");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("**Ban**")
  .setColor("#bc0000")
  .addField("**User**", `${bUser}`)
  .addField("**Staff**", `<@${message.author.id}>`)
  .addField("Reason", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "logs");
  if(!incidentchannel) return message.channel.send("Can't find channel called `logs`");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);

  return;
}
  if(cmd === `${prefix}unban`){
    const reason = args.slice(1).join(' ');
    const user = args[0];
    if (!user) return message.channel.send("You need Specific User ID").catch(console.error);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("אין לך גישה לפקודה זו");
    message.guild.unban(user);

    message.delete().catch(O_o=>{});

    let unbanEmbed = new Discord.RichEmbed()
    .setDescription("**UnBan**")
    .setColor("RANDOM")
    .addField("**User**", `<@!`+user+`>`)
    .addField("**Staff**", `<@${message.author.id}>`);

    let UnBanchannel = message.guild.channels.find(`name`, "logs");
    if(!UnBanchannel) return message.channel.send("Can't find channel called `logs`");

    UnBanchannel.send(unbanEmbed);
    message.channel.send(`***${member.user.username}#${member.user.discriminator} has been unbanned***`);

}
});
client.login(process.env.BOT_TOKEN);
