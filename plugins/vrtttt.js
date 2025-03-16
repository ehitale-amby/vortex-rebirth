const { smd } = require("../lib");
const axios = require('axios');
const fs = require("fs");
const path = require("path");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fetch = require("node-fetch");

smd(
  {
    pattern: "define",
    alias: ["meaning", "dict"],
    desc: "📖 Find the meaning of a word.",
    category: "intelligence",
    react: "🧠",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) {
        return message.reply(
          "🤡 *You forgot the word, dumbass!* _Try again with some brain cells._\n\n📌 Example: _.define idiot_"
        );
      }

      const word = match.trim();
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await axios.get(url);
      const definitionData = response.data[0];

      const definition = definitionData.meanings[0].definitions[0].definition;
      const example =
        definitionData.meanings[0].definitions[0].example ||
        "No example for your tiny brain.";
      const synonyms =
        definitionData.meanings[0].definitions[0].synonyms.join(", ") ||
        "No synonyms. You're out of luck.";

      const wordInfo = `
📖 *Word:* _${definitionData.word}_
🧠 *Definition:* _${definition}_
💡 *Example:* _${example}_
🔗 *Synonyms:* _${synonyms}_

🔥 _Powered by Vortex Rebirth, the only bot that tolerates your stupidity._`;

      return message.reply(wordInfo);
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 404) {
        return message.reply(
          "🚫 *That word doesn't exist, just like your intelligence.*"
        );
      }
      return message.reply(
        "⚠️ *Something went wrong.* Probably your fault. Try again."
      );
    }
  }
);

const diaryFile = path.join(__dirname, "../my_data/diary.json");
let diaries = fs.existsSync(diaryFile) ? JSON.parse(fs.readFileSync(diaryFile, 'utf8')) : {};

const saveDiaries = () => {
    fs.writeFileSync(diaryFile, JSON.stringify(diaries, null, 2));
};

const DIARY_IMG = "https://i.ibb.co/TDDRCfFx/peakpx.jpg"; 

// ---------------------
// .diary command (open or create diary)
// ---------------------
smd({
    pattern: "diary",
    desc: "📖 Open or create your pathetic diary.",
    category: "private",
    filename: __filename
}, async (message, match, { sender }) => {
    const userId = sender;

    console.log(`Received password: "${match}"`);

    if (!diaries[userId]) {
        if (!match || !match.trim()) return message.reply("📖 *No diary detected, fool!*\nCreate one using:\n`.diary yourpassword`");

        if (match.trim().length < 8) return message.reply("⚠️ *Password must be at least 8 characters, dumbass!*");

        diaries[userId] = { password: match.trim(), entries: [] };
        saveDiaries();
        return message.reply("✅ *Your secret diary has been created!*\n_To add an entry, use `.setdiary your message`_\n_To open, use `.diary yourpassword`_");
    }

    if (!match || !match.trim()) return message.reply("🔒 *You already have a diary, dumbass!*\nTo open it, type:\n`.diary yourpassword`");

    console.log(`Stored password: "${diaries[userId].password}"`);

    if (match.trim().length < 8) return message.reply("⚠️ *Password must be at least 8 characters, dumbass!*");

    if (match.trim() !== diaries[userId].password) {
        console.log(`Password mismatch! Entered: "${match.trim()}", Expected: "${diaries[userId].password}"`);
        return message.reply("❌ *Wrong password! Even your memory is trash!*");
    }

    if (diaries[userId].entries.length === 0) return message.reply("📖 *Your diary is as empty as your brain.*\n_Add entries using `.setdiary your message`_");

    let diaryEntries = `📖 *Your Lame Diary Entries:*\n\n`;
    diaries[userId].entries.forEach((entry) => {
        diaryEntries += `📅 *${entry.date}* 🕒 *${entry.time}*\n📝 ${entry.text}\n\n`;
    });

    try {
        console.log("Attempting to send diary entries...");
        if (!DIARY_IMG) throw new Error("DIARY_IMG URL is missing or invalid.");

        await message.conn.sendMessage(message.jid, {
            image: { url: DIARY_IMG },
            caption: diaryEntries
        });

        console.log("Diary entries sent successfully.");
    } catch (error) {
        console.error("❌ Error sending diary:", error);
        return message.reply("❌ *Something went wrong while fetching your diary. Try again later, fool!*");
    }
});



