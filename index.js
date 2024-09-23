require("dotenv").config();
require("./bot/channel");
const TelegramBot = require("node-telegram-bot-api");
const { insertUser, getUser, updateUser } = require("./modules/user.service");
const {
  startMsg,
  subcribedMsg,
  nonSubcribedMsg,
  retweetMsg,
  retweetConfirmMsg,
  recievedTweetLinkMsg,
  wrongTweetLinkMsg,
  recievedWalletLinkMsg,
  enterWaketMsg,
  wrongWalletLinkMsg,
  linkWalletMsg,
  changeLanguageMsg,
} = require("./messages/message");

const token = process.env.TOKEN_BOT_DROP;
// Create a bot instance
const bot = new TelegramBot(token, {
  polling: true,
  request: {
    agentOptions: {
      keepAlive: true,
      family: 4,
    },
  },
});

async function main() {
  bot.on("message", async (msg) => {
    let user = await getUser(msg.from.id);
    if (user === null) {
      user = await insertUser({
        id: msg.from.id,
        firstName: msg.from.first_name,
        lastName: msg.from.last_name,
        balance: 0,
        referral: 0,
        lang: "en",
        status: "inactive",
        state: null,
      });
    }
    switch (user.state) {
      case "retweet_confirm": {
        if (
          /https:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/.test(msg.text)
        ) {
          if (!user.linkTwitter) {
            await updateUser(msg.chat.id, {
              linkTwitter: msg.text,
              balance: user.balance + 100,
              state: null,
            });
          } else {
            await updateUser(msg.chat.id, {
              linkTwitter: msg.text,
              state: null,
            });
          }
          bot.sendMessage(
            msg.chat.id,
            recievedTweetLinkMsg(msg)[user.lang].caption,
            {
              reply_markup: recievedTweetLinkMsg(msg)[user.lang].reply_markup,
            }
          );
        } else {
          bot.sendMessage(msg.chat.id, wrongTweetLinkMsg[user.lang].caption);
          await updateUser(msg.chat.id, { state: null });
        }
        break;
      }
      case "link_wallet_confirm": {
        if (/^UQ.{46}$/.test(msg.text)) {
          await updateUser(msg.chat.id, { wallet: msg.text, state: null });
          bot.sendMessage(
            msg.chat.id,
            recievedWalletLinkMsg(msg)[user.lang].caption,
            {
              reply_markup: recievedWalletLinkMsg(msg)[user.lang].reply_markup,
            }
          );
        } else {
          bot.sendMessage(msg.chat.id, wrongWalletLinkMsg[user.lang].caption);
          await updateUser(msg.chat.id, { state: null });
        }
        break;
      }
      default: {
        if (/\/start/.test(msg.text)) {
          const matched = msg.text.split(" ");
          if (matched.length == 2) {
            const refId = matched[1].replace("r", "");
            const refUser = await getUser(Number(refId));
            if (refUser !== null) {
              await updateUser(refUser.id, {
                balance: refUser.balance + 50,
                referral: refUser.referral + 1,
              });
            }
          }
          bot.sendPhoto(
            msg.chat.id,
            "https://i.ibb.co/wJMg6ft/B1.jpg",
            startMsg(msg)[user.lang]
          );
        }
      }
    }
  });

  bot.on("callback_query", async (callbackQuery) => {
    const user = await getUser(callbackQuery.from.id);
    switch (callbackQuery.data) {
      case "confirm_btn":
        if (user === null || user.status === "inactive") {
          bot.sendMessage(
            callbackQuery.message.chat.id,
            nonSubcribedMsg[user.lang].caption,
            {
              reply_markup: nonSubcribedMsg[user.lang].reply_markup,
            }
          );
        } else {
          bot.sendPhoto(
            callbackQuery.message.chat.id,
            "https://i.ibb.co/4f2NSw3/B2.jpg",
            subcribedMsg(user)[user.lang]
          );
        }
        break;
      case "retweet_btn":
        bot.sendMessage(callbackQuery.message.chat.id, retweetMsg.en.caption, {
          reply_markup: retweetMsg[user.lang].reply_markup,
        });
        break;
      case "link_wallet_btn":
        bot.sendMessage(
          callbackQuery.from.id,
          linkWalletMsg[user.lang].caption,
          {
            reply_markup: linkWalletMsg[user.lang].reply_markup,
          }
        );
        break;
      case "link_wallet_confirm_btn":
        await updateUser(callbackQuery.from.id, {
          state: "link_wallet_confirm",
        });
        bot.sendMessage(
          callbackQuery.message.chat.id,
          enterWaketMsg[user.lang].caption
        );
        break;
      case "retweet_confirm_btn":
        await updateUser(callbackQuery.from.id, { state: "retweet_confirm" });
        bot.sendMessage(
          callbackQuery.message.chat.id,
          retweetConfirmMsg[user.lang].caption
        );
        break;
      case "back_btn":
        await updateUser(callbackQuery.from.id, { state: null });
        bot.sendPhoto(
          callbackQuery.message.chat.id,
          "https://i.ibb.co/4f2NSw3/B2.jpg",
          subcribedMsg(user)[user.lang]
        );
        break;
      case "change_lang_btn":
        bot.sendMessage(
          callbackQuery.message.chat.id,
          changeLanguageMsg[user.lang].caption,
          {
            reply_markup: changeLanguageMsg[user.lang].reply_markup,
          }
        );
        break;
      case "update_btn":
        bot.sendPhoto(
          callbackQuery.message.chat.id,
          "https://i.ibb.co/4f2NSw3/B2.jpg",
          subcribedMsg(user)[user.lang]
        );
        break;
      default:
        if (subcribedMsg(user)[callbackQuery.data] === undefined) {
          bot.sendMessage(
            callbackQuery.message.chat.id,
            "This language is not available"
          );
          return;
        }
        await updateUser(callbackQuery.from.id, {
          lang: callbackQuery.data,
        });
        bot.sendPhoto(
          callbackQuery.message.chat.id,
          "https://i.ibb.co/4f2NSw3/B2.jpg",
          subcribedMsg(user)[callbackQuery.data]
        );
    }
  });

  console.log("Bot is running ...");
}

main();
