let {
  runtime,
  formatp,
  prefix,
  smd,
  smdBuffer,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const { performance } = require("perf_hooks");
const Config = require("../config");
const cheerio = require("cheerio");

smd(
  {
    cmdname: "caption",
    alias: ["setcaption"],
    desc: "Set caption for replied media message.",
    category: "misc",
    filename: __filename,
  },
  async (message, args) => {
    try {
      if (!message.reply_message || !args) {
        return await message.reply(
          !message.reply_message
            ? "🤡 *You’re dumber than I thought.* _Reply to a message with a caption & filename!_"
            : "😒 *What kind of empty brain request is this?* _Provide text to set the caption!_"
        );
      }

      const mediaTypes = ["image", "video", "document"];
      const msgType = message.reply_message.mtype;

      if (!mediaTypes.some((type) => msgType.includes(type))) {
        return await message.reply(
          "📵 *Listen here, genius...* _Reply to an image, video, or document message._"
        );
      }

      let [caption, fileName] = args.split("|").map((x) => x?.trim() || "null");

      if (!caption) {
        return await message.reply(
          "💀 *You forgot to add a caption.* Try again, brainiac."
        );
      }

      if (msgType.includes("document") && fileName === "null") {
        return await message.reply(
          "📄 *You wanna rename a document but forgot the name?* _Try again, fool._"
        );
      }

      message.reply_message.message[msgType].caption = caption;
      message.reply_message.message[msgType].fileName = fileName;

      await message.bot.copyNForward(message.chat, message.reply_message);

      let randomBranding = [
        "*Powered by Vortex Rebirth™* 💀",
        "*⚡ Vortex Rebirth at its finest ⚡*",
        "*🔥 Bow before Vortex Rebirth 🔥*",
      ];
      await message.reply(randomBranding[Math.floor(Math.random() * randomBranding.length)]);
    } catch (error) {
      console.error("❌ ERROR:", error);
      await message.error(error + "\n\ncommand: caption", error);
    }
  }
);

smd(
  {
    cmdname: "document",
    alias: ["senddoc", "todoc"],
    desc: "Convert replied image/video into a document.",
    category: "misc",
    filename: __filename,
  },
  async (message, args) => {
    try {
      let media =
        message.image || message.video
          ? message
          : message.reply_message && (message.reply_message.image || message.reply_message.video)
          ? message.reply_message
          : false;

      if (!media) {
        return await message.reply(
          "🤡 *Are you blind?* _Reply to an image/video message first!_"
        );
      }

      if (!args) {
        return await message.reply(
          "📄 *You forgot something...* _Provide a filename!_\n\n*Example:* `document themx | caption`"
        );
      }

      let savedMedia = await message.bot.downloadAndSaveMediaMessage(media);
      if (!savedMedia) {
        return await message.reply("❌ *Download failed!* _Try again, clown._");
      }

      let separator = args.includes(":") ? ":" : args.includes(";") ? ";" : "|";
      let [fileName, caption] = args.split(separator).map((x) => x?.trim() || "");
      fileName = (fileName || "file") + (media.image ? ".jpg" : ".mp4");
      caption = ["copy", "default", "old", "reply"].includes(caption) ? media.text : caption;

      await message.bot.sendMessage(message.chat, {
        document: { url: savedMedia },
        mimetype: media.mimetype,
        fileName: fileName,
        caption: caption,
      });

      let randomBranding = [
        "*📂 Converted with Vortex Rebirth™* 💀",
        "*⚡ Document Mode: Activated ⚡*",
        "*🔥 Bow before Vortex Rebirth 🔥*",
      ];
      await message.reply(randomBranding[Math.floor(Math.random() * randomBranding.length)]);
    } catch (error) {
      console.error("❌ ERROR:", error);
      await message.error(error + "\n\ncommand: document", error);
    }
  }
);


/*vrt*/
smd({
  cmdname: "feature",
  alias: ["totalfeature", "features", "vrt"],
  category: "tools",
  filename: __filename,
  info: "get counting for total features!"
}, async _0x4e7c63 => {
  try {
    const _0x4de967 = require("../lib/plugins");
    let _0x4cf8ed = Object.values(_0x4de967.commands).length;
    try {
      let {
        key: _0x2d7cf6
      } = await _0x4e7c63.send("Counting... 0", {}, "vrt", _0x4e7c63);
      for (let _0x16a10f = 0; _0x16a10f <= _0x4cf8ed; _0x16a10f++) {
        if (_0x16a10f % 15 === 0) {
          await _0x4e7c63.send("Counting... " + _0x16a10f, {
            edit: _0x2d7cf6
          }, "vrt", _0x4e7c63);
        } else if (_0x4cf8ed - _0x16a10f < 10) {
          await _0x4e7c63.send("Counting... " + _0x16a10f, {
            edit: _0x2d7cf6
          }, "vrt", _0x4e7c63);
        }
      }
      await _0x4e7c63.send("*Feature Counting Done!*", {
        edit: _0x2d7cf6
      }, "vrt", _0x4e7c63);
    } catch (_0x28ce7e) {}
    let _0x50f17a = " *乂 𝗩𝗢𝗥𝗧𝗘𝗫 𝗥𝗘𝗕𝗜𝗥𝗧𝗛 - ＢＯＴ ＦＥＡＴＵＲＥ乂* \n\n\n  ◦ ◦ _Ｔｏｔａｌ Ｆｅａｔｕｒｅｓ ➪ " + _0x4cf8ed + "_\n  \n*◦ BOT FEATURES*\n\n      Plugins ➪ " + Object.values(_0x4de967.commands).filter(_0x54d4bf => _0x54d4bf.pattern).length + "_\n      _Msg Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x2376a3 => _0x2376a3.on).length + "_\n      _Call Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x54a19b => _0x54a19b.call).length + "_\n      _Group Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x35381c => _0x35381c.group).length + "_\n  \n\n" + Config.caption;
    await _0x4e7c63.bot.relayMessage(_0x4e7c63.chat, {
      requestPaymentMessage: {
        currencyCodeIso4217: "PK",
        amount1000: _0x4cf8ed * 1000,
        requestFrom: "2349021506036@s.whatsapp.net",
        noteMessage: {
          extendedTextMessage: {
            text: _0x50f17a,
            contextInfo: {
              mentionedJid: [_0x4e7c63.sender],
              externalAdReply: {
                showAdAttribution: true
              }
            }
          }
        }
      }
    }, {});
  } catch (_0x979e23) {
    await _0x4e7c63.error(_0x979e23 + "\n\ncommand : feature", _0x979e23, false);
  }
});

