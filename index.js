
const mySecret = process.env['TOKEN']
const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client()
require("dotenv").config();
console.log(client)


sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "fuck", "shit", "pissed", "die"];

badVibesReplies = [
  "Vibes are attrocious.",
  "Yo ur vibes are all off my guy",
  "fix ur vibes at once pls",
  "gwib",
  "no",
  "no <3",
  "yea alright"
]

logintoken = "ODY1MjQ4NjcxMjI5NjczNDcz.YPBPng.Ab2Y3odKz25T5eL8VmPJa0hp6yc";

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
})

process.on('UnhandledPromiseRejectionWarning', error => {
	console.error('Unhandled promise rejection:', error);
});

//console.log(env.TOKEN)

client.login(process.env.TOKEN);

