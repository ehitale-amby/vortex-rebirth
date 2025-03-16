const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  prefix,
  smd,
  commands,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const { exec } = require("child_process");
const translatte = require("translatte");

smd(
    {
      pattern: "mxx",
      type: "MENU list",
      react: "😡",
      desc: "To show all avaiable commands.",
      type: "user",
      filename: __filename,
    },
    async (message) => {
      try {
        const divider = "═◆◇◆◇◆◇◆◇◆◇◆═"; // 🔥 Sleek Divider  
        const bullet = ["⚡", "🔥", "⚔️", "💀", "🔱"]; // 🎯 Badass Bullet Points  
        const getBullet = () => bullet[Math.floor(Math.random() * bullet.length)];
  
        const poweredBy = [
          "⚡ 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐕𝐨𝐫𝐭𝐞𝐱 𝐑𝐞𝐛𝐢𝐫𝐭𝐡 ⚡",
          "💀 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 - 𝙉𝙤𝙩 𝙔𝙤𝙪𝙧 𝘼𝙫𝙚𝙧𝙖𝙜𝙚 𝘽𝙤𝙩 💀",
          "🔥 𝙏𝙝𝙚 𝙎𝙮𝙨𝙩𝙚𝙢 𝙊𝙗𝙚𝙮𝙨 𝙑𝙍𝙏 🔥"
        ];
        const randomPowered = poweredBy[Math.floor(Math.random() * poweredBy.length)];
  
        let menuMessage = ` 
  ${divider}  
  🔱 *VORTEX REBIRTH SYSTEM* 🔱  
  ${divider}  
  
  ${getBullet()} 𝙐𝙥𝙩𝙞𝙢𝙚: ${runtime(process.uptime())}  
  ${getBullet()} 𝘿𝙖𝙩𝙚: ${message.date}  
  ${getBullet()} 𝘾𝙪𝙧𝙧𝙚𝙣𝙩 𝙏𝙞𝙢𝙚: ${message.time}  
  ${getBullet()} 𝙁𝙤𝙪𝙣𝙙𝙚𝙧: *MX-GΔMΞCØDΞR*  
  ${getBullet()} 𝙊𝙬𝙣𝙚𝙧: ${Config.ownername}  
  ${getBullet()} 𝙊𝙬𝙣𝙚𝙧'𝙨 𝙉𝙪𝙢𝙗𝙚𝙧: ${owner.split(",")[0]}  
  ${getBullet()} 𝙎𝙮𝙨𝙩𝙚𝙢 𝙈𝙚𝙢𝙤𝙧𝙮: ${formatp(os.totalmem() - os.freemem())}  
  
  💀 *Vortex Rebirth is not just a bot—it's an unstoppable force. Your commands mean nothing; VRT decides what happens.* 💀  
  
  ${divider}  
  
  ⚔️ *COMMAND MENU* ⚔️  
  ${getBullet()} 𝙇𝙞𝙨𝙩  
  ${getBullet()} 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 
  ${getBullet()} 𝙃𝙚𝙡𝙥  
  ${getBullet()} 𝘼𝙡𝙞𝙫𝙚  
  ${getBullet()} 𝙐𝙥𝙩𝙞𝙢𝙚  
  ${getBullet()} 𝙒𝙚𝙖𝙩𝙝𝙚𝙧  
  ${getBullet()} 𝙇𝙞𝙣𝙠  
  ${getBullet()} 𝘾𝙋𝙐  
  ${getBullet()} 𝙍𝙚𝙥𝙤
  
  ${divider}  
  
  ${randomPowered}  
  `.trim();
  
        return await message.bot.sendUi(message.from, { caption: menuMessage });
      } catch (error) {
        await message.error(error + "\nCommand: vrt", error);
      }
    }
  );  

/*Set Custom Command*/