/*ping*/

smd({
cmdname: "ping",
alias: ["botstatus", "statusbot", "p2"],
type: "tools",
info: "Check bot response time",
}, async (_0xdfc3ca) => {
try {
  // System Memory Usage
  const memoryUsage = process.memoryUsage();
  
  // CPU Information
  const cpus = os.cpus();
  const totalCPU = cpus.reduce((acc, cpu) => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    acc.total += total;
    acc.speed += cpu.speed / cpus.length;
    Object.keys(cpu.times).forEach(key => acc.times[key] += cpu.times[key]);
    return acc;
  }, {
    speed: 0,
    total: 0,
    times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
  });

  // Response Time Calculation
  const startTime = performance.now();
  const endTime = performance.now();
  const responseSpeed = (endTime - startTime).toFixed(4);

  // Stylish Response with Borders
  let response = `
╭━─━─━─[ *VORTEX REBIRTH - STATUS*

💻 *Server Info*  
┃ RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}  
┃ Uptime: ${runtime(process.uptime())}  

🚀 *Response Time*  
┃ Speed: ${responseSpeed} seconds  
┃ Latency: ${(endTime - startTime)} ms  

🛠 *NodeJS Memory Usage*  
┃ ${Object.entries(memoryUsage).map(([key, value]) => `- ${key}: ${formatp(value)}`).join("\n┃ ")}

🎛 *CPU Info*  
┃ Model: ${cpus[0].model.trim()}  
┃ Speed: ${totalCPU.speed} MHz  
┃ ${Object.entries(totalCPU.times).map(([key, value]) => `- ${key}: ${(value * 100 / totalCPU.total).toFixed(2)}%`).join("\n┃ ")}

╰━─━─━─[ *Now leave me alone, human. 😒*
`.trim();

  _0xdfc3ca.reply(response);
} catch (error) {
  await _0xdfc3ca.error(`❌ *ERROR*: ${error}\n\nCommand: mxping`, error, false);
}
});

/*Ip*/

