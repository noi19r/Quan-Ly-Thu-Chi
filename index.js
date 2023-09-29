require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
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

// bot.on('message', (msg) => {
// 	const chatId = msg.chat.id
// 	bot.sendMessage(chatId, 'Received your message')
// })
