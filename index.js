const discord = require('discord.js');
const token = 'DAS GEHT DICH NICHTS AN!';
const bot = new discord.Client();
const fs = require('fs');
const bot_embed = {embed: {
    color: 3447003,
    author: {
        name: "Craftions.net Bot"
    },
    title: "Der Craftions Bot",
    description: "Dieser Bot wurde von MCTzOCK für Craftions.net gemacht!\n\nBot Hilfe: **!bot help**"
}};

const help_embed = {
    embed: {
        color: 3447003,
        author: {
            name: "Craftions.net Bot"
        },
        title: "Craftions.net Bot Hilfe",
        description: "Der Bot versteht folgende Befehle: \n\n**!bot help**: Zeigt dieses Hilfe Menü \n\n**!bot stats**: Zeigt Statistiken zu dem Bot\n\n**!bot projects**: Zeigt dir unsere Projekte an\n\n**!bot ticket**: Öffnet ein Support Ticket"
    }
};

const stats = {embed: {
    color: 3447003,
    author: {
        name: "Craftions.net Bot"
    },
    title: "Craftions.net Bot Statistiken",
    description: "Dieser Bot wurde von MCTzOCK für Craftions.net gemacht!\n\nDie Entwicklung hat am 21.05.2020 begonnen.\n\nAktuelle Bot Version: 2.0"
}};

const projects = {embed: {
    color: 3447003,
    author: {
        name: "Craftions.net Bot",
    },
    title: "**Projekte von Craftions**",
    description: "**Aktuelle Projekte:**\n\n**Minecraft Server**:\n\n**SkyWars**: SkyWars Kits\n\n**McBattleRoyale**: Battle Roayle in Minecraft\n\n**BedWars**: BedWars Spielmodus\n\n"
}};

const admin_help = {
    embed: {
        color: 3000000,
        author: {
            name: "Craftions.net Bot"
        },
        title: "Craftions.net Bot - Admin Hilfe",
        description: "Als Teammitglied kannst du folgende Sachen machen:\n\n**!bot announce <message>**: Kündigt news mit einem @ everyone PING an.\n\n**!admin**: Zeigt diese Hilfe\n\n**!bot team-announce <message>**: Kündigt etwas an, was nur für das Team bestimmt ist."
    }
};

const activities_list = ['!bot help', 'Made by MCTzOCK#0047', 'Craftions.net Bot'];

bot.on('ready', () => {
    console.log('Bot logged in with ' + bot.user.tag + '!');
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index], { type: "PLAYING" });
    }, 7000);
});

