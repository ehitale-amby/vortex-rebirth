const moment = require("moment-timezone");
const Config = require("../config");
let { smd, prefix, updateProfilePicture, parsedJid } = require("../lib");
const { cmd } = require("../lib/plugins");

const mtypes = ["imageMessage"];

// Set profile picture
smd(
    {
      pattern: "pp",
      desc: "Set profile picture",
      category: "whatsapp",
      use: "<reply to image>",
      fromMe: true,
      filename: __filename,
    },
    async (cld) => {
      try {
        let reply = mtypes.includes(cld.mtype) ? cld : cld.reply_message;
  
        if (!reply || !mtypes.includes(reply?.mtype || "need_Media")) {
          return await cld.reply("💀 *Oi, dumbass!* 💀\n🔥 *You need to reply to an image, not air!* 🤡");
        }
  
        await cld.reply("🛠 *Updating your ugly profile picture... Hold on!* 🤡");
        return await updateProfilePicture(cld, cld.user, reply, "pp");
  
      } catch (err) {
        await cld.error(`🔥 *Error while setting your ugly face as DP!* 🤡\n\n💀 ${err}`);
      }
    }
  );
  

  smd(
    {
      pattern: "fullpp",
      desc: "Set full screen profile picture",
      category: "whatsapp",
      use: "<reply to image>",
      fromMe: true,
      filename: __filename,
    },
    async (cld) => {
      try {
        let reply = mtypes.includes(cld.mtype) ? cld : cld.reply_message;
  
        if (!reply || !mtypes.includes(reply?.mtype || "need_Media")) {
          return await cld.reply("💀 *Oi, clown!* 💀\n🔥 *Reply to an image, not to the air!* 🤡");
        }
  
        await cld.reply("🛠 *Trying to fix your ugly profile... Hold up!* 🤡");
        return await updateProfilePicture(cld, cld.user, reply, "fullpp");
  
      } catch (err) {
        await cld.error(`🔥 *Failed to update your ugly DP!* 🤡\n\n💀 ${err}`);
      }
    }
  );
  
  // Remove profile picture
  smd(
    {
      pattern: "rpp",
      desc: "Remove profile picture",
      category: "whatsapp",
      use: "<chat>",
      fromMe: true,
      filename: __filename,
    },
    async (cld) => {
      try {
        await cld.removepp();
        cld.send("💀 *Finally! That ugly DP is gone!* 🔥\n\nYou're welcome, clown. 🤡");
      } catch (err) {
        await cld.error(`🔥 *Failed to erase that nightmare of a DP!* 💀\n\n🤡 ${err}`);
      }
    }
  );

  // Update bio
  smd(
    {
      pattern: "bio",
      desc: "Update profile status on WhatsApp",
      category: "whatsapp",
      use: "<text>",
      fromMe: true,
      filename: __filename,
    },
    async (cld, text) => {
      try {
        if (!text) {
          return await cld.send(
            "🤡 *You forgot to type something, genius!*\n💀 *_Example: " +
              prefix +
              "bio 𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙_*"
          );
        }
        await cld.bot.updateProfileStatus(text);
        cld.send("🔥 *Bio updated. Hopefully, it's not cringe.*");
      } catch (err) {
        await cld.error(`💀 *Damn, couldn't update your bio!* 🤡\n\n${err}`);
      }
    }
  );

  cmd(
    {
      pattern: "ptv",
      desc: "Send PiP Message of video",
      category: "whatsapp",
      filename: __filename,
    },
    async (cld, _, { cmdName }) => {
      try {
        if (!cld.quoted) {
          return await cld.send("💀 *Reply to a video, clown!* 🤡");
        }
        let mtype = cld.quoted.mtype;
        if (mtype !== "videoMessage") {
          return await cld.send("🔥 *You really think that's a video?* 🤡");
        }
        return await cld.bot.forwardOrBroadCast(cld.chat, cld.quoted, {}, "ptv");
      } catch (err) {
        await cld.error(`💀 *Failed to send PiP, you're cursed or what?* 🤡\n\n${err}`);
      }
    }
  );
  
  cmd(
    {
      pattern: "save",
      desc: "Save Message to log number",
      category: "whatsapp",
      filename: __filename,
    },
    async (cld, _, { cmdName }) => {
      try {
        let reply = cld.reply_message;
        if (!reply) {
          return await cld.send("💀 *Reply to a message first, genius!*");
        }
        let sent = await cld.bot.forwardOrBroadCast(cld.user, reply);
      } catch (err) {
        await cld.error(`🔥 *Couldn't save your useless message!* 🤡\n\n${err}`);
      }
    }
  );
  