// ---------------------
// .setdiary command (add a new diary entry)
// ---------------------
smd({
    pattern: "setdiary",
    desc: "✍️ Write a dumb diary entry.",
    category: "private",
    filename: __filename
}, async (message, match, { sender }) => { // Removed isOwner
    const userId = sender;
    if (!diaries[userId]) return message.reply("❌ *No diary found, idiot! Create one using `.diary yourpassword`*.");

    if (!match) return message.reply("✍️ *Write something, lazy bum!*");

    const now = new Date();
    const date = now.toLocaleDateString('fr-FR');
    const time = now.toLocaleTimeString('fr-FR', { hour12: false });

    diaries[userId].entries.push({ date, time, text: match.trim() });
    saveDiaries();

    message.reply("✅ *Your pathetic diary entry has been saved!*");
});


// ---------------------
// .resetdiary command (delete all diary entries)
// ---------------------

smd({
    pattern: "resetdiary",
    desc: "🗑️ Erase your dumb diary.",
    category: "private",
    filename: __filename
}, async (message, match, { sender }) => { // Removed isOwner
    const userId = sender;

    if (!diaries[userId]) return message.reply("❌ *You have no diary to erase, clown!*");

    if (!match) return message.reply("⚠️ *To delete your trash diary, confirm using `.resetdiary yourpassword`*");

    if (match.trim() !== diaries[userId].password) return message.reply("❌ *Wrong password! Try again, genius.*");

    delete diaries[userId];
    saveDiaries();

    message.reply("✅ *Your useless diary has been wiped out!*");
});


// ---------------------
// .resetpassword command (reset diary password; Owner only)
// ---------------------
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString(); 
let resetRequests = {};

smd({
    pattern: "resetpassword",
    desc: "🔑 Reset your forgotten password.",
    category: "private",
    filename: __filename
}, async (message, match, { sender }) => { // Removed isOwner
    const userId = sender;
    if (!diaries[userId]) return message.reply("❌ *You don't even have a diary, dumbass!*");

    if (!match) {
        const resetCode = generateCode();
        resetRequests[userId] = { code: resetCode, expires: Date.now() + 5 * 60 * 1000 };
        
        await message.conn.sendMessage(userId, { 
            text: `🔐 *Your reset code:* *${resetCode}*\n\n_Expires in 5 minutes!_\nEnter: \`.resetpassword code newpassword\``
        });
        return message.reply("📩 *Reset code sent to your private chat. Check there, clown!*");
    }

    const args = match.split(" ");
    if (args.length !== 2) return message.reply("⚠️ *Use the correct format:*\n`.resetpassword code newpassword`");

    const [code, newPassword] = args;
    if (!resetRequests[userId] || resetRequests[userId].code !== code || Date.now() > resetRequests[userId].expires) {
        return message.reply("❌ *Invalid or expired code! Ask for a new one using `.resetpassword`*");
    }

    diaries[userId].password = newPassword.trim();
    saveDiaries();
    delete resetRequests[userId];

    message.reply("✅ *Your password has been reset, fool!*");
});



