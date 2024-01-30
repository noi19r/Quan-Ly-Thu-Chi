const { Client, Events, GatewayIntentBits } = require('discord.js')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})
client.on('message', (message) => {
	console.log(message)
	if (message.content === '!ping') {
		// Gửi tin nhắn "Pong!" nếu người dùng gửi "!ping"
		message.reply('Pong!')
	}
})

// Log in to Discord with your client's token
client.login('MTEyNDM3OTg2ODg1MTg4NDA4NA.G69KQJ.uvQcq5_hyeHkPNC9HpQ_yEZh99vvwA4i_pLJnc')