// QUOTED COMMAND - Because you clearly can't do it yourself 😒
cmd(
    {
      pattern: "quoted",
      desc: "Get reply Message from Replied Message",
      category: "user",
      filename: __filename,
    },
    async (cld) => {
      try {
        if (!cld.quoted) {
          return await cld.send(
            "🤦‍♂️ *" +
              Config.botname +
              "* says:\n_Are you dumb? Reply to a message first!_ 😒"
          );
        }
  
        let quoted = await cld.getQuotedObj();
        if (!quoted) {
          return await cld.send(
            "😂 *" +
              Config.botname +
              "* says:\n_LMAO, the message you replied to doesn’t even have a quote! Try again, genius._"
          );
        }
  
        let quotedSerialized = await cld.bot.serializeM(quoted);
        if (!quotedSerialized || !quotedSerialized.quoted) {
          return await cld.send(
            "😂 *" +
              Config.botname +
              "* says:\n_Bruh, the message ain't got no quote. Stop embarrassing yourself._"
          );
        }
  
        try {
          await cld.react("💀", cld);
          return await cld.bot.copyNForward(cld.chat, quotedSerialized.quoted, false);
        } catch (err) {
          console.error("❌ Error while forwarding:", err);
          await cld.bot.forward(cld.chat, quotedSerialized.quoted, {}, cld);
        }
      } catch (err) {
        console.error("🚨 Command Error:", err);
        await cld.error(
          "🔥 *" +
            Config.botname +
            "* says:\n_You managed to break something, fool!_\n\nError:\n" +
            err +
            "\n\ncommand: quoted",
          err
        );
      }
    }
  );
  
  
  // BLOCKLIST COMMAND - Look at all the people who hate you 😆
  cmd(
    {
      pattern: "blocklist",
      desc: "Get list of all Blocked Numbers",
      category: "whatsapp",
      fromMe: true,
      filename: __filename,
      use: "<text>",
    },
    async (cld) => {
      try {
        const blockedUsers = await cld.bot.fetchBlocklist();
        if (blockedUsers.length === 0) {
          return await cld.reply("*Wow, no blocked numbers? Guess nobody cares enough to block you. 🤡*");
        }
        let text =
          "\n*≡ BLOCKLIST*\n\n*Total Blocked Users:* " +
          blockedUsers.length +
          "\n\n┌─⊷ *PEOPLE WHO CAN’T STAND YOU*\n";
        for (let i = 0; i < blockedUsers.length; i++) {
          text += "▢ " + (i + 1) + ":- wa.me/" + blockedUsers[i].split("@")[0] + "\n";
        }
        text += "└───────────";
        return await cld.bot.sendMessage(cld.chat, { text });
      } catch (err) {
        await cld.error(err + "\n\ncommand : blocklist", err);
      }
    }
  );
  
  // LOCATION COMMAND - If only you had a sense of direction IRL 😏
  cmd(
    {
      pattern: "location",
      desc: "Adds *readmore* in given text.",
      category: "whatsapp",
      filename: __filename,
    },
    async (message, args) => {
      try {
        if (!args) {
          return await message.reply(
            "*What kind of joke is this? Send proper coordinates! 🤦‍♂️*\n *Example: location 24.121231,55.1121221*"
          );
        }
  
        const latitude = parseFloat(args.split(",")[0]) || "";
        const longitude = parseFloat(args.split(",")[1]) || "";
  
        if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
          return await message.reply("*Your coordinates are as fake as your confidence. Try again.*");
        }
  
        await message.reply(
          "*Here’s your precious location...* \n```Latitude: " +
            latitude +
            "\nLongitude: " +
            longitude +
            "```\n\n*Try not to get lost again, clown 🤡*"
        );
  
        return await message.sendMessage(
          message.jid,
          {
            location: {
              degreesLatitude: latitude,
              degreesLongitude: longitude,
            },
          },
          {
            quoted: message,
          }
        );
      } catch (error) {
        await message.error(error + "\n\ncommand : location", error);
      }
    }
  );
  
  // LIST PERSONAL CHATS - You actually have people to talk to? 😂
  smd(
    {
      pattern: "listpc",
      category: "whatsapp",
      desc: "Finds info about personal chats",
      filename: __filename,
    },
    async (message, isPattern, { store }) => {
      try {
        message.react("🫡");
        const personalChats = await store.chats
          .all()
          .filter((chat) => chat.id.endsWith(".net"))
          .map((chat) => chat);
  
        let result =
          " 「 *PM USERS LIST* 」\n\nTotal " +
          personalChats.length +
          " people are stuck talking to you. Tragic. 🤡";
  
        for (const chat of personalChats) {
          result +=
            "\n\nUser: @" +
            chat.id.split("@")[0] +
            "\nMessages: " +
            chat.unreadCount +
            "\nLast chat: " +
            moment(chat.conversationTimestamp * 1000)
              .tz(timezone)
              .format("DD/MM/YYYY HH:mm:ss");
        }
  
        message.bot.sendTextWithMentions(message.chat, result, message);
      } catch (error) {
        return await message.error(
          error + "\n\n command: listpc",
          error,
          "*Didn’t find anything, just like your purpose in life.*"
        );
      }
    }
  );
  
  // EDIT MESSAGE COMMAND - Because you always regret what you say 🙄
  smd(
    {
      pattern: "edit",
      fromMe: true,
      desc: "Edit message that was sent by the bot",
      type: "whatsapp",
    },
    async (message, args) => {
      try {
        const botMessage =
          message.reply_message && message.reply_message.fromMe
            ? message.reply_message
            : false;
  
        if (!botMessage) {
          return await message.reply("*Bruh, reply to a message I sent, not some random nonsense!*");
        }
  
        if (!args) {
          return await message.reply("*Edit what? Your life choices? Be specific. 😒*");
        }
  
        return await message.edit(args, {
          edit: botMessage,
        });
      } catch (error) {
        await message.error(error + "\n\ncommand : edit", error);
      }
    }
  );
  
  // VCARD COMMAND - Because your contacts are as empty as your soul 💀
  cmd(
    {
      pattern: "vcard",
      desc: "Create Contact by given name.",
      category: "whatsapp",
      filename: __filename,
    },
    async (message, args) => {
      try {
        if (!message.quoted) {
          return message.reply("*Who am I supposed to make a contact for? Your imaginary friend?*");
        }
  
        if (!args) {
          return message.reply(
            "Give me a name, dummy! \n *Example: vcard VRT* "
          );
        }
  
        let nameArray = args.split(" ");
        if (nameArray.length > 3) {
          args = nameArray.slice(0, 3).join(" ");
        }
  
        const vCard =
          "BEGIN:VCARD\nVERSION:3.0\nFN:" +
          args +
          "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
          message.quoted.sender.split("@")[0] +
          ":+" +
          owner[0] +
          "\nEND:VCARD";
  
        const contactMessage = {
          contacts: {
            displayName: args,
            contacts: [
              {
                vcard: vCard,
              },
            ],
          },
        };
  
        return await message.bot.sendMessage(message.chat, contactMessage, {
          quoted: message,
        });
      } catch (error) {
        await message.error(error + "\n\ncommand : vcard", error);
      }
    }
  );
  
  // Edit Message Command