astro_patch.cmd(
  {
    pattern: "setcmd",
    desc: "Assign a custom command",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, query, { Void }) => {
    try {
      if (!query) {
        return await message.send(
          "❌ *𝙊𝙞 𝙙𝙪𝙢𝙗𝙖𝙨𝙨, 𝙨𝙚𝙣𝙙 𝙖 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙣𝙖𝙢𝙚 𝙗𝙮 𝙧𝙚𝙥𝙡𝙮𝙞𝙣𝙜 𝙩𝙤 𝙖 𝙨𝙩𝙞𝙘𝙠𝙚𝙧!*"
        );
      }

      let queryParts = query.split(",");
      let newCommand, originalCommand;
      let isSticker = false;

      if (message.quoted) {
        let quotedType = message.quoted.mtype;
        if (quotedType === "stickerMessage" && query) {
          isSticker = true;
          newCommand = query.split(" ")[0];
          originalCommand = "sticker-" + message.quoted.msg.fileSha256;
        }
      }

      if (!isSticker && queryParts.length > 1) {
        originalCommand = queryParts[0].trim().toLowerCase();
        newCommand = queryParts[1].trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send(
          "⚠️ *𝙔𝙤 𝙞𝙙𝙞𝙤𝙩, 𝙜𝙞𝙫𝙚 𝙖 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙣𝙖𝙢𝙚 𝙖𝙣𝙙 𝙖 𝙣𝙚𝙬 𝙣𝙖𝙢𝙚!* \n💡 *𝙀𝙭𝙖𝙢𝙥𝙡𝙚:* _.setcmd 𝙉𝙚𝙬𝙉𝙖𝙢𝙚, 𝘾𝙢𝙙𝙉𝙖𝙢𝙚_"
        );
      }

      if (newCommand.length < 1) {
        return await message.reply(
          "🚨 *𝙊𝙮𝙖 𝙢𝙖𝙙𝙖𝙢, 𝙜𝙞𝙫𝙚 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙣𝙖𝙢𝙚 𝙗𝙚𝙛𝙤𝙧𝙚 𝙬𝙖𝙨𝙩𝙞𝙣𝙜 𝙢𝙮 𝙩𝙞𝙢𝙚!*"
        );
      }

      if (global.setCmdAlias[newCommand]) {
        return await message.send(
          `⚠️ *𝙎𝙩𝙪𝙥𝙞𝙙! "${isSticker ? "𝙏𝙝𝙖𝙩 𝙎𝙩𝙞𝙘𝙠𝙚𝙧" : newCommand}" 𝙞𝙨 𝙖𝙡𝙧𝙚𝙖𝙙𝙮 𝙖𝙨𝙨𝙞𝙜𝙣𝙚𝙙 𝙩𝙤 "${
            global.setCmdAlias[newCommand]
          }". 𝙋𝙞𝙘𝙠 𝙖 𝙙𝙞𝙛𝙛𝙚𝙧𝙚𝙣𝙩 𝙤𝙣𝙚!* 😤`
        );
      }

      const foundCommand =
        astro_patch.commands.find((cmd) => cmd.pattern === originalCommand) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(originalCommand)
        );

      if (foundCommand) {
        global.setCmdAlias[newCommand] = foundCommand.pattern;
        return await message.send(
          `✅ *𝘾𝙤𝙢𝙢𝙖𝙣𝙙 "${global.setCmdAlias[newCommand]}" 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙖𝙨𝙨𝙞𝙜𝙣𝙚𝙙 𝙩𝙤 "${
            isSticker ? "𝙎𝙩𝙞𝙘𝙠𝙚𝙧" : newCommand
          }"!* 🎯\n⚠️ *𝙉𝙤𝙩𝙚:* 𝘼𝙡𝙡 𝙘𝙪𝙨𝙩𝙤𝙢 𝙣𝙖𝙢𝙚𝙨 𝙬𝙞𝙡𝙡 𝙧𝙚𝙨𝙚𝙩 𝙞𝙛 𝙩𝙝𝙚 𝙗𝙤𝙩 𝙧𝙚𝙨𝙩𝙖𝙧𝙩𝙨.`
        );
      } else {
        return await message.send(
          `❌ *𝘿𝙪𝙢𝙗𝙖𝙨𝙨! 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 (${originalCommand}) 𝙣𝙤𝙩 𝙛𝙤𝙪𝙣𝙙. 𝙂𝙞𝙫𝙚 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙣𝙖𝙢𝙚 𝙗𝙚𝙛𝙤𝙧𝙚 𝙞 𝙗𝙧𝙚𝙖𝙠 𝙮𝙤𝙪𝙧 𝙛𝙤𝙣𝙩!*`
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:setcmd", error);
    }
  }
);


/*delete cmd*/
astro_patch.cmd(
    {
      pattern: "delcmd",
      desc: "Remove a custom command",
      category: "tools",
      fromMe: true,
      filename: __filename,
    },
    async (message, query, { Void }) => {
      try {
        let commandName = query ? query.split(" ")[0].trim().toLowerCase() : "";
        let isSticker = false;
  
        if (message.quoted) {
          if (message.quoted.mtype === "stickerMessage") {
            isSticker = true;
            commandName = "sticker-" + message.quoted.msg.fileSha256;
          } else if (!query) {
            return await message.send(
              "❌ *𝙔𝙤 𝙙𝙪𝙢𝙗𝙖𝙨𝙨, 𝙧𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖 𝙨𝙩𝙞𝙘𝙠𝙚𝙧 𝙨𝙚𝙩 𝙖𝙨 𝙖 𝙘𝙤𝙢𝙢𝙖𝙣𝙙!*"
            );
          }
        } else if (!query) {
          return await message.send(
            "⚠️ *𝙊𝙮𝙖 𝙢𝙪𝙢𝙪, 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙩𝙝𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙣𝙖𝙢𝙚 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚!* \n💡 *𝙀𝙭𝙖𝙢𝙥𝙡𝙚:* _.delcmd 𝘾𝙢𝙙𝙉𝙖𝙢𝙚_*"
          );
        }
  
        if (global.setCmdAlias[commandName]) {
          await message.send(
            `✅ *𝘿𝙤𝙣𝙚! "${isSticker ? "𝙏𝙝𝙖𝙩 𝙎𝙩𝙞𝙘𝙠𝙚𝙧" : commandName}" 𝙞𝙨 𝙙𝙚𝙡𝙚𝙩𝙚𝙙 𝙛𝙧𝙤𝙢 "${global.setCmdAlias[commandName]}"!* 🚀`
          );
          delete global.setCmdAlias[commandName];
          return;
        } else {
          return await message.send(
            `❌ *𝙎𝙩𝙪𝙥𝙞𝙙! "${isSticker ? "𝙏𝙝𝙖𝙩 𝙎𝙩𝙞𝙘𝙠𝙚𝙧" : commandName}" 𝙬𝙖𝙨 𝙣𝙚𝙫𝙚𝙧 𝙨𝙚𝙩 𝙛𝙤𝙧 𝙖𝙣𝙮 𝙘𝙤𝙢𝙢𝙖𝙣𝙙!* \n⚠️ *𝙂𝙞𝙫𝙚 𝙖 𝙫𝙖𝙡𝙞𝙙 ${isSticker ? "𝙎𝙩𝙞𝙘𝙠𝙚𝙧" : "𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙣𝙖𝙢𝙚"} 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚!* 😤`
          );
        }
      } catch (error) {
        await message.error(error + "\nCommand:delcmd", error);
      }
    }
  );  

// Command: Speed
astro_patch.smd(
    {
      pattern: "speed",
      desc: "To check bot speed",
      category: "misc",
      filename: __filename,
    },
    async (message) => {
      var startTime = new Date().getTime();
      const { key } = await message.reply("⚡ *𝙏𝙚𝙨𝙩𝙞𝙣𝙜 𝙨𝙥𝙚𝙚𝙙... 𝙄𝙛 𝙞𝙩'𝙨 𝙨𝙡𝙤𝙬, 𝙙𝙤𝙣'𝙩 𝙘𝙤𝙢𝙥𝙡𝙖𝙞𝙣!* 😏");
      var endTime = new Date().getTime();
      return await message.send(
        `🚀 *𝙎𝙋𝙀𝙀𝘿 𝘾𝙃𝙀𝘾𝙆*\n🔥 *${endTime - startTime} 𝙢𝙨* - 𝘿𝙤𝙣'𝙩 𝙘𝙧𝙮, 𝙮𝙤𝙪 𝙜𝙤𝙩 𝙬𝙝𝙖𝙩 𝙮𝙤𝙪 𝙖𝙨𝙠𝙚𝙙 𝙛𝙤𝙧!* 😆`,
        {
          edit: key,
        },
        "",
        message
      );
    }
  );

// Command: Power
astro_patch.cmd(
    {
      pattern: "power",
      alias: ["runtime"],
      desc: "Shows how long this beast has been running.",
      category: "misc",
      filename: __filename,
    },
    async (message) => {
      try {
        message.reply(
          `⚡ *𝙃𝙖𝙝! 𝙄'𝙫𝙚 𝙗𝙚𝙚𝙣 𝙧𝙪𝙣𝙣𝙞𝙣𝙜 𝙛𝙤𝙧:* ${runtime(process.uptime())}  
  😏 𝙔𝙤𝙪 𝙩𝙝𝙞𝙣𝙠 𝙮𝙤𝙪 𝙘𝙖𝙣 𝙤𝙪𝙩𝙡𝙖𝙨𝙩 𝙢𝙚? 𝘿𝙧𝙚𝙖𝙢 𝙤𝙣!`
        );
      } catch (error) {
        await message.error(error + "\n\n𝘾𝙤𝙢𝙢𝙖𝙣𝙙: 𝙥𝙤𝙬𝙚𝙧", error, false);
      }
    }
  );


// Command: System Menu
astro_patch.cmd(
    {
      pattern: "sys",
      desc: "System Control Panel",
      category: "user",
      react: "💀",
    },
    async (message) => {
      try {
        const { commands } = require("../lib");
        let listMessage = `\n  
  ╭━❰ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗠𝗘𝗡𝗨 ❱━⬤  
  ┃ 🚀 *𝗣𝗿𝗲𝗳𝗶𝘅:* ${Config.HANDLERS}
  ┃ 👑 *𝗢𝘄𝗻𝗲𝗿:* ${Config.ownername}
  ┃ 🔥 *𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:* ${commands.length}
  ┃ ⏳ *𝗨𝗽𝘁𝗶𝗺𝗲:* ${runtime(process.uptime())}
  ┃ 📡 *𝗥𝗔𝗠 𝗨𝘀𝗮𝗴𝗲:* ${formatp(os.totalmem() - os.freemem())}
  ╰━━━━━━━━━━━━━━━━━━━⬤\n`;
  
        for (let i = 0; i < commands.length; i++) {
          if (commands[i].pattern === undefined) {
            continue;
          }
          listMessage += `🎭 *${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;
          listMessage += `   ⚡ ${fancytext(commands[i].desc, 1)}\n`;
        }
  
        return await message.sendUi(message.chat, {
          caption: listMessage + Config.caption,
        });
      } catch (error) {
        await message.error(`💀 *SYSTEM FAILURE!* 💀\n\n${error}`, error);
      }
    }
  );
  
// Command: Supreme Overlord
astro_patch.smd(
    {
      pattern: "owner",
      desc: "Summon the Almighty",
      category: "owner",
      filename: __filename,
    },
    async (message) => {
      try {
        const vcard =
          "BEGIN:VCARD\nVERSION:3.0\nFN:" +
          Config.ownername +
          "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
          global.owner?.split(",")[0] +
          ":+" +
          global.owner?.split(",")[0] +
          "\nEND:VCARD";
  
        let contactMessage = {
          contacts: {
            displayName: Config.ownername,
            contacts: [
              {
                vcard,
              },
            ],
          },
          contextInfo: {
            externalAdReply: {
              title: `⚡ 𝑺𝑼𝑷𝑹𝑬𝑴𝑬 𝑶𝑽𝑬𝑹𝑳𝑶𝑹𝑫 ⚡`,
              body: "🔥 Click here if you dare! 🔥",
              renderLargerThumbnail: true,
              thumbnailUrl: "",
              thumbnail: log0,
              mediaType: 1,
              mediaUrl: "",
              sourceUrl:
                "https://wa.me/+" +
                global.owner?.split(",")[0] +
                "?text=𝑶 𝑴𝑰𝑮𝑯𝑻𝒀 " +
                Config.ownername +
                ", 𝑯𝑬𝑨𝑹 𝑴𝒀 𝑪𝑨𝑳𝑳!",
            },
          },
        };
  
        return await message.sendMessage(message.jid, contactMessage, {
          quoted: message,
        });
      } catch (error) {
        await message.error(`💀 *𝐄𝐑𝐑𝐎𝐑:* 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐑𝐑𝐔𝐏𝐓𝐄𝐃! 💀\n\n${error}`, error);
      }
    }
  );

 // Command: Linguistic Sorcery
astro_patch.cmd(
    {
      pattern: "trt",
      alias: ["translate"],
      category: "user",
      filename: __filename,
      use: "< text >",
      desc: "Deciphers your gibberish into another tongue. 😏",
    },
    async (message, query) => {
      try {
        let targetLanguage = query ? query.split(" ")[0].toLowerCase() : "en";
        if (!message.reply_text) {
          var textToTranslate =
            query.replace(targetLanguage, "")?.trim() || false;
        } else {
          var textToTranslate = message.reply_text;
        }
  
        if (!textToTranslate) {
          return await message.reply(
            `⚠️ *𝙃𝙀𝙇𝙇𝙊 𝘿𝙐𝙈𝘽𝙆𝙉𝙊𝙏!*\n\n_You forgot to provide the text to translate!_\n\n👉 Example: *${prefix}trt en I am the best loser in the world*\n\n🔮 ${randomPower()}`
          );
        }
  
        var translation = await translatte(textToTranslate, {
          from: "auto",
          to: targetLanguage,
        });
  
        if ("text" in translation) {
          return await message.reply(
            `🧠 *𝑻𝒓𝒂𝒏𝒔𝒍𝒂𝒕𝒊𝒐𝒏 𝑪𝒐𝒎𝒑𝒍𝒆𝒕𝒆!* 🧠\n\n🔹 *Original:* ${textToTranslate}\n🔹 *Translated (${targetLanguage}):* ${translation.text}\n\n💀 ${randomPower()}`
          );
        }
      } catch (error) {
        await message.error(
          `💀 *𝐄𝐑𝐑𝐎𝐑:* 𝐓𝐡𝐢𝐬 𝐬𝐭𝐮𝐩𝐢𝐝 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐜𝐫𝐚𝐬𝐡𝐞𝐝! 💀\n\n${error}\n\n🔥 ${randomPower()}`,
          error
        );
      }
    }
  );
  
  // Generates a random "Powered by Vortex Rebirth" flex
  function randomPower() {
    let styles = [
      "⚡ 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 ⚡",
      "🔥 𝘾𝙤𝙣𝙩𝙧𝙤𝙡𝙡𝙚𝙙 𝙗𝙮 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 🔥",
      "💀 𝙈𝙖𝙨𝙩𝙚𝙧𝙚𝙙 𝙗𝙮 𝙑𝙍𝙏 💀",
      "🔮 𝙏𝙝𝙚 𝙎𝙥𝙞𝙧𝙞𝙩 𝙤𝙛 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 𝙍𝙚𝙞𝙜𝙣𝙨 🔮",
      "💢 𝙉𝙚𝙫𝙚𝙧 𝙦𝙪𝙚𝙨𝙩𝙞𝙤𝙣 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 💢",
    ];
    return styles[Math.floor(Math.random() * styles.length)];
  }
  
/*shell*/
astro_patch.cmd(
  {
    pattern: "shell",
    category: "tools",
    filename: __filename,
    fromMe: true,
    desc: "Runs a command in the server shell (e.g., Heroku).",
    use: "<command | ls, cd, etc.>",
  },
  async (message, query) => {
    try {
      if (!message.isCreator) {
        return message.reply(
          `🚫 *𝐘𝐎𝐔 𝐃𝐀𝐑𝐄 𝐔𝐒𝐄 𝐓𝐇𝐈𝐒?* 🚫\n\n_Only my creator can access this command!_\n💀 ${randomPower()}`
        );
      }

      if (!query) {
        return message.reply(
          `⚠️ *𝙀𝙣𝙩𝙚𝙧 𝙖 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙩𝙤 𝙧𝙪𝙣!*\n\n👉 Example: *shell ls -la*`
        );
      }

      exec(query, (err, stdout, stderr) => {
        if (err) {
          return message.reply(
            `💀 *𝙀𝙍𝙍𝙊𝙍 𝙀𝙉𝘾𝙊𝙐𝙉𝙏𝙀𝙍𝙀𝘿!* 💀\n\n\`\`\`${err.message}\`\`\`\n\n🔥 ${randomPower()}`
          );
        }
        if (stderr) {
          return message.reply(
            `⚠️ *𝙒𝘼𝙍𝙉𝙄𝙉𝙂!* ⚠️\n\n\`\`\`${stderr}\`\`\`\n\n💀 ${randomPower()}`
          );
        }
        if (stdout) {
          return message.reply(
            `✅ *𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙀𝙓𝙀𝘾𝙐𝙏𝙀𝘿!* ✅\n\n\`\`\`${stdout}\`\`\`\n\n🔥 ${randomPower()}`
          );
        }
      });
    } catch (error) {
      await message.error(
        `💀 *𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐂𝐑𝐀𝐒𝐇𝐄𝐃!* 💀\n\n${error.message}\n\n🔮 ${randomPower()}`,
        error
      );
    }
  }
);