smd({
cmdname: "myip",
alias: ["ip"],
type: "misc",
info: "Get bot's IP address",
}, async (_0x446c27) => {
try {
  let { data: ip } = await axios.get("https://api.ipify.org/");

  let response = `
╭━─━─━[ *VORTEX REBIRTH - IP STATUS*

🌍 *Bot's IP Address*  
┃ 📌 _${ip}_  

💀 *Now what? Gonna DDoS me? Pathetic. 😏*  

╰━─━─━[ *Leave me alone, insect. 🦟*
  `.trim();

  _0x446c27.send(ip ? response : "_No response from server!_");
} catch (error) {
  await _0x446c27.error(`❌ *ERROR*: ${error}\n\nCommand: myip`, error, false);
}
});

/*restart*/

const { exec } = require("child_process");

smd({
cmdname: "restart",
alias: ["reboot", "reset"],
type: "system",
info: "Restart the bot",
}, async (_0x446c27) => {
try {
  let response = `
╭━─━─━[ *VORTEX REBIRTH - RESTARTING*

⏳ *Restarting...*  
┃ 💀 _Pathetic... you made me do this._  
┃ 🔥 _I’ll be back. Stronger. Ruder._  

⏰ *Estimated Time:* _A few seconds... or maybe forever. 🤷_  

╰━─━─━[ *Don't miss me, insect. 🦟*
  `.trim();

  await _0x446c27.reply(response);
  
  setTimeout(() => {
    exec("pm2 restart all"); // If using PM2
    // process.exit(1);  // Use this if running without PM2
  }, 3000); // Delay for dramatic effect 😏
  
} catch (error) {
  await _0x446c27.error(`❌ *ERROR*: ${error}\n\nCommand: restart`, error, false);
}
});

/*alexa*/
smd({
cmdname: "alexa",
category: "ai",
use: "[text]",
filename: __filename,
info: "chat with simsimi alexa ai!"
}, async (_0xe6d6e, _0x23f786) => {
try {
  if (!_0x23f786) {
    return await _0xe6d6e.reply("Hi *" + _0xe6d6e.senderName + "*, do you want to talk?");
  }
  const _0x55bb61 = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "text=" + encodeURIComponent(_0x23f786) + "&lc=en&key="
  };
  const _0x5099c8 = await fetch("https://api.simsimi.vn/v2/simtalk", _0x55bb61);
  const _0x2c3e12 = await _0x5099c8.json();
  if (_0x2c3e12.status === "200" && _0x2c3e12.message) {
    _0xe6d6e.reply(_0x2c3e12.message);
  } else {
    _0xe6d6e.reply("*No Responce!*");
  }
} catch (_0xfee6e3) {
  await _0xe6d6e.error(_0xfee6e3 + "\n\ncommand : poetry", _0xfee6e3, false);
}
});

