const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";
const prefix= "."
const fetch = require("node-fetch");
bot.login(token);

bot.on('ready', () => {
    console.log("Logged in as " + bot.user.tag);

    bot.channels.cache.get("711322092339200051").send("I am online!");
});
// Does an API call to Carbon Footprint calculator.
// ***
fetch("https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit?distance=5000&type=Taxi", {
  "method": "GET",
  "headers": {
"x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
"x-rapidapi-key": "b96c268c46msh6164d76db47a4fcp1bcf5ejsncad1a0d03078"
}
})
.then(function (response) {
      return response.json();
    })
.then(function (myJson) {
      // var theDATA = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
      console.log("The API Data is : "myJson.carbonEquivalent);
      // console.log(theDATA);
    })
.catch(err => {
  console.log(err);
});

// test function
bot.on("message", msg=>{
    if (msg.author == bot.user) { // Prevent bot from responding to its own messages
        return
    }
// Hello
    // test cases
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
        switch (args[0].toLowerCase()) {
            case "calculate":
                try {
                    msg.channel.send("Your consumption produces " + lemme2(args[1], args[2]) + " kg of CO2!");
                }
                catch (e) {
                    console.log(e.message);
                    msg.channel.send("Missing arguments after \"calculate\".");
                }
                finally {
                    break;
                }
            case "help":
                // in alphabetical order
                msg.channel.send("LIST OF COMMANDS:\n\n"
                    + ".calculate - calculate carbon emissions (ex: .calculate beef 2)\n"
                    + ".help - show help commands\n"
                    + ".recycle - see if a material is recyclable (ex: .recyclable plastic)\n"
                    );

                break;
            case "recycle":
                msg.channel.send(args[1].charAt(0).toUpperCase() + args[1].substring(1) + " is " + david(args[1]));
                break;
            default:
                msg.channel.send("Unknown command.");
        }

    }
});

function lemme2(productType, quantity) {
    console.log("product type is " + productType);

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


    if(a == "plastic"){
        msg.channel.send("Enter the type of plastic (1, 2, 3, 4, 5, 6) ex. .5")
        if (msg.content.startsWith(".")) {
            let pargs = msg.content.substring(prefix.length).split(" ");

            switch(pargs[0]){
                case "1":
                    return("recyclable!");
                case "2":
                    return("recyclable!");
                case "3":
                    return("not recyclable!");
                case "4":
                    return("recyclable!");
                case "5":
                    return("recyclable!");
                case "6":
                    return("not recyclable!");
            }
    }
    if(mats.includes(a)) return("recyclable!");


    return("not recyclable!");


    if (mats.includes(a)) return("recyclable!");
    else return("not recyclable!");

}
