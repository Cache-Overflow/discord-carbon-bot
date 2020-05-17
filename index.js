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
        msg.channel.send("He is the best!");
    }
    if (msg.content === "Carbon") {
        msg.channel.send("DESTROY");
    }
    if (msg.content === "ayy") {
        msg.channel.send("lmao");
    }

    if (msg.content.startsWith(".")) {
        let args = msg.content.substring(prefix.length).split(" ");
        console.log(args);

        // can maybe switch case this
        if (args[0].toLowerCase() == "calculate") {
            try {
                msg.channel.send("Your consumption produces " + lemme2(args[1], args[2]) + " kg of CO2!");
            }
            catch (e) {
                console.log(e.message);
                msg.channel.send("Missing arguments after \"calculate\".");
            }
        }

        //var command = msg.content.substring(1)
        //msg.channel.send(command)
        //processCommand(command)
        else if (args[0].toLowerCase() == "help"){
            // this will list all possible commands ***ADD THEM WHEN U CAN***
            msg.channel.send("LIST OF COMMANDS:\n\n"
                + ".calculate - calculate carbon emissions (ex: .Calculate beef 2 )\n"
                + ".recyclable - (ex: .Recyclable plastic)\n"
                + ".help - show help commands\n");
        }
        else if (args[0].toLowerCase() == "recyclable") {
            msg.channel.send(args[1].charAt(0).toUpperCase() + args[1].substring(1) + " is " + david(args[1]))
        }
        else {
            msg.channel.send("Unknown command.");
        }
    }
});

function lemme2(productType, quantity) {
    if (productType == undefined) {
        throw "NoProduct";
    }
    if (!arr.includes(productType)) {
        throw "BadProduct";
    }

    let total = 0;
    var arr = [
        ["Beef", 1,],
        ["Pork", 2],
        ["Lamb", 3],
        ["Chicken", 4], ["Turkey", 5], ["Duck", 6], ["Goose", 7], ["Quail", 8],
        ["Fish", 9], ["Shell Fish", 10],
        ["Milk", 11], ["Cheese", 12], ["Butter", 13], ["Ice Cream", 14],
        ["Tap", 15], ["Bottled", 16], ["Fancy bottled", 17],
        ["Apple", 18]
    ];

    for (var i = 0; i < arr.length; i++) {
        if (productType.toUpperCase() == arr[i][0].toUpperCase()) {
            total += ((quantity / 1000) * arr[i][1]);
        }
    }
    console.log(total);
    return (total);
}

function david(material) {
    var a = material.toLowerCase();
    let mats = ["plastic", "paper", "cardboard", "glass", "tin", "aluminum", "steel"];

    if (mats.includes(a)) return("recyclable!");
    else return("not recyclable!");

}
/*
function processCommand(msg) {
    console.log(msg);
}
*/

bot.on('ready', () => {
    console.log("Logged in as " + bot.user.tag);

    bot.channels.cache.get("711322092339200051").send("I am online!");
})
