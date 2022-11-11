const mySecret = process.env['TOKEN']
const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client()
const data = client.data
const guild = new Discord.Guild(client, data);

const path = require('path')


require("dotenv").config();
console.log(client)

sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "fuck", "shit", "pissed", "not vibing"];

serverTemplates = [];

badVibesReplies = [
    "Vibes are attrocious.",
    "Yo ur vibes are all off my guy",
    "fix ur vibes at once pls",
    "gwib",
    "no",
    "no <3",
    "yea alright",
    "swiggity swooty fix your fuckin vibes at once"
]

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

//Responds to messages
client.on("message", msg => {
    const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'vibe');
    if (msg.author.bot) return

    if (msg.content === "$inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }

    if (sadWords.some(word => msg.content.includes(word))) {
        const badVibesReply = badVibesReplies[Math.floor(Math.random() * badVibesReplies.length)]
        msg.reply(badVibesReply)
    }

    if (msg.content === "./DevTest_Bot_Online") {
        msg.channel.send("Bot is Online");
    }
    if (msg.content === "ping") {
        msg.channel.send("pong");
    }
    var catregister = "cat";
    if (msg.content.toLowerCase().includes(catregister)) {
        msg.channel.send("cat detected");
        msg.channel.lastMessage.react(reactionEmoji);
        msg.channel.lastMessage.react('🐱');
    }

    if (msg.content === "!ratthew") {
        msg.channel.send("https://cdn.discordapp.com/attachments/865251615836340236/865281902989541386/unknown_2.png");
    }

    if (msg.content === "kill myself" || msg.content === "die" || msg.content === "suicide") {
        const messageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Just checking in :)')
            .addFields({ name: "\n\tHey there. Based on your message, it seems like things aren't going too well...", value: "Just in case you need it, here are some useful links.", inline: false }, { name: '\n\tSuicide Prevention Hotline', value: '800-273-8255', inline: true }, { name: '\n\tSuicide Prevention Lifeline Website', value: 'https://suicidepreventionlifeline.org/', inline: true }, { name: '\n\tTrevor Project Website', value: 'https://www.thetrevorproject.org/', inline: true }, { name: '\nTake a load off, cool down, and enjoy some choccy milk :)', value: 'Just know theres always someone you can reach out to.', inline: false })
            .setImage('https://i.imgur.com/xzc544J.jpg')
            .setTimestamp()
            .setFooter('If this was in error, please ignore this message.');
        msg.author.send(messageEmbed);
    }
    //
    //Joining a users Voice Chat
    if (msg.content === "!joinVoice") {
        const channel = client.channels.cache.get(msg.member.voice.channelID);
        console.log(channel);


        if (!channel) return console.error("The channel does not exist!");

        channel.join().then(connection => {
            msg.channel.send("Successfully connected to " + msg.member.voice.channel.name);
            connection.play('./music.mp3', { volume: 0.5, quality: 'highestaudio' });

            // Play a ReadableStream
            //TODO
            //Get YouTube link, and play audio from there.
            console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });
    }

    if (msg.content === "!leaveVoice") {
        const channel = client.channels.cache.get(msg.member.voice.channelID);

        if (!channel) {
            msg.channel.send("You can only use this if your connected to a voice channel!")
            return console.error("Not in a voice chat!");
        } else {
            channel.leave();
        }
    }

    if (msg.content === "!mariachi") {
        const channel = client.channels.cache.get(msg.member.voice.channelID);
        console.log(channel);


        if (!channel) return console.error("The channel does not exist!");

        channel.join().then(connection => {
            msg.channel.send("Successfully connected to " + msg.member.voice.channel.name);
            //connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
            connection.play('./mariachi.mp3', { volume: 0.5, quality: 'highestaudio' });

            // Play a ReadableStream
            //TODO
            //Get YouTube link, and play audio from there.
            console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });
    }

    if (msg.content === "!music") {
        const channel = client.channels.cache.get(msg.member.voice.channelID);
        console.log(channel);


        if (!channel) return console.error("The channel does not exist!");

        channel.join().then(connection => {
            msg.channel.send("Successfully connected to " + msg.member.voice.channel.name);
            //connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
            //connection.play('./music.mp3', { volume: 0.5, quality: 'highestaudio' });

            // Play a ReadableStream
            //TODO
            //Get YouTube link, and play audio from there.
            console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });
    }

    if (msg.content === "s!backup") {
        guild.createTemplate("template_copy")

        //guild.fetchTemplates(serverTemplates[0])
        console.log("Template fetched!")
    }

    if (msg.content === "!deleteServer") {
        guild.delete()
    }
})

process.on('UnhandledPromiseRejectionWarning', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(process.env.TOKEN);