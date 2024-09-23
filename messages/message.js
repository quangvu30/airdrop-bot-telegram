const startMsg = (msg) => {
  return {
    en: {
      caption: `Welcome, ${msg.chat.first_name} ${msg.chat.last_name}! 🐯 Subscribe to our channels to get 50 $TIGER.`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "TON TIGER",
              url: "https://t.me/tonchanneldemo",
            },
          ],
          [{ text: "✅ Confirm", callback_data: "confirm_btn" }],
        ],
      },
    },
  };
};

const nonSubcribedMsg = {
  en: {
    caption: `😔 Oops, didn't find a subscription to the channel:`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "TON TIGER",
            url: "https://t.me/tonchanneldemo",
          },
        ],
        [{ text: "✅ Confirm", callback_data: "confirm_btn" }],
      ],
    },
  },
};

const subcribedMsg = (user) => {
  return {
    en: {
      caption: `EGENDARY AIRDROP OF 150,000,000 $TIGER 🚀
    
Your balance: ${user.balance} $TIGER
        
$TIGER is the first meme token on TON with a utility. The coin will become the main game resource in the future game from Pixel God, and you can mine it right now.
        
Want to get even more $TIGER? 🐯 Just invite a friend, or better all your friends! Send an invitation - as soon as the friend launches the bot and completes all the conditions, you'll get 50 $TIGER. Bonus will come for each friend!
        
Your ref link:
https://t.me/tstetsds_bot?start=r${user.id}
        
Your TON wallet:
${user.wallet ? user.wallet : "???"}
        
Your referrals: ${user.referral}`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "👤 Invited friends",
              url: "https://t.me/share/url?url=https://t.me/tstetsds_bot?start=r1234567&text=Do%20you%20want%2050%20%24TIGER%3F%20%F0%9F%90%AF",
            },
          ],
          [
            {
              text: "🔄 Retweet (bonus)",
              callback_data: "retweet_btn",
            },
          ],
          [
            {
              text: "👛 Link wallet",
              callback_data: "link_wallet_btn",
            },
          ],
          [
            {
              text: "🔁 Update",
              callback_data: "update_btn",
            },
            {
              text: "🇬🇧 Change language",
              callback_data: "change_lang_btn",
            },
          ],
        ],
      },
    },
  };
};

const retweetMsg = {
  en: {
    caption: `🐯 Want to get more 100 $TIGER?
        
Subscribe to our X (Twitter) and retweet this post:
https://twitter.com/tontigers_tg/status/1777707366470889948?s=46&t=aIAfbM-RPAYZJvO0rEDlBg`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔄 Retweet (bonus)",
            callback_data: "retweet_confirm_btn",
          },
        ],
      ],
    },
  },
};

const retweetConfirmMsg = {
  en: {
    caption: "🔄 Send a link to your retweet:",
  },
};

const linkWalletMsg = {
  en: {
    caption:
      "👛 To get your $TIGER, link a NON-custodial TON wallet, we recommend Tonkeeper/Tonhub/MyTonWallet:",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👛 Link wallet",
            callback_data: "link_wallet_confirm_btn",
          },
        ],
        [
          {
            text: "🔙 Back",
            callback_data: "back_btn",
          },
        ],
      ],
    },
  },
};

const enterWaketMsg = {
  en: {
    caption: "👛 Enter your TON wallet:",
  },
};

const recievedTweetLinkMsg = (msg) => {
  return {
    en: {
      caption: `👍 Great, your $TIGER is on its way! Did you like it? Go back to the main menu to find even more rewards
        
Link to your retweet:
${msg.text}`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔙 Back",
              callback_data: "back_btn",
            },
          ],
        ],
      },
    },
  };
};

const wrongTweetLinkMsg = {
  en: {
    caption: `😔 Oops, something went wrong. Please make sure you entered the correct link and try again.`,
  },
};

const recievedWalletLinkMsg = (msg) => {
  return {
    en: {
      caption: `👛 Great! Your wallet:
      ${msg.text}
We will send tokens to this address as soon as AIRDROP is over. If you entered the wrong wallet number or want to change it, just go to the Wallet tab.`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔙 Back",
              callback_data: "back_btn",
            },
          ],
        ],
      },
    },
  };
};

const wrongWalletLinkMsg = {
  en: {
    caption: `😔 Error: wallet number should start with UQ and be merged.`,
  },
};

const changeLanguageMsg = {
  en: {
    caption: "Select language:",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🇬🇧 English",
            callback_data: "en",
          },
          {
            text: "🇷🇺 Русский",
            callback_data: "ru",
          },
        ],
      ],
    },
  },
};

module.exports = {
  startMsg,
  nonSubcribedMsg,
  subcribedMsg,
  retweetMsg,
  retweetConfirmMsg,
  recievedTweetLinkMsg,
  recievedWalletLinkMsg,
  enterWaketMsg,
  wrongTweetLinkMsg,
  wrongWalletLinkMsg,
  linkWalletMsg,
  changeLanguageMsg,
};
