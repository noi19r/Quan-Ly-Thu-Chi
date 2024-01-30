require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const TOKEN = process.env.TELEGRAM_BOT_TOKEN

const { Client, Intents } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const TOKEN_DISCORD = 'MTEyNDM3OTg2ODg1MTg4NDA4NA.GnXDal.pLRHiJsLW9uyyBYpr6XR4BQplVdpAyG00_8AoI'

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on('messageCreate', (message) => {
	if (message.content === '!ping') {
		// Gửi tin nhắn "Pong!" nếu người dùng gửi "!ping"
		message.reply('Pong!')
	}
})

client.login(TOKEN_DISCORD)

console.log('Start App Success')
const bot = new TelegramBot(TOKEN, { polling: true })
/*
    /chi {amount}, {type}, {description}, ?{date}
    amount là số tiền chi hoặc thu
    type là phân loại 
    date được định dạng theo kiểu ngay/thang/nam
    /chi 10000, ăn uống, sôi gà
*/

bot.onText(/\/chi (.+)/, (msg, match) => {
	const chatId = msg.chat.id
	const resp = match[1]
	console.log(match)
	const [amount, type, description, date] = resp.split(',').map((item) => item.trim())

	bot.sendMessage(chatId, resp)
})

const cron = require('node-cron')
const axios = require('axios')

const checkServerStatus = async (url) => {
	try {
		const response = await axios.get(url, { validateStatus: () => true, timeout: 3000 })
		console.log(response.status)
		if (response.status === 200) {
			bot.sendMessage(1272664124, 'Web vào được r kìa')
			console.log(`Trang web ${url} hoạt động bình thường.`)
		} else if (response.status == 503) {
			console.log(`Trang web đang lỗi.`)
		} else {
			bot.sendMessage(1272664124, `web lỗi ${response.status}`)
			console.log(`Trang web ${url} trả về mã trạng thái ${response.status}.`)
		}
	} catch (error) {
		console.error(`Không thể kết nối đến trang web ${url}.`)
	}
}

// cron.schedule('*/5 * * * * *', () => {
// 	checkServerStatus('http://dkhp.itc.edu.vn')
// })

bot.on('message', (msg) => {
	const chatId = msg.chat.id
	bot.sendMessage(chatId, 'Received your message' + chatId)
})
