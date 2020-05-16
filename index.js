const Discord=require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzI3NjkxMTc3MDY2NTc2.XsBgkg.wE_nZqdRCKtt-WqHyajGgMacR54";

bot.login(token);

bot.on("ready", ()=>{
    console.log("Ready to serve!");
} )