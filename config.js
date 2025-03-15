const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });

//=======[dependencies]====================//
global.SESSION_ID = process.env.SESSION_ID || "enter your VRT session id here";
global.MONGODB = process.env.MONGODB_URI || "mongodb+srv://mxgamecoder:mxgamecoder@cluster0.qf0nv.mongodb.net/?retryWrites=true&w=majority";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "null";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "2349021506036";
global.THUMB_IMAGE =
  process.env.THUMB_IMAGE ||
  process.env.IMAGE ||
  "https://i.ibb.co/0Rp94c0t/VRT6.jpg,https://i.ibb.co/cSFgVZSd/VRT1.jpg,https://i.ibb.co/TMDx1Xwg/VRT4.jpg,https://i.ibb.co/y7pcntR/VRT3.jpg"; // do not touch it
global.userImages =
  process.env.USER_IMAGES ||
  "https://i.ibb.co/9k9G7b0Q/VRT8.jpg,https://i.ibb.co/cXc6sQNY/images.jpg,https://i.ibb.co/WNYZPPYk/VRT2.jpg,https://i.ibb.co/zH88t8ZR/VRT5.webp"; // do not touch it
///===========[global iMPORTS]====================//

module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.2.0",
  caption: process.env.CAPTION || "`VRT`",
  author: process.env.PACK_AUTHER || "𝐕𝐑𝐓",
  packname: process.env.PACK_NAME || "MX-GΔMΞCØDΞR",
  botname: process.env.BOT_NAME || "𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙",
  ownername: process.env.OWNER_NAME || "MX-GΔMΞCØDΞR",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "private",
  LANG: (process.env.THEME || "𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙").toUpperCase(),
};
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "olamilekandamilaraa@gmail.com";
global.location = "ANbuja, igeria";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/msgamecoder/vortex-rebirth";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vb06pAP4IBhMMnZtnM3X";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029Vb06pAP4IBhMMnZtnM3X";
global.devs = "2349021506036";
global.msg_style = process.env.STYLE || "1";
global.session_reset = process.env.SS_RESET || "false";
global.gdbye = process.env.GOODBYE || "true";
global.wlcm = process.env.WELCOME || "true";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "true";
(global.disablegroup = process.env.DISABLE_GROUPS || "true"),
  (global.MsgsInLog = process.env.MSGS_IN_LOG || "true");
global.waPresence = process.env.WAPRESENCE || "recording";
global.readcmds = process.env.READ_COMMAND || "true";
global.readmessage = process.env.READ_MESSAGE || "true";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "true";
global.save_status = process.env.AUTO_SAVE_STATUS || "true";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";
global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://vrt-7zsv.onrender.com/";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});