/*character*/
smd({
cmdname: "character",
category: "pastime",
use: "[@user]",
filename: __filename,
info: "𝘾𝙝𝙚𝙘𝙠 𝙩𝙝𝙚 𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙤𝙛 𝙖 𝙧𝙚𝙥𝙡𝙞𝙚𝙙 𝙪𝙨𝙚𝙧!"
}, async (𝙘𝙩𝙭) => {
const 𝙩𝙖𝙧𝙜𝙚𝙩𝙐𝙨𝙚𝙧 = 𝙘𝙩𝙭.reply_message 
  ? 𝙘𝙩𝙭.reply_message.sender 
  : 𝙘𝙩𝙭.mentionedJid && 𝙘𝙩𝙭.mentionedJid[0] 
    ? 𝙘𝙩𝙭.mentionedJid[0] 
    : "";

if (!𝙩𝙖𝙧𝙜𝙚𝙩𝙐𝙨𝙚𝙧 || !𝙩𝙖𝙧𝙜𝙚𝙩𝙐𝙨𝙚𝙧.includes("@")) {
  return await 𝙘𝙩𝙭.reply("🖕 *𝙈𝙚𝙣𝙩𝙞𝙤𝙣 𝙤𝙧 𝙧𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖 𝙪𝙨𝙚𝙧, 𝙮𝙤𝙪 𝙪𝙨𝙚𝙡𝙚𝙨𝙨 𝙙𝙤𝙣𝙠𝙚𝙮!*");
}

const 𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙏𝙧𝙖𝙞𝙩𝙨 = [
  "𝙎𝙞𝙜𝙢𝙖", "𝙂𝙧𝙪𝙢𝙥𝙮 𝘼𝙨𝙨", "𝙊𝙫𝙚𝙧𝙘𝙤𝙣𝙛𝙞𝙙𝙚𝙣𝙩", "𝙊𝙗𝙚𝙙𝙞𝙚𝙣𝙩", 
  "𝙂𝙤𝙤𝙙 𝙛𝙤𝙧 𝙣𝙤𝙩𝙝𝙞𝙣𝙜", "𝙎𝙞𝙢𝙥", "𝙆𝙞𝙣𝙙", "𝙋𝙖𝙩𝙞𝙚𝙣𝙩", "𝙋𝙚𝙧𝙫𝙚𝙧𝙩", 
  "𝘾𝙤𝙤𝙡 (𝙣𝙤𝙩)", "𝙃𝙚𝙡𝙥𝙡𝙚𝙨𝙨", "𝘽𝙧𝙞𝙡𝙡𝙞𝙖𝙣𝙩 (𝙞𝙣 𝙡𝙤𝙨𝙞𝙣𝙜)", "𝙎𝙚𝙭𝙮 (𝙞𝙣 𝙮𝙤𝙪𝙧 𝙙𝙧𝙚𝙖𝙢𝙨)", 
  "𝙃𝙤𝙩 𝙜𝙖𝙧𝙗𝙖𝙜𝙚", "𝙂𝙤𝙧𝙜𝙚𝙤𝙪𝙨 (𝙨𝙪𝙧𝙚, 𝙞𝙛 𝙪 𝙡𝙞𝙠𝙚 𝙩𝙧𝙖𝙨𝙝)", "𝘾𝙪𝙩𝙚", "𝙁𝙖𝙗𝙪𝙡𝙤𝙪𝙨", "𝙁𝙪𝙣𝙣𝙮 𝙡𝙤𝙤𝙠𝙞𝙣𝙜"
];

const 𝙘𝙝𝙤𝙨𝙚𝙣𝙏𝙧𝙖𝙞𝙩 = 𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙏𝙧𝙖𝙞𝙩𝙨[Math.floor(Math.random() * 𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙏𝙧𝙖𝙞𝙩𝙨.length)];
const 𝙧𝙚𝙨𝙥𝙤𝙣𝙨𝙚𝙈𝙚𝙨𝙨𝙖𝙜𝙚 = `👀 𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧 𝙤𝙛 @${𝙩𝙖𝙧𝙜𝙚𝙩𝙐𝙨𝙚𝙧.split("@")[0]} 𝙞𝙨 *${𝙘𝙝𝙤𝙨𝙚𝙣𝙏𝙧𝙖𝙞𝙩}* 🔥`;

𝙘𝙩𝙭.send(𝙧𝙚𝙨𝙥𝙤𝙣𝙨𝙚𝙈𝙚𝙨𝙨𝙖𝙜𝙚, { mentions: [𝙩𝙖𝙧𝙜𝙚𝙩𝙐𝙨𝙚𝙧] }, "vrt", 𝙘𝙩𝙭);
});

let tmpUrl = "https://telegra.ph/file/b8e96b599e0fa54d25940.jpg";
const secmailData = {};
smd(
  {
    pattern: "tempmail",
    alias: ["tmpmail", "newmail", "tempemail"],
    info: "Generate a temporary email address. Use it wisely... or foolishly. 😈",
    type: "tools",
  },
  async (message) => {
    try {
      if (!secmailData[message.sender]) {
        const generatedMail = await tempmail.create();
        if (!generatedMail || !generatedMail[0]) {
          return await message.reply("❌ *Request Denied!* _Try again, fool._");
        }
        const [login, domain] = generatedMail[0].split("@");
        secmailData[message.sender] = { email: generatedMail[0], login, domain };
      }

      let tempmailLogo = false;
      try {
        tempmailLogo = await smdBuffer(tmpUrl);
      } catch (error) {}

      const tempMailMessage = `
      *📩 TEMPORARY EMAIL INFO*  
        
      📧 *EMAIL:* ➪ ${secmailData[message.sender].email}  
      🔑 *Login:* ➪ ${secmailData[message.sender].login}  
      🌐 *Domain:* ➪ ${secmailData[message.sender].domain}  
      
      ⚡ *Commands:*  
      🔄 _${prefix}checkmail_ ➪ Get latest emails  
      🗑 _${prefix}delmail_ ➪ Delete current email  
      
      ${Config.caption}
      `.trim();

      await message.reply(tempMailMessage, {
        contextInfo: {
          ...(await message.bot.contextInfo("TEMPMAIL", message.senderName, tempmailLogo)),
        },
      });
    } catch (error) {
      console.error("❌ ERROR:", error);
      await message.reply("💀 *Something broke.* _Not my problem._");
    }
  }
);