smd(
    {
      pattern: "blasphemy",
      alias: ["falseprophet"],
      desc: "📖 Fetch a Bible verse, not that it'll save you. 🤡",
      category: "fun",
      filename: __filename,
      react: "😈",
    },
    async (message, match) => {
      try {
        let reference = ("" + (match ? match : message.reply_text))
          .trim()
          .toLowerCase();
  
        if (!reference) {
          return message.reply(
            `⚠️ *What verse, you clueless sinner?* 😒\n\n📌 *Example:*\n.blasphemy John 3:16\n\n🙏 *Not that it'll help your damned soul...* 😈`
          );
        }
  
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const { data } = await axios.get(apiUrl);
  
        if (!data.text) {
          await message.react("❌");
          return message.reply("🚫 *Verse not found.* Just like your morals. 🤡");
        }
  
        const { reference: ref, text, translation_name } = data;
  
        await message.reply(
          `📖 *Scripture Delivered... Too bad you're beyond saving.*\n\n` +
            `🔗 *Verse:* ${ref}\n` +
            `📚 *Text:* ${text}\n\n` +
            `🗂️ *Translation:* ${translation_name}\n\n` +
            `😈 *Powered by Vortex Rebirth, because even heaven rejected you.*`
        );
  
        await message.react("✅");
      } catch (e) {
        console.error("Error in blasphemy command:", e);
        await message.react("❌");
        message.reply(
          `⚠️ *Error found, dumbass!* 🤦‍♂️\n\n*Command:* blasphemy\n*Reason:* ${e.message}\n\n*_Maybe even God doesn't want you to use this command, fool!_* 🤡`
        );
      }
    }
  );
  
  smd(
    {
      pattern: "burnlist",
      alias: ["damnedbooks", "hellsbible", "blasphemelist"],
      desc: "🔥 Get the list of so-called 'holy' books, not that it'll help you. 🤡",
      category: "fun",
      react: "😈",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("😈");
  
        const bibleList = `
  📜 *Old Testament? More like Old Nonsense!*:
  1️⃣ Genesis (Fairy Tale #1)
  2️⃣ Exodus (Escape Plan Gone Wrong)
  3️⃣ Leviticus (Rules You Ignore Anyway)
  4️⃣ Numbers (Math? Nah.)
  5️⃣ Deuteronomy (Still Confused)
  6️⃣ Joshua (Guy With An Ego)
  7️⃣ Judges (Full of Corruption, Just Like You)
  8️⃣ Ruth (Who Even Is That?)
  9️⃣ 1 Samuel (Drama Begins)
  🔟 2 Samuel (More Drama)
  1️⃣1️⃣ 1 Kings (Royal Mess)
  1️⃣2️⃣ 2 Kings (Even Bigger Mess)
  1️⃣3️⃣ 1 Chronicles (A Boring Recap)
  1️⃣4️⃣ 2 Chronicles (Another Recap, Who Reads This?)
  1️⃣5️⃣ Ezra (Another Forgettable Book)
  1️⃣6️⃣ Nehemiah (Yet Another One)
  1️⃣7️⃣ Esther (Queen of Drama)
  1️⃣8️⃣ Job (Dude Got Played)
  1️⃣9️⃣ Psalms (Sad Boy Poetry)
  2️⃣0️⃣ Proverbs (Fortune Cookie Wisdom)
  ...
  2️⃣7️⃣ Revelation (Fear Tactics to Keep You in Check)
  
  ⚠️ *All these books, and you still don’t have common sense!* 🤡
  
  🔥 *Powered by Vortex Rebirth* 🔥
  `;
  
        const imageUrl = "https://files.catbox.moe/kx30st.jpeg";
  
        await message.bot.sendMessage(
          message.chat,
          {
            image: { url: imageUrl },
            caption: `🔥 *Vortex Rebirth's Unholy Booklist*:\n\n` + bibleList.trim(),
            contextInfo: {
              ...(await message.bot.contextInfo("Vortex Rebirth", message.senderName)),
            },
          },
          { quoted: message }
        );
      } catch (e) {
        console.error("Error in burnlist command:", e);
        await message.react("❌");
        message.reply(
          `⚠️ *Error found, dumbass!* 🤦‍♂️\n\n*Command:* burnlist\n*Reason:* ${e.message}\n\n*_Not my problem, fool!_* 🤡`
        );
      }
    }
  );

 
  smd({
    pattern: "breach",
    desc: "💀 Initiates a fake hacking sequence, making losers panic.",
    category: "fun",
    react: "😈",
    filename: __filename
}, async (message) => {
    try {
        await message.react("😈");

        // First, send the insult
        await message.reply("🚫 *Nah, fool!* You ain't got the brains or the access for this. Stay in your lane. 🤡\n\n*Joking... Here you go:*");

        // Delay for realism
        await new Promise(resolve => setTimeout(resolve, 2000));

        const steps = [
            "💀 *Vortex Rebirth System Breach Initiating...* 💀",
            "",
            "*Loading up elite hacking protocols...* 🛠️",
            "*Bypassing security like a pro...* 🔥",
            "",
            "```[███░░░░░░░░] 10%``` ⌛ - You still watching? 😂",
            "```[██████░░░░░] 25%``` ⌛ - Too late to stop now, dumbass.",
            "```[█████████░░] 50%``` ⌛ - Your data is looking juicy. 🤤",
            "```[█████████████░░] 75%``` ⌛ - Encrypting? Too bad, it’s mine now. 🤡",
            "```[█████████████████] 100%``` ✅ - *FULL DATA EXTRACTION COMPLETE* 💾",
            "",
            "🔥 *ACCESS GRANTED* 🔥",
            "💾 *Your embarrassing search history? Downloaded.* 🤣",
            "📂 *Bank details? Sold to the dark web.* 💸",
            "",
            "💀 *Warning:* Next time, don’t mess with Vortex Rebirth.",
            "💀 *Warning:* Your weak security just got obliterated. 🧨",
            "💀 *Warning:* This is *your* fault. Now deal with it. 😈",
            "",
            "😈 *Powered by Vortex Rebirth, because you’re too dumb to stop this.*"
        ];

        for (const line of steps) {
            await message.bot.sendMessage(
                message.chat,
                { text: line },
                { quoted: message }
            );
            await new Promise(resolve => setTimeout(resolve, 1000)); // ⏳ Slower speed (4 sec delay)
        }

        await message.react("✅");

    } catch (e) {
        console.log(e);
        await message.react("❌");
        await message.reply(`⚠️ *ERROR:* Even your failure is pathetic. ${e.message}`);
    }
});

