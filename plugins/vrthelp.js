const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");

astro_patch.smd(
  {
    cmdname: "help",
    desc: "You dare ask for help? Tsk.",
    react: "❓",
    type: "vortex",
    filename: __filename,
  },
  async (message) => {
    try {
      const helpText = `

╔═══⚡ *𝐕𝐎𝐑𝐓𝐄𝐗 𝐇𝐄𝐋𝐏* ⚡═══╗

🕒  *𝐓𝐈𝐌𝐄:*  ${message.time}  
📆  *𝐃𝐀𝐓𝐄:*  ${message.date}  
💾  *𝐑𝐀𝐌 𝐔𝐒𝐀𝐆𝐄:*  ${formatp(os.totalmem() - os.freemem())}  
⚡  *𝐂𝐔𝐑𝐑𝐄𝐍𝐓 𝐌𝐄𝐍𝐔𝐒:*  

   🔥 𝐂𝐇𝐀𝐎𝐒  
   👑 𝐊𝐈𝐍𝐆  

╚═════════════════╝


${readmore}

🔥 *𝐂𝐎𝐍𝐐𝐔𝐄𝐑 𝐎𝐑 𝐃𝐈𝐄. 𝐘𝐎𝐔 𝐂𝐇𝐎𝐎𝐒𝐄.* 

`;

      const messageOptions = {
        caption: helpText,
        ephemeralExpiration: 3000,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: help", error);
    }
  },
);
