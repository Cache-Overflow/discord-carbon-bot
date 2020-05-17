const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";
const prefix= "."
const fetch = require("node-fetch");

let recycle = false;

bot.login(token);

// bot.onn('not ready', ())

bot.on('ready', () => {
    console.log("Logged in as " + bot.user.tag);

    bot.channels.cache.get("711322092339200051").send("I am online!");
});

// test function
bot.on("message", msg => {
    if (msg.author == bot.user) return; // Prevent bot from responding to its own messages

    // test cases
    if (msg.content.toLowerCase() === "carbon") msg.channel.send("DESTROY");
    if (msg.content === "ayy") msg.channel.send("lmao");
    if (msg.content.toLowerCase() === "amanda") msg.channel.send("^sucks");

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
                        food(args[2], args[3], msg.channel.id);
                        break;
                    case "t":
                    case "ct":
                    case "travel":
                    case "carbontravel":
                        var method = args[2]; //Possible inputs: Taxi, ClassicBus, EcoBus, Coach, NationalTrain, LightRail, Subway, FerryOnFoot, FerryInCar
                        var dist = args[3];
                        var APIInputs = ["Taxi", "ClassicBus", "EcoBus", "Coach", "NationalTrain", "LightRail", "Subway", "FerryOnFoot", "FerryInCar"];

                        //Dictionary with alternate spellings to the API call
                        var dict = {
                          "taxi": "Taxi",
                          "bus": "ClassicBus",
                          "Eco Bus": "EcoBus",
                          "Train" : "NationalTrain"
                        };

                        // Checks if method can be passed to API call
                        if (!APIInputs.includes(method)){
                          msg.channel.send("Sorry, I cannot calculate your footprint from this method of travel!");
                          break;
                        }

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
                    //fuel to co2
                    case "fuel":
                        var type = args[2];// possible inputs Petrol, Diesel, LPG.
                        var litres = args[3];
                        var inputs =["petrol", "disel", "LPG"];
                        if (!inputs.includes(method)){
                          msg.channel.send("Sorry, I cannot calculate your footprint from this type of fuel!");
                          break;
                        }
                        fetch(`https://carbonfootprint1.p.rapidapi.com/FuelToCO2e?type=${type}&litres=${litres}`,{
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
                                "x-rapidapi-key": "7b83208c3cmsh7f1c745c01060cep1b4260jsn8ccf6057f135"
                            }
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(myJson =>{
                            return msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent}`);
                        })
                        .catch(err =>{
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
                msg.channel.send("```css\nLIST OF COMMANDS:\n\n"
                    + ".calculate - calculate carbon emissions\n"
                        + "\tfood - food (ex: .calculate f beef 2)\n"
                            + "\t\tPossible inputs:\n\t\tMeats: Beef, Pork, Lamb\n"
                            + "\t\tPoultry: Chicken, Turkey, Duck, Goose, Quail\n"
                            + "\t\tSeafood: Fish, Shellfish\n"
                            + "\t\tDairy: Milk, Cheese, Butter, Ice cream\n"
                            + "\t\tWater: Tap, Bottled, Fancy bottled\n"
                        + "\ttravel - (ex: .calculate t train 100)\n"
                            + "\t\tPossible inputs:\n\t\tTaxi, ClassicBus, EcoBus, Coach, NationalTrain, LightRail, Subway, FerryOnFoot, FerryInCar"
                        + "\tfuel - (ex: .calculate fuel petrol 10)"
                            + "\t\tPossible inputs: Petrol, Diesel, LPG\n"
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
    let total = 0;
    var arr = [
        ["beef", 1,],
        ["pork", 2],
        ["lamb", 3],
        ["chicken", 4], ["turkey", 5], ["duck", 6], ["goose", 7], ["quail", 8],
        ["fish", 9], ["shellfish", 10],
        ["milk", 11], ["cheese", 12], ["butter", 13], ["ice cream", 14],
        ["tap", 15], ["bottled", 16], ["fancy bottled", 17],
        ["apple", 18]
    ];

    var product = false;
    for (var i=0; i< arr.length; i++) {
        if (arr[i].includes(productType.toLowerCase())) {
            product = true;
            break;
        }
    }
    if (product == false) {
        bot.channels.cache.get(id).send(productType.charAt(0).toUpperCase() + productType.substring(1) + " does not exist in our database.");
        return;
    }

    for (var i = 0; i < arr.length; i++) {
        if (productType.toLowerCase() == arr[i][0]) {
            total += ((quantity / 1000) * arr[i][1]);
        }
    }
    bot.channels.cache.get(id).send("Your consumption produces " + total + " kg of CO2!");
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