smd(
    {
      pattern: "edit",
      fromMe: true,
      desc: "edit message that sended by bot",
      type: "whatsapp",
    },
    async (message, args) => {
      try {
        const botMessage =
          message.reply_message && message.reply_message.fromMe
            ? message.reply_message
            : false;
  
        if (!botMessage) {
          return await message.reply(
            "⚠️ *" + Config.botname + "* says:\n_Reply to a message that you sent!_"
          );
        }
  
        if (!args) {
          return await message.reply(
            "⚠️ *" + Config.botname + "* says:\n_Need text, Example: edit hi_"
          );
        }
  
        return await message.edit(args + " ✍️", {
          edit: botMessage,
        });
      } catch (error) {
        await message.error(
          "🚨 *" + Config.botname + "* encountered an error:\n" + error + "\n\ncommand : edit",
          error
        );
      }
    }
  );
  
  // Forward Message Command
  smd(
    {
      pattern: "forward",
      alias: ["send"],
      desc: "forward your messages in jid",
      type: "whatsapp",
    },
    async (message, args) => {
      try {
        if (!message.reply_message) {
          return message.reply(
            "⚠️ *" + Config.botname + "* says:\n_*Reply to something!*_"
          );
        }
  
        const jids = await parsedJid(args);
        if (!jids || !jids[0]) {
          return await message.send(
            "⚠️ *" + Config.botname + "* says:\n_Provide a JID to forward the message._\n*Use `" +
              prefix +
              "jid` to get the JID of users!*"
          );
        }
  
        for (let i = 0; i < jids.length; i++) {
          message.bot.forwardOrBroadCast(jids[i], message.reply_message);
        }
  
        return await message.reply(
          "✅ *" + Config.botname + "* successfully forwarded the message! 📩"
        );
      } catch (error) {
        await message.error(
          "🚨 *" + Config.botname + "* encountered an error:\n" + error + "\n\ncommand : forward",
          error
        );
      }
    }
  );

  // Block User Command
