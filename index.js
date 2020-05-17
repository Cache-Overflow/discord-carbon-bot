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
        { name: '**.info**', value: "about me", inline: false },
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

    bot.channels.cache.get("711322092339200051").send("I am online! :robot:");
});

// test function
bot.on("message", msg => {
    if (msg.author == bot.user) return; // Prevent bot from responding to its own messages

    // test cases
    if (msg.content.toLowerCase() === "carbon") msg.channel.send("DESTROY");
    if (msg.content === "ayy") msg.channel.send("lmao");
    if (msg.content === "shankspog") msg.channel.send("<:shankspog:700953540599742604>");
		if (msg.content === "caFlag") msg.channel.send(":flag_ca:");

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
                                return msg.channel.send(`Air Quality Health Index: ${myJson.airQualityHealthIndex} :leaves:`);
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
                                return msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent} :fog:`);
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
                            msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent} :bullettrain_side:`);
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
                                return msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent} :truck:`);
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
                            //plane
                            method = "LongEconomyClassFlight";

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
                                msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent} :airplane:`);
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
                                msg.channel.send(`Carbon Equivalent: ${myJson.carbonEquivalent} :airplane:`);
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
                            return msg.channel.send(`Number of Trees: ${myJson.numberOfTrees} :deciduous_tree:`);
                        })
                        .catch(err => {
                            console.log(err);
                        });
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
                        msg.channel.send("Missing statement.");
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
                        const coronavirusEmbed = new Discord.MessageEmbed()
                        	.setColor('#0xff0000')
                        	.setTitle('Coronavirus ' + country.charAt(0).toUpperCase() + country.substring(1) + ' Info')
                    		.setURL('https://www.worldometers.info/coronavirus/country/' + country)
                    		.setDescription('Public Health information about COVID-19 in ' + country.charAt(0).toUpperCase() + country.substring(1))
                        	.setThumbnail('')
                    		.addFields(
                				{ name: "**Confirmed cases**", value: myJson.data.summary.total_cases, inline: false },
								{ name: "**Deaths**", value: myJson.data.summary.deaths, inline: false },
                                { name: "**Active Cases**", value: myJson.data.summary.active_cases, inline: false },
								{ name: "**Recovered**", value: myJson.data.summary.recovered, inline: false },
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
            case "i":
            case "info":
            case "information":
                const infoEmbed = new Discord.MessageEmbed()
                    .setColor('#0xff0000')
                    .setTitle('About me!')
                    .setURL('https://devpost.com/software/carbonbot')
                    .setAuthor('Cache Overflow', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png', 'https://github.com/Cache-Overflow')
                    .setDescription('I am a bot that can be added to your discord server. Once added to a server, users can ask me to do several environmentally oriented tasks. Currently I am able to calculate the total carbon dioxide emitted by producing food, taking transportation, and making paper from trees. I can also do non-carbon related tasks such as checking if a material is recyclable, giving a coronavirus report in countries, and calculating the Air Quality Health Index of your city.')
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png')
                    .addFields(
                        { name: "**Eli Samuel**", value: 'I am a first year computer science student at Concordia University. This is my fourth hackathon.', inline: false },
                        { name: "**David Lemme**", value: 'I am a first year software engineering student at Concordia University. This is my second hackathon.', inline: false },
                        { name: "**David Roper**", value: 'I am a first year software engineering student at Concordia University. This is my second hackathon.', inline: false },
                        { name: "**Andrew Zhang**", value: 'I am a second year mechanical engineering student at the University of Toronto. This is my first software-focused hackathon.', inline: false },
                    )
                    .setTimestamp()
                    .setFooter('Submitted to HackTheEarth2020', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Co2_carbon_dioxide_icon.png');
                msg.channel.send(infoEmbed);
                break;
            case "r":
            case "recycle":
                if(args[1] == undefined) {
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
                    recycle = false;
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
        ["beef", 27, ":cow:"], ["pork", 12.1, ":pig:"], ["lamb", 39.2,":sheep:"],
        ["chicken", 6.9, ":chicken:"], ["turkey", 10.9,":turkey:"],
        ["eggs", 4.8, ":egg:"], ["potatoes", 2.9, ":potato:"], ["rice", 2.7,":rice:"],
        ["tuna", 6.1,":fish:"],
        ["milk", 1.9, ":milk:"], ["cheese", 13.5, ":cheese:"], ["nuts", 2.3, ":peanuts:"], ["beans", 2, ":green_heart:"], ["tofu", 2,":green_heart:"],
        ["vegetables", 2, ":cucumber:"], ["fruit", 1.1, ":kiwi:"], ["lentils", .9,":green_heart:"]
        ];

    var product = false;
    for (var i=0; i< arr.length; i++) {
        if (arr[i].includes(productType.toLowerCase())) {
            product = true;
            var emoji =arr[i][2];
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
    bot.channels.cache.get(id).send("Your consumption produces " + total + " kg of CO2! "+emoji);
}

function recycleMaterial(material, id) {
    var a = material.toLowerCase();
    let mats = ["plastic", "paper", "cardboard", "glass", "tin", "aluminum", "steel"];

    if (a == "plastic") {
		const recycleEmbed = new Discord.MessageEmbed()
		.setColor('#0xff0000')
        .setDescription('Enter the type of plastic (ex.1): ')
		.setThumbnail('')
		.addFields({name: '**1**', value: 'PETE - Polyethylene Terephthalate\n*ex: soda bottles*'},
					{name: '**2**',value: 'HDPE - High density Polyethylene\n*ex: detergent bottles*'},
					{name: '**3**',value: 'PVC - Polyvinyl Chloride\n*ex: plastic pipes*'},
					{name: '**4**',value: 'LDPE - Low density Polyethylene\n*ex: plastic bags*'},
					{name: '**5**',value: 'PP – Polypropylene\n*ex: clothing and ropes*'},
					{name: '**6**',value:'PS – Polystyrene\n*ex: styrofoam*'});
		bot.channels.cache.get(id).send(recycleEmbed);
		recycle = true;
        return;
    }
    bot.channels.cache.get(id).send(material.charAt(0).toUpperCase() + material.substring(1) + " is " + (mats.includes(a) ? "recyclable!" : "not recyclable!"));
}

function recyclePlastic(s) {
    switch (s) {
        case "1":
            return "recyclable! :recycle: ";
        case "2":
            return "recyclable! :recycle: ";
        case "3":
            return "not recyclable! :no_entry_sign:";
        case "4":
            return "recyclable! :recycle: ";
        case "5":
            return "recyclable! :recycle: ";
        case "6":
            return "not recyclable! :no_entry_sign:";
        default:
            return "not recyclable :no_entry_sign:";
    }
    recycle = false;
}
