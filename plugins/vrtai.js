global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "false";
const {
  groupdb,
  userdb,
  bot_,
  smd,
  sendWelcome,
  Config,
  tlang,
  sleep,
  prefix,
} = require("../lib");
const axios = require("axios");
const astro_patch = require("../lib/plugins");

let warn = {};
warn.addwarn = async (_0x535f84, _0x1e53d3, _0x445500 = {}) => {
  try {
    let _0x285cd0 =
      (await userdb.findOne({
        id: _0x535f84,
      })) ||
      (await userdb.new({
        id: _0x535f84,
      }));
    let _0x84b1f8 = _0x285cd0.warn || {};
    if (!_0x84b1f8[_0x1e53d3]) {
      _0x84b1f8[_0x1e53d3] = [];
    }
    var _0x1a434e = {
      chat: "PRIVATE",
      reason: "Inapropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ..._0x445500,
    };
    _0x84b1f8[_0x1e53d3].push(_0x1a434e);
    _0x285cd0 = await userdb.updateOne(
      {
        id: _0x535f84,
      },
      {
        warn: _0x84b1f8,
      }
    );
    return {
      status: true,
      warning: _0x84b1f8[_0x1e53d3].length,
      user: _0x285cd0,
    };
  } catch (_0x5aeabd) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: _0x5aeabd,
    };
  }
};