smd(
    {
      cmdname: "block",
      info: "Blocks a person ❌",
      fromMe: true,
      type: "whatsapp",
      filename: __filename,
      use: "<quote/reply user.>",
    },
    async (message) => {
      try {
        let user = message.reply_message
          ? message.reply_message.sender
          : !message.isGroup
          ? message.from
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : "";
  
        if (!user && !user.includes("@s.whatsapp.net")) {
          return await message.reply(
            "⚠️ *" + Config.botname + "* says:\n_Uhh, reply/mention a user!_"
          );
        }
  
        if (message.checkBot(user)) {
          return await message.reply(
            "😡 *" + Config.botname + "* says:\n_Huh, I can't block my Creator!!_"
          );
        }
  
        await message.bot
          .updateBlockStatus(user, "block")
          .then(() => {
            message.react("🔒");
            message.reply(
              "✅ *" + Config.botname + "* has successfully blocked the user! 🚫"
            );
          })
          .catch(() =>
            message.reply(
              "❌ *" + Config.botname + "* says:\n_Can't block user, sorry!!_"
            )
          );
      } catch (error) {
        await message.error(
          "🚨 *" + Config.botname + "* encountered an error:\n" + error + "\n\ncommand: block",
          error,
          false
        );
      }
    }
  );
  
  // Unblock User Command
  smd(
    {
      cmdname: "unblock",
      info: "Unblocks a user ✅",
      type: "whatsapp",
      fromMe: true,
      filename: __filename,
    },
    async (message) => {
      try {
        let user = message.reply_message
          ? message.reply_message.sender
          : !message.isGroup
          ? message.from
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : "";
  
        if (!user && !user.includes("@s.whatsapp.net")) {
          return await message.reply(
            "⚠️ *" + Config.botname + "* says:\n_Uhh, reply/mention a user!_"
          );
        }
  
        await message.bot
          .updateBlockStatus(user, "unblock")
          .then(() => {
            message.reply(
              "✅ *" + Config.botname + "* has successfully unblocked @" +
                user.split("@")[0] +
                "! 🔓",
              {
                mentions: [user],
              }
            );
          })
          .catch(() =>
            message.reply(
              "❌ *" + Config.botname + "* says:\n_Can't unblock user, make sure the user is blocked!!_"
            )
          );
      } catch (error) {
        await message.error(
          "🚨 *" + Config.botname + "* encountered an error:\n" + error + "\n\ncommand: unblock",
          error
        );
      }
    }
  );
  