bot.on('message', msg => {
    if(msg.content.startsWith('!'))
    {
        if(msg.content === '!bot')
        {
            msg.channel.send(bot_embed);
        }if(msg.content === '!bot help')
        {
            msg.channel.send(help_embed);
        }
        if(msg.content === '!bot stats')
        {
            msg.channel.send(stats);
        }
        if(msg.content === '!bot projects')
        {
            msg.channel.send(projects);
        }
        if(msg.content === '!bot ticket')
        {
            // ticket = bot.channels.find('name', 'tickets');
            // ticket.send('**NEUES TICKET!**\n\n<@!' + msg.author.id + '> hat ein neues Ticket geöffnet!\n\n<@&675610466218803231> und <@&675610243647930378> Bitte kümmert euch drum!');
            // msg.reply('Dein Ticket wurde erfolgreich erstellt! Bitte warte, bis sich ein Teammitglied um dich kümmert.');
            // console.log('New Ticket!');
            let rawdata = fs.readFileSync('config.json');
            let config = JSON.parse(rawdata);
            msg.guild.channels.create('undefined-ticket', 'tickets').then(channel => {
                channel.overwritePermissions(
                    [
                        {
                            id: msg.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: msg.author.id, 
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: msg.guild.roles.cache.get('675610243647930378').id,
                            allow: ['VIEW_CHANNEL'],
                        }
                    ]
                );
                channel.setParent('713659440288628737');
                channel.setName('ticket-' + config.ticket);
                config.ticket = config.ticket + 1;
                console.log(config.ticket);
                console.log(config);
                var cfgs = JSON.stringify(config); 
                fs.writeFile('config.json', cfgs, function(err)
                    {
                        if(err) return console.log(err);
                    }
                );
                channel.send('Willkommen @here! Dieses Ticket wurde von ' + msg.author.username + ' geöffnet. Wenn die Frage geklärt ist, mache einfach ``!bot ticket close``');
            });
        }
        if(msg.content === '!bot ticket close')
        {
            msg.channel.delete();
        }
        if(msg.content.startsWith('!bot announce'))
        {
            if(msg.member.roles.find(r => r.name === "Craftions.net - Team"))
            {
                    const args = msg.content.slice('!bot announce').split(' ');
                ra = "";
                if(args.length === 2)
                {
                    msg.reply('!bot annonce <message>');
                }else if(args.length > 2)
                {
                    for (let index = 2; index < args.length; index++) {
                        if(index != 'announce')
                        {
                            ra += args[index] + " ";
                        }
                    }
                    announce_channel = bot.channels.find('name', '🎉news');
                    announce_channel.send('@everyone Es gibt eine neue Ankündigung von **' + msg.author.username + '**\n\n' + ra);
                    msg.reply('Folgende Ankündigung wurde gemacht: ' + ra);
                    console.log('New Announcement!');
                }
            }else
            {
                msg.reply("Sorry, das kannst du noch nicht.");
            }
        }
    if(msg.content.startsWith('!bot team-announce'))
    {
        if(msg.member.roles.find(r => r.name === "Craftions.net - Team"))
        {
            const args = msg.content.slice('!bot team-announce').split(' ');
            ra = "";
            if(args.length === 2)
            {
                msg.reply('!bot team-annonce <message>');
            }else if(args.length > 2)
            {
                for (let index = 2; index < args.length; index++) {
                    if(index != 'announce')
                    {
                        ra += args[index] + " ";
                    }
                }
                announce_channel = bot.channels.find('name', 'team-news');
                announce_channel.send('@here Es gibt eine neue Ankündigung von **' + msg.author.username + '**\n\n' + ra);
                msg.reply('Folgende Ankündigung wurde gemacht: ' + ra);
                console.log('New Announcement!');
            }
        }else
        {
            msg.reply("Sorry, das kannst du noch nicht.");
        }
    }
        if(msg.content.startsWith('!bot bot-announce'))
        {
            let args = msg.content.split(' ');
            if(msg.member.roles.find(r => r.name === "Bot Developer"))
            {
                if(args.length > 6)
                {
                    let desc = "";
                    for (let index = 6; index < args.length; index++){
                        desc += args[index] + " ";
                    }
                    if(args[2] === 'changelog')
                    {
                        if(args[3] === 'plain')
                        {
                            bot_change = bot.channels.find('name', 'bot-updates');
                            bot_change.send("**BOT Update**\n\nNeues Update mit der Version **" + args[4] + "**\n\nVeröffentlicht von " + args[5] + "\n\nBeschreibung: ```" + desc + "```");
                        }
                        if(args[3] === 'rich')
                        {
                            bot_change = bot.channels.find('name', 'bot-updates');
                            bot_change.send({embed: {
                                color: 3447003,
                                author: {
                                    name: args[5]
                                },
                                title: "Versions Update " + args[4],
                                description: desc
                            }});
                        }
                    }
                }else{
                    console.log(args.length);
                    msg.reply();
                }
            }else{
                msg.reply('Sorry, das kannst du noch nicht.');
            }
        }
        if(msg.content === '!admin')
        {
            if(msg.member.roles.find(r => r.name === "Craftions.net - Team"))
            {
                msg.channel.send(admin_help);
            }else
            {
                msg.reply('Sorry, das kannst du noch nicht.');
            }
        }
    
    }
});
bot.login(token);
