const { groupdb, smd, getBuffer, tlang, prefix } = require("../lib");
const Config = require("../config");
const eco = require("discord-mongoose-economy");
let ty = false;

try {
    if (isMongodb) {
      ty = eco.connect(MONGODB);
      console.log("Connected with discord economy!!");
    }
  } catch (e) {
    ty = false;
  }
  
  const sck = groupdb;

  if (ty) {
// Daily Gold Claim (Toxic Edition 💰😈)
smd(
    {
      pattern: "daily",
      desc: "Claim your daily gold! 💷",
      category: "economy",
      filename: __filename,
      // react: "💷"
    },
    async ({ reply, chat, isGroup, sender, error }) => {
      try {
        let zerogroup = (await sck.findOne({ id: chat })) || {};
        if (zerogroup?.economy == "false")
          return reply("🚦 *Economy* is not active in this broke-ass group. 💀");
        if (!isGroup) return reply("❌ This ain't for your lonely DMs. Join a group, loser. 😏");
  
        const daily = await eco.daily(sender, "mxgamecoder", 500); // Giving 500 coins daily
        if (daily.cd) {
          return await reply(
            `🧧 You already grabbed your daily crumbs. 💰 Come back in ${daily.cdL} or starve. 🫡`
          );
        } else {
          reply(`🎉 Congrats! You just snatched ${daily.amount} 🪙 today. Don't waste it like an idiot. 😎`);
        }
      } catch (e) {
        error(`${e}\n\nCommand: daily`, e);
      }
    }
  );
  
  // Reset Wallet (Savage Version 💀)
  smd(
    {
      pattern: "resetwallet",
      desc: "Reset wallet of a quoted user. 💸",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* is not even enabled here, you dumbass. 💀");
        if (!isCreator) return message.reply("❌ Only the boss can do this. Sit down. 👑");
  
        let users = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
        if (!users) return message.reply("🛑 Give me a user, moron. 🤡");
  
        const balance = await eco.balance(users, "mxgamecoder");
        await eco.deduct(users, "mxgamecoder", balance.wallet);
  
        return await message.reply(
          `⛩️ *RIP Wallet* 💀\n👤 *User:* @${users.split("@")[0]}\n💸 *Bankruptcy Activated!* 🚨\n😈 Say goodbye to your 🪙, now live with that poverty. 🫡`,
          { mentions: [users] }
        );
      } catch (e) {
        message.error(`${e}\n\nCommand: resetwallet`, e);
      }
    }
  );

  // Update Bank Capacity (Savage 💀)
smd(
    {
      pattern: "capacity",
      desc: "Upgrade your bank capacity. 💳",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* ain't even running here, bro. 💀");
        if (!message.isGroup) return message.reply("❌ This is for groups only, loner. 😏");
  
        if (!match)
          return message.reply(
            `💴 *Bank Capacity Upgrade* 💳\n\n1️⃣ | *1000 sp* = 🪙100\n2️⃣ | *100000 sp* = 🪙1000\n3️⃣ | *10000000 sp* = 🪙10000\n\nExample: ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`
          );
  
        let user = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
  
        let value = match.trim();
        let k = parseInt(value);
        const balance = await eco.balance(user, "mxgamecoder");
  
        switch (value) {
          case "1000":
          case "1":
            if (k > balance.wallet)
              return message.reply("💰 *You need 100 🪙 to increase bank capacity to 1000 sp.*");
            await eco.deduct(user, "mxgamecoder", 100);
            await eco.giveCapacity(user, "mxgamecoder", 1000);
            return await message.reply(
              `🔥 *1000 sp storage has been added to ${message.senderName}'s bank. Go flex!* 😎`
            );
  
          case "100000":
          case "2":
            if (k > balance.wallet)
              return message.reply("💰 *You need 1000 🪙 to upgrade to 100000 sp.*");
            await eco.deduct(user, "mxgamecoder", 1000);
            await eco.giveCapacity(user, "mxgamecoder", 100000);
            return await message.reply(
              `🔥 *100000 sp storage added to ${message.senderName}'s bank. You're getting rich!* 💎`
            );
  
          case "10000000":
          case "3":
            if (k > balance.wallet)
              return message.reply("💰 *You need 10000 🪙 to upgrade to 10000000 sp.*");
            await eco.deduct(user, "mxgamecoder", 10000);
            await eco.giveCapacity(user, "mxgamecoder", 10000000);
            return await message.reply(
              `🔥 *10000000 sp storage added to ${message.senderName}'s bank. You a millionaire now?* 💰`
            );
  
          default:
            await message.reply("❌ *Invalid option, try again dumbass.* 📉");
        }
      } catch (e) {
        message.error(`${e}\n\nCommand: capacity`, e);
      }
    }
  );
  
  // Deposit Gold (Toxic Edition 💰)
  smd(
    {
      pattern: "deposit",
      desc: "Deposit your gold into the bank. 💰",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* ain't running here, broke boy. 💀");
  
        if (!match) return message.reply("😡 *Baka!!* Enter the 💰 amount to deposit!");
  
        let d = parseInt(match);
        const deposit = await eco.deposit(message.sender, "mxgamecoder", d);
        if (deposit.noten)
          return message.reply("💀 *You can't deposit what you don't even have, fool.*");
  
        return await message.reply(
          `💰 *Deposit Successful!*\n⛩️ *Sender:* ${message.pushName}\n🍀 *Deposited:* 🪙${deposit.amount}\n📈 *Upgrade your bank capacity to hold more money!*`
        );
      } catch (e) {
        message.error(`${e}\n\nCommand: deposit`, e);
      }
    }
  );
  
  // Leaderboard (Flex Edition 💰🔥)
