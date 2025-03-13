const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp, prefix} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const trend_usage = (() => {
    const trendNumber = ((min, max) => {
      const random = () => Math.random();
      const floor = (x) => Math.floor(x);
      const multiply = (a, b) => a * b;
      const add = (a, b) => a + b;
      const subtract = (a, b) => a - b;
      const randomValue = multiply(random(), subtract(max, min + 1));
      const result = add(floor(randomValue), min);
      return result;
    })(1, 99);
    return trendNumber;
  })();
  
  const database_info = (() => {
    const dbNumber = ((min, max) => {
      const random = () => Math.random();
      const floor = (x) => Math.floor(x);
      const multiply = (a, b) => a * b;
      const add = (a, b) => a + b;
      const subtract = (a, b) => a - b;
      const randomValue = multiply(random(), subtract(max, min + 1));
      const result = add(floor(randomValue), min);
      return result;
    })(1, 499);
    return dbNumber;
  })();

astro_patch.smd(
  {
    cmdname: "mx",
    desc: "Help list",
    react: "😈",
    desc: "To show all avaiable commands.",
    type: "user",
    filename: __filename,
  },
  async (message, input) => {
    try {
      const { commands } = require("../lib");
      if (input.split(" ")[0]) {
        let commandDetails = [];
        const foundCommand = commands.find(
          (cmd) => cmd.pattern === input.split(" ")[0].toLowerCase(),
        );
        if (foundCommand) {
          commandDetails.push("*🔉Command:* " + foundCommand.pattern);
          if (foundCommand.category) {
            commandDetails.push("*💁Category:* " + foundCommand.category);
          }
          if (foundCommand.alias && foundCommand.alias[0]) {
            commandDetails.push("*💁Alias:* " + foundCommand.alias.join(", "));
          }
          if (foundCommand.desc) {
            commandDetails.push("*💁Description:* " + foundCommand.desc);
          }
          if (foundCommand.use) {
            commandDetails.push(
              "*〽️Usage:*\n ```" +
                prefix +
                foundCommand.pattern +
                " " +
                foundCommand.use +
                "```",
            );
          }
          if (foundCommand.usage) {
            commandDetails.push(
              "*〽️Usage:*\n ```" + foundCommand.usage + "```",
            );
          }
          await message.reply(commandDetails.join("\n"));
        }
      }

      let menuThemeType;
      let menuThemeHeader;
      let menuThemeFooter;
      let menuThemeCategoryHeader;
      let menuThemeCategoryFooter;
      let menuThemeCommandPrefix;
      let menuThemeCommandFooter;

      if (Config.menu === "") {
        menuThemeType = Math.floor(Math.random() * 4) + 1;
      }

      if (
        menuThemeType === 1 ||
        Config.menu.trim().startsWith("1") ||
        Config.menu.toLowerCase().includes("menu1")
      ) {
        menuThemeHeader = "╭━〔 *" + Config.botname + "* 〕━╮";
        menuThemeCommandPrefix = "┃ ➤";
        menuThemeFooter = "╰━━━━━━━━━━━━━╯";
        menuThemeCategoryHeader = "╭──⟪";
        menuThemeCategoryFooter = "⟫──╮";
        menuThemeCommandPrefix = "┃ ✦";
        menuThemeCommandFooter = "\n╰━━━⟪ 🔥 ⟫━━━╯";
      } else if (
        menuThemeType === 2 ||
        Config.menu.trim().startsWith("2") ||
        Config.menu.toLowerCase().includes("menu2")
      ) {
        menuThemeHeader = "╔══ ❖  *" + Config.botname + "*  ❖ ══╗";
        menuThemeCommandPrefix = "║ ⟩";
        menuThemeFooter = "╚══════════════════╝";
        menuThemeCategoryHeader = "╔═◈";
        menuThemeCategoryFooter = "◈═╗";
        menuThemeCommandPrefix = "║ ⚡";
        menuThemeCommandFooter = "\n╚═══ ⚠️ ═══╝";
      } else {
        menuThemeHeader = "🚀━━ 『 *" + Config.botname + "* 』━━🚀";
        menuThemeCommandPrefix = "⚠️│";
        menuThemeFooter = "🔥═════════════🔥";
        menuThemeCategoryHeader = "╭─🔥";
        menuThemeCategoryFooter = "🔥─╮";
        menuThemeCommandPrefix = "│ ⚡";
        menuThemeCommandFooter = "╰🚀═══════🚀╯";
      }      

      const categorizedCommands = {};
      commands.map(async (command, index) => {
        if (
          command.dontAddCommandList === false &&
          command.pattern !== undefined
        ) {
          if (!categorizedCommands[command.category]) {
            categorizedCommands[command.category] = [];
          }
          categorizedCommands[command.category].push(command.pattern);
        }
      });

      const currentTime = message.time;
      const currentDate = message.date;
      let menuText = `
      ╔══════ 🔥 𝐕𝐑𝐓 🔥 ══════╗
      ║ 🛠️ *ᴏᴡɴᴇʀ:* ${Config.ownername} 
      ║ ⏳ *ᴜᴘᴛɪᴍᴇ:* ${runtime(process.uptime())}  
      ║ 💾 *ʀᴀᴍ ᴜsᴀɢᴇ:* ${formatp(os.totalmem() - os.freemem())}  
      ║ 🕒 *ᴛɪᴍᴇ:* ${currentTime}  
      ║ 📆 *ᴅᴀᴛᴇ:* ${currentDate}  
      ║ ⚡ *ᴄᴏᴍᴍᴀɴᴅs:* ${commands.length}  
      ║ 📊 *ᴜsᴀɢᴇ ᴛʀᴇɴᴅ:* ${trend_usage}  
      ║ 🗃️ *ᴅᴀᴛᴀʙᴀsᴇ:* ${database_info}  
      ╠═════════════════════╣
      ║ 👑 𝗠𝗫-𝗚Δ𝗠Ξ𝗖Ø𝗗Ξ𝗥  
      ║ 🤡 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐜𝐡𝐨𝐨𝐬𝐢𝐧𝐠 𝐕𝐑𝐓  
      ║ ©2025 𝐕𝐑𝐓 - 𝐃𝐎𝐌𝐈𝐍𝐀𝐓𝐈𝐎𝐍  
      ╚═════════════════════╝
      \n${readmore}\n`;      

      for (const category in categorizedCommands) {
        menuText += `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
        if (input.toLowerCase() === category.toLowerCase()) {
          menuText = `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
          for (const command of categorizedCommands[category]) {
            menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
          }
          menuText += `${menuThemeCommandFooter}\n`;
          break;
        } else {
          for (const command of categorizedCommands[category]) {
            menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
          }
          menuText += `${menuThemeCommandFooter}\n`;
        }
      }
      menuText += Config.caption;

      const messageOptions = {
        caption: menuText,
        ephemeralExpiration: 3000,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: mx", error);
    }
  },
);
