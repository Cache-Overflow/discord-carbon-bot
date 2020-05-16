const Discord=require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";

bot.login(token);

// test function
bot.on("greetings", msg=>{
    if (msg.content ==="Gabe"){
        msg.reply("Yeah hes dirtyy");
    }
})

bot.on("ready", ()=>{
    console.log("Ready to serve!");
} )