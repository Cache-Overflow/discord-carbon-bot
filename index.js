/* TODO FOR TOMRROW:
embeds for cases where user does not imput everything
for example: .calculate food
*/

const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "NzExMzQzNTIyNDUxODE2NDg5.XsBpRw.25YzHHuUBaJjpl7YD4swyJgpt08";
const prefix= "."
const fetch = require("node-fetch");
const helpEmbed = new Discord.MessageEmbed() //https://discordjs.guide/popular-topics/embeds.html
	.setColor('#0xff0000')
	.setTitle('CarbonBot Commands')
	.setURL('https://devpost.com/software/carbonbot')
	.setAuthor('Cache Overflow', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png', 'https://github.com/Cache-Overflow')
	.setDescription('Carbon bot for your carbon questions')
	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png')
	.addFields(
		{ name: '**.calculate**', value: "calculates carbon emissions, do .help caluculate for more info\n*ex: .c p plane 10000*", inline: false },
        { name: '.coronavirus', value: "coronavirus information\n**Takes:**\nCountry\n*ex: .coronavirus Canada*", inline: false },
        { name: '**.info**', value: "about me :shankspog:"},
		{ name: '**.help**', value: 'show help commands', inline: false },
		{ name: '**.recycle**', value: 'see if a material is recyclable\n**Takes:**\nType\n*ex: .recycle plastic*', inline: false },
	)
	.setTimestamp()
	.setFooter('Submitted to HackTheEarth2020', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png');

const helpCalculateEmbed = new Discord.MessageEmbed()
    .setColor('#0xff0000')
    .setTitle('CarbonBot Calculate Commands')
    .setURL('https://devpost.com/software/carbonbot')
    .setAuthor('Cache Overflow', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png', 'https://github.com/Cache-Overflow')
    .setDescription('Calculate subcommands')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png')
    .addFields(
        { name: '**air**', value: "**Takes:**\nOzone, NO2, Particulate matter\n*ex: .c air 10 10 10*\n", inline: false },
        { name: '**fuel**', value: "***Possible inputs***: Petrol, Diesel, LPG\n**Takes:**\nType, Litres\n*ex: .c fuel petrol 10*\n", inline: false },
        { name: '**food**', value: "***Possible inputs:***\n**Meats**: Beef, Pork, Lamb\n"
                + "**Poultry**: Chicken, Turkey, Duck, Goose, Quail\n"
                + "**Seafood**: Tuna\n"
                + "**Dairy**: Milk, Cheese\n"
                + "**Bean products**, Beans, Tofu\n"
                + "**Vegetables/Fruit**: Vegetables, Fruit, Lentils\n"
                + "**Takes:**\nType, Number of servings\n"
                + "*ex: .c f beef 2*\n", inline: false },
        { name: '**travel**', value: "***Possible inputs:***\nTaxi, ClassicBus, EcoBus, Coach, NationalTrain, LightRail, Subway, FerryOnFoot, FerryInCar\n**Takes:**\nType, Distance\n*ex: .c t taxi 100*\n", inline: false },
    )
    .setTimestamp()
    .setFooter('Submitted to HackTheEarth2020', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png');

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
    if (msg.content === "shankspog") msg.channel.send("<:shankspog:700953540599742604>");

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
                    case "a":
                    case "air":
                        var o3 = args[2];
                        var no2 = args[3];
                        var pm = args[4];

                        fetch(`https://carbonfootprint1.p.rapidapi.com/AirQualityHealthIndex?O3=${o3}&NO2=${no2}&PM=${pm}`, {
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
                                "x-rapidapi-key": "7b83208c3cmsh7f1c745c01060cep1b4260jsn8ccf6057f135"
                            }

                        })
                            .then(response => {
                                return response.json();
                            })
                            .then(myJson => {
                                return msg.channel.send(`Air Quality Health Index: ${myJson.airQualityHealthIndex}`);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        break;
                    // fuel to co2
                    case "fuel":
                        var type = args[2];// possible inputs Petrol, Diesel, LPG.
                        var litres = args[3];
                        var inputs =["petrol", "diesel", "LPG"];
                        if (!inputs.includes(type)){
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
                    case "f":
                    case "food":
                        if(args[2] == undefined || args[3] == undefined){
                            msg.channel.send("Missing statement.");
                            break;
                        }
                        food(args[2], args[3], msg.channel.id);
                        break;
                    // Public Transit to CO2
                    case "t":
                    case "travel":
                    case "carbontravel":
                        var method = args[2]; //Possible inputs: Taxi, ClassicBus, EcoBus, Coach, NationalTrain, LightRail, Subway, FerryOnFoot, FerryInCar
                        var dist = args[3];
                        var APIInputs = ["taxi", "classicBus", "ecobus", "coach", "nationaltrain", "lightrail", "subway", "ferryonfoot", "ferryincar"];

                        // Turning Common spellings into passable arguments for the API
                        if (method == "bus"){
                          method = "classicBus";
                        }
                        if (method == "car"){
                          msg.channel.send("Please use the Car Calculator instead!");
                          break;
                        }

                        if (method == "plane"){
                          msg.channel.send("Please use the Plane Calculator instead!");
                          break;
                        }
                        if (method == "train"){
                          method = "nationaltrain";
                        }

                        // Checks if method can be passed to API call
                        if (!APIInputs.includes(method)){
                            msg.channel.send("Sorry, I cannot calculate your footprint from this method of travel!");
                            break;
                        }

                        // API Code - Public Transit - Zhang
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

                    //vehicle to co2
                    case "car":
                        var type = args[2];
                        var distance = args[3];
                        var inputs = ["smalldieselcar", "mediumdieselcar", "largedieselcar", "mediumhybridcar", "largehybridcar", "mediumlpgcar", "largelpgcar", "mediumcngcar",
                                    "largecngcar", "smallpetrolvan", "largepetrolvan", "smalldielselvan", "mediumdielselvan", "largedielselvan", "lpgvan, cngvan", "smallpetrolcar",
                                     "mediumpetrolcar", "largepetrolcar", "smallmotorbike", "mediummotorbike", "largemotorbike"];
                        if (!inputs.includes(type.toLowerCase())) {
                            msg.channel.send("Sorry, I cannot calculate your footprint from this type of car!");
                            break;
                        }
                        fetch(`https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?distance=${distance}&vehicle=${type}`, {
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
                                "x-rapidapi-key": "7b83208c3cmsh7f1c745c01060cep1b4260jsn8ccf6057f135"
                            }
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then(myJson => {
                                return msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent}`);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        break;
                    //airplanes case
                    case "p":
                    case "airplane":
                    case "plane":
                        var AirplaneInput = ["plane","airplane","domesticflight", "shorteconomyclassflight", "shortbusinessclassflight", "longeconomyclassflight", "longpremiumclassflight", "longbusinessclassflight", "longfirstclassflight"];
                        var method = args[2];
                        var dist = args[3];

                        // Checks if method can be passed to API call
                        if (!AirplaneInput.includes(method)){
                            msg.channel.send("Sorry, I cannot calculate your footprint from this method of travel!");
                            break;
                        }
						console.log(method)
                        if (method == "airplane" || method == "plane"){
                            // Inputs: DomesticFlight, ShortEconomyClassFlight, ShortBusinessClassFlight, LongEconomyClassFlight, LongPremiumClassFlight, LongBusinessClassFlight, LongFirstClassFlight
                            method = "LongEconomyClassFlight";
                            // msg.channel.send("Specify which kind of flight! (DomesticFlight, ShortEconomyClassFlight, ShortBusinessClassFlight, LongEconomyClassFlight, LongPremiumClassFlight, LongBusinessClassFlight, LongFirstClassFlight)")
                            // break;

                            fetch(`https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight?distance=${dist}&type=${method}`, {
                                	"method": "GET",
                                	"headers": {
                                		"x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
                                		"x-rapidapi-key": "b96c268c46msh6164d76db47a4fcp1bcf5ejsncad1a0d03078"
                                	}
                                })
                            .then(function (response) {
                                  return response.json();
                                })
                            .then(function (myJson){
                                  msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent}`);
                                })
                            .catch(err => {
                                	console.log(err);
                                });
                        } else {
                            fetch(`https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight?distance=${dist}&type=${method}`, {
                                	"method": "GET",
                                	"headers": {
                                		"x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
                                		"x-rapidapi-key": "b96c268c46msh6164d76db47a4fcp1bcf5ejsncad1a0d03078"
                                	}
                                })
                            .then(function (response) {
                                  return response.json();
                                })
                            .then(function (myJson){
                                  msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent}`);
                                })
                            .catch(err => {
                                	console.log(err);
                                });
                            }
                        break;
                    case "ts":
                    case "tree":
                    case "trees":
                        var weight = args[2];
                        var unit = args[3];
                        var inputs = ["kg","lb"];

                        if (!inputs.includes(unit.toLowerCase())) {
                            msg.channel.send("Sorry, I cannot calculate your footprint from this unit!");
                            break;
                        }
                        fetch(`https://carbonfootprint1.p.rapidapi.com/TreeEquivalent?weight=${weight}&unit=${unit}`, {
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-host": "carbonfootprint1.p.rapidapi.com",
                                "x-rapidapi-key": "7b83208c3cmsh7f1c745c01060cep1b4260jsn8ccf6057f135"
                            }
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(myJson => {
                            return msg.channel.send(`Number of Trees: ${myJson.numberOfTrees}`);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                        break;
                    default:
                        msg.channel.send("Missing statement.aaaa");
                }
                break;
            case "covid":
            case "covid-19":
            case "corona":
            case "coronavirus":
	            var country = args[1];
		        fetch(`https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=${country}`, {
		         	"method": "GET",
		          	"headers": {
		          	    "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
		          		"x-rapidapi-key": "b96c268c46msh6164d76db47a4fcp1bcf5ejsncad1a0d03078"
		          	}
		        })
		            .then(response => {
	                    return response.json();
		            })
					.then(myJson => {
                        const coronavirusEmbed = new Discord.MessageEmbed() //https://discordjs.guide/popular-topics/embeds.html
                        	.setColor('#0xff0000')
                        	.setTitle('Coronavirus ' + country.charAt(0).toUpperCase() + country.substring(1) + ' Info')
                    		.setURL('https://www.worldometers.info/coronavirus/country/' + country)
                    		.setDescription('Public Health information about COVID-19 in ' + country.charAt(0).toUpperCase() + country.substring(1))
                        	.setThumbnail('')
                    		.addFields(
                				{ name: "**Confirmed cases**", value: + myJson.data.summary.total_cases, inline: false },
												{ name: "**Deaths**", value: + myJson.data.summary.deaths, inline: false },
												{ name: "**Recovered**", value: + myJson.data.summary.recovered, inline: false },
                    		)
                    		.setTimestamp()
                    		.setFooter('Submitted to HackTheEarth2020', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png');

						msg.channel.send(coronavirusEmbed)
					})
		            .catch(err => {
		                console.log(err);
		            });
				break;
            case "h":
            case "help":
                switch (args[1]) {
                    case 'c':
                    case 'cal':
                    case 'calculate':
                        msg.channel.send(helpCalculateEmbed);
                        break;
                    default:
                        msg.channel.send(helpEmbed);
                }
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
        ["beef", 27], ["pork", 12.1], ["lamb", 39.2],
        ["chicken", 6.9], ["turkey", 10.9],
        ["eggs", 4.8], ["potatoes", 2.9], ["rice", 2.7],
        ["tuna", 6.1],
        ["milk", 1.9], ["cheese", 13.5], ["nuts", 2.3], ["beans", 2], ["tofu", 2],
        ["vegetables", 2], ["fruit", 1.1], ["lentils", .9]
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
