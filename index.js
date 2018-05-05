const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const token = require('./config.json').token;


// replace the value below with the Telegram token you receive from @BotFather
//const token = '570098601:AAHv1ddqCIFWkoo3O7T8AaqM2MnShf2hFAU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "ip"
bot.onText(/\/ip(.*)/, (msg, match) => {
  const chatId = msg.chat.id;

  exec('ifconfig | grep "inet 18"', (err, stdout, stderr) => {
    if (err) {
      const resp = "I can't execute ifconfig";
      bot.sendMessage(chatId, resp);
      return;
    }
    try {
      const re = /inet (.*) netmask/;
      const grep = stdout.match(re)[0];
      const ip = grep.replace(re, '$1');
      console.log(`IP: ${ip}`);
      const resp = "My ip is " + ip; 
      bot.sendMessage(chatId, resp);
    } catch(e) {
      const resp = "I can't parse my IP";
      bot.sendMessage(chatId, resp);
    }
  });

});