smd(
    {
      pattern: "lb",
      desc: "Check the leaderboard. 🏆",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let h = await eco.lb("mxgamecoder", 10);
        if (!h.length) return message.reply("💀 Ain't nobody got money here. Everyone broke. 😂");
  
        let str = `💰 *Top ${h.length} Richest Users* 🏆\n\n`;
        const { sck1 } = require("../lib");
        let arr = [];
  
        for (let i = 0; i < h.length; i++) {
          var tname = message.bot.getName(h[i].userID);
          str += `*${i + 1}.*\n╭───💰───◆\n│ *Name:* _${tname}_\n│ *User:* _@${
            h[i].userID.split("@")[0]
          }_\n│ *Wallet:* 🪙_${h[i].wallet}_\n│ *Bank:* 🏦_${h[i].bank}_\n│ *Capacity:* 💼_${
            h[i].bankCapacity
          }_\n╰───────────◆\n\n`;
          arr.push(h[i].userID);
        }
        await message.reply(str, { mentions: arr });
      } catch (e) {
        message.error(`${e}\n\nCommand: lb`, e);
      }
    }
  );
  
  // Transfer Money (Toxic Banking System 💸)
  smd(
    {
      pattern: "transfer",
      desc: "Transfer gold to another broke soul. 💰",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* is disabled in this broke-ass group. 💀");
  
        let value = match.trim().split(" ");
        if (!value[0]) return message.reply(`🤡 Use it right: ${prefix}transfer 100 @user`);
  
        let user = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
        if (!user) return message.reply("🛑 Who tf are you trying to send money to? Tag someone. 🤦‍♂️");
  
        const user1 = message.sender;
        const user2 = user;
        const amount = parseInt(value[0]);
  
        if (!amount || isNaN(amount))
          return message.reply("😡 You dumb? Enter a valid amount to transfer. 📉");
  
        const balance = await eco.balance(user1, "mxgamecoder");
        if (balance.wallet < amount)
          return message.reply("💀 You're too broke for this transaction. Try again when you're rich.");
  
        await eco.deduct(user1, "mxgamecoder", amount);
        await eco.give(user2, "mxgamecoder", amount);
  
        return await message.reply(
          `✅ *Transaction Successful!* 💰\n💳 *Sender:* @${user1.split("@")[0]}\n👤 *Receiver:* @${
            user2.split("@")[0]
          }\n💸 *Amount:* 🪙${amount}\n📉 Don't spend it all in one place, fool. 😈`,
          { mentions: [user1, user2] }
        );
      } catch (e) {
        message.error(`${e}\n\nCommand: transfer`, e);
      }
    }
  );

  // Wallet Check (Flex or Roast 💰🔥)
