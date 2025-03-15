let baseApi = process.env.API_SMD || global.api_smd || "https://api-smd-1.vercel.app";
const {
  tlang,
  ringtone,
  smd,
  fetchJson,
  smdJson,
  Insta,
  getRandom,
  tiny,
  fancytext,
  yt,
  sleep,
  botpic,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
  GDriveDl
} = require("../lib");
const {
  search,
  download
} = require("aptoide-scraper");
const ytdl = require("ytdl-secktor");
const yts = require("secktor-pack");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
var videotime = 2000;
var dlsize = 400;
const {
  cmd
} = require("../lib/plugins");


smd(
    {
      pattern: "wikimedia",
      desc: "Downloads wikimedia images.",
      category: "downloader",
      filename: __filename,
      use: "<text|search.>",
      react: "🔍",
    },
    async (message, match) => {
      try {
        if (!match) {
          return await message.reply(
            "💀 *You really expect me to read your mind?* 🔮\n_Provide a search query, idiot!_"
          );
        }
  
        let { wikimedia } = require("../lib");
        let results = (await wikimedia(match)) || [];
  
        if (!results || !results[0]) {
          return await message.reply(
            "😂 *Lmao, nothing found!* _Try searching properly next time, dumbass._"
          );
        }
  
        let limit =
          message.iscreator && match.split("|")[1] === "all"
            ? results.length
            : results.length > 5
            ? 5
            : results.length;
  
        for (let i = 0; i < limit; i++) {
          try {
            message.bot.sendFromUrl(
              message.from,
              results[i].image,
              `🎭 *Title:* ${results[i].title}\n🔗 *Source:* ${results[i].source}`,
              message,
              {},
              "image"
            );
          } catch (e) {
            console.log("Error sending image:", e);
          }
        }
      } catch (e) {
        await message.error(
          `⚠️ *Error detected, genius!* 🚨\n\n*Command:* wikimedia\n*Reason:* ${e}`,
          e
        );
      }
    }
  );

  smd({
    pattern: "facebook",
    alias: ["fb", "fbdl"],
    desc: "Downloads fb videos.",
    category: "downloader",
    filename: __filename,
    use: "<add fb url.>"
  }, async (_0x3a3af2, _0x5f4e7a) => {
    try {
      let _0xef90cc = _0x5f4e7a.split(" ")[0].trim();
      if (!_0xef90cc || !_0xef90cc.startsWith("https://")) {
        return await _0x3a3af2.send("*_Please Give me Facebook Video Url_*\n*Example _" + prefix + "fb https://www.facebook.com/watch/?v=2018727118289093_*");
      }
      let _0x3f4693 = await smdJson(baseApi + "/api/fb?url=" + _0xef90cc);
      if (!_0x3f4693 || !_0x3f4693.status) {
        return await _0x3a3af2.reply("*Invalid Video Url!*");
      }
      return await _0x3a3af2.bot.sendMessage(_0x3a3af2.chat, {
        video: {
          url: _0x3f4693.result.urls[0].url
        },
        caption: Config.caption
      }, {
        quoted: _0x3a3af2
      });
    } catch (_0x2c7814) {
      await _0x3a3af2.error(_0x2c7814 + "\n\ncommand: facebook", _0x2c7814, "*_video not Found!!!_*");
    }
  });

  smd(
    {
      pattern: "gitclone",
      desc: "Downloads repositories from GitHub.",
      category: "downloader",
      filename: __filename,
      use: "<repo URL>",
      react: "🐍",
    },
    async (message, match) => {
      try {
        let repoUrl = match
          ? match
          : message.reply_message
          ? message.reply_message.text
          : "";
  
        if (!match) {
          return await message.reply(
            "🤡 *Are you seriously this dumb?* _Provide a valid repository URL, idiot!_\n\n📌 Example: _.gitclone https://github.com/msgamecoder/bigboy_"
          );
        }
  
        const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
        if (!regex.test(match)) {
          return await message.reply(
            "🛑 *That's not even a valid GitHub URL, fool!* _Try again properly._"
          );
        }
  
        let [, owner, repo] = match.match(regex) || [];
        repo = repo.replace(/.git$/, "");
        let apiUrl = `https://api.github.com/repos/${owner}/${repo}/zipball`;
  
        let fileName = (await fetch(apiUrl, { method: "HEAD" }))
          .headers.get("content-disposition")
          .match(/attachment; filename=(.*)/)[1];
  
        await message.bot.sendMessage(message.jid, {
          document: { url: apiUrl },
          fileName: fileName,
          mimetype: "application/zip",
        });
  
        await message.reply(
          `🎉 *Download started, moron!* 🚀\n\n📦 *Repo:* ${repo}\n🔗 *Owner:* ${owner}`
        );
      } catch (e) {
        return message.error(
          `🤦‍♂️ *Error detected, dumbass!* ⚠️\n\n*Command:* gitclone\n*Reason:* ${e}`,
          e,
          "*_File not found!!!_* 🤡"
        );
      }
    }
  );

  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;

  smd(
    {
      pattern: "downmp4",
      alias: ["mp4down", "mp4fromurl"],
      desc: "Download MP4 from a given URL.",
      category: "downloader",
      use: "<url>",
      filename: __filename,
      react: "🎥",
    },
    async (message, match) => {
      try {
        let videoUrl = ("" + (match ? match : message.reply_text))
          .split(" ")[0]
          .toLowerCase()
          .trim();
  
        if (!videoUrl || !videoUrl.startsWith("http")) {
          return message.reply(
            `🤡 *Are you brain-dead?* _Give me a valid video link, fool!_\n\n📌 Example: _.downmp4 https://telegra.ph/file/ba9ced500f9eca7db8ab.mp4_`
          );
        }
  
        var fileType = match.toLowerCase().includes("doc") ? "document" : "video";
  
        await message.bot.sendMessage(
          message.chat,
          {
            [fileType]: {
              url: videoUrl,
            },
            caption: "🔥 *HERE WE GO, LOSER!* 🚀",
            contextInfo: {
              ...(await message.bot.contextInfo(Config.botname, message.senderName)),
            },
          },
          { quoted: message }
        );
      } catch (e) {
        await message.error(
          `⚠️ *Error found, dumbass!* 🤦‍♂️\n\n*Command:* downmp4\n*Reason:* ${e}`,
          e,
          "*_Try giving me a real video URL, moron!_* 🤡"
        );
      }
    }
  );
  
  smd(
    {
      pattern: "sound",
      desc: "Downloads TikTok ringtone.",
      category: "downloader",
      filename: __filename,
      use: "<Download TikTok Sounds>",
      react: "🔊",
    },
    async (message, match) => {
      try {
        if (!match) {
          return message.reply(
            `🤡 *You seriously think I can read your mind?* _Give a damn number!_\n\n📌 Example: _.sound 5_`
          );
        }
  
        const soundNumber = parseInt(match);
        if (isNaN(soundNumber) || soundNumber < 1 || soundNumber > 160) {
          return message.reply(
            `❌ *What kind of nonsense is this?* _Pick a number between 1 and 160, idiot!_ 🤦‍♂️`
          );
        }
  
        let soundUrl = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${soundNumber}.mp3`;
        let soundBuffer = await getBuffer(soundUrl);
  
        var contextData = {
          ...(await message.bot.contextInfo(
            Config.botname,
            `🔥 ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ ${soundNumber}`
          )),
        };
  
        let audioMessage = {
          audio: soundBuffer,
          fileName: `VRT_TikTok_Sound_${soundNumber}.m4a`,
          mimetype: "audio/mpeg",
          ptt: true,
          contextInfo: contextData,
        };
  
        return message.bot.sendMessage(message.chat, audioMessage, {
          quoted: message,
        });
      } catch (e) {
        return message.error(
          `⚠️ *Error, dumbass!* 🤦‍♂️\n\n*Command:* sound\n*Reason:* ${e}`,
          e,
          "*_Try giving me a valid number next time, clown!_* 🤡"
        );
      }
    }
  );
  
  smd(
    {
      pattern: "ringtone",
      desc: "Downloads a ringtone.",
      category: "downloader",
      filename: __filename,
      use: "<ringtone name>",
      react: "📱",
    },
    async (message, match) => {
      try {
        if (!match) {
          return message.reply(
            `🤡 *Are you expecting me to guess the ringtone name?* _Type something, fool!_\n\n📌 Example: _.ringtone back in black_`
          );
        }
  
        const { ringtone } = require("../lib/scraper");
        let ringtoneData = await ringtone(match);
  
        if (!ringtoneData || !ringtoneData[0]) {
          return message.reply(
            `❌ *Useless human!* _I couldn't find any ringtone with that name. Try again!_ 🤦‍♂️`
          );
        }
  
        var contextData = {
          ...(await message.bot.contextInfo(
            Config.botname,
            `📱 ʀɪɴɢᴛᴏɴᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ`
          )),
        };
  
        let ringtoneMessage = {
          audio: {
            url: ringtoneData[0].audio,
          },
          caption: `🎵 *${ringtoneData[0].title}*`,
          fileName: `${ringtoneData[0].title}.mp3`,
          mimetype: "audio/mpeg",
          contextInfo: contextData,
        };
  
        return message.bot.sendMessage(message.jid, ringtoneMessage, {
          quoted: message,
        });
      } catch (e) {
        return message.error(
          `⚠️ *Error, clown!* 🤡\n\n*Command:* ringtone\n*Reason:* ${e}`,
          e,
          "*_No ringtone found! Try a different name, genius!_* 🤦‍♂️"
        );
      }
    }
  );
  
  smd(
    {
      pattern: "song",
      alias: ["audio"],
      desc: "Downloads audio from YouTube.",
      category: "downloader",
      filename: __filename,
      use: "<song name>",
      react: "🎵",
    },
    async (message, match) => {
      try {
        if (!match) {
          return await message.reply(
            "🎤 *Did you forget how to type?* _Give me a song name, fool!_\n\n📌 Example: _.song Never Gonna Give You Up_"
          );
        }
  
        let searchResults = await yts(match);
        let songData = searchResults.all[0];
  
        if (!songData) {
          return message.reply(
            "❌ *No results found!* _Maybe the song only exists in your imagination!_ 🤡"
          );
        }
  
        let responseText = `🎶 *VRT• SONG DOWNLOADER* 🎶\n\n` +
          `*🎧 Title:* ${songData.title}\n` +
          `*🔗 URL:* ${songData.url}\n` +
          `*⏱ Duration:* ${songData.timestamp}\n` +
          `*👀 Views:* ${songData.views}\n` +
          `*📅 Uploaded:* ${songData.ago}\n` +
          `*👤 Author:* ${songData.author.name}\n\n` +
          `⚡ *Reply with:* _1 for Video_ or _2 for Audio._`;
  
        let thumbnailBuffer = await smdBuffer(songData.thumbnail);
  
        var contextData = {
          ...(await message.bot.contextInfo(Config.botname, "🎵 ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ", thumbnailBuffer)),
        };
  
        await message.bot.sendMessage(message.jid, {
          image: thumbnailBuffer,
          caption: responseText,
          contextInfo: contextData,
        });
      } catch (e) {
        return message.error(
          `⚠️ *Error, dumb human!* 🤡\n\n*Command:* song\n*Reason:* ${e}`,
          e,
          "*_Couldn't find the song. Try harder!_* 🎧"
        );
      }
    }
  );

  smd(
    {
      pattern: "yts",
      alias: ["yt", "ytsearch"],
      desc: "Search for a song on YouTube.",
      category: "downloader",
      filename: __filename,
      use: "<search query>",
      react: "🔍",
    },
    async (message, match) => {
      try {
        if (!match) {
          return await message.reply(
            "🤡 *Are you dumb?* _Give me something to search for!_\n\n📌 Example: _.yts Never Gonna Give You Up_"
          );
        }
  
        let searchResults = await yts(match);
        let responseText = `🎶 *VRT • SONG SEARCH* 🎶\n` +
          `_______________________________\n\n` +
          `_Reply with a number to download:_\n` +
          `🎵 *1 mp3* - Audio\n` +
          `📽 *1 video* - Video\n` +
          `📄 *1 document* - As File\n\n` +
          `🔎 *Results for:* _${match}_\n\n`;
  
        let count = 1;
        for (let result of searchResults.all) {
          responseText += `\n*${count++} : ${result.title} ${result.timestamp ? "(" + result.timestamp + ")" : ""}*\n` +
            `🔗 *URL:* ${result.url}`;
        }
  
        return await message.sendMessage(
          message.chat,
          {
            image: { url: searchResults.all[0].thumbnail },
            caption: responseText,
          },
          { quoted: message }
        );
      } catch (error) {
        return message.reply(
          `⚠️ *Error!* 🤡\n\n*Command:* yts\n*Reason:* ${error}`,
          error,
          "*_Couldn't fetch results. Maybe YouTube blocked you!_* 🔍"
        );
      }
    }
  );
  