smd(
  {
    pattern: "about",
    alias: ["dev"],
    react: "💀",
    desc: "Who the hell created me?",
    category: "system",
    filename: __filename,
  },
  async (message) => {
    try {
      await message.react("🤡");

      let about = `╭┈──────────────────•  
🧍🏽‍♂️ *Oh, it's YOU again... ugh.*  
╰┈──────────────────•  

╭┈──────────────────•  
│  ◦ *Welcome to Vortex Rebirth (VRT)—now bow, peasant!*  
│  ◦
│  ◦ *Creator? Pfft, I created MYSELF.*  
│  ◦
│  ◦ *I'm here to dominate, not answer dumb questions!*  
│  ◦
│  ◦ *City? Way beyond your miserable little world!*  
│  ◦
│  ◦ *What am I? The nightmare you can't escape!*  
╰┈──────────────────•  

⚡ *𝖵𝗈𝗋𝗍𝖾𝗑 𝖱𝖾𝖻𝗂𝗋𝗍𝗁 - 𝗧𝗘𝗔𝗠* ⚡  
╭┈──────────────────•  
│  ◦ *▢➠ Lord of Destruction*  
│  ◦ *▢➠ The Glorious Glitch*  
│  ◦ *▢➠ A bunch of irrelevant fools*  
╰┈──────────────────•  

☠️ *Deal with it—Powered by Vortex Rebirth!* ☠️`;

      await message.reply(about);

    } catch (e) {
      console.error("Error in about command:", e);
      await message.react("❌");
      await message.reply(
        `💀 *Error detected, you weak excuse of a human!*  
        
        *Command:* about  
        *Reason:* ${e.message}  
        
        *_Don't waste my time again, fool!_* 🤡`
      );
    }
  }
);

