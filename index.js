const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";
const prefix= "."
bot.login(token);

// test function
bot.on("message", msg=>{
    if (msg.author == bot.user) { // Prevent bot from responding to its own messages
        return
    }

    if (msg.content === "Gabe") {
        msg.channel.send("Yeah hes dirtyy");
    }
    if (msg.content === "Lemme") {
        msg.channel.send("He is the best!")
    }
    if (msg.content === "Carbon") {
        msg.channel.send("DESTROY")
    }
    if (msg.content === "ayy") {
        msg.channel.send("lmao");
    }

    if (msg.content.startsWith(".")) {
        let args.msg.content.substring(prefix.length).split(" ");
        var command = msg.content.substring(1)
        msg.channel.send(command)
        processCommand(command)
    }
    // if (msg.content.startsWith)
})

function processCommand(msg) {
    console.log(msg);
}


bot.on('ready', () => {
    console.log("Logged in as " + bot.user.tag);

    bot.channels.cache.get("711322092339200051").send("I am online!");
})
