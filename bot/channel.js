const TelegramBot = require("node-telegram-bot-api");
const { updateUser } = require("../modules/user.service");

const token = process.env.TOKEN_BOT_CHANNEL;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

bot.on("chat_member", async (message) => {
  switch (message.new_chat_member.status) {
    case "member":
      await updateUser(message.from.id, {
        id: message.from.id,
        firstName: message.from.first_name,
        lastName: message.from.last_name,
        balance: 50,
        referral: 0,
        lang: "en",
        status: "active",
        state: null,
      });
      break;
    case "left":
      await updateUser(message.from.id, {
        id: message.from.id,
        firstName: message.from.first_name,
        lastName: message.from.last_name,
        balance: 0,
        referral: 0,
        lang: "en",
        status: "inactive",
        state: null,
      });
      break;
    default:
      break;
  }
});