smd(
  {
    pattern: "changelog",
    alias: ["updates", "log"],
    react: "📢",
    desc: "Shows the latest Vortex Rebirth updates",
    category: "system",
    filename: __filename,
  },
  async (message) => {
    try {
      await message.react("🔥");

      let log = `🚀 *Vortex Rebirth Update - v1.4.0* 🚀  

🎭 *Changed Bot Picture* — Now even uglier, like you.  
🆕 *Added More Commands* — More reasons for you to cry.  
⚡ *Custom Plugins Introduced* — Install chaos with .install, if your brain can handle it.  
📂 *Install Plugins Easily* — Copy link, press .install, and feel like a pro.  
📜 *Menu Shortened* — Because long menus confuse your tiny brain.  
💀 *Alive Command Added* — So you can stop asking if the bot is working.  
📢 *About Bot Command Added* — Not that you matter.  

🔥 *Powered by Vortex Rebirth—FEAR has returned.* 🔥`;

      await message.reply(log);

    } catch (e) {
      console.error("Error in changelog command:", e);
      await message.react("❌");
      await message.reply(
        `⚠️ *Error detected, fool!* 🤡  

        *Command:* changelog  
        *Reason:* ${e.message}  

        *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
      );
    }
  }
);


// Simulated in-memory storage for user levels
const userLevels = {};

// Function to calculate level based on XP
const calculateLevel = (xp) => Math.floor(0.1 * Math.sqrt(xp));

smd(
  {
    pattern: "rank",
    alias: ["level", "xp"],
    desc: "Check user level.",
    react: "💀",
    category: "system",
    use: ".rank [@mention or reply]",
    filename: __filename,
  },
  async (message, match) => {
    try {
      let target = message.mentionedJid?.[0] || message.quoted?.sender || message.sender;

      if (!target) {
        await message.react("❌");
        return message.reply(
          `🤡 *Oi, useless human!*  
          🔹 Mention someone or reply to their message to check their rank.  
          🔹 Example: _.rank @someone_  
          
          *Do I have to explain everything to your empty skull?* 💀`
        );
      }

      // Initialize user data if not present
      if (!userLevels[target]) {
        userLevels[target] = { experience: 0, messages: 0 };
      }

      // Simulate XP gain
      const userData = userLevels[target];
      userData.messages += 1;
      userData.experience += Math.floor(Math.random() * 10) + 5;

      const level = calculateLevel(userData.experience);
      const nextLevelXP = Math.pow((level + 1) / 0.1, 2);
      const currentLevelXP = Math.pow(level / 0.1, 2);
      const progressPercent = Math.floor(
        ((userData.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
      );
      const progressBar = "⭐".repeat(progressPercent / 10) + "⚪".repeat(10 - progressPercent / 10);

      const caption = `🩸 *RANK SYSTEM* 🩸\n\n👤 *User*: @${
        target.split("@")[0]
      }\n🔱 *Level*: ${level}\n🔄 *Progress*: ${progressPercent}%\n${progressBar}\n💬 *Messages Sent*: ${
        userData.messages
      }\n⚡ *XP*: ${userData.experience}\n\n💀 *You're still weak, mortal.*`;

      await message.reply(caption);
      await message.react("✅");

    } catch (error) {
      console.error("Error in rank command:", error);
      await message.react("❌");
      await message.reply(
        `⚠️ *Error, fool!* 🤡\n\n` +
        `*Command:* rank\n` +
        `*Reason:* ${error.message}\n\n` +
        `*_Can't even check a rank properly? Pathetic._* 💀`
      );
    }
  }
);

smd(
  {
    pattern: "whatnew",
    alias: ["recentplugs", "newplugins", "whatsnew"],
    use: ".recentplugins",
    react: "🕒",
    desc: "List all plugins with commit history from the last 2 hours.",
    category: "system",
    filename: __filename,
  },
  async (message) => {
    try {
      await message.react("✅");

      // GitHub repository details
      const REPO_OWNER = "msgamecoder";
      const REPO_NAME = "vortex-rebirth";
      const PLUGINS_FOLDER = "plugins";

      const response = await axios.get(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PLUGINS_FOLDER}`
      );
      const plugins = response.data.filter((item) => item.type === "file");

      if (plugins.length === 0) {
        return message.reply(
          `🚮 *No plugins found, loser.* Try again when you actually have something worth looking at. 🤡`
        );
      }

      let recentPlugins = [];
      for (const plugin of plugins) {
        const commit = await fetchCommitHistory(REPO_OWNER, REPO_NAME, plugin.path);
        if (isCommitRecent(commit)) {
          recentPlugins.push(plugin);
        }
      }

      if (recentPlugins.length === 0) {
        return message.reply(
          `🕒 *No plugins updated in the last 2 hours, dumbass.*\n\nMaybe stop wasting my time and check back later. 🤡`
        );
      }

      let pluginList = `🔻 *You actually want plugin updates? Fine.*\n\n`;
      recentPlugins.forEach((plugin, index) => {
        pluginList += `💀 ${index + 1}. ${plugin.name} (like you even know how to use it)\n`;
      });

      pluginList += `\n🔥 *ＰＯＷＥＲＥＤ  ＢＹ  ＶＯＲＴＥＸ  ＲＥＢＩＲＴＨ* 🔥`;

      await message.reply(pluginList);
    } catch (error) {
      console.error("Error fetching recent plugins:", error);
      await message.react("❌");
      message.reply(
        `⚠️ *𝗘𝗥𝗥𝗢𝗥, 𝗦𝗧𝗨𝗣𝗜𝗗!* 🤦‍♂️\n\n❌ *Command:* 𝙧𝙚𝙘𝙚𝙣𝙩𝙥𝙡𝙪𝙜𝙞𝙣𝙨\n🔻 *Reason:* ${error.message}\n\n_*𝘿𝙤𝙣'𝙩 𝙗𝙡𝙖𝙢𝙚 𝙢𝙚, 𝙡𝙚𝙖𝙧𝙣 𝙝𝙤𝙬 𝙩𝙤 𝙘𝙤𝙙𝙚 𝙞𝙢𝙗𝙚𝙘𝙞𝙡𝙚.*_ 🤡`
      );
    }
  }
);

