const Discord=require("discord.js");
const bot = new Discord.Client();
const token ="NzExMzI3NjkxMTc3MDY2NTc2.XsBZow.Ydb98WZ-MMRwkEWoMZf0AItNdm8";

bot.login(token);

bot.on("ready", ()=>{
    console.log("Ready to serve!");
} )