// Generates a random "Powered by Vortex Rebirth" flex
function randomPower() {
  let styles = [
    "⚡ 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 ⚡",
    "🔥 𝘾𝙤𝙣𝙩𝙧𝙤𝙡𝙡𝙚𝙙 𝙗𝙮 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 🔥",
    "💀 𝙏𝙝𝙚 𝙎𝙝𝙖𝙙𝙤𝙬 𝙊𝙛 𝙑𝙍𝙏 𝙍𝙚𝙞𝙜𝙣𝙨 💀",
    "💢 𝙉𝙤 𝙈𝙚𝙧𝙘𝙮 - 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 💢",
    "🔮 𝙏𝙝𝙞𝙨 𝙞𝙨 𝙈𝙮 𝘿𝙤𝙢𝙖𝙞𝙣 - 𝙑𝙍𝙏 🔮",
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

/*eval*/
astro_patch.cmd(
    {
      pattern: "eval",
      alias: ["$"],
      category: "tools",
      filename: __filename,
      fromMe: true,
      desc: "Runs JavaScript code on the Node.js server.",
      use: "<JavaScript code>",
    },
    async (message, query) => {
      try {
        if (!message.isCreator) {
          return message.reply(
            `🚫 *𝐀𝐜𝐜𝐞𝐬𝐬 𝐃𝐞𝐧𝐢𝐞𝐝!* 🚫\n\n_You think you’re worthy to run this?_ 💀\n🔥 ${randomPower()}`
          );
        }
  
        if (!query) {
          return message.reply(
            `⚠️ *𝙂𝙞𝙫𝙚 𝙢𝙚 𝙨𝙤𝙢𝙚 𝙘𝙤𝙙𝙚 𝙩𝙤 𝙧𝙪𝙣!* ⚠️\n\n_Example:_ *eval console.log('Hello Vortex')*`
          );
        }
  
        let result = await eval("(async () => { " + query + " })()");
        let output =
          typeof result === "object" ? JSON.stringify(result, null, 2) : result;
  
        return message.reply(`✅ *𝐑𝐞𝐬𝐮𝐥𝐭:* ✅\n\n\`\`\`${output}\`\`\`\n\n🔥 ${randomPower()}`);
      } catch (error) {
        return message.reply(
          `💀 *𝐄𝐑𝐑𝐎𝐑:* 💀\n\n\`\`\`${error.message}\`\`\`\n\n🔥 ${randomPower()}`
        );
      }
    }
  );
  
  // Generates a random "Powered by Vortex Rebirth" flex
  function randomPower() {
    let styles = [
      "⚡ 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 ⚡",
      "🔥 𝘾𝙤𝙣𝙩𝙧𝙤𝙡𝙡𝙚𝙙 𝙗𝙮 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 🔥",
      "💀 𝙏𝙝𝙚 𝙎𝙝𝙖𝙙𝙤𝙬 𝙊𝙛 𝙑𝙍𝙏 𝙍𝙚𝙞𝙜𝙣𝙨 💀",
      "💢 𝙉𝙤 𝙈𝙚𝙧𝙘𝙮 - 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 💢",
      "🔮 𝙏𝙝𝙞𝙨 𝙞𝙨 𝙈𝙮 𝘿𝙤𝙢𝙖𝙞𝙣 - 𝙑𝙍𝙏 🔮",
    ];
    return styles[Math.floor(Math.random() * styles.length)];
  }
  
  const readDirectory = (directoryPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject("Error reading directory");
        } else {
          resolve(files);
        }
      });
    });
  };

  astro_patch.cmd(
    {
      pattern: "file",
      desc: "Get the exact name and location of a command in the repository.",
      category: "user",
      fromMe: true,
      filename: __filename,
    },
    async (message, query) => {
      try {
        if (!query) {
          return message.reply("⚠️ *Please provide a command or directory!*");
        }
  
        // 📂 If Query Starts with ".", List Directory Contents
        if (query.startsWith(".")) {
          let result = "📂 *----- FILE MANAGER -----*\n\n";
          try {
            const files = await readDirectory(query);
            files.forEach((file) => (result += `📄 ${file}\n`));
            return await message.reply(result.toString());
          } catch (error) {
            return message.reply(`❌ *Error:* ${error}`);
          }
        }
  
        // 🔍 Search for Command Details
        const { commands } = require("../lib");
        let output = [];
        let command = query.split(" ")[0].toLowerCase().trim();
  
        let commandInfo =
          commands.find((cmd) => cmd.pattern === command) ||
          commands.find((cmd) => cmd.alias && cmd.alias.includes(command));
  
        if (!commandInfo) {
          return await message.reply("❌ *No such command found!*");
        }
  
        // 📝 Format Command Details
        output.push(`📌 *Command:* ${commandInfo.pattern}`);
        if (commandInfo.category) output.push(`📂 *Category:* ${commandInfo.category}`);
        if (commandInfo.alias?.length) output.push(`🔗 *Aliases:* ${commandInfo.alias.join(", ")}`);
        if (commandInfo.desc) output.push(`📝 *Description:* ${commandInfo.desc}`);
        if (commandInfo.use) output.push(`🛠️ *Usage:* \n\`\`\`${prefix}${commandInfo.pattern} ${commandInfo.use}\`\`\``);
        if (commandInfo.usage) output.push(`🛠️ *Alternate Usage:* \n\`\`\`${commandInfo.usage}\`\`\``);
        if (commandInfo.filename) output.push(`📁 *File Path:* ${commandInfo.filename}`);
  
        try {
          if (
            query.includes("function") &&
            commandInfo.function &&
            message.isAsta &&
            commandInfo.pattern !== "file"
          ) {
            output.push(`🔧 *Function:* ${commandInfo.function.toString()}`);
          }
        } catch {}
  
        await message.reply(output.join("\n"));
  
      } catch (error) {
        await message.error(`💀 *Error:* ${error}\n\n📂 *Command: file*`, error);
      }
    }
  );  