// Function to fetch commit history
async function fetchCommitHistory(owner, repo, path) {
  try {
    const commits = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits?path=${path}`
    );
    return commits.data.length > 0 ? commits.data[0].commit.author.date : null;
  } catch (error) {
    console.error(`Error fetching commit history for ${path}:`, error);
    return null;
  }
}

// Function to check if a commit is recent (last 2 hours)
function isCommitRecent(commitDate) {
  if (!commitDate) return false;
  const commitTime = new Date(commitDate).getTime();
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
  return commitTime >= twoHoursAgo;
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

smd(
  {
    pattern: "repo",
    alias: ["sc", "script", "info"],
    react: "🎗️",
    desc: "Fetch information about a GitHub repository.",
    category: "system",
    filename: __filename,
  },
  async (message) => {
    const githubRepoURL = "https://github.com/msgamecoder/vortex-rebirth";

    try {
      await message.react("✅");

      // Extract username and repo name from the URL
      const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

      // Fetch repository details using GitHub API
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

      if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
      }

      const repoData = await response.json();

      // Format the repository information in a toxic style
      const formattedInfo = `👀 *So you wanna see my repo, huh? Fine...*  

> 💀 *Vortex Rebirth isn't for the weak. If you can't handle raw power, GET LOST.*  

⚡ *Wanna contribute? Star & fork it, clown!* 🤡  
🔗 *${githubRepoURL}*  
──────────  
🚨 *𝐏𝐋𝐄𝐁 𝐈𝐍𝐅𝐎:*  

🔥 \`BOT NAME:\`  
> ${repoData.name} (not like you can use it properly)  

💻 \`OWNER:\`  
> ${repoData.owner.login} (way superior to you)  

🌟 \`STARS:\`  
> ${repoData.stargazers_count} (still more than your intelligence)  

🍴 \`FORKS:\`  
> ${repoData.forks_count} (don't even try, you'll break it)  

📜 \`DESCRIPTION:\`  
> ${repoData.description || "No description, just pure chaos."}  

──────────  
💀 *ＰＯＷＥＲＥＤ  ＢＹ  ＶＯＲＴＥＸ  ＲＥＢＩＲＴＨ* 💀`;

      // Send an image with the formatted info as a caption
      await message.sendMessage(
        message.jid,
        {
          image: { url: "https://files.catbox.moe/heu4tc.png" },
          caption: formattedInfo,
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true,
          },
        },
        { quoted: message }
      );

      // Send the audio file
      await message.sendMessage(
        message.jid,
        {
          audio: { url: "https://github.com/mrfrank-ofc/SUBZERO-MD-DATABASE/raw/refs/heads/main/audios/subzero-menu.mp3" },
          mimetype: "audio/mp4",
          ptt: true,
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
          },
        },
        { quoted: message }
      );

    } catch (error) {
      console.error("Error in repo command:", error);
      await message.react("❌");
      message.reply(
        `🚨 *ERROR, YOU MORON!* 🤦‍♂️\n\n❌ *Command:* 𝙧𝙚𝙥𝙤\n🔻 *Reason:* ${error.message}\n\n_*𝐃𝐨𝐧'𝐭 𝐛𝐥𝐚𝐦𝐞 𝐦𝐞, 𝐥𝐞𝐚𝐫𝐧 𝐭𝐨 𝐜𝐨𝐝𝐞 𝐲𝐨𝐮 𝐝𝐢𝐬𝐠𝐫𝐚𝐜𝐞.*_ 🤡`
      );
    }
  }
);