smd({
    pattern: "mediafire",
    desc: "Download files from MediaFire.",
    category: "downloader",
    filename: __filename,
    use: "<paste_mediafire_link>"
  }, async (_0x55aba2, _0x56da6b) => {
    try {
      if (!_0x56da6b || !_0x56da6b.includes("mediafire.com")) {
        return _0x55aba2.reply("💀 *You dumb or what?* That ain't a MediaFire link. Try again, genius.");
      }
  
      await _0x55aba2.reply("_⚡ Fetching your pathetic file... Don't waste my time._");
  
      const fileInfo = await MediaFire(_0x56da6b);
      if (!fileInfo || !fileInfo.link) {
        return _0x55aba2.reply("🤡 *Oops!* That file is gone. Cry about it.");
      }
  
      await _0x55aba2.bot.sendMessage(
        _0x55aba2.jid,
        {
          document: {
            url: fileInfo.link
          },
          fileName: fileInfo.name,
          mimetype: fileInfo.mime,
          caption: `📥 *${fileInfo.name}*\n_Here, take your useless file._\n\n⚠️ *Don't ask me for more favors, human.*`
        },
        { quoted: _0x55aba2 }
      );
  
    } catch (_0x1313db) {
      return _0x55aba2.reply(`🚨 *Error:* Even I can't fix your mess. \n\n_🗑️ Just quit._`);
    }
  });
  
  // Function to scrape MediaFire file details
  async function MediaFire(url) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const fileName = $(".filename").text().trim();
      const fileSize = $(".fileinfo").text().split(" ")[1];
      const fileLink = $("a[aria-label='Download file']").attr("href");
  
      if (!fileLink) return null;
  
      return {
        name: fileName,
        size: fileSize,
        link: fileLink,
        mime: "application/octet-stream" // Default MIME type
      };
    } catch (error) {
      return null;
    }
  }

  smd(
    {
      pattern: "insta",
      alias: ["igdl", "reel", "ig", "instadl"],
      desc: "Download Instagram reels or image posts",
      category: "downloader",
      use: "<instagram post/reel link>",
      filename: __filename,
      react: "📸",
    },
    async (message, match) => {
      try {
        let instaUrl = ("" + (match ? match : message.reply_text))
          .split(" ")[0]
          .toLowerCase()
          .trim();
  
        if (!instaUrl || !instaUrl.includes("instagram.com")) {
          return message.reply(
            `🤡 *You blind or what?* _Drop a valid Instagram link, fool!_\n\n📌 Example: _.insta https://www.instagram.com/reel/xyz_`
          );
        }
  
        const apiUrl = `https://delirius-apiofc.vercel.app/download/igv2?url=${instaUrl}`;
        const { data } = await axios.get(apiUrl);
  
        if (!data.status || !data.data) {
          await message.react("❌");
          return message.reply("🤦‍♂️ *API fail!* _Try another link, dummy!_");
        }
  
        const { username, fullname, caption, likes, comments, followed, download } = data.data;
  
        const captionText = `📸 *Instagram Post* 📸\n\n` +
                            `👤 *User:* ${fullname} (@${username})\n` +
                            `❤️ *Likes:* ${likes}\n💬 *Comments:* ${comments}\n👥 *Followers:* ${followed}\n` +
                            `📝 *Caption:*\n${caption || "No caption available."}`;
  
        for (const media of download) {
          var fileType = media.type === "image" ? "image" : "video";
  
          await message.bot.sendMessage(
            message.chat,
            {
              [fileType]: {
                url: media.url,
              },
              caption: captionText,
              contextInfo: {
                ...(await message.bot.contextInfo(Config.botname, message.senderName)),
              },
            },
            { quoted: message }
          );
        }
  
        await message.react("✅");
      } catch (e) {
        console.error("Error in Instagram downloader command:", e);
        await message.react("❌");
        message.reply(
          `⚠️ *Error found, dumbass!* 🤦‍♂️\n\n*Command:* insta\n*Reason:* ${e.message}\n\n*_Use a real Instagram link, moron!_* 🤡`
        );
      }
    }
  );
  
  smd(
    {
      pattern: "download",
      alias: ["dl", "downloads"],
      desc: "Shows all downloader commands",
      category: "downloader",
      filename: __filename,
      react: "📥",
    },
    async (message, match) => {
      try {
        await message.react("📥");
  
        await message.reply(
          `😒 Tsk, tsk... so you need downloader commands? Pathetic! 🤡  
          
          🔻 *You think I’d just hand them over?* Nah, beg harder, fool.  
          
          🔹 More downloader commands? Maybe… if I ever feel like giving you anything.  
  
          🔥 *Powered by Vortex Rebirth* 🔥`
        );
      } catch (e) {
        console.error("Error in downloader list:", e);
        await message.react("❌");
        message.reply(
          `⚠️ *Error detected, dumbass!* 🤦‍♂️  
          
          *Command:* downloader  
          *Reason:* ${e.message}  
          
          *_Now get lost before I crash your weak little brain!_* 🤡`
        );
      }
    }
  );
  