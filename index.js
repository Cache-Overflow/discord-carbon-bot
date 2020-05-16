const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";

bot.login(token);

// test function
bot.on("message", msg=>{
    if (msg.content ==="Gabe") {
        msg.channel.send("Yeah hes dirtyy");
    }
})


bot.on('ready', () => {
    console.log("Logged in as " + bot.user.tag);

    bot.channels.cache.get("711322092339200051").send("I am online!");
})
