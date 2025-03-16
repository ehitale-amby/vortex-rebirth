const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");

astro_patch.smd(
  {
    cmdname: "chaos",
    desc: "Vortex Rebirth brings pure destruction – if you can handle it.",
    react: "💀",
    type: "vortex",
    filename: __filename,
  },
  async (message) => {
    try {
      const { commands } = require("../lib");

      // 🔥 RANDOM HEADERS
      const headers = [
        "╔═🔥 *VORTEX REBIRTH - CHAOS* 🔥═╗",
        "⫷⫸ 𝐕𝐨𝐫𝐭𝐞𝐱 𝐂𝐡𝐚𝐨𝐬 𝐁𝐞𝐠𝐢𝐧𝐬 ⫷⫸",
        "⚠️ *WARNING: HIGHLY UNSTABLE MENU* ⚠️",
        "💀 *𝐂𝐇𝐀𝐎𝐒 𝐌𝐎𝐃𝐄 𝐄𝐍𝐆𝐀𝐆𝐄𝐃* 💀",
      ];

      // 🔥 RANDOM FOOTERS
      const footers = [
        "╚════════════════════════╝",
        "👊 *𝐎𝐍𝐋𝐘 𝐖𝐀𝐑𝐑𝐈𝐎𝐑𝐒 𝐖𝐈𝐋𝐋 𝐒𝐔𝐑𝐕𝐈𝐕𝐄* 👊",
        "🔥 *VORTEX RULES OVER ALL!* 🔥",
        "💀 *𝐂𝐇𝐀𝐎𝐒 𝐂𝐀𝐍'𝐓 𝐁𝐄 𝐂𝐎𝐍𝐓𝐀𝐈𝐍𝐄𝐃* 💀",
      ];

      // 🔥 RANDOM CATEGORY TITLES
      const categoriesTitle = [
        "🔥═══🔥 *RANDOM SECTORS* 🔥═══🔥",
        "⚔️ *𝐓𝐇𝐄 𝐃𝐀𝐑𝐊 𝐏𝐀𝐓𝐇𝐖𝐀𝐘𝐒* ⚔️",
        "💣 *𝐖𝐄𝐀𝐏𝐎𝐍𝐒 𝐎𝐅 𝐂𝐇𝐀𝐎𝐒* 💣",
        "🔱 *𝐀𝐁𝐒𝐎𝐋𝐔𝐓𝐄 𝐃𝐎𝐌𝐈𝐍𝐀𝐓𝐈𝐎𝐍* 🔱",
      ];

      // 🔥 RANDOM MENU INTRO TEXT
      const introTexts = [
        "🔥 *𝐕𝐎𝐑𝐓𝐄𝐗 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐂𝐀𝐓𝐀𝐋𝐎𝐆* 🔥",
        "💀 *𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐏𝐔𝐑𝐄 𝐃𝐄𝐒𝐓𝐑𝐔𝐂𝐓𝐈𝐎𝐍* 💀",
        "⚠️ *𝐏𝐑𝐄𝐏𝐀𝐑𝐄 𝐅𝐎𝐑 𝐔𝐍𝐏𝐑𝐄𝐃𝐈𝐂𝐓𝐀𝐁𝐋𝐄 𝐌𝐀𝐘𝐇𝐄𝐌* ⚠️",
        "💣 *𝐄𝐗𝐏𝐄𝐑𝐈𝐄𝐍𝐂𝐄 𝐓𝐇𝐄 𝐃𝐄𝐏𝐓𝐇𝐒 𝐎𝐅 𝐂𝐇𝐀𝐎𝐒* 💣",
      ];

      // 🔥 PICK RANDOM TEXTS
      const header = headers[Math.floor(Math.random() * headers.length)];
      const footer = footers[Math.floor(Math.random() * footers.length)];
      const categoryHeader = categoriesTitle[Math.floor(Math.random() * categoriesTitle.length)];
      const introText = introTexts[Math.floor(Math.random() * introTexts.length)];

      // 🔥 RANDOM SEPARATORS
      const separators = ["🔥", "⚡", "💀", "🚀", "🔱"];
      const separator = separators[Math.floor(Math.random() * separators.length)];

      const categorizedCommands = {};
      commands.map((command) => {
        if (!categorizedCommands[command.category]) {
          categorizedCommands[command.category] = true;
        }
      });

      // 🔥 CREATE RANDOMIZED MENU
      const menuText = `
${header}
🤖 *𝐁𝐎𝐓 𝐍𝐀𝐌𝐄:* ${Config.botname}  
👑 *𝐎𝐖𝐍𝐄𝐑:* ${Config.ownername}  
⏳ *𝐔𝐏𝐓𝐈𝐌𝐄:* ${runtime(process.uptime())}  
💾 *𝐑𝐀𝐌 𝐔𝐒𝐀𝐆𝐄:* ${formatp(os.totalmem() - os.freemem())}  
⚡ *𝐓𝐎𝐓𝐀𝐋 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒:* ${Object.keys(categorizedCommands).length}  
🚀 *𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐕𝐎𝐑𝐓𝐄𝐗 𝐑𝐄𝐁𝐈𝐑𝐓𝐇*  
${footer}

${readmore}

${introText}  

${categoryHeader}  
${Object.keys(categorizedCommands).map((cat) => `${separator} ${fancytext(cat, 1)}`).join("\n")}

💀 *𝐕𝐑𝐓 - 𝐍𝐎 𝐌𝐄𝐑𝐂𝐘* 💀`;

      const messageOptions = {
        caption: menuText,
        ephemeralExpiration: 3000,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: chaos", error);
    }
  },
);
