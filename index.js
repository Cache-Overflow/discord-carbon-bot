const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";
const prefix= "."
const fetch = require("node-fetch");
let recycle = false;

bot.login(token);

bot.on('ready', () => {
    console.log("Logged in as " + bot.user.tag);

    bot.channels.cache.get("711322092339200051").send("I am online!");
});

// test function
bot.on("message", msg=>{
    if (msg.author == bot.user) { // Prevent bot from responding to its own messages
        return;
    }

    // test cases
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
            case "c":
            case "cal":
            case "calculate":
                if (args[1] == undefined) {
                    msg.channel.send("Missing statment.")
                    break;
                }
                switch (args[1].toLowerCase()) {
                    case "f":
                    case "food":
                        if(args[2] == undefined || args[3] == undefined){
                            msg.channel.send("Missing statement.");
                            break;
                        }
                        msg.channel.send("Your consumption produces " + food(args[2], args[3], msg.channel.id) + " kg of CO2!");
                        break;
                    case "t":
                    case "ct":
                    case "travel":
                    case "carbontravel":
                        var method = args[2]; //Possible inputs: Taxi, ClassicBus, EcoBus, Coach, NationalTrain, LightRail, Subway, FerryOnFoot, FerryInCar
                        var dist = args[3];

                        // if (method == undefined)
                        // API Code
                        fetch(`https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit?distance=${dist}&type=${method}`, {
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
                              msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent}`);
                            })
                        .catch(err => {
                          console.log(err);
                        });

                        break;
                    default:
                        msg.channel.send("Missing statement.");


                }
                break;
            case "h":
            case "help":
                // in alphabetical order
                msg.channel.send("```LIST OF COMMANDS:\n\n"
                    + ".calculate - calculate carbon emissions\n"
                    + "\tfood - food (ex: .calculate f beef 2)\n"
                    + "\t\tPossible inputs:\n\t\tMeats: Beef, Pork, Lamb\n"
                    + "\t\tPoultry: Chicken, Turkey, Duck, Goose, Quail\n"
                    + "\t\tSeafood: Fish, Shellfish\n"
                    + "\t\tDairy: Milk, Cheese, Butter, Ice cream\n"
                    + "\t\tWater: Tap, Bottled, Fancy bottled\n"
                    + "\ttravel - travel (ex: .calculate t train 100)\n"
                    + "\t\tPossible inputs:\n\t\tTaxi, ClassicBus, EcoBus, Coach, NationalTrain, LightRail, Subway, FerryOnFoot, FerryInCar"
                    + ".help - show help commands\n"
                    + ".recycle - see if a material is recyclable (ex: .recyclable plastic)\n"
                    + "```"
                );
                break;
            case "r":
            case "recycle":
                if(args[1] == undefined){
                    msg.channel.send("Missing statement.");
                    break;
                }
                recycleMaterial(args[1], msg.channel.id);
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
                if (recycle == true) {
                    msg.channel.send("That plastic is " + recyclePlastic(args[0].toLowerCase()));
                }
                break;

            default:
                msg.channel.send("Unknown command.");
    }

}
});

function food(productType, quantity, id) {
    console.log("product type is " + productType);

    if (!arr.includes(productType)) {
        bot.channels.cache.get(id).send(productType.charAt(0).toUpperCase() + productType.substring(1) + " does not exist in our databse.");
    }

    let total = 0;
    var arr = [
        ["Beef", 1,],
        ["Pork", 2],
        ["Lamb", 3],
        ["Chicken", 4], ["Turkey", 5], ["Duck", 6], ["Goose", 7], ["Quail", 8],
        ["Fish", 9], ["Shellfish", 10],
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

function recycleMaterial(material, id) {
    var a = material.toLowerCase();
    let mats = ["plastic", "paper", "cardboard", "glass", "tin", "aluminum", "steel"];

    if (a == "plastic") {
        bot.channels.cache.get(id).send("Enter the type of plastic (1, 2, 3, 4, 5, 6) ex: .1");
        recycle = true;
        return;
    }

    bot.channels.cache.get(id).send(material.charAt(0).toUpperCase() + material.substring(1) + " is " + (mats.includes(a) ? "recyclable!" : "not recyclable!"));
}

function recyclePlastic(s) {
    switch (s) {
        case "1":
            return "recyclable!";
        case "2":
            return "recyclable!";
        case "3":
            return "not recyclable!";
        case "4":
            return "recyclable!";
        case "5":
            return "recyclable!";
        case "6":
            return "not recyclable!";
        default:
            return "not recyclable";
    }
    recycle = false;
}
