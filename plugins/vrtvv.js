const { smd, bot_ } = require("../lib");
let bgmm = false;

/*antiviewonce*/
// 🔥 𝗔𝗡𝗧𝗜𝗩𝗜𝗘𝗪𝗢𝗡𝗖𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 🔥
smd(
    {
      cmdname: "antiviewonce",
      alias: ["antivv"],
      desc: "🚫 𝙏𝙪𝙧𝙣 𝙊𝙣/𝙊𝙛𝙛 𝘼𝙪𝙩𝙤 𝙑𝙞𝙚𝙬𝙊𝙣𝙘𝙚 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙧",
      fromMe: true,
      type: "user",
      use: "<on/off>",
      filename: __filename,
    },
    async (_0x5c3dd1, _0x543e4e) => {
      try {
        bgmm =
          (await bot_.findOne({
            id: "bot_" + _0x5c3dd1.user,
          })) ||
          (await bot_.new({
            id: "bot_" + _0x5c3dd1.user,
          }));
  
        let _0x446f76 = _0x543e4e.toLowerCase().split(" ")[0].trim();
        
        if (_0x446f76 === "on" || _0x446f76 === "enable" || _0x446f76 === "act") {
          if (bgmm.antiviewonce === "true") {
            return await _0x5c3dd1.reply("⚠️ *_𝗔𝗿𝗲 𝘆𝗼𝘂 𝗯𝗹𝗶𝗻𝗱? 𝗔𝗻𝘁𝗶𝗩𝗶𝗲𝘄𝗢𝗻𝗰𝗲 𝗶𝘀 𝗮𝗹𝗿𝗲𝗮𝗱𝘆 𝗲𝗻𝗮𝗯𝗹𝗲𝗱!_*");
          }
          await bot_.updateOne(
            { id: "bot_" + _0x5c3dd1.user },
            { antiviewonce: "true" }
          );
          return await _0x5c3dd1.reply("✅ *_𝗔𝗻𝘁𝗶𝗩𝗶𝗲𝘄𝗢𝗻𝗰𝗲 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗲𝗻𝗮𝗯𝗹𝗲𝗱!_*");
        } 
  
        else if (_0x446f76 === "off" || _0x446f76 === "disable" || _0x446f76 === "deact") {
          if (bgmm.antiviewonce === "false") {
            return await _0x5c3dd1.reply("⚠️ *_𝗜 𝘀𝘄𝗲𝗮𝗿, 𝗶𝗳 𝘆𝗼𝘂 𝗮𝘀𝗸 𝗺𝗲 𝗮𝗴𝗮𝗶𝗻... 𝗜𝘁'𝘀 𝗔𝗟𝗥𝗘𝗔𝗗𝗬 𝗗𝗜𝗦𝗔𝗕𝗟𝗘𝗗!_*");
          }
          await bot_.updateOne(
            { id: "bot_" + _0x5c3dd1.user },
            { antiviewonce: "false" }
          );
          return await _0x5c3dd1.reply("❌ *_𝗔𝗻𝘁𝗶𝗩𝗶𝗲𝘄𝗢𝗻𝗰𝗲 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗗𝗲𝗮𝗰𝘁𝗶𝘃𝗮𝘁𝗲𝗱!_*");
        } 
  
        else {
          return await _0x5c3dd1.send("❓ *_𝗨𝘀𝗲 𝗼𝗻/𝗼𝗳𝗳 𝘁𝗼 𝗲𝗻𝗮𝗯𝗹𝗲/𝗱𝗶𝘀𝗮𝗯𝗹𝗲 𝗔𝗻𝘁𝗶𝗩𝗶𝗲𝘄𝗢𝗻𝗰𝗲, 𝗱𝘂𝗺𝗯𝗮𝘀𝘀!_*");
        }
      } catch (_0x4bb48d) {
        await _0x5c3dd1.error(
          "❌ *_𝗬𝗼𝘂 𝗯𝗿𝗼𝗸𝗲 𝗶𝘁, 𝗮𝘀 𝗲𝘅𝗽𝗲𝗰𝘁𝗲𝗱._*\n\n🔻 *Error:* " +
            _0x4bb48d +
            "\n\n🛠️ *Command:* AntiViewOnce",
          _0x4bb48d
        );
      }
    }
  );
  
  // 💀 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 💀


/*vv*/
smd(
    {
      on: "viewonce",
    },
    async (_0x4a4a25, _0x1400fa) => {
      try {
        if (!bgmm) {
          bgmm = await bot_.findOne({
            id: "bot_" + _0x4a4a25.user,
          });
        }
        if (bgmm && bgmm.antiviewonce && bgmm.antiviewonce === "true") {
          let _0x52bb9a = {
            key: {
              ..._0x4a4a25.key,
            },
            message: {
              conversation: "📸 *[𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗 𝗩𝗜𝗘𝗪𝗢𝗡𝗖𝗘]* - 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗶𝗻𝗴...",
            },
          };
          let _0x58b72c = await _0x4a4a25.bot.downloadAndSaveMediaMessage(
            _0x4a4a25.msg
          );
          await _0x4a4a25.bot.sendMessage(
            _0x4a4a25.from,
            {
              [_0x4a4a25.mtype2.split("Message")[0]]: {
                url: _0x58b72c,
              },
              caption: _0x4a4a25.body || "🔍 *𝗔𝗻𝘁𝗶𝗩𝗶𝗲𝘄𝗢𝗻𝗰𝗲 𝗗𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻*",
            },
            {
              quoted: _0x52bb9a,
            }
          );
        }
      } catch (_0x6010c1) {
        console.log("🚨 𝗘𝗿𝗿𝗼𝗿 𝘄𝗵𝗶𝗹𝗲 𝗴𝗲𝘁𝘁𝗶𝗻𝗴 𝗔𝗻𝘁𝗶𝗩𝗶𝗲𝘄𝗢𝗻𝗰𝗲 𝗺𝗲𝗱𝗶𝗮:\n", _0x6010c1);
      }
    }
  );
  
  // 💀 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮 𝙑𝙤𝙧𝙩𝙚𝙭 𝙍𝙚𝙗𝙞𝙧𝙩𝙝 💀  