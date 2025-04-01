const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });

//=======[dependencies]====================//
global.SESSION_ID = process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0JzeHpYelhHNTc2UXJtYUc3NlB2cTcyUXhiUzhDaW1vQldTcDlsbHgwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFgrMGt5OXAwOVN0RDNMeTlmZ1FkNzlLZDRaRWtrcFA5VW0zeWY0ZHhqRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjTGdHY01pWXJGQ0xyRVJla1EwMWZRdUluY0NtTTVhYlVWVlQxZENLZGxVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBS0dhaHVkbnRtM1h0SFcxd210UDVTVWJRTm9jRUc4VjU0bW5QT1QrY2hrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBU0d3RFp0Rm1JRjZFSUs1ekljbitGUjFWeTRjY1AvTng3U01iOVhQbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InY3RXhpZHFUeER5S3JXTFM4Wkl6MndVRUNRN3BYdm9sVVAwRlVGZTdYbW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVB6MDJrT0pndllwU2N4cHRnVVh3dCs4dkZsNmphM0NEVkJMc1VQaG5GTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFVPdE40MzRmKzBlOTRKVFhZWC8wQjZCaEVuaDQxdkdRUzNvMGE5dFl5Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlV6R0wxVUhVRHVRd3JIdjU0a0ZWb2JTTkFEYjRweWFzSzBNdENFSTZudnlaTUJlYVdQZ2pUeWlpdGU3elZGS3JFeC93dTdYa0RGU1dOQ3d3U01kMURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJaU0pBTGJuQmE2eGg4M0U5cGFlYW41Tk5WT1FiR0FMSjZsQmNzNEs3N1hzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiSUFRVUVyOFI0cXRxMjNEQTVmQ2tnIiwicGhvbmVJZCI6IjBjZjJiN2U0LWNkNzItNDZjNC05NjIzLWUwMTNjMDUyOWY1MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0bmo1VHhRdTllRktLam5nZUZCdkpUYXJVQUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEhCQStPMk9zUHh2L2VBVWFNL2dDZGYzakJVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhQR0tIOTQxIiwibWUiOnsiaWQiOiIyMzQ3MDQ1Nzg3ODIzOjUwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJS09yN3NHRUxMVHNMOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaNzhwcEUxZU1SYTJBNTJXc2hLV21XdlRRYzhLbjlXem1hdXhHdFBEZlR3PSIsImFjY291bnRTaWduYXR1cmUiOiJkRlVjZC9HdklLd1dZR2ppRERScmNBUU90M1FQY2ZPSjJwaDhDR0w0WlBndWxsRmxxVjdpTDZtUkdjTDkyTVQyb25HVzkzMTdWMkQ4Vk5XZURHNU5EQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiK2JGNlNpbTR1Y3JNRTRTakZ3N3g0cGVZR1k2Y1R3OGFJbXE3djV0OGJDRVluaXU5YlMrUmFEYmpHZXNSZC9ERjlZTG9Jc0VlNmR3aHFjUWlDOGp3Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQ1Nzg3ODIzOjUwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldlL0thUk5YakVXdGdPZGxySVNscGxyMDBIUENwL1ZzNW1yc1JyVHczMDgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDM1MzA0MzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzdoIn0=";
global.MONGODB = process.env.MONGODB_URI || "mongodb+srv://mxgamecoder:mxgamecoder@cluster0.qf0nv.mongodb.net/?retryWrites=true&w=majority";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "null";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "2347045787823";
global.THUMB_IMAGE =
  process.env.THUMB_IMAGE ||
  process.env.IMAGE || "https://i.ibb.co/9k9G7b0Q/VRT8.jpg,https://i.ibb.co/cXc6sQNY/images.jpg,https://i.ibb.co/WNYZPPYk/VRT2.jpg,https://i.ibb.co/yc3bPzXb/Whats-App-Image-2025-03-13-at-21-09-18-f9c0dc6e.jpg"; // do not touch it
global.userImages =
  process.env.USER_IMAGES || "https://i.ibb.co/sJmzjTKZ/Whats-App-Image-2025-03-13-at-21-09-16-0391efd6.jpg,https://i.ibb.co/5mX6NyB/Whats-App-Image-2025-03-13-at-21-09-13-37b1c89f.jpg,https://i.ibb.co/99Bj1V13/Whats-App-Image-2025-03-13-at-21-09-11-d9964158.jpg,https://i.ibb.co/XZvGDVv0/Whats-App-Image-2025-03-13-at-21-09-15-5c5780ac.jpg"; // do not touch it
///===========[global iMPORTS]====================//

module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.4.0",
  caption: process.env.CAPTION || "`𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙`",
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
global.location = "ANbuja, Nigeria";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/msgamecoder/vortex-rebirth";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vb06pAP4IBhMMnZtnM3X";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029Vb06pAP4IBhMMnZtnM3X";
global.devs = "2349021506036";
global.msg_style = process.env.STYLE || "1";
global.session_reset = process.env.SS_RESET || "false";
global.gdbye = process.env.GOODBYE || "false";
global.wlcm = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "true";
(global.disablegroup = process.env.DISABLE_GROUPS || "true"),
  (global.MsgsInLog = process.env.MSGS_IN_LOG || "true");
global.waPresence = process.env.WAPRESENCE || "recording";
global.readcmds = process.env.READ_COMMAND || "true";
global.readmessage = process.env.READ_MESSAGE || "true";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";
global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://vrt-7zsv.onrender.com";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