smd(
    {
      pattern: "wallet",
      desc: "Shows wallet balance. 💰",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
  
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* ain't even activated here. 💀");
  
        const balance = await eco.balance(message.sender, "mxgamecoder");
  
        if (balance.wallet === 0) {
          return await message.reply(
            `💀 *${message.pushName}'s Wallet:* _Empty AF._\n\nYou broke as hell. Better start grinding. 💸`
          );
        } else {
          return await message.reply(
            `💰 *${message.pushName}'s Wallet:*\n\n_🪙${balance.wallet}_\n\nNot bad, but don't get cocky. Someone richer can wipe you out. 😂`
          );
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: wallet`, e);
      }
    }
  );
  
  // Give Money (But Only If You're The Boss 😈)
  smd(
    {
      pattern: "give",
      desc: "Add money to a user's wallet. 💰",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        if (!message.isCreator)
          return message.reply(
            `😡 *Who do you think you are?* Only my owner can give money!`
          );
  
        let users = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg?.contextInfo?.participant || false;
  
        if (!users) return message.reply("🛑 Tag a user to give money to, genius.");
  
        let amount = parseInt(match.split(" ")[0]);
        if (!amount || isNaN(amount) || amount <= 0)
          return message.reply("😡 Give a valid amount. You ain't funny.");
  
        await eco.give(users, "mxgamecoder", amount);
  
        return await message.bot.sendMessage(
          message.chat,
          {
            text: `💸 *Transaction Complete!* \n📈 _Added ${amount} 🪙 to @${users.split("@")[0]}'s wallet._\n\nDon't waste it, fool. 💀`,
            mentions: [users],
          },
          { quoted: message }
        );
      } catch (e) {
        message.error(`${e}\n\ncommand: give`, e);
      }
    }
  );

  // Check Bank Balance (Flex or Get Mocked 😂)
smd(
    {
      pattern: "bank",
      desc: "Shows bank balance. 🏦",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
  
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* ain't even active here. 💀");
  
        const balance = await eco.balance(message.sender, "mxgamecoder");
  
        if (balance.bank === 0) {
          return await message.reply(
            `🏦 *${message.pushName}'s Bank:*\n\n_💀 *Balance: 0 🪙*_\n\nDamn, you got NOTHING in savings. 💸🤣`
          );
        } else {
          return await message.reply(
            `🏦 *${message.pushName}'s Bank:*\n\n_🪙${balance.bank}/${balance.bankCapacity}_\n\nNot bad, but don't get robbed. 🤡`
          );
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: bank`, e);
      }
    }
  );
  
  // Rob a User (Risky Business 😈🔫)
  smd(
    {
      pattern: "rob",
      desc: "Steal from another user's wallet. 🔫",
      category: "economy",
      filename: __filename,
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
  
        if (mongoschemas == "false")
          return message.reply("🚦 *Economy* ain't even active here. 💀");
  
        let users = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
  
        if (!users) return message.reply("🛑 Tag someone to rob, dumbass.");
  
        const user1 = message.sender;
        const user2 = users;
        const k = 1000;
        const balance1 = await eco.balance(user1, "mxgamecoder");
        const balance2 = await eco.balance(user2, "mxgamecoder");
  
        const typ = ["ran", "rob", "caught"];
        const random = typ[Math.floor(Math.random() * typ.length)];
  
        if (k > balance1.wallet)
          return message.reply(
            `☹️ *You broke as hell.* You can't even afford the fine if you get caught. 😂`
          );
  
        if (k > balance2.wallet)
          return message.reply(
            `🤡 *Your target is BROKE.* Find a richer victim, fool. 💀`
          );
  
        switch (random) {
          case "ran":
            await message.reply(
              `🏃💨 *Your victim escaped!* Better work on your intimidation skills. 🤡`
            );
            break;
  
          case "rob":
            const loot = Math.floor(Math.random() * 1000);
            await eco.deduct(user2, "mxgamecoder", loot);
            await eco.give(user1, "mxgamecoder", loot);
            await message.reply(
              `🤑 *Robbery Successful!*\nYou stole _${loot} 🪙_ from @${users.split("@")[0]}. Hope you can sleep at night. 😂`
            );
            break;
  
          case "caught":
            const fine = Math.floor(Math.random() * 1000);
            await eco.deduct(user1, "mxgamecoder", fine);
            await message.reply(
              `🚔 *FBI caught your ass!* You had to pay a fine of _${fine} 🪙_. Stay outta trouble, fool. 💀`
            );
            break;
  
          default:
            await message.reply("*What are you even trying to do?* 🤨");
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: rob`, e);
      }
    }
  );

  
  smd(
    {
      pattern: "slot2",
      desc: "withdraw money from bank account.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        var today = new Date();
        if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0) {
          if (match == "help")
            return message.reply(
              `*1:* Use ${prefix}slot to play\n\n*2:* You must have 🪙100 in your wallet\n\n*3:* If you don't have money in wallet then 👛withdraw from your bank🏦\n\n*4:* If you don't have 🤑 money in your 🏦bank too then use economy features to 📈gain money`
            );
          if (match == "money")
            return message.reply(
              `*1:* Small Win --> +🪙20\n\n*2:* Small Lose --> -🪙20\n\n*3:* Big Win --> +🪙100\n\n*4:* Big Lose --> -🪙50\n\n*5:* 🎉 JackPot --> +🪙1000`
            );
          const fruit1 = ["🥥", "🍎", "🍇"];
          const fruit2 = ["🍎", "🍇", "🥥"];
          const fruit3 = ["🍇", "🥥", "🍎"];
          const fruit4 = "🍇";
          const lose = [
            "*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_",
            "*Totally out of line*\n\n_--> 🥥-🍎-🍍_",
            "*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_",
          ];
          const smallLose = [
            "*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_",
            "*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_",
            "*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_",
          ];
          const won = [
            "*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_",
            "*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_",
            "*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_",
          ];
          const near = [
            "*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_",
            "*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_",
          ];
          const jack = [
            "*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_",
            "*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_",
            "*🎊 You Just hit a jackpot worth 🪙1000*",
          ];
          const user = message.sender;
          const k = 100;
          const balance1 = await eco.balance(user, "mxgamecoder");
          if (k > balance1.wallet)
            return message.reply(
              `You are going to be spinning on your wallet, you need at least 🪙100`
            );
          const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
          const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
          const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
          //const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
          const mess1 = lose[Math.floor(Math.random() * lose.length)];
          const mess2 = won[Math.floor(Math.random() * won.length)];
          const mess3 = near[Math.floor(Math.random() * near.length)];
          const mess4 = jack[Math.floor(Math.random() * jack.length)];
          const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];
          if (match.split(" ")[0]) {
            let value = match.split(" ")[0];
            const balance = await eco.balance(message.sender, "mxgamecoder");
            console.log(balance.wallet);
            if (value <= balance.wallet) {
              const deduff = Math.floor(Math.random() * value);
              if (f1 !== f2 && f2 !== f3) {
                const deduct1 = await eco.deduct(user, "mxgamecoder", deduff);
                return message.reply(
                  `${mess1}\n\n*Big Lose -->* _🪙${deduff}_`
                );
              } else if (f1 == f2 && f2 == f3) {
                const give1 = await eco.give(user, "mxgamecoder", deduff / 2);
                return message.reply(
                  `${mess2}\n*_Little Jackpot -->* _🪙${deduff / 2}_`
                );
              } else if (f1 == f2 && f2 !== f3) {
                const give2 = await eco.give(user, "mxgamecoder", deduff);
                return message.reply(`${mess3}\n*Small Win -->* _🪙${deduff}_`);
              } else if (f1 !== f2 && f1 == f3) {
                const deduct2 = await eco.deduct(user, "mxgamecoder", deduff);
                return message.reply(
                  `${mess5}\n\n*Small Lose -->* _🪙${deduff}_`
                );
              } else if (f1 !== f2 && f2 == f3) {
                const give4 = eco.give(user, "mxgamecoder", deduff);
                return message.reply(
                  `${mess3}\n\n*Small Win -->* _🪙${deduff}_`
                );
              } else if (f1 == f2 && f2 == f3 && f3 == f4) {
                const give5 = eco.give(user, "mxgamecoder", deduff * 20);
                return message.reply(
                  `${mess4}\n\n_🎊 JackPot --> _🪙${deduff * 20}_`
                );
              } else {
                return message.reply(`Do you understand what you are doing?`);
              }
            } else {
              return message.reply(
                "You don't have enough 💰amount in your👛 wallet.\n- Please don't provide 🤑amount."
              );
            }
          }
          if (f1 !== f2 && f2 !== f3) {
            const deduct1 = await eco.deduct(user, "mxgamecoder", 50);
            message.reply(`${mess1}\n\n*Big Lose -->* _🪙50_`);
          } else if (f1 == f2 && f2 == f3) {
            const give1 = await eco.give(user, "mxgamecoder", 100);
            message.reply(`${mess2}\n*_Little Jackpot -->* _🪙100_`);
          } else if (f1 == f2 && f2 !== f3) {
            const give2 = await eco.give(user, "mxgamecoder", 20);
            message.reply(`${mess3}\n*Small Win -->* _🪙20_`);
          } else if (f1 !== f2 && f1 == f3) {
            const deduct2 = await eco.deduct(user, "mxgamecoder", 20);
            message.reply(`${mess5}\n\n*Small Lose -->* _🪙20_`);
          } else if (f1 !== f2 && f2 == f3) {
            const give4 = eco.give(user, "mxgamecoder", 20);
            message.reply(`${mess3}\n\n*Small Win -->* _🪙20_`);
          } else if (f1 == f2 && f2 == f3 && f3 == f4) {
            const give5 = eco.give(user, "mxgamecoder", 1000);
            message.reply(`${mess4}\n\n_🎊 JackPot --> _🪙1000_`);
          } else {
            message.reply(`Do you understand what you are doing?`);
          }
        } else {
          message.reply(
            `*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`
          );
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: slot2`, e);
      }
    }
  );
  smd(
    {
      pattern: "slot",
      desc: "slot game.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        const kg = 100;
        const balance1 = await eco.balance(message.sender, "mxgamecoder");
        if (kg > balance1.wallet)
          return message.reply(
            `You are going to be spinning on your wallet, you need at least 🪙100`
          );
        var r_ban = new Array();
        r_ban[0] = "1 : 2 : 3";
        r_ban[1] = "1 : 2 : 3";
        r_ban[2] = "1 : 2 : 3";
        r_ban[3] = "4 : 3 : 3";
        r_ban[4] = "1 : 1 : 1";
        r_ban[5] = "5 : 2 : 5";
        r_ban[6] = "3 : 5 : 3";
        r_ban[7] = "1 : 3 : 6";
        r_ban[8] = "6 : 2 : 7";
        r_ban[9] = "1 : 6 : 3";
        r_ban[10] = "6 : 3 : 2";
        r_ban[11] = "5 : 5 : 6";
        r_ban[12] = "1 : 5 : 3";
        r_ban[13] = "4 : 1 : 7";
        r_ban[14] = "4 : 3 : 2";
        r_ban[15] = "4 : 3 : 2";
        r_ban[16] = "7 : 4 : 6";
        r_ban[17] = "6 : 5 : 1";
        r_ban[18] = "5 : 7 : 2";

        var p = Math.floor(19 * Math.random());
        var q = Math.floor(19 * Math.random());
        var r = Math.floor(19 * Math.random());
        var i = r_ban[p];
        var j = r_ban[q];
        var k = r_ban[r];
        console.log(i + "\n" + j + "\n" + k);
        let t = i.split(":");
        let tt = j.split(":");
        let ttt = k.split(":");
        var lol;
        if (t[2] === tt[1] && tt[1] === ttt[0]) lol = true;
        if (t[0] === tt[1] && tt[1] === ttt[2]) lol = true;
        if (t[0] === tt[0] && tt[0] === ttt[0]) lol = true;
        if (t[1] === tt[1] && tt[1] === ttt[1]) lol = true;
        if (t[2] === tt[2] && tt[2] === ttt[2]) lol = true;
        if (t[0] === tt[1] && tt[1] === ttt[2]) lol = true;
        if (t[2] === tt[1] && tt[1] === ttt[0]) lol = true;
        if (t[0] === t[1] && t[0] === t[2]) lol = true;
        if (tt[0] === tt[1] && tt[0] === tt[2]) lol = true;
        if (ttt[0] === ttt[1] && ttt[0] === ttt[2]) lol = true;
        if (t[0] === ttt[1] && t[0] === ttt[2]) lol = true;
        if (lol) {
          const deduff = Math.floor(Math.random() * 5000);
          const give2 = await eco.give(message.sender, "mxgamecoder", deduff * 2);
          let st = `🎰 Slot Machine Result\n     ${i}\n\n     ${j}\n\n     ${k}\n\nWow Jackpot🎊.`;
          let str = st
            .replace(/1/g, `🔴`)
            .replace(/2/g, `🔵`)
            .replace(/3/g, `🟣`)
            .replace(/4/g, `🟢`)
            .replace(/5/g, `🟡`)
            .replace(/6/g, `⚪️`)
            .replace(/7/g, `⚫️`)
            .replace(/:/g, `  `);

          return await message.reply(`You got ${deduff * 10} in your wallet.`);
          // return await Aviator.bot.sendButtonText(message.chat,str+`You got ${deduff*10} in your wallet.`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);
        } else {
          const deduff = Math.floor(Math.random() * 300);
          const deduct1 = await eco.deduct(message.sender, "mxgamecoder", deduff);
          let st = `\n🎰 Slot Machine Result\n     ${i}\n\n      ${j}\n\n      ${k}\n\nNot Jacpot📉 but lost `;
          let str = st
            .replace(/1/g, `🔴`)
            .replace(/2/g, `🔵`)
            .replace(/3/g, `🟣`)
            .replace(/4/g, `🟢`)
            .replace(/5/g, `🟡`)
            .replace(/6/g, `⚪️`)
            .replace(/7/g, `⚫️`)
            .replace(/:/g, `    `);
          return await message.reply(str + ` ${deduff}.`);
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: slot`, e);
      }
    }
  );

  smd(
    {
      pattern: "withdraw",
      desc: "withdraw money from bank account.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply(
            "🚦 *Pathetic!* Economy is *NOT* active in this trash group. 💀"
          );
        const user = message.sender;
        if (!match)
          return message.reply(
            "💰 *You broke clown!* At least type the amount you're trying to withdraw. 🤡"
          );
        const query = match.trim();
        const withdraw = await eco.withdraw(user, "mxgamecoder", query);
        if (withdraw.noten)
          return message.reply(
            "🏧 *LMAO!* You don’t even have enough money in your bank. 😂 Go earn some first, broke boy!"
          ); // if user states more than what's in his wallet
        const add = eco.give(user, "mxgamecoder", query);
        message.reply(
          `🏧 *Transaction Complete...* \n_🪙 ${withdraw.amount} has been withdrawn. Now don’t go wasting it like an idiot! 🤨_`
        );
      } catch (e) {
        message.error(`${e}\n\ncommand: withdraw`, e);
      }
    }
  );
  
  //---------------------------------------------------------------------------
  
  smd(
    {
      pattern: "gamble",
      desc: "gamble money.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply(
            "🚦 *LOL!* Economy isn’t even active here. Go activate it before embarrassing yourself. 💀"
          );
        const user = message.sender;
        var texts = match.split(" ");
        var opp = texts[1]; // your value
        var value = texts[0].toLowerCase();
        var gg = parseInt(value);
        const balance = await eco.balance(user, "mxgamecoder");
        const g = balance.wallet > parseInt(value);
        const k = 50;
        const a = k > parseInt(value);
        const twice = gg * 2;
        let media;
        switch (opp) {
          case "left":
            media =
              "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/leftr.webp?raw=true";
            break;
          case "right":
            media =
              "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/rightr.webp?raw=true";
            break;
          case "up":
            media =
              "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/upr.webp?raw=true";
            break;
          case "down":
            media =
              "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/downr.webp?raw=true";
            break;
          default:
            return message.reply(
              `🤡 *Bro, learn to type!* Provide a direction (left, right, up, down). Example: gamble 200 left`
            );
        }
  
        message.reply(
          media,
          { packname: "Vortex Rebirth", author: "Toxic Economy 💀" },
          "sticker"
        );
  
        const directions = ["up", "right", "left", "down"];
        const randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
  
        if (!match)
          return message.reply(
            `🎲 *Dumb move!* Type it correctly: gamble <amount> <direction>.`
          );
        if (!value)
          return message.reply("🎰 *Put your money up first, clown!* 🤡");
        if (!opp)
          return message.reply("🎯 *Pick a direction before wasting my time!*");
        if (!gg)
          return message.reply(
            "📉 *What the hell are you typing?* Use numbers, not whatever nonsense that was. 🤦"
          );
        if (!g)
          return message.reply(
            `😂 *LOL!* You don’t even have enough money to gamble with. *Broke ass!*`
          );
        if (a)
          return message.reply(
            `💀 *Wow!* You can only gamble with more than 🪙50. Quit playing, little boy!`
          );
  
        if (randomDirection === opp) {
          await eco.give(user, "mxgamecoder", twice);
          return message.reply(
            `📈 *Damn! You actually won 🪙${twice}!* But don’t get too happy, it’s just luck. 🤨`
          );
        } else {
          await eco.deduct(user, "mxgamecoder", texts[0]);
          return message.reply(
            `📉 *HAHAHA! You lost 🪙${texts[0]}!* Maybe go cry about it? 😂`
          );
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: gamble`, e);
      }
    }
  );
  

  }