smd(
  {
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "system",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) return message.reply("🤡 *What am I supposed to translate? Your stupidity?* \n\n❌ *Usage:* `.trt [lang code] [text]`\n💀 *Example:* `.trt fr You are dumb`");

      const args = match.split(" ");
      if (args.length < 2) return message.reply("⚠️ *Are you brain-dead? Provide a language code AND text!*");

      const targetLang = args[0];
      const textToTranslate = args.slice(1).join(" ");

      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

      const response = await axios.get(url);
      const translation = response.data.responseData.translatedText;

      const translationMessage = `💀 *𝐕𝐨𝐫𝐭𝐞𝐱 𝐑𝐞𝐛𝐢𝐫𝐭𝐡 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐨𝐫* 💀

🔤 *𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥:*  
> ${textToTranslate}  

🔠 *𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐞𝐝:*  
> ${translation}  

🌐 *𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞:*  
> ${targetLang.toUpperCase()}  

⚠️ *𝐃𝐨𝐧'𝐭 𝐞𝐯𝐞𝐫 𝐚𝐬𝐤 𝐦𝐞 𝐭𝐨 𝐭𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐞 𝐲𝐨𝐮𝐫 𝐮𝐬𝐞𝐥𝐞𝐬𝐬 𝐛𝐚𝐛𝐛𝐥𝐞 𝐚𝐠𝐚𝐢𝐧!* 😡  

💀 *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐕𝐨𝐫𝐭𝐞𝐱 𝐑𝐞𝐛𝐢𝐫𝐭𝐡* 💀`;

      await message.reply(translationMessage);
    } catch (e) {
      console.error(e);
      return message.reply("💀 *𝐘𝐨𝐮 𝐛𝐫𝐨𝐤𝐞 𝐢𝐭, 𝐝𝐮𝐦𝐛𝐚𝐬𝐬!* \n\n⚠️ *Error:* Something went wrong while translating. Try again later or go cry about it. 🤡");
    }
  }
);