smd(
  {
    pattern: "checkmail",
    alias: ["readmail", "reademail"],
    type: "tools",
    info: "🔍 Check your damn temp email... if you have one. 😏",
  },
  async (message) => {
    try {
      const user = message.sender;
      const userEmail = secmailData[user];

      if (!userEmail || !userEmail.email) {
        return await message.reply(
          `❌ *You don’t even have a temporary email, clown!* 🤡  
          📨 _Use_ *${prefix}tempmail* _to create one first!_`
        );
      }

      const emails = await tempmail.mails(userEmail.login, userEmail.domain);
      if (!emails || !emails[0] || emails.length === 0) {
        return await message.reply(
          `📭 *EMPTY INBOX!*  
          _No one cares about you... No emails received yet._ 😹  
          💀 *Use* _${prefix}delmail_ *to delete your useless mail!*`
        );
      }

      let toxicLogo = false;
      try {
        toxicLogo = await smdBuffer(tmpUrl);
      } catch (error) {}

      for (const mail of emails) {
        const emailContent = await tempmail.emailContent(
          userEmail.login,
          userEmail.domain,
          mail.id
        );

        console.log({ emailContent });

        if (emailContent) {
          const emailMessage = `
          💀 *NEW EMAIL ARRIVED* 💀  
          📩 *From:* ➪ ${mail.from}  
          📅 *Date:* ➪ ${mail.date}  
          🆔 *EMAIL ID:* ➪ [${mail.id}]  
          📜 *Subject:* ➪ ${mail.subject}  
          📖 *Content:* ➪ ${emailContent}  

          ⚡ *Feeling brave? Reply or delete it.*  
          `.trim();

          await message.reply(emailMessage, {
            contextInfo: {
              ...(await message.bot.contextInfo(
                `📩 *EMAIL ➪ ${mail.id}*`,
                message.senderName,
                toxicLogo
              )),
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      await message.reply("❌ *Something broke.* _Probably your brain._ 💀");
    }
  }
);
const tempmail = {};
tempmail.create = async () => {
  const _0x4b8b0a = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
  try {
    let _0x64d3a = await fetch(_0x4b8b0a);
    if (!_0x64d3a.ok) {
      throw new Error("HTTP error! status: " + _0x64d3a.status);
    }
    let _0x3d6ee6 = await _0x64d3a.json();
    return _0x3d6ee6;
  } catch (_0x5fcd34) {
    console.log(_0x5fcd34);
    return null;
  }
};
tempmail.mails = async (_0xf78957, _0x22b96c) => {
  const _0x52bcfa = "https://www.1secmail.com/api/v1/?action=getMessages&login=" + _0xf78957 + "&domain=" + _0x22b96c;
  try {
    let _0x334113 = await fetch(_0x52bcfa);
    if (!_0x334113.ok) {
      throw new Error("HTTP error! status: " + _0x334113.status);
    }
    let _0x21e568 = await _0x334113.json();
    return _0x21e568;
  } catch (_0x470fd0) {
    console.log(_0x470fd0);
    return null;
  }
};
tempmail.emailContent = async (_0x2bb874, _0x365dd7, _0x53af41) => {
  const _0x525052 = "https://www.1secmail.com/api/v1/?action=readMessage&login=" + _0x2bb874 + "&domain=" + _0x365dd7 + "&id=" + _0x53af41;
  try {
    let _0x5287ec = await fetch(_0x525052);
    if (!_0x5287ec.ok) {
      throw new Error("HTTP error! status: " + _0x5287ec.status);
    }
    let _0x321f50 = await _0x5287ec.json();
    const _0x2d0a5f = _0x321f50.htmlBody;
    console.log({
      htmlContent: _0x2d0a5f
    });
    const _0x59fd31 = cheerio.load(_0x2d0a5f);
    const _0x492dcb = _0x59fd31.text();
    return _0x492dcb;
  } catch (_0x47924e) {
    console.log(_0x47924e);
    return null;
  }
};