smd(
    {
      pattern: "checkwarn",
      alias: ["listwarn", "chatwarn", "allwarn"],
      desc: "🔍 Check warnings of pathetic users.",
      category: "user",
      filename: __filename,
    },
    async (message, args) => {
      try {
        let response = "";
        let targetUser = message.sender;
  
        if (message.isCreator) {
          targetUser = message.reply_message
            ? message.reply_message.sender
            : message.mentionedJid[0]
            ? message.mentionedJid[0]
            : targetUser;
        }
  
        let userData =
          (await userdb.findOne({ id: targetUser })) ||
          (await userdb.new({ id: targetUser }));
  
        let warnings = userData.warn || false;
        let warningData = {};
  
        if (warnings && args === "all") {
          warnings = userData.warn;
        } else if (warnings && warnings[message.chat]) {
          warningData[message.chat] = [...warnings[message.chat]];
          warnings = warningData;
        } else {
          warnings = false;
        }
  
        let noWarnings = args === "all" ? true : !warnings[message.chat];
  
        if (!userData || !warnings || !noWarnings) {
          return await message.send(
            `❌ *Pathetic! No warnings found!*  
            🤡 _You're too soft to get warned... for now._`
          );
        }
  
        console.log("All Warnings:", warnings);
  
        for (const warnUser in warnings) {
          let userWarnings = warnings[warnUser];
  
          response += `
  ╭━━━━━━━🔥 W⚠️RNING LIST 🔥━━━━━━━╮
  ┃ 🚨 *USER:* ${
            warnUser.includes("@")
              ? (await message.bot.getName(warnUser)) || warnUser
              : warnUser
          }
  ┃ 💀 *TOTAL WARNINGS:* ${warnings[warnUser].length}
  ┝━━━━━━━━━━━━━━━━━━━━━┥`;
  
          for (let i = 0; i < userWarnings.length; i++) {
            response += `
  ┃ ⚠️ *WARNING ${i + 1}*  
  ┃ 📅 *DATE:* ${userWarnings[i].date}  
  ${
    userWarnings[i].reason
      ? `┃ 🔥 *REASON:* ${userWarnings[i].reason}`
      : "┃ 🔥 *REASON:* Not Provided"
  }
  ┃ 🧑‍⚖️ *WARNED BY:* ${userWarnings[i].warnedby}  
  ┃ 💬 *CHAT:* ${userWarnings[i].chat}  
  ┝━━━━━━━━━━━━━━━━━━━━━┥`;
          }
          response += "\n╰━━━━━━━━━━━━━━━━━━━━━╯\n";
        }
  
        await message.reply(
          response
            ? `${response}\n⚡ *POWERED BY VORTEX REBIRTH* ⚡`
            : "❌ *No warnings found!*"
        );
      } catch (error) {
        await message.error(
          `💀 *Something broke... probably you.*  
          ❌ _Error: ${error}_`,
          error
        );
      }
    }
  );
  
  smd(
    {
      pattern: "warn",
      fromMe: true,
      desc: "🔥 Warn a pathetic user!",
      category: "user",
      filename: __filename,
      use: " < USER >",
    },
    async (message, reason) => {
      try {
        let targetUser = message.reply_message
          ? message.reply_message.sender
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : false;
  
        if (!targetUser) {
          return await message.send(
            "⚠️ *You dumb?* Reply to a user to warn them! 🤡"
          );
        }
  
        let userData =
          (await userdb.findOne({ id: targetUser })) ||
          (await userdb.new({ id: targetUser }));
  
        let warnings = userData.warn || {};
        if (!warnings[message.chat]) {
          warnings[message.chat] = [];
        }
  
        let warningDetails = {
          chat: message.isGroup
            ? message.metadata?.subject || "GROUP"
            : "PRIVATE CHAT",
          reason: reason || "No reason given. Probably just annoying. 😒",
          date: message.date,
          warnedby: message.senderName,
        };
  
        warnings[message.chat].push(warningDetails);
  
        await userdb.updateOne(
          { id: targetUser },
          { warn: warnings }
        );
  
        let maxWarnings = parseInt(global.warncount) || 3;
  
        if (warnings[message.chat].length > maxWarnings && !message.checkBot(targetUser)) {
          if (message.isGroup) {
            if (message.isBotAdmin) {
              await message.send(
                `🚨 *@${targetUser.split("@")[0]}, you're getting KICKED!*  
                💀 _Your warning limit is OVER! GET LOST!_`,
                { mentions: [targetUser] }
              );
              await message.bot.groupParticipantsUpdate(
                message.chat,
                [targetUser],
                "remove"
              );
            } else {
              return await message.send(
                `⚠️ *@${targetUser.split("@")[0]}, You're lucky I can't kick you!*  
                🤡 _Your warn limit is OVER. Behave, fool._`,
                { mentions: [targetUser] }
              );
            }
          } else {
            await message.send(
              `🚫 *@${targetUser.split("@")[0]}, you're getting BLOCKED!*  
              🔥 _You were warned too many times. Bye, loser._`,
              { mentions: [targetUser] }
            );
            await message.bot.updateBlockStatus(targetUser, "block");
          }
        } else {
          return await message.send(
            `⚠️ *@${targetUser.split("@")[0]}, you just got WARNED!*  
            💀 _Keep acting up, and you’ll regret it._`,
            { mentions: [targetUser] }
          );
        }
      } catch (error) {
        await message.error(
          `💀 *Something broke... probably you.*  
          ❌ _Error: ${error}_`,
          error,
          false
        );
      }
    }
  );

  smd(
    {
      pattern: "resetwarn",
      desc: "🔥 Reset a user's warnings!",
      category: "user",
      filename: __filename,
      use: " < USER >",
    },
    async (message, args) => {
      try {
        if (!message.isCreator && !message.isAdmin) {
          return await message.reply(
            "⚠️ *Who do you think you are?* This command is for admins, fool!"
          );
        }
  
        let targetUser = message.reply_message
          ? message.reply_message.sender
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : false;
  
        if (!targetUser) {
          return await message.send(
            "⚠️ *Use your brain!* Reply to a user to reset their warnings! 🤡"
          );
        }
  
        let userData =
          (await userdb.findOne({ id: targetUser })) ||
          (await userdb.new({ id: targetUser })) ||
          {};
  
        let warnings = userData.warn || {};
  
        if (message.isCreator && args.toLowerCase() === "all" && warnings) {
          warnings = {};
        } else {
          if (!userData || !warnings || !warnings[message.chat]) {
            return await message.send(
              `💀 *@${targetUser.split("@")[0]} has no warnings... yet.*  
              _Better hope I don’t change that._`
            );
          }
          delete warnings[message.chat];
        }
  
        await userdb.updateOne(
          { id: targetUser },
          { warn: warnings }
        );
  
        await message.reply(
          `✅ *@${targetUser.split("@")[0]} is free... for now.*  
          _All warnings have been wiped out._  
          ⚡ *POWERED BY VORTEX REBIRTH* ⚡`
        );
      } catch (error) {
        await message.error(
          `💀 *Something broke... probably you.*  
          ❌ _Error: ${error}_`,
          error
        );
      }
    }
  );
  
  smd(
    {
      pattern: "act",
      alias: ["activate", "active"],
      desc: "🔥 Enables various group features.",
      category: "moderation",
      filename: __filename,
    },
    async (message, args) => {
      try {
        if (!message.isGroup) {
          return message.reply("💀 *This ain't a group, genius.*");
        }
  
        const botNumber = message.botNumber;
        const isAdmin = message.isAdmin;
        let command = args?.split(" ")[0].toLowerCase()?.trim() || false;
  
        if (!isAdmin && !message.isCreator) {
          return message.reply("⚠️ *Nah, you're not an admin. Stay in your lane!*");
        }
  
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat })) ||
          false;
  
        if (!groupData) {
          return await message.reply("⚠️ *Where's this group in my database? Nowhere!*");
        }
  
        switch (command) {
          case "antilink":
            {
              if (groupData.antilink !== "false") {
                return await message.reply("⚠️ *Antilink is already on, Einstein.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { antilink: "warn" }
              );
              await message.reply("✅ *Antilink activated. Try posting a link, I dare you.*");
            }
            break;
          case "economy":
            {
              if (groupData.economy == "true") {
                return await message.reply("⚠️ *Economy mode is already enabled, duh.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { economy: "true" }
              );
              await message.reply("✅ *Economy activated. Get rich or get lost.*");
            }
            break;
          case "events":
          case "event":
            {
              await groupdb.updateOne(
                { id: message.chat },
                { welcome: "true", goodbye: "true" }
              );
              return await message.reply("✅ *Events enabled. More chaos incoming.*");
            }
            break;
          case "nsfw":
            {
              if (groupData.nsfw == "true") {
                return await message.reply("⚠️ *NSFW is already on, you perv.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { nsfw: "true" }
              );
              await message.reply("✅ *NSFW mode is live. Keep it wild.*");
            }
            break;
          case "bot":
            {
              if (groupData.botenable == "true") {
                return await message.reply("⚠️ *Bot mode is already running. Try again, clown.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { botenable: "true" }
              );
              await message.reply("✅ *Bot is now active. Bow before me.*");
            }
            break;
          default: {
            message.reply(
              `⚠️ *You can't even type a proper command?*  
              _Try:_  
              1️⃣ *act events*  
              2️⃣ *act antilink*  
              3️⃣ *act economy*  
              4️⃣ *act bot*  
              💀 *Figure it out, human.*`
            );
          }
        }
      } catch (error) {
        await message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );

  smd(
    {
      pattern: "deact",
      alias: ["deactive", "deactivate"],
      desc: "🔥 Disables various group features.",
      category: "moderation",
      filename: __filename,
    },
    async (message, args) => {
      try {
        if (!message.isGroup) {
          return message.reply("💀 *This ain't a group, genius.*");
        }
  
        const botNumber = message.botNumber;
        const isAdmin = message.isAdmin;
        let command = args?.split(" ")[0].toLowerCase()?.trim() || false;
  
        if (!command) {
          return message.reply(
            `⚠️ *Can't even type properly? Try:*  
            1️⃣ *deact events*  
            2️⃣ *deact antilink*  
            3️⃣ *deact economy*  
            4️⃣ *deact bot*  
            💀 *Figure it out, human.*`
          );
        }
  
        if (!isAdmin && !message.isCreator) {
          return message.reply("⚠️ *Nah, you're not an admin. Stay in your lane!*");
        }
  
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat })) ||
          false;
  
        if (!groupData) {
          return await message.reply("⚠️ *Your request failed. Not my problem.*");
        }
  
        switch (command) {
          case "antilink":
            {
              if (groupData.antilink == "false") {
                return message.reply("⚠️ *Antilink is already off, clown.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { antilink: "false" }
              );
              message.reply("✅ *Antilink disabled. Now go spam links, see what happens.*");
            }
            break;
          case "economy":
            {
              if (groupData.economy == "false") {
                return message.reply("⚠️ *Economy mode was already dead.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { economy: "false" }
              );
              message.reply("✅ *Economy mode disabled. Now stay broke.*");
            }
            break;
          case "events":
          case "event":
            {
              if (groupData.events == "false") {
                return message.reply("⚠️ *Events were already dead, just like your sense of humor.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { welcome: "false", goodbye: "false" }
              );
              message.reply("✅ *Events disabled. No more dramatic goodbyes for losers.*");
            }
            break;
          case "nsfw":
            {
              if (groupData.nsfw == "false") {
                return message.reply("⚠️ *NSFW was already off. Control yourself.*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { nsfw: "false" }
              );
              message.reply("✅ *NSFW disabled. Now act civilized... if you can.*");
            }
            break;
          case "bot":
            {
              if (groupData.botenable == "false") {
                return message.reply("⚠️ *Bot mode was already off. You blind?*");
              }
              await groupdb.updateOne(
                { id: message.chat },
                { botenable: "false" }
              );
              message.reply("✅ *Bot disabled. Now suffer in silence.*");
            }
            break;
          default: {
            message.reply(
              `⚠️ *Try again, if your brain works:*  
              1️⃣ *deact events*  
              2️⃣ *deact antilink*  
              3️⃣ *deact economy*  
              4️⃣ *deact bot*  
              💀 *Don't make me repeat myself.*`
            );
          }
        }
      } catch (error) {
        await message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );
  smd(
    {
      pattern: "bot",
      desc: "🔥 Enables or disables the bot. Use buttons to toggle.",
      fromMe: true,
      category: "misc",
      filename: __filename,
    },
    async (message, args) => {
      try {
        let input = args ? args.toLowerCase().trim() : false;
        let command = input ? input.split(" ")[0] : false;
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat }));
  
        if (!command) {
          await message.send(
            `💀 *Bot is currently* ${
              groupData.botenable === "false" ? "❌ Disabled" : "✅ Enabled"
            } *in this chat.*  
            ⚙️ _Use:_ *bot on/off*`
          );
        } else if (
          command.startsWith("off") ||
          command.startsWith("deact") ||
          command.startsWith("disable")
        ) {
          if (groupData.botenable === "false") {
            await message.send("⚠️ *Bot was already off, genius.*");
          } else {
            await groupdb.updateOne(
              { id: message.chat },
              { botenable: "false" }
            );
            await message.send("💀 *Bot Disabled. Now you're on your own.*");
          }
        } else if (
          command.startsWith("on") ||
          command.startsWith("act") ||
          command.startsWith("enable")
        ) {
          if (groupData.botenable === "true") {
            await message.send("⚠️ *Bot was already active, fool.*");
          } else {
            await groupdb.updateOne(
              { id: message.chat },
              { botenable: "true" }
            );
            await message.send("✅ *Bot Enabled. Try not to break it.*");
          }
        } else {
          await message.send(
            `⚠️ *Are you confused? Use:*  
            ✅ _bot on_ → *Enable bot*  
            ❌ _bot off_ → *Disable bot*`
          );
        }
      } catch (error) {
        message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );

  smd(
    {
      pattern: "antitag",
      desc: "🔥 Detects @all mentions in group and kicks the spammer.",
      fromMe: true,
      category: "misc",
      filename: __filename,
    },
    async (message, args) => {
      try {
        let input = args ? args.toLowerCase().trim() : false;
        let command = input ? input.split(" ")[0] : false;
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat }));
  
        if (!command) {
          await message.send(
            `💀 *Anti-Tag is currently* ${
              groupData.antitag === "false" ? "❌ Disabled" : "✅ Enabled"
            } *in this chat.*  
            ⚙️ _Use:_ *antitag on/off*`
          );
        } else if (
          command.startsWith("off") ||
          command.startsWith("deact") ||
          command.startsWith("disable")
        ) {
          if (groupData.antitag === "false") {
            await message.send("⚠️ *Anti-Tag was already off, dumbass.*");
          } else {
            await groupdb.updateOne(
              { id: message.chat },
              { antitag: "false" }
            );
            await message.send("💀 *Anti-Tag Disabled. Now enjoy the spam.*");
          }
        } else if (
          command.startsWith("on") ||
          command.startsWith("act") ||
          command.startsWith("enable")
        ) {
          if (groupData.antitag === "true") {
            await message.send("⚠️ *Anti-Tag is already active, idiot.*");
          } else {
            await groupdb.updateOne(
              { id: message.chat },
              { antitag: "true" }
            );
            await message.send(
              `✅ *Anti-Tag Enabled. Any fool who tags @all gets booted.*`
            );
          }
        } else {
          await message.send(
            `⚠️ *Are you dense? Use:*  
            ✅ _antitag on_ → *Enable Anti-Tag*  
            ❌ _antitag off_ → *Disable Anti-Tag*`
          );
        }
      } catch (error) {
        message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );

  smd(
    {
      pattern: "antilink",
      desc: "🔥 Activates and deactivates antilink.\nUse buttons to toggle.",
      category: "group",
      filename: __filename,
    },
    async (message, args, { smd: command }) => {
      try {
        if (!message.isGroup) {
          return message.reply(tlang().group);
        }
        if (!message.isAdmin && !message.isCreator) {
          return message.reply(tlang().admin);
        }
  
        let input = args ? args.toLowerCase().trim() : false;
        let mode = input ? input.split(" ")[0] : false;
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat }));
  
        if (!mode) {
          return await message.send(
            `💀 *Anti-Link is currently* ${
              groupData.antilink === "false" ? "❌ Disabled" : "✅ Enabled"
            } *in this chat.*  
            ⚙️ _Current Mode:_ *${
              groupData.antilink === "false" ? "None" : groupData.antilink
            }*  
  
            🔥 *Available Modes:*  
            - 🚷 *${prefix + command} kick* → Deletes links & Kicks sender  
            - ❌ *${prefix + command} delete* → Deletes links only  
            - ⚠️ *${prefix + command} warn* → Warns & Deletes links  
            - ❌ *${prefix + command} off* → Disables Anti-Link`
          );
        } else if (
          mode.startsWith("off") ||
          mode.startsWith("disable") ||
          mode.startsWith("deact")
        ) {
          if (groupData.antilink === "false") {
            return await message.send("⚠️ *Anti-Link is already disabled, fool.*");
          }
          await groupdb.updateOne({ id: message.chat }, { antilink: "false" });
          return await message.send("💀 *Anti-Link Disabled. Enjoy the spam.*");
        } else if (mode.startsWith("kick")) {
          if (groupData.antilink === "kick") {
            return await message.send("⚠️ *Anti-Link is already set to kick, dumbass.*");
          }
          await groupdb.updateOne({ id: message.chat }, { antilink: "kick" });
          return await message.send("🔥 *Anti-Link set to KICK spammers. No mercy!*");
        } else if (mode.startsWith("delete")) {
          if (groupData.antilink === "delete") {
            return await message.send("⚠️ *Anti-Link is already set to delete, genius.*");
          }
          await groupdb.updateOne({ id: message.chat }, { antilink: "delete" });
          return await message.send("🗑 *Anti-Link now deletes all links like trash.*");
        } else if (mode.startsWith("warn")) {
          if (groupData.antilink === "warn") {
            return await message.send("⚠️ *Anti-Link is already set to warn, clown.*");
          }
          await groupdb.updateOne({ id: message.chat }, { antilink: "warn" });
          return await message.send("⚠️ *Anti-Link set to WARN & DELETE spammers.*");
        } else {
          return await message.send(
            `⚠️ *You can't even type properly? Use:*  
            - 🚷 *${prefix}antilink kick*  
            - ❌ *${prefix}antilink delete*  
            - ⚠️ *${prefix}antilink warn*  
            - ❌ *${prefix}antilink off*`
          );
        }
      } catch (error) {
        message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );
  
  smd(
    {
      pattern: "welcome",
      alias: ["setwelcome"],
      desc: "🔥 Sets a custom welcome message for your group.",
      category: "group",
      filename: __filename,
    },
    async (message, args) => {
      try {
        if (!message.isGroup) {
          return message.reply(tlang().group);
        }
        if (!message.isAdmin && !message.isCreator) {
          return message.reply(tlang().admin);
        }
  
        let input = args ? args.toLowerCase().trim() : "";
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat }));
  
        if (input === "on" || input === "enable" || input === "act") {
          if (groupData.welcome === "true") {
            return await message.send("⚠️ *Welcome is already enabled, genius.*");
          }
          await groupdb.updateOne({ id: message.chat }, { welcome: "true" });
          return await message.send("🔥 *Welcome messages are now active!*");
        }
  
        if (input === "off" || input === "disable" || input === "deact") {
          if (groupData.welcome === "false") {
            return await message.send("⚠️ *Welcome messages are already off, fool.*");
          }
          await groupdb.updateOne({ id: message.chat }, { welcome: "false" });
          return await message.send("❌ *Welcome messages disabled. No more friendly greetings!*");
        }
  
        if (input === "get" || !args) {
          return await message.reply(
            `💀 *Current Welcome Message:*  
            "${groupData.welcometext || "No welcome message set yet, lazy admin."}"`
          );
        }
  
        await groupdb.updateOne(
          { id: message.chat },
          { welcometext: args, welcome: "true" }
        );
  
        await sendWelcome(message, args);
      } catch (error) {
        message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );
  smd(
    {
      pattern: "goodbye",
      alias: ["setgoodbye", "setbye"],
      desc: "🔥 Sets a custom goodbye message for your group.",
      category: "group",
      filename: __filename,
    },
    async (message, args) => {
      try {
        if (!message.isGroup) {
          return message.reply(tlang().group);
        }
        if (!message.isAdmin && !message.isCreator) {
          return message.reply(tlang().admin);
        }
  
        let input = args ? args.toLowerCase().trim() : "";
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat }));
  
        if (input === "on" || input === "enable" || input === "act") {
          if (groupData.goodbye === "true") {
            return await message.send("⚠️ *Goodbye messages are already on, genius.*");
          }
          await groupdb.updateOne({ id: message.chat }, { goodbye: "true" });
          return await message.send("🔥 *Goodbye messages activated!*");
        }
  
        if (input === "off" || input === "disable" || input === "deact") {
          if (groupData.goodbye === "false") {
            return await message.send("⚠️ *Goodbye messages are already off, fool.*");
          }
          await groupdb.updateOne({ id: message.chat }, { goodbye: "false" });
          return await message.send("❌ *Goodbye messages disabled. No one cares when people leave!*");
        }
  
        if (input === "get" || !args) {
          return await message.reply(
            `💀 *Current Goodbye Message:*  
            "${groupData.goodbyetext || "No goodbye message set yet. Lazy admin strikes again!"}"`
          );
        }
  
        await groupdb.updateOne(
          { id: message.chat },
          { goodbyetext: args, goodbye: "true" }
        );
  
        await sendWelcome(message, args);
      } catch (error) {
        message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );

  
  smd(
    {
      pattern: "onlyadmin",
      alias: ["antimessage"],
      desc: "🔥 Toggles onlyadmin mode in the group.",
      category: "group",
      filename: __filename,
    },
    async (message, args, { cmdName }) => {
      try {
        if (!message.isGroup) {
          return message.reply(tlang().group);
        }
        if (!message.isAdmin && !message.isCreator) {
          return message.reply(tlang().admin);
        }
  
        let groupData =
          (await groupdb.findOne({ id: message.chat })) ||
          (await groupdb.new({ id: message.chat }));
  
        let input = args ? args.toLowerCase().trim() : "";
        let action = input ? input.split(" ")[0] : "";
  
        if (!action) {
          return await message.send(
            `💀 *${cmdName} is currently ${
              groupData.onlyadmin === "false" ? "DISABLED" : "ENABLED"
            } in this group.*\n🛠️ *Use 'on' or 'off' to toggle it.*`
          );
        }
  
        if (["off", "deact", "disable"].includes(action)) {
          if (groupData.onlyadmin === "false") {
            return await message.reply("⚠️ *Onlyadmin mode is already OFF. Stop wasting my time!*");
          }
          await groupdb.updateOne({ id: message.chat }, { onlyadmin: "false" });
          await message.bot.groupSettingUpdate(message.chat, "not_announcement");
          return await message.send(
            `❌ *${cmdName} mode disabled!*  
            🤡 *Now even the peasants can send messages.*`
          );
        }
  
        if (["on", "act", "enable"].includes(action)) {
          if (groupData.onlyadmin === "true") {
            return await message.reply("⚠️ *Onlyadmin mode is already ON, genius.*");
          }
          if (message.isBotAdmin) {
            await groupdb.updateOne({ id: message.chat }, { onlyadmin: "true" });
            await message.bot.groupSettingUpdate(message.chat, "announcement");
            return await message.send(
              `🔥 *${cmdName} mode enabled!*  
              🛑 *Only admins can send messages now. Stay silent, peasants!*`
            );
          } else {
            return await message.reply("😡 *Bruh, make me admin first before trying this.*");
          }
        }
  
        return await message.reply("⚠️ *Invalid input!* Use 'on' or 'off' to toggle.");
      } catch (error) {
        message.error(`💀 *Error: ${error}*`, error);
      }
    }
  );
  
  smd(
    {
      pattern: "antibot",
      desc: "Kick bot users from the group! 🚫🤖",
      category: "group",
      filename: __filename,
    },
    async (_0x3b3e26, _0x12cbbf, { cmdName: _0x12486d }) => {
      try {
        if (!_0x3b3e26.isGroup) {
          return _0x3b3e26.reply("❌ This command only works in groups, genius!");
        }
        if (!_0x3b3e26.isAdmin && !_0x3b3e26.isCreator) {
          return _0x3b3e26.reply("😒 You ain't an admin, so sit down.");
        }
  
        let _0x397293 =
          (await groupdb.findOne({ id: _0x3b3e26.chat })) ||
          (await groupdb.new({ id: _0x3b3e26.chat }));
  
        let _0x22e1dc = _0x12cbbf ? _0x12cbbf.toLowerCase().trim() : "";
        let _0x11994b =
          _0x22e1dc.startsWith("on") || _0x22e1dc.startsWith("act") ||
          _0x22e1dc.startsWith("enable") || _0x22e1dc.startsWith("del") ||
          _0x22e1dc.startsWith("warn") ? "warn" :
          _0x22e1dc.startsWith("kic") ? "kick" :
          _0x22e1dc.startsWith("off") || _0x22e1dc.startsWith("reset") ||
          _0x22e1dc.startsWith("deact") || _0x22e1dc.startsWith("disable") ? "false" : "";
  
        if (!_0x11994b) {
          return await _0x3b3e26.send(
            `👀 Antibot is currently *${
              _0x397293.antibot === "false" ? "Disabled ❌" : "Enabled ✅"
            }* in this group!\n\n💡 *Use:* warn/kick/off to enable or disable Antibot.`
          );
        } else if (_0x11994b === "false") {
          if (_0x397293.antibot === "false") {
            return await _0x3b3e26.reply("🤦‍♂️ Antibot is already disabled! Try using your brain.");
          }
          await groupdb.updateOne({ id: _0x3b3e26.chat }, { antibot: "false" });
          return await _0x3b3e26.send("✅ Antibot successfully disabled in this group.");
        } else if (_0x11994b === "warn" || _0x11994b === "kick") {
          if (_0x397293.antibot === _0x11994b) {
            return await _0x3b3e26.reply(`💀 Antibot is already set to ${_0x11994b} bots!`);
          }
          if (!_0x3b3e26.isBotAdmin) {
            return await _0x3b3e26.reply("🚨 Give me admin first, then talk!");
          }
          await groupdb.updateOne({ id: _0x3b3e26.chat }, { antibot: _0x11994b });
          return await _0x3b3e26.send(`✅ Antibot set to ${_0x11994b} bot users!`);
        } else {
          return await _0x3b3e26.reply(
            "🤨 Invalid option!\n\n💡 *Use:* warn/kick/off to enable or disable Antibot."
          );
        }
      } catch (_0x304d4d) {
        _0x3b3e26.error(`⚠️ Error:\n${_0x304d4d}\n\nCommand: antibot`, _0x304d4d);
      }
    }
  );

  smd(
    {
      pattern: "disable",
      desc: "Disable commands in the group! 🚫⚙️",
      category: "group",
      filename: __filename,
    },
    async (_0x204bdc, _0x1c3634) => {
      try {
        if (!_0x204bdc.isGroup) {
          return _0x204bdc.reply("❌ This command is for groups only, dummy!");
        }
        if (!_0x204bdc.isAdmin && !_0x204bdc.isCreator) {
          return _0x204bdc.reply("😑 You ain't the boss here. Get lost.");
        }
  
        let _0x2cad27 =
          (await groupdb.findOne({ id: _0x204bdc.chat })) ||
          (await groupdb.new({ id: _0x204bdc.chat }));
  
        let _0x161561 = _0x1c3634 ? _0x1c3634.toLowerCase().trim() : false;
        let _0x3dd6b4 = _0x161561 ? _0x161561.split(" ")[0] : "";
  
        if (!_0x3dd6b4) {
          return await _0x204bdc.send(
            `❓ *Which command do you want to disable?*\n\n💡 Example: ${prefix}disable tag (to disable 'tag' command)`
          );
        } else if (
          _0x3dd6b4.startsWith("info") || _0x3dd6b4.startsWith("list") || _0x3dd6b4.startsWith("cmds")
        ) {
          return await _0x204bdc.send(
            _0x2cad27.disablecmds === "false"
              ? "😏 No commands are disabled in this group!"
              : `🚫 *Disabled Commands:*\n\`\`\`${_0x2cad27.disablecmds.replace("false,", "")}\`\`\``
          );
        } else if (_0x3dd6b4.startsWith("enable") || _0x3dd6b4.startsWith("disable") || _0x3dd6b4.startsWith("bot")) {
          return await _0x204bdc.reply("😂 Bruh, I ain't disabling myself.");
        } else if (_0x3dd6b4) {
          const _0x965649 =
            astro_patch.commands.find((_0x1b0024) => _0x1b0024.pattern === _0x3dd6b4) ||
            astro_patch.commands.find((_0x2fd6f8) => _0x2fd6f8.alias && _0x2fd6f8.alias.includes(_0x3dd6b4));
  
          if (_0x965649) {
            let _0xac463 = _0x965649.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let _0x27d7ad = new RegExp("\\b" + _0xac463 + "\\b");
  
            if (_0x27d7ad.test(_0x2cad27.disablecmds)) {
              return await _0x204bdc.send("🙄 That command is already disabled!");
            }
  
            var _0x41da99 = _0x2cad27.disablecmds + "," + _0x965649.pattern;
            await groupdb.updateOne({ id: _0x204bdc.chat }, { disablecmds: _0x41da99 });
  
            let _0x23b4d5 = _0x41da99.replace("false,", "");
            return await _0x204bdc.send(
              `✅ Command "${_0x3dd6b4}" has been disabled!${
                _0x23b4d5 === "" ? "" : `\n\n🚫 *Disabled Commands:*\n\`\`\`${_0x23b4d5}\`\`\``
              }`
            );
          } else {
            return await _0x204bdc.reply(`❌ '${_0x3dd6b4}' is not a bot command! Try again.`);
          }
        }
      } catch (_0x590dfb) {
        _0x204bdc.error(`⚠️ Error:\n${_0x590dfb}\n\nCommand: disable`, _0x590dfb);
      }
    }
  );
  
  smd(
    {
      pattern: "enable",
      desc: "Enable a command in the group, if your tiny brain can handle it.",
      category: "group",
      filename: __filename,
    },
    async (_0x212b0e, _0x412234) => {
      try {
        if (!_0x212b0e.isGroup) {
          return _0x212b0e.reply("*This ain't a group, dumbass. Use it in a group chat!*");
        }
        if (!_0x212b0e.isAdmin && !_0x212b0e.isCreator) {
          return _0x212b0e.reply("*You ain't an admin, so sit down and shut up.*");
        }
        let _0x2c9cd0 =
          (await groupdb.findOne({ id: _0x212b0e.chat })) ||
          (await groupdb.new({ id: _0x212b0e.chat }));
        let _0xa3fc1d = _0x412234 ? _0x412234.toLowerCase().trim() : false;
        let _0x439688 = _0xa3fc1d ? _0xa3fc1d.split(" ")[0] : "";
        let _0x40bb35 = _0x439688.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let _0x5c60c4 = new RegExp("\\b" + _0x40bb35 + "\\b");
  
        if (!_0x439688 || _0x439688 === "") {
          return await _0x212b0e.send(
            "*You forgot to type the disabled command name, genius.*\n*Example: " +
              prefix +
              "enable tag (if 'tag' is disabled) or enable all to fix your mess.*"
          );
        } else if (_0xa3fc1d.startsWith("all")) {
          await groupdb.updateOne({ id: _0x212b0e.chat }, { disablecmds: "false" });
          return await _0x212b0e.send("*_All disabled commands have been enabled. Try not to break things again._*");
        } else if (
          _0x5c60c4.test(_0x2c9cd0.disablecmds) &&
          _0x2c9cd0.disablecmds.includes(_0x439688)
        ) {
          let _0x51b1cd = _0x2c9cd0.disablecmds.replace(_0x5c60c4, "");
          await groupdb.updateOne({ id: _0x212b0e.chat }, { disablecmds: _0x51b1cd });
          return await _0x212b0e.send(
            '*_"' + _0x439688.replace(",", "") + '" has been removed from the disabled list. Try not to disable it again like an idiot._*'
          );
        } else {
          return await _0x212b0e.send(
            "*There’s no command disabled with the name *" + _0x439688.replace(",", "") + "*. Try again, brainlet.*"
          );
        }
      } catch (_0x25ceaf) {
        _0x212b0e.error(_0x25ceaf + "\n\nCommand: enable", _0x25ceaf);
      }
    }
  );
  
  smd(
    {
      pattern: "antifake",
      desc: "Detects promote/demote and alerts the group, assuming you know how to use it.",
      category: "group",
      filename: __filename,
    },
    async (_0x5a1eb8, _0x463e76) => {
      try {
        if (!_0x5a1eb8.isGroup) {
          return _0x5a1eb8.reply("*This is not a group, fool. Use it where it belongs.*");
        }
        if (!_0x5a1eb8.isAdmin && !_0x5a1eb8.isCreator) {
          return _0x5a1eb8.reply("*You ain't an admin. Stop pretending you have power.*");
        }
        let _0x49ac75 =
          (await groupdb.findOne({ id: _0x5a1eb8.chat })) ||
          (await groupdb.new({ id: _0x5a1eb8.chat }));
        let _0x1c6236 = _0x463e76 ? _0x463e76.toLowerCase().trim() : "";
  
        if (_0x1c6236.startsWith("off") || _0x1c6236.startsWith("deact") || _0x1c6236.startsWith("disable")) {
          if (_0x49ac75.antifake == "false") {
            return await _0x5a1eb8.send("*Anti-Fake is already off. Why are you so slow?*");
          }
          await groupdb.updateOne({ id: _0x5a1eb8.chat }, { antifake: "false" });
          return await _0x5a1eb8.send("*Anti-Fake has been disabled. Don’t come crying when spammers flood in.*");
        } else if (!_0x463e76) {
          return await _0x5a1eb8.send(
            "*Antifake is currently set to* " +
              (_0x49ac75.antifake === "false" ? "nothing" : '"' + _0x49ac75.antifake + '"') +
              ".\n*Provide a country code to update it. Maybe use your brain for once.*\nExample: _.antifake 92_"
          );
        }
  
        let _0x2f3d1b = _0x463e76
          ? _0x463e76
              .split(",")
              .map((_0x40173c) => parseInt(_0x40173c))
              .filter((_0x44d61c) => !isNaN(_0x44d61c))
              .join(",")
          : false;
  
        if (!_0x463e76 || !_0x2f3d1b) {
          return await _0x5a1eb8.send(
            "*You forgot the country code, genius.*\n*Only numbers can join this group. No exceptions.*\nExample: " +
              prefix +
              "antifake 92"
          );
        } else if (_0x2f3d1b) {
          await groupdb.updateOne({ id: _0x5a1eb8.chat }, { antifake: "" + _0x2f3d1b });
          return await _0x5a1eb8.send(
            '*Anti-Fake has been set to "' +
              _0x2f3d1b +
              "\"!*\nNow only numbers starting with " +
              _0x2f3d1b +
              " can join. Try not to mess this up."
          );
        } else {
          return await _0x5a1eb8.send(
            "*Invalid country code, moron.*\n*Only numbers can join this group. Don't make me repeat myself.*\nExample: " +
              prefix +
              "antifake 92"
          );
        }
      } catch (_0x53288b) {
        _0x5a1eb8.error(_0x53288b + "\n\nCommand: antifake", _0x53288b);
      }
    }
  );
  

  smd(
    {
      pattern: "antidemote",
      desc: "Detects Promote and Automatically demotes promoted person. 😈",
      category: "group",
      filename: __filename,
    },
    async (_0x3d214e, _0x55496f) => {
      try {
        if (!_0x3d214e.isGroup) {
          return _0x3d214e.reply("😤 This ain't a group, genius!");
        }
        if (!_0x3d214e.isAdmin && !_0x3d214e.isCreator) {
          return _0x3d214e.reply("🤣 Who do you think you are? Admins only!");
        }
        let _0x30a721 =
          (await groupdb.findOne({ id: _0x3d214e.chat })) ||
          (await groupdb.new({ id: _0x3d214e.chat }));
  
        let _0x210ede = _0x55496f ? _0x55496f.toLowerCase().trim() : "";
  
        if (
          _0x210ede.startsWith("on") ||
          _0x210ede.startsWith("act") ||
          _0x210ede.startsWith("enable")
        ) {
          if (_0x30a721.antidemote == "true") {
            return await _0x3d214e.send("😒 Anti-Demote is already on, dummy.");
          }
          await groupdb.updateOne(
            { id: _0x3d214e.chat },
            { antidemote: "true" }
          );
          return await _0x3d214e.send(
            "🔥 Anti-Demote activated! Try demoting someone now, I dare you. 🤡"
          );
        } else if (
          _0x210ede.startsWith("off") ||
          _0x210ede.startsWith("deact") ||
          _0x210ede.startsWith("disable")
        ) {
          if (_0x30a721.antidemote == "false") {
            return await _0x3d214e.send("😏 Anti-Demote is already off.");
          }
          await groupdb.updateOne(
            { id: _0x3d214e.chat },
            { antidemote: "false" }
          );
          return await _0x3d214e.send("👎 Anti-Demote disabled. Chaos incoming!");
        } else {
          return await _0x3d214e.reply(
            "😑 Seriously? Just say 'on' or 'off'. Not that hard."
          );
        }
      } catch (_0x3863b4) {
        _0x3d214e.error("💀 Error: " + _0x3863b4 + "\n\nCommand: antidemote");
      }
    }
  );
  
  smd(
    {
      pattern: "antipromote",
      desc: "Detects Promote and Automatically demotes promoted person. 🤬",
      category: "group",
      filename: __filename,
    },
    async (_0x3d1898, _0x4bf866) => {
      try {
        if (!_0x3d1898.isGroup) {
          return _0x3d1898.reply("🙄 This ain't a group, genius.");
        }
        if (!_0x3d1898.isAdmin && !_0x3d1898.isCreator) {
          return _0x3d1898.reply("😂 You ain't admin, sit down.");
        }
        let _0x599352 =
          (await groupdb.findOne({ id: _0x3d1898.chat })) ||
          (await groupdb.new({ id: _0x3d1898.chat }));
  
        let _0x41626b = _0x4bf866 ? _0x4bf866.toLowerCase().trim() : "";
  
        if (
          _0x41626b.startsWith("on") ||
          _0x41626b.startsWith("act") ||
          _0x41626b.startsWith("enable")
        ) {
          if (_0x599352.antipromote == "true") {
            return await _0x3d1898.send("🤡 Anti-Promote is already active.");
          }
          await groupdb.updateOne(
            { id: _0x3d1898.chat },
            { antipromote: "true" }
          );
          return await _0x3d1898.send(
            "🔥 Anti-Promote enabled! Try promoting someone now, I dare you. 😈"
          );
        } else if (
          _0x41626b.startsWith("off") ||
          _0x41626b.startsWith("deact") ||
          _0x41626b.startsWith("disable")
        ) {
          if (_0x599352.antipromote == "false") {
            return await _0x3d1898.send("😏 Anti-Promote is already off.");
          }
          await groupdb.updateOne(
            { id: _0x3d1898.chat },
            { antipromote: "false" }
          );
          return await _0x3d1898.send("👎 Anti-Promote disabled. Good luck.");
        } else {
          return await _0x3d1898.reply(
            "😑 Stop wasting my time. Just say 'on' or 'off'."
          );
        }
      } catch (_0x424dfe) {
        _0x3d1898.error("💀 Error: " + _0x424dfe + "\n\nCommand: antipromote");
      }
    }
  );

  
  smd(
    {
      pattern: "pdm",
      desc: "🚀 Detect Promote/Demote Users And Send Alerts in Chat",
      category: "group",
      filename: __filename,
    },
    async (_0x47f7e9, _0x4bf96c) => {
      try {
        if (!_0x47f7e9.isGroup) {
          return _0x47f7e9.reply("❌ This command can only be used in groups!");
        }
        if (!_0x47f7e9.isAdmin && !_0x47f7e9.isCreator) {
          return _0x47f7e9.reply("🛑 Only admins can use this command!");
        }
        let _0x9e3626 =
          (await groupdb.findOne({ id: _0x47f7e9.chat })) ||
          (await groupdb.new({ id: _0x47f7e9.chat }));
  
        let _0x19e598 = _0x4bf96c ? _0x4bf96c.toLowerCase().trim() : "";
  
        if (
          _0x19e598.startsWith("on") ||
          _0x19e598.startsWith("act") ||
          _0x19e598.startsWith("enable")
        ) {
          if (_0x9e3626.pdm == "true") {
            return await _0x47f7e9.send("⚠️ Promote/Demote Alerts are already enabled!");
          }
          await groupdb.updateOne({ id: _0x47f7e9.chat }, { pdm: "true" });
          return await _0x47f7e9.send("✅ Promote/Demote Alerts have been enabled!");
        } else if (
          _0x19e598.startsWith("off") ||
          _0x19e598.startsWith("deact") ||
          _0x19e598.startsWith("disable")
        ) {
          if (_0x9e3626.pdm == "false") {
            return await _0x47f7e9.send("⚠️ Promote/Demote Alerts are already disabled!");
          }
          await groupdb.updateOne({ id: _0x47f7e9.chat }, { pdm: "false" });
          return await _0x47f7e9.send("🚫 Promote/Demote Alerts have been disabled!");
        } else {
          return await _0x47f7e9.reply(
            "🤔 Please use 'on' or 'off' to toggle alerts!\nExample: *!pdm on*"
          );
        }
      } catch (_0x2f089d) {
        _0x47f7e9.error("💥 Error: " + _0x2f089d + "\n\ncommand: pdm", _0x2f089d);
      }
    }
  );
  
  smd(
    {
      pattern: "amute",
      desc: "🔇 Sets auto mute time in the group.",
      category: "moderation",
    },
    async (_0x23aaae, _0xc0fcc0) => {
      try {
        if (!_0x23aaae.isGroup) {
          return _0x23aaae.reply("❌ This command can only be used in groups!");
        }
        if (!_0x23aaae.isAdmin && !_0x23aaae.isCreator) {
          return _0x23aaae.reply("🔐 Only admins can use this command!");
        }
        let _0x4e4f77 =
          (await groupdb.findOne({ id: _0x23aaae.chat })) ||
          (await groupdb.new({ id: _0x23aaae.chat }));
  
        if (!_0xc0fcc0) {
          return await _0x23aaae.reply(
            "🔇 Auto-Mute is currently *" +
              (_0x4e4f77.mute === "false" ? "disabled" : "enabled") +
              "* in this group." +
              (_0x4e4f77.mute !== "false"
                ? "\n⏰ Auto-mute time: " + _0x4e4f77.mute
                : "")
          );
        }
  
        let [_0x579533, _0x1c48cc] = _0xc0fcc0.split(":").map(Number);
        if (
          isNaN(_0x579533) ||
          isNaN(_0x1c48cc) ||
          _0x579533 < 0 ||
          _0x579533 >= 24 ||
          _0x1c48cc < 0 ||
          _0x1c48cc >= 60
        ) {
          return _0x23aaae.reply(
            "❌ Invalid time format! Use: *!amute HH:MM*\nExample: *!amute 22:00*"
          );
        }
  
        let _0x37c60f =
          _0x579533.toString().padStart(2, "0") +
          ":" +
          _0x1c48cc.toString().padStart(2, "0");
        await groupdb.updateOne({ id: _0x23aaae.chat }, { mute: _0x37c60f });
  
        return _0x23aaae.reply("✅ Auto-Mute is set for " + _0x37c60f);
      } catch (_0x47f0cd) {
        _0x23aaae.error("💥 Error: " + _0x47f0cd + "\n\ncommand: amute", _0x47f0cd);
      }
    }
  );

  smd(
    {
      pattern: "pdm",
      desc: "🚀 Detect Promote/Demote Users And Send Alerts in Chat",
      category: "group",
      filename: __filename,
    },
    async (_0x47f7e9, _0x4bf96c) => {
      try {
        if (!_0x47f7e9.isGroup) {
          return _0x47f7e9.reply("🤡 This ain't a group, genius! Try using your brain for once.");
        }
        if (!_0x47f7e9.isAdmin && !_0x47f7e9.isCreator) {
          return _0x47f7e9.reply("🚷 Who do you think you are? Only **real** admins can use this.");
        }
        let _0x9e3626 =
          (await groupdb.findOne({ id: _0x47f7e9.chat })) ||
          (await groupdb.new({ id: _0x47f7e9.chat }));
  
        let _0x19e598 = _0x4bf96c ? _0x4bf96c.toLowerCase().trim() : "";
  
        if (
          _0x19e598.startsWith("on") ||
          _0x19e598.startsWith("act") ||
          _0x19e598.startsWith("enable")
        ) {
          if (_0x9e3626.pdm == "true") {
            return await _0x47f7e9.send("⚠️ Are you blind? Promote/Demote Alerts are **already enabled!**");
          }
          await groupdb.updateOne({ id: _0x47f7e9.chat }, { pdm: "true" });
          return await _0x47f7e9.send("✅ Happy now? Promote/Demote Alerts have been enabled. Stop bothering me.");
        } else if (
          _0x19e598.startsWith("off") ||
          _0x19e598.startsWith("deact") ||
          _0x19e598.startsWith("disable")
        ) {
          if (_0x9e3626.pdm == "false") {
            return await _0x47f7e9.send("⚠️ Use your eyes. Promote/Demote Alerts are already **disabled**! 🙄");
          }
          await groupdb.updateOne({ id: _0x47f7e9.chat }, { pdm: "false" });
          return await _0x47f7e9.send("🚫 There, it's disabled. Now go cry somewhere else. 🥱");
        } else {
          return await _0x47f7e9.reply(
            "🤦 Can't follow simple instructions? Try **'on'** or **'off'**, Einstein.\nExample: *!pdm on*"
          );
        }
      } catch (_0x2f089d) {
        _0x47f7e9.error("💀 Whoops! Looks like your weak command crashed.\n💥 Error: " + _0x2f089d, _0x2f089d);
      }
    }
  );
  
  smd(
    {
      pattern: "amute",
      desc: "🔇 Sets auto mute time in the group.",
      category: "moderation",
    },
    async (_0x23aaae, _0xc0fcc0) => {
      try {
        if (!_0x23aaae.isGroup) {
          return _0x23aaae.reply("🤡 Group command only! Or did you miss **Reading 101**?");
        }
        if (!_0x23aaae.isAdmin && !_0x23aaae.isCreator) {
          return _0x23aaae.reply("🛑 Not an admin? Then don't waste my time.");
        }
        let _0x4e4f77 =
          (await groupdb.findOne({ id: _0x23aaae.chat })) ||
          (await groupdb.new({ id: _0x23aaae.chat }));
  
        if (!_0xc0fcc0) {
          return await _0x23aaae.reply(
            "🔇 Auto-Mute is **" +
              (_0x4e4f77.mute === "false" ? "disabled" : "enabled") +
              "** in this group." +
              (_0x4e4f77.mute !== "false"
                ? "\n⏰ Auto-mute time: " + _0x4e4f77.mute
                : "")
          );
        }
  
        let [_0x579533, _0x1c48cc] = _0xc0fcc0.split(":").map(Number);
        if (
          isNaN(_0x579533) ||
          isNaN(_0x1c48cc) ||
          _0x579533 < 0 ||
          _0x579533 >= 24 ||
          _0x1c48cc < 0 ||
          _0x1c48cc >= 60
        ) {
          return _0x23aaae.reply(
            "❌ You really don't know how to type a time? Try this format: *!amute HH:MM*\nExample: *!amute 22:00*"
          );
        }
  
        let _0x37c60f =
          _0x579533.toString().padStart(2, "0") +
          ":" +
          _0x1c48cc.toString().padStart(2, "0");
        await groupdb.updateOne({ id: _0x23aaae.chat }, { mute: _0x37c60f });
  
        return _0x23aaae.reply("✅ Auto-Mute is set for " + _0x37c60f + ". Don't mess it up.");
      } catch (_0x47f0cd) {
        _0x23aaae.error("💀 Yikes! You broke something.\n💥 Error: " + _0x47f0cd, _0x47f0cd);
      }
    }
  );
  
  async function haveEqualMembers(_0x31ae7e, _0x107896) {
    if (_0x31ae7e.length === 0 || _0x107896.length === 0) {
      return false;
    }
    const _0x5aee47 = _0x31ae7e.filter((_0x44f6e4) =>
      _0x107896.includes(_0x44f6e4)
    );
    const _0x3a93d0 = (_0x5aee47.length / _0x31ae7e.length) * 100;
    return _0x3a93d0 >= 76;
  }

  smd(
    {
      pattern: "dmute",
      desc: "Delete mute from group.",
      category: "moderation",
    },
    async (_0x10542a, _0x2cc451) => {
      try {
        if (!_0x10542a.isGroup) {
          return _0x10542a.reply("*Oi, this ain't a group! Stop wasting my time.* 😡");
        }
        if (!_0x10542a.isAdmin && !_0x10542a.isCreator) {
          return _0x10542a.reply("*Who do you think you are? You ain't an admin. Sit down. 🤡*");
        }
        let _0x529593 = await groupdb.findOne({
          id: _0x10542a.chat,
        });
        if (!_0x529593 || !_0x529593.mute || _0x529593.mute == "false") {
          return await _0x10542a.reply("*Ayo, there's no auto mute here! What are you even doing? 🤦‍♂️*");
        }
        await groupdb.updateOne(
          {
            id: _0x10542a.chat,
          },
          {
            mute: "false",
          }
        );
        return await _0x10542a.reply("*Auto mute deleted. Next time, think before you act. 🖕*");
      } catch (_0x137fa6) {
        _0x10542a.error("*Error? Of course, it's your fault! Stop messing around. 🖕*", _0x137fa6);
      }
    }
  );
  
  smd(
    {
      pattern: "antiword",
      desc: "Detects words from chat and deletes/warns senders.",
      category: "group",
      filename: __filename,
      use: "< action | words >",
    },
    async (_0x4626e9, _0x244587, { cmdName: _0xc43bcd }) => {
      try {
        if (!_0x4626e9.isGroup) {
          return _0x4626e9.reply("*This ain't a group, genius. Try again. 🤡*");
        }
        if (!_0x4626e9.isAdmin && !_0x4626e9.isCreator) {
          return _0x4626e9.reply("*You're not an admin. Don't even try it. 🚫*");
        }
        let _0x55ea26 =
          (await groupdb.findOne({
            id: _0x4626e9.chat,
          })) ||
          (await groupdb.new({
            id: _0x4626e9.chat,
            antiword: {
              status: "false",
              words: "",
            },
          }));
        let _0x14e9b0 = _0x244587 ? _0x244587.toLowerCase().trim() : false;
        let _0xe2e8cc = _0x55ea26.antiword;
        let _0x28cfe1 =
          "*Antiword is currently " +
          (_0xe2e8cc.status !== "false" ? "enabled" : "disabled") +
          "!!!* ```\n  STATUS: " +
          (_0xe2e8cc.status ? _0xe2e8cc.status : "--Empty Yet--") +
          " \n  WORDS: " +
          (_0xe2e8cc.words
            ? _0xe2e8cc.words.replace(/,/gi, " -- ")
            : "--Empty Yet--") +
          "```\n\n*Commands:* ```\n  " +
          (prefix + _0xc43bcd) +
          " off \n  " +
          (prefix + _0xc43bcd) +
          " reset\n  " +
          (prefix + _0xc43bcd) +
          " warn | bad,words\n  " +
          (prefix + _0xc43bcd) +
          " delete | hot,badas,etc\n``` \n\n\n " +
          Config.caption;
        if (!_0x14e9b0 || !_0x244587) {
          return await _0x4626e9.send(_0x28cfe1);
        }
        let _0x48cd39 = _0x14e9b0.split("|")[1] || "";
        let _0x431ae2 =
          _0x14e9b0.startsWith("on") ||
          _0x14e9b0.startsWith("act") ||
          _0x14e9b0.startsWith("enable") ||
          _0x14e9b0.startsWith("del")
            ? "delete"
            : _0x14e9b0.startsWith("warn")
            ? "warn"
            : _0x14e9b0.startsWith("off") ||
              _0x14e9b0.startsWith("deact") ||
              _0x14e9b0.startsWith("disable")
            ? "false"
            : _0x14e9b0.startsWith("reset")
            ? "reset"
            : "";
        _0x431ae2 =
          !_0x431ae2 && _0x48cd39 && _0xe2e8cc.status !== "false"
            ? _0xe2e8cc.status
            : _0x431ae2;
        if (_0x431ae2 === "reset") {
          await groupdb.updateOne(
            {
              id: _0x4626e9.chat,
            },
            {
              antiword: {},
            }
          );
          return await _0x4626e9.send("*Antiword wiped clean. Happy now? 🗑️*");
        } else if (_0x431ae2 === "delete" || _0x431ae2 === "warn") {
          if (_0xe2e8cc.status == _0x431ae2 && !_0x48cd39) {
            return await _0x4626e9.send(
              "*Provide words, dummy! Example: " +
                (prefix + _0xc43bcd) +
                " " +
                _0x431ae2 +
                " | bad,words*"
            );
          }
          _0x48cd39 = _0x48cd39 ? _0x48cd39 : _0xe2e8cc.words;
          await groupdb.updateOne(
            {
              id: _0x4626e9.chat,
            },
            {
              antiword: {
                status: _0x431ae2,
                words: _0x48cd39,
              },
            }
          );
          return await _0x4626e9.send(
            "*Antiword mode set to '" +
              _0x431ae2 +
              "'! No nonsense allowed!* \n*Words:```" +
              (_0x48cd39 ? _0x48cd39.replace(/,/gi, " | ") : "--Empty--") +
              "```*"
          );
        } else if (_0x431ae2 === "false") {
          if (_0xe2e8cc.status === _0x431ae2) {
            return await _0x4626e9.send("*Antiword is already disabled, fool. 🚫*");
          }
          await groupdb.updateOne(
            {
              id: _0x4626e9.chat,
            },
            {
              antiword: {
                status: "false",
                words: _0xe2e8cc.words,
              },
            }
          );
          return await _0x4626e9.send("*Antiword disabled. Keep it clean, peasants. 👀*");
        } else {
          return await _0x4626e9.reply(
            "*Bruh, follow instructions properly! 🤦‍♂️*\n\n" + _0x28cfe1
          );
        }
      } catch (_0x5738c4) {
        _0x4626e9.error("*Error? Yeah, sounds like your problem. 🤡*", _0x5738c4);
      }
    }
  );
  

  let bott = false;
let chatbotCount = 0;

smd(
    {
      on: "main",
    },
    async (
      _0x39f91d,
      _0x4baec9,
      {
        botNumber: _0x4ac038,
        isCreator: _0x184989,
        budy: _0x47409a,
        body: _0x66fc82,
        icmd: _0x250d65,
      }
    ) => {
      try {
        if (global.MsgsInLog === "true") {
          console.log(
            "" +
              (_0x39f91d.isGroup
                ? "[MESSAGE IN GROUP] From => " +
                  _0x39f91d.metadata.subject +
                  "\n[USER]:"
                : "[MESSAGE IN PRIVATE] From =>") +
              (" " +
                _0x39f91d.senderName +
                " " +
                _0x39f91d.senderNum +
                "\n[" +
                _0x39f91d.mtype.toUpperCase() +
                "]: " +
                _0x39f91d.body +
                "\n============== [SMD] =================")
          );
        }
        let _0x273393 =
          (await groupdb.findOne({
            id: _0x39f91d.chat,
          })) || false;
        let _0xea5278 = false;
        try {
          if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
            return;
          }
          if (
            _0x273393 &&
            _0x273393.antitag == "true" &&
            !_0x39f91d.checkBot() &&
            _0x39f91d.mtype !== "reactionMessage" &&
            _0x273393.botenable == "true"
          ) {
            const _0x50265a = await haveEqualMembers(
              _0x39f91d.metadata.participants.map((_0x406321) => _0x406321.id),
              _0x39f91d.mentionedJid
            );
            if (_0x50265a && _0x39f91d.isBotAdmin) {
              let _0x40ef27 = {
                reason: "tagging all members!",
                chat: _0x39f91d.metadata?.subject || "GROUP",
                warnedby: tlang().title,
                date: _0x39f91d.date,
              };
              _0xea5278 = await warn.addwarn(
                _0x39f91d.sender,
                _0x39f91d.chat,
                _0x40ef27
              );
              await _0x39f91d.reply(
                "*_[TAG DETECTED] Hey @" +
                  _0x39f91d.senderNum +
                  " warning!!_*\n*_Tagging all members is not allowed!_*",
                {
                  mentions: [_0x39f91d.sender],
                }
              );
              await _0x39f91d.delete();
            } else if (_0x50265a && !_0x39f91d.isBotAdmin) {
              await _0x39f91d.reply(
                "*_[TAGALL DETECTED] Can't do anything, without getting admin role!_*",
                {
                  mentions: [_0x39f91d.sender],
                }
              );
            }
          }
          if (
            _0x273393 &&
            _0x39f91d.isGroup &&
            !_0x39f91d.isAdmin &&
            !_0x184989 &&
            _0x39f91d.mtype !== "reactionMessage" &&
            _0x273393.botenable == "true"
          ) {
            if (
              _0x273393.antibot &&
              _0x273393.antibot !== "false" &&
              _0x39f91d.isBot &&
              !_0x39f91d.checkBot(_0x39f91d.sender)
            ) {
              if (_0x39f91d.isBotAdmin) {
                var _0x3c86e4 =
                  "*_Bot user not allowed, please make it private!_*";
                if (_0x273393.antibot === "warn") {
                  let _0x50d0d8 = {
                    reason: "Bots not allowed!",
                    chat: _0x39f91d.metadata?.subject || "GROUP",
                    date: _0x39f91d.date,
                  };
                  _0xea5278 = _0xea5278
                    ? _0xea5278
                    : await warn.addwarn(
                        _0x39f91d.sender,
                        _0x39f91d.chat,
                        _0x50d0d8
                      );
                  if (_0xea5278.status) {
                    _0x3c86e4 =
                      "*_Hey @" +
                      _0x39f91d.senderNum +
                      " warning, Due To Antibot!_*";
                  }
                } else if (_0x273393.antibot === "kick") {
                  try {
                    sleep(1000);
                    await _0x39f91d.bot.groupParticipantsUpdate(
                      _0x39f91d.chat,
                      [_0x39f91d.sender],
                      "remove"
                    );
                    _0x3c86e4 =
                      "*_User @" +
                      _0x39f91d.senderNum +
                      " kick Due To Antibot!_*";
                  } catch {}
                }
                await _0x39f91d.delete();
                await _0x39f91d.send(_0x3c86e4, {
                  mentions: [_0x39f91d.sender],
                });
              } else if (!_0x39f91d.isBotAdmin && _0x39f91d.isBot) {
                await _0x39f91d.reply(
                  "*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*"
                );
              }
            }
            if (
              _0x273393.onlyadmin &&
              _0x273393.onlyadmin === "true" &&
              SmdOfficial == "yes"
            ) {
              var _0x3c86e4 = "";
              if (_0x39f91d.isBotAdmin) {
                let _0x5c4aae = {
                  reason: "Only Admin can Chat!",
                  chat: _0x39f91d.metadata?.subject || "PRIVATE",
                  warnedby: tlang().title,
                  date: _0x39f91d.date,
                };
                _0xea5278 = _0xea5278
                  ? _0xea5278
                  : await warn.addwarn(
                      _0x39f91d.sender,
                      _0x39f91d.chat,
                      _0x5c4aae
                    );
                if (_0xea5278.status) {
                  _0x3c86e4 = "*Warns you for chat here!*\n";
                }
                await _0x39f91d.delete();
                sleep(1500);
                await _0x39f91d.send(
                  "*Hey @" +
                    _0x39f91d.senderNum +
                    "* " +
                    _0x3c86e4 +
                    "*Deleteing message,while onlyadmin activated!!* ",
                  {
                    mentions: [_0x39f91d.sender],
                  }
                );
              } else {
                await _0x39f91d.send(
                  "*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*"
                );
              }
            }
            if (
              _0x273393.antilink &&
              _0x273393.antilink !== "false" &&
              SmdOfficial === "yes"
            ) {
              const _0x37bc15 =
                Config.antilink_values && Config.antilink_values !== "all"
                  ? Config.antilink_values
                      .split(",")
                      .filter((_0x3da281) => _0x3da281.trim() !== "")
                  : ["https://", "chat.whatsapp.com", "fb.com"];
              let _0x5cbc1d = _0x66fc82.toLowerCase();
              if (_0x37bc15.some((_0x81b040) => _0x5cbc1d.includes(_0x81b040))) {
                if (!_0x39f91d.isBotAdmin) {
                  let _0x26aa7f =
                    " *[LINK DETECTED]*\nUser @" +
                    _0x39f91d.sender.split("@")[0] +
                    " detected sending a link.\nPromote " +
                    Config.botname +
                    " as admin to " +
                    (_0x273393.antilink === "kick"
                      ? "kick \nlink senders."
                      : "delete \nlinks from this Chat") +
                    " \n";
                  await _0x39f91d.send(_0x26aa7f, {
                    mentions: [_0x39f91d.sender],
                  });
                } else if (_0x273393.antilink === "delete") {
                  await _0x39f91d.send("*_Link Detected.. Deletion Done!_*");
                  await _0x39f91d.delete();
                } else if (
                  _0x273393.antilink === "warn" ||
                  _0x273393.antilink === "true"
                ) {
                  let _0x75abf8 = {
                    reason: "links not allowed!",
                    chat: _0x39f91d.metadata?.subject || "PRIVATE",
                    warnedby: tlang().title,
                    date: _0x39f91d.date,
                  };
                  _0xea5278 = _0xea5278
                    ? _0xea5278
                    : await warn.addwarn(
                        _0x39f91d.sender,
                        _0x39f91d.chat,
                        _0x75abf8
                      );
                  var _0x3c86e4 = _0xea5278.status
                    ? "*_[LINK DETECTED] Hey @" +
                      _0x39f91d.senderNum +
                      " warning!!_*\n*_links not allowed in current group!_*"
                    : "*_[LINK DETECTED]!_*";
                  await _0x39f91d.reply(_0x3c86e4, {
                    mentions: [_0x39f91d.sender],
                  });
                  await _0x39f91d.delete();
                } else if (_0x273393.antilink === "kick") {
                  await _0x39f91d.send("*_Link Detected!!_*");
                  try {
                    await _0x39f91d.delete();
                    sleep(1500);
                    await _0x39f91d.bot.groupParticipantsUpdate(
                      _0x39f91d.chat,
                      [_0x39f91d.sender],
                      "remove"
                    );
                  } catch {
                    await _0x39f91d.send("*Link Detected*\n" + tlang().botAdmin);
                  }
                }
              }
            }
          }
        } catch (_0x1a7fb0) {
          console.log("Error From Antilinks : ", _0x1a7fb0);
        }
        var _0x219875 = _0x273393?.antiword || {
          status: "false",
        };
        if (
          _0x4baec9.length > 1 &&
          !_0x39f91d.isBot &&
          _0x219875 &&
          _0x219875.status !== "false" &&
          _0x219875.words
        ) {
          var _0x4e66ac = _0x219875.words.split(",") || [];
          let _0x2298c9 = false;
          _0x4e66ac.map(async (_0x5e94de) => {
            if (
              _0x39f91d.isAdmin ||
              !global.SmdOfficial ||
              global.SmdOfficial != "yes"
            ) {
              return;
            }
            let _0x520e96 = new RegExp("\\b" + _0x5e94de?.trim() + "\\b", "ig");
            let _0x1ae0c5 = _0x47409a.toLowerCase();
            if (!_0x2298c9 && _0x5e94de && _0x520e96.test(_0x1ae0c5)) {
              _0x2298c9 = true;
              await sleep(500);
              try {
                var _0x3dc4df = "";
                if (_0x219875.status === "warn") {
                  let _0x5f3cee = {
                    reason: "For using Bad Word",
                    chat: _0x39f91d.metadata?.subject || "PRIVATE",
                    warnedby: tlang().title,
                    date: _0x39f91d.date,
                  };
                  _0xea5278 = _0xea5278
                    ? _0xea5278
                    : await warn.addwarn(
                        _0x39f91d.sender,
                        _0x39f91d.chat,
                        _0x5f3cee
                      );
                  if (_0xea5278.status) {
                    _0x3dc4df = "\n*Warns you for using badWord!!*\n";
                  }
                }
                if (_0x39f91d.isBotAdmin) {
                  await _0x39f91d.send(
                    "*[BAD WORD DETECTED] Hey @" +
                      _0x39f91d.senderNum +
                      "* " +
                      _0x3dc4df +
                      " *Deleting your message from chat!*\n",
                    {
                      mentions: [_0x39f91d.sender],
                    },
                    "suhail",
                    _0x39f91d
                  );
                  await _0x39f91d.delete();
                } else {
                  await _0x39f91d.reply(
                    "*_[BAD WORD DETECTED] provide admin to take action!_*",
                    {
                      mentions: [_0x39f91d.sender],
                    }
                  );
                }
              } catch (_0x44e136) {
                console.log("Error From Bad Words : ", _0x44e136);
              }
            }
          });
        }
        if (_0xea5278) {
          let _0x4cb16b = parseInt(global.warncount) || 3;
          if (_0xea5278.warning >= _0x4cb16b) {
            if (_0x39f91d.isGroup) {
              if (_0x39f91d.isBotAdmin) {
                await _0x39f91d.send(
                  "*_Hey @" +
                    _0x39f91d.senderNum +
                    " Kicking you from group!_*\n*_Because Your warn limit exceed!_*",
                  {
                    mentions: [_0x39f91d.sender],
                  }
                );
                await _0x39f91d.bot.groupParticipantsUpdate(
                  _0x39f91d.chat,
                  [_0x39f91d.sender],
                  "remove"
                );
              }
            } else {
              await _0x39f91d.send(
                "*_Hey @" +
                  _0x39f91d.senderNum +
                  " Blocking you!_*\n*_Because Your warn limit exceed!_*",
                {
                  mentions: [_0x39f91d.sender],
                }
              );
              await _0x39f91d.bot.updateBlockStatus(_0x39f91d.sender, "block");
            }
          }
        }
        try {
          if (!global.SmdOfficial || _0x39f91d.mtype === "reactionMessage") {
            return;
          }
          let _0x294e10 = (await groupdb.findOne({
            id: _0x39f91d.chat,
          })) || {
            chatbot: "false",
          };
          if (!bott || chatbotCount >= 10) {
            bott = (await bot_.findOne({
              id: "bot_" + _0x39f91d.user,
            })) || {
              chatbot: "false",
            };
          } else {
            chatbotCount++;
          }
          let _0x3f3751 =
            bott && bott.chatbot && bott.chatbot == "true"
              ? "true"
              : _0x294e10.chatbot || "false";
          if (
            _0x3f3751 === "true" &&
            !_0x250d65 &&
            !_0x39f91d.isBot &&
            _0x39f91d.text
          ) {
            let _0x4c0917 = !_0x39f91d.isGroup
              ? _0x39f91d.user
              : _0x39f91d.quoted
              ? _0x39f91d.quoted.sender
              : _0x39f91d.mentionedJid[0] || false;
            if (
              _0x39f91d.isGroup &&
              _0x4c0917 &&
              !_0x39f91d.checkBot(_0x4c0917)
            ) {
              return;
            }
            let { data: _0x1a5d20 } = await axios.get(
              "http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" +
                _0x39f91d.senderNum +
                "]&msg=[" +
                _0x47409a +
                "]"
            );
            if (_0x1a5d20 && _0x1a5d20.cnt) {
              _0x39f91d.send(_0x1a5d20.cnt, {}, "suhail", _0x39f91d);
            } else {
              ("");
            }
          }
        } catch (_0x418db7) {
          console.log("Error From ChatBot : ", _0x418db7);
        }
      } catch (_0x4eac84) {
        console.log("Group Settings error in command.main() \n", _0x4eac84);
      }
    }
  );


  let users = {};
let user_warns = {};

smd(
    {
      group: "add",
    },
    async (_0x28d76c, { Void: _0x4dedb6 }) => {
      try {
        let _0x3a7fc2 = await groupdb.findOne({
          id: _0x28d76c.chat,
        });
        if (
          !_0x3a7fc2 ||
          !_0x28d76c.isGroup ||
          _0x3a7fc2.botenable !== "true" ||
          _0x28d76c.blockJid ||
          _0x28d76c.fromMe
        ) {
          return;
        }
        let _0x21c5eb =
          _0x3a7fc2 && _0x3a7fc2.welcome ? _0x3a7fc2.welcome : "false";
        let _0x3fc86e =
          _0x3a7fc2 && _0x3a7fc2.antifake
            ? _0x3a7fc2.antifake.toLowerCase()
            : "false";
        let _0x5dd590 = _0x3fc86e.split(",");
        const _0xdb6223 = _0x5dd590.some((_0x25ffc0) =>
          _0x28d76c.user.startsWith(_0x25ffc0)
        );
        if (_0x3fc86e !== "false" && !_0xdb6223 && !_0x28d76c.isCreator) {
          if (_0x28d76c.isBotAdmin) {
            try {
              await _0x28d76c.kick();
              return await sendWelcome(
                _0x28d76c,
                `🚨 *ANTIFAKE TRIGGERED* 🚨\n\n🗑️ *Pathetic fake detected!* @pp\n\n👢 *GET LOST!!*`
              );
            } catch (_0x52d6df) {
              await _0x28d76c.error(
                `😡 *Useless Admins!* Can't kick this trash.\n\n❲❒❳ GROUP: ${_0x28d76c.metadata.subject}\n❲❒❳ ERROR: ${_0x52d6df}`,
                _0x52d6df,
                false
              );
            }
          } else {
            await _0x28d76c.send(
              `🤡 *ANTI_FAKE ERROR* 🤡\n\nYou expect me to do your dirty work? 💀\n*GIVE ME ADMIN* or handle your own trash!`
            );
          }
        } else if (_0x21c5eb === "true") {
          await sendWelcome(
            _0x28d76c,
            `🎭 *New Victim Arrived* 🎭\n\n@pp Welcome... Don't embarrass yourself.`
          );
        }
      } catch (_0x476537) {
        console.log("🖕 Error From Welcome: ", _0x476537);
      }
    }
  );
  
  smd(
    {
      group: "remove",
    },
    async (_0x1b9988, { Void: _0xcb3386 }) => {
      try {
        let _0xa3ec6 =
          (await groupdb.findOne({
            id: _0x1b9988.chat,
          })) || false;
        if (
          !_0x1b9988 ||
          !_0xa3ec6 ||
          !_0x1b9988.isGroup ||
          _0xa3ec6.botenable !== "true" ||
          _0x1b9988.blockJid ||
          _0x1b9988.fromMe
        ) {
          return;
        }
        let _0x9f4c7b = _0xa3ec6 && _0xa3ec6.goodbye ? _0xa3ec6.goodbye : "false";
        if (_0x9f4c7b === "true") {
          await sendWelcome(
            _0x1b9988,
            `🚪 *GOODBYE, LOSER!* 🚪\n\n💀 @pp finally left... or got kicked. Either way, nobody cares! 🤡\n\n🗑️ *Less trash, more class!*`
          );
        }
      } catch (_0x442765) {
        console.log("💀 Error From Goodbye: ", _0x442765);
      }
    }
  );

  smd(
    {
      group: "promote",
    },
    async (_0x482975, { Void: _0x3481d2 }) => {
      try {
        let _0x390d91 =
          (await groupdb.findOne({
            id: _0x482975.chat,
          })) || false;
        if (
          !_0x390d91 ||
          !_0x482975.isGroup ||
          _0x390d91.botenable !== "true" ||
          _0x482975.blockJid
        ) {
          return;
        }
        if (!user_warns[_0x482975.sender]) {
          user_warns[_0x482975.sender] = {
            [_0x482975.action]: 1,
          };
        } else {
          user_warns[_0x482975.sender][_0x482975.action]++;
        }
        let _0x4124fa;
        if (_0x390d91.antipromote == "true" && !_0x482975.isCreator) {
          _0x4124fa = _0x482975.isBotAdmin ? false : true;
          if (
            users[_0x482975.sender] &&
            users[_0x482975.sender].previous_Action === "antidemote"
          ) {
            delete users[_0x482975.sender];
            return;
          }
          if (_0x482975.isBotAdmin) {
            try {
              await _0x482975.demote();
              users[_0x482975.sender] = {
                previous_Action: "antipromote",
              };
              if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
                return;
              }
              return await sendWelcome(
                _0x482975,
                `🚫 *ANTIPROMOTE TRIGGERED* 🚫\n\n👎 @pp thought they were special... *NOT TODAY!* 😂\n\n🔻 *DEMOTED AUTOMATICALLY!*`
              );
            } catch (_0x5ae38b) {
              await _0x482975.error(
                `🤡 *CAN'T DEMOTE!* 🤡\n\n❲❒❳ GROUP: ${_0x482975.metadata.subject}\n❲❒❳ ERROR: ${_0x5ae38b}\n\n💀 *Maybe try not promoting clowns next time?*`,
                _0x5ae38b,
                false
              );
            }
          }
        }
        if (_0x390d91.pdm == "true" || _0x4124fa) {
          if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
            return;
          }
          var _0x218901 =
            `🎖️ *A FOOL GOT POWER* 🎖️\n\n🆙 @pp is now an admin... Let's see how fast they mess up. 🤡\n\n❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_\n❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n🔥 *Let's hope they have a brain...*`;
          return await sendWelcome(_0x482975, _0x218901);
        }
      } catch (_0x3a436e) {
        console.log("🔥 Error From Promote: ", _0x3a436e);
      }
    }
  );

  smd(
    {
      group: "demote",
    },
    async (_0x2b38a5, { Void: _0x4676d7 }) => {
      try {
        let _0x1273fa =
          (await groupdb.findOne({
            id: _0x2b38a5.chat,
          })) || false;
        if (
          !_0x1273fa ||
          !_0x2b38a5.isGroup ||
          _0x1273fa.botenable !== "true" ||
          _0x2b38a5.blockJid
        ) {
          return;
        }
        if (!user_warns[_0x2b38a5.sender]) {
          user_warns[_0x2b38a5.sender] = {
            [_0x2b38a5.action]: 1,
          };
        } else {
          user_warns[_0x2b38a5.sender][_0x2b38a5.action]++;
        }
        let _0x5878b4;
        if (_0x1273fa.antidemote == "true" && !_0x2b38a5.isCreator) {
          _0x5878b4 = _0x2b38a5.isBotAdmin ? false : true;
          if (
            users[_0x2b38a5.sender] &&
            users[_0x2b38a5.sender].previous_Action === "antipromote"
          ) {
            delete users[_0x2b38a5.sender];
            return;
          }
          if (_0x2b38a5.isBotAdmin) {
            try {
              await _0x2b38a5.promote();
              users[_0x2b38a5.sender] = {
                previous_Action: "antidemote",
              };
              if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
                return;
              }
              return await sendWelcome(
                _0x2b38a5,
                `🚨 *ANTIDEMOTE TRIGGERED* 🚨\n\n🤣 @pp tried to take a break from admin duties... *NOT GONNA HAPPEN!* 😈\n\n👑 *PROMOTED AUTOMATICALLY!*`
              );
            } catch (_0x275310) {
              await _0x2b38a5.error(
                `💀 *CAN'T PROMOTE!* 💀\n\n❲❒❳ GROUP: ${_0x2b38a5.metadata.subject}\n❲❒❳ ERROR: ${_0x275310}\n\n🫠 *Imagine failing at being useless...*`,
                _0x275310,
                false
              );
            }
          }
        }
        if (_0x1273fa.pdm == "true" || _0x5878b4) {
          if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
            return;
          }
          var _0x168c92 =
            `📉 *FALL FROM GRACE* 📉\n\n🔻 @pp got *DEMOTED!* Maybe they thought they had power... *Guess not!* 😂\n\n❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_\n❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n💀 *Better luck next time, boss wannabe...*`;
          return await sendWelcome(_0x2b38a5, _0x168c92);
        }
      } catch (_0x3ef55d) {
        console.log("🔥 Error From Demote: ", _0x3ef55d);
      }
    }
  );
  
  smd(
    {
      pattern: "lydea",
      alias: ["chatbot"],
      desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
      fromMe: true,
      category: "ai",
      filename: __filename,
    },
    async (_0x1a5020, _0x1f22c3, { cmdName: _0x431455 }) => {
      try {
        let _0x974aae = _0x1f22c3.split(" ")[0].toLowerCase().trim();
        let _0x44755b =
          (await groupdb.findOne({ id: _0x1a5020.chat })) ||
          (await groupdb.new({ id: _0x1a5020.chat }));
        let _0x4924e5 =
          (await bot_.findOne({ id: "bot_" + _0x1a5020.user })) ||
          (await groupdb.new({ id: "bot_" + _0x1a5020.user })) || {
            chatbot: "false",
          };
  
        if (_0x974aae == "all" || _0x974aae === "global") {
          if (_0x4924e5.chatbot == "true") {
            return await _0x1a5020.send(
              "💀 *" + _0x431455 + " is already enabled everywhere, fool.*"
            );
          }
          await bot_.updateOne({ id: "bot_" + _0x1a5020.user }, { chatbot: "true" });
          return await _0x1a5020.send(
            "🔥 *" + _0x431455 + " is now watching all chats. No escape now.*"
          );
        } else if (
          _0x974aae.startsWith("on") ||
          _0x974aae.startsWith("act") ||
          _0x974aae.startsWith("enable")
        ) {
          if (_0x44755b.chatbot == "true" || _0x4924e5.chatbot == "true") {
            return await _0x1a5020.send(
              "⚡ *" + _0x431455 + " was already enabled. You slow or what?*"
            );
          }
          await groupdb.updateOne({ id: _0x1a5020.chat }, { chatbot: "true" });
          return await _0x1a5020.send(
            "👁 *" + _0x431455 + " is awake... and it sees everything.*"
          );
        } else if (
          _0x974aae.startsWith("off") ||
          _0x974aae.startsWith("deact") ||
          _0x974aae.startsWith("disable")
        ) {
          if (_0x44755b.chatbot == "false" && _0x4924e5.chatbot == "false") {
            return await _0x1a5020.send(
              "😂 *" + _0x431455 + " is already off. You think you can shut me down twice?*"
            );
          }
          await bot_.updateOne({ id: "bot_" + _0x1a5020.user }, { chatbot: "false" });
          await groupdb.updateOne({ id: _0x1a5020.chat }, { chatbot: "false" });
  
          return await _0x1a5020.send(
            "💀 *" +
              _0x431455 +
              " deactivated... but don't get comfortable. I'll be back.*"
          );
        } else {
          return await _0x1a5020.reply(
            "⚠️ *_" +
              _0x431455 +
              " is currently *" +
              (_0x4924e5.chatbot == "true"
                ? "Enabled in ALL chats"
                : _0x44755b.chatbot == "true"
                ? "Enabled in THIS chat"
                : "Disabled in THIS chat") +
              "!_*\n🛠 *Use On/Off/All to control it... if you dare.*"
          );
        }
      } catch (_0x1a9758) {
        _0x1a5020.error(
          "🔥 *You really thought you could disable me without consequences?* 💀\n\nError: " +
            _0x1a9758,
          _0x1a9758
        );
      }
    }
  );
  