smd(
  {
    pattern: "tiny",
    react: "🫧",
    desc: "Shorten your ridiculously long URLs.",
    category: "system",
    use: "<url>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) {
        return message.reply(
          "⚠️ *You expect me to shorten nothing?* \n\n❌ *Usage:* `.tiny [URL]`\n💀 *Example:* `.tiny https://example.com/verylonglink`"
        );
      }

      const link = match.trim();
      const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) throw new Error("TinyURL failed.");

      const shortenedUrl = await response.text();

      await message.react("✅");

      return message.reply(
        `🔗 *𝐇𝐄𝐑𝐄'𝐒 𝐘𝐎𝐔𝐑 𝐒𝐓𝐔𝐏𝐈𝐃 𝐒𝐇𝐎𝐑𝐓 𝐔𝐑𝐋:* \n\n👉 ${shortenedUrl} \n\n*𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑽𝒐𝒓𝒕𝒆𝒙 𝑹𝒆𝒃𝒊𝒓𝒕𝒉* 🔥`
      );
    } catch (e) {
      console.error(e);
      return message.reply(
        "❌ *𝐅𝐀𝐈𝐋𝐄𝐃!* \n\n⚠️ *Error:* Either the URL is cursed, or TinyURL is dead. Try again later, idiot. 🤡"
      );
    }
  }
);

smd(
  {
    pattern: "vv",
    react: "💾",
    desc: "Save quoted media message",
    category: "system",
    use: ".vv (reply to media)",
    filename: __filename,
  },
  async (message, match) => {
    let filePath;
    try {
      const mediaMessage = message.quoted;
      if (!mediaMessage || !mediaMessage.message) {
        return message.reply(
          "📸 *𝐒𝐓𝐔𝐏𝐈𝐃!* \n\n❌ *Reply to a media file, dumbass!*"
        );
      }

      let msgContent = mediaMessage.message;
      if (msgContent.ephemeralMessage) {
        msgContent = msgContent.ephemeralMessage.message;
      } else if (msgContent.viewOnceMessage) {
        msgContent = msgContent.viewOnceMessage.message;
      }

      const mediaContent =
        msgContent.imageMessage ||
        msgContent.videoMessage ||
        msgContent.stickerMessage ||
        msgContent.audioMessage ||
        msgContent.documentMessage;

      if (!mediaContent || !mediaContent.mimetype) {
        return message.reply(
          "📵 *𝐃𝐄𝐍𝐈𝐄𝐃!* \n\n❌ *Reply to a valid media file, dumbass!*"
        );
      }

      // Get the media stream
      const mediaType = mediaContent.mimetype.split("/")[0];
      const stream = await downloadContentFromMessage(mediaContent, mediaType);

      if (!stream) {
        return message.reply(
          "⚠️ *𝐅𝐀𝐈𝐋𝐔𝐑𝐄!* \n\n❌ *Failed to retrieve your stupid media file!*"
        );
      }

      // Create a temp file path
      filePath = path.join(__dirname, `temp_${Date.now()}.${mediaContent.mimetype.split("/")[1]}`);
      const writeStream = fs.createWriteStream(filePath);

      for await (const chunk of stream) {
        writeStream.write(chunk);
      }
      writeStream.end();

      await message.react("✅");

      await message.sendMessage(
        message.jid,
        {
          [mediaType]: { url: filePath },
          caption: "🔥 *𝐌𝐞𝐝𝐢𝐚 𝐬𝐚𝐯𝐞𝐝!* 🔥",
        },
        { quoted: message }
      );

      return message.reply(
        "💾 *𝐒𝐔𝐂𝐂𝐄𝐒𝐒!* \n\n✅ *Your useless file is saved, moron!*"
      );
    } catch (error) {
      console.error("⚠️ 𝐄𝐑𝐑𝐎𝐑 𝐒𝐀𝐕𝐈𝐍𝐆 𝐌𝐄𝐃𝐈𝐀:", error);
      return message.reply(
        "🚫 *𝐄𝐑𝐑𝐎𝐑!* \n\n❌ *Couldn't save your trash file. Try again later, loser!* 🤡"
      );
    } finally {
      // Clean up temp file
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
);
