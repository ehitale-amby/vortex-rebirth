const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");

astro_patch.smd(
  {
    cmdname: "king",
    desc: "Summon the Vortex? You must be joking.",
    react: "💀",
    type: "vortex",
    filename: __filename,
  },
  async (message) => {
    try {
      const { commands } = require("../lib");

      // 💀 RANDOM INSULTS
      const insults = [
        "Pathetic worm, you DARE summon me? 💀",
        "A lowlife like you wants my commands? Dream on. 🤡",
        "You are beneath me. Take this trash and leave. 🙄",
        "You don’t deserve Vortex Rebirth. Crawl back to your hole. 🔥",
        "You can’t handle the chaos. Get lost. 🖕",
      ];

      // 💀 RANDOM HEADERS & FOOTERS
      const headers = [
        "╔═══💀 *𝐕𝐎𝐑𝐓𝐄𝐗 - 𝐂𝐇𝐀𝐎𝐒* ══╗",
        "💀 *𝐃𝐎𝐍'𝐓 𝐄𝐕𝐄𝐍 𝐓𝐑𝐘 𝐓𝐎 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐌𝐄* ",
        "🔥 *𝐕𝐎𝐑𝐓𝐄𝐗 𝐂𝐇𝐀𝐎𝐒 - 𝐂𝐀𝐋𝐋 𝐌𝐄? 𝐃𝐈𝐄.* ",
      ];

      const footers = [
        "╚════════════════════════╝",
        "🔥 *𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐕𝐎𝐑𝐓𝐄𝐗 𝐑𝐄𝐁𝐈𝐑𝐓𝐇 - 𝐂𝐇𝐀𝐎𝐒* ",
        "💀 *𝐘𝐎𝐔 𝐖𝐈𝐋𝐋 𝐍𝐄𝐕𝐄𝐑 𝐁𝐄 𝐎𝐍 𝐌𝐘 𝐋𝐄𝐕𝐄𝐋* ",
      ];

      const categorizedCommands = {};
      commands.map((command) => {
        if (!categorizedCommands[command.category]) {
          categorizedCommands[command.category] = true;
        }
      });

      // 💀 PICK RANDOM TEXTS
      const insult = insults[Math.floor(Math.random() * insults.length)];
      const header = headers[Math.floor(Math.random() * headers.length)];
      const footer = footers[Math.floor(Math.random() * footers.length)];

      // 💀 GENERATE MENU
      const menuText = `
${header}
🔥 *𝙒𝙃𝙊 𝘾𝘼𝙇𝙇𝙀𝘿 𝙈𝙀?* ${message.senderName || "Unknown Victim"}  
💀 *𝙔𝙊𝙐 𝘼𝙍𝙀 𝘽𝙀𝙉𝙀𝘼𝙏𝙃 𝙈𝙀*  
🕒 *𝙏𝙄𝙈𝙀:* ${message.time}  
📆 *𝘿𝘼𝙏𝙀:* ${message.date}  
💾 *𝙈𝙀𝙈𝙊𝙍𝙔 𝙐𝙎𝘼𝙂𝙀:* ${formatp(os.totalmem() - os.freemem())}  
⚡ *𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝘾𝘼𝙏𝙀𝙂𝙊𝙍𝙄𝙀𝙎:* ${Object.keys(categorizedCommands).length}  
${footer}

${readmore}

💀 *𝙑𝙊𝙍𝙏𝙀𝙓:* ${insult}

🛠️ *𝘼𝙑𝘼𝙄𝙇𝘼𝘽𝙇𝙀 𝘾𝘼𝙏𝙀𝙂𝙊𝙍𝙄𝙀𝙎:*  
${Object.keys(categorizedCommands).map((cat) => `🔪 ${tiny(cat)}`).join("\n")}

🔥 *𝙄 𝘼𝙈 𝙑𝙊𝙍𝙏𝙀𝙓. 𝙔𝙊𝙐 𝘼𝙍𝙀 𝙉𝙊𝙏𝙃𝙄𝙉𝙂.* `;

      const messageOptions = {
        caption: menuText,
        ephemeralExpiration: 3000,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: KING", error);
    }
  },
);
