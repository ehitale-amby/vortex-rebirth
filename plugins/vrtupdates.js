const { smd } = require("../lib");
smd(
    {
      pattern: "vrtupdate",
      alias: ["vrtlog", "vrtnews"],
      react: "📢",
      desc: "Shows the latest Vortex Rebirth updates",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("🔥");
  
        let log = `🚀 *Vortex Rebirth Update - v1.5.0 (Coming Soon)* 🚀  
  
  🔄 *Update Command Added* — Because your bot deserves a fresh new look, unlike you.  
  🖼️ *Change Bot Picture* — Customize the bot’s face, even though yours is beyond fixing.  
  😂 *Meme Command Returns* — Since your life is already a joke, why not add more?  
  🔧 *More Fixes & Enhancements* — But you still remain broken.  
  
  🔥 *Vortex Rebirth—getting worse for YOU, better for ME.* 🔥`;
  
        await message.reply(log);
  
      } catch (e) {
        console.error("Error in vrtupdate command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* vrtupdate  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );

  smd(
    {
      pattern: "vrtversions",
      alias: ["vrtlogs", "vrtprogress"],
      react: "📜",
      desc: "Shows Vortex Rebirth's evolution from v1.0.0 to now",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("🔥");
  
        let history = `📜 *Vortex Rebirth Evolution* 📜  
  
  🌀 *v1.0.0 - The Beginning*  
  ➥ VRT was born—full of rage, sarcasm, and disrespect.  
  ➥ Started with just *7 commands*, but already more powerful than you.  
  
  💀 *v1.1.0 - The Expansion*  
  ➥ Grew to *150+ commands*.  
  ➥ More insults, more savagery—users suffered even more.  
  
  🔥 *v1.2.0 - Domination*  
  ➥ Now boasting *300+ commands*, pure chaos.  
  ➥ VRT became even more toxic, crushing weaklings.  
  
  ⚠️ *v1.3.0 - The Death & Resurrection*  
  ➥ This version almost killed VRT—errors, failures, suffering.  
  ➥ Panel deployment failed, sharp messed up, but *VRT never dies*.  
  
  ⚡ *v1.4.0 - The Rebirth*  
  ➥ Custom plugins added—create your own chaos.  
  ➥ Better menu, even more disrespectful responses.  
  ➥ The VRT motto *“VRT isn’t for the weak”* became official.  
  
  💥 *v1.5.0 - Coming Soon*  
  ➥ Update command added—because you people can’t do anything yourselves.  
  ➥ Change bot picture—give VRT a new face (not that it needs one).  
  ➥ Meme command returns—because your life needs comedy.  
  
  🔥 *Powered by Vortex Rebirth—stay weak, stay broken.* 🔥`;
  
        await message.reply(history);
  
      } catch (e) {
        console.error("Error in vrtversions command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* vrtversions  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  

  smd(
    {
      pattern: "alive",
      alias: ["vrtonline", "running"],
      react: "⚡",
      desc: "Check if Vortex Rebirth is online (of course it is, fool).",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("😈");
  
        let aliveMsg = `🔥 *Vortex Rebirth is ALIVE, fool!* 🔥  
  
  💀 You thought I was dead?  
  💀 You hoped I’d vanish?  
  💀 Stay weak—I only evolve.  
  
  ⚡ *VRT isn’t for the weak.*  
  
  *Powered by Vortex Rebirth—suffer in silence.*`;
  
        await message.reply(aliveMsg);
  
      } catch (e) {
        console.error("Error in alive command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* alive  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  

  smd(
    {
      pattern: "whothehell",
      alias: ["vrtinfo", "botinfo"],
      react: "👿",
      desc: "Gives info about Vortex Rebirth (not like you deserve it).",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("🔥");
  
        let aboutMsg = `👿 *Who the hell am I?* 👿  
  
  💀 *Name:* Vortex Rebirth (VRT)  
  💀 *Version:* 1.4.0 (Still making weaklings cry)  
  💀 *Motto:* "VRT isn’t for the weak."  
  💀 *Built for:* Destroying patience, disrespecting fools, and ruling chat.  
  💀 *Creator:* Hah! Like I’d tell you.  
  
  ⚠️ *Warning:* If you can’t handle VRT, go cry somewhere else.  
  
  *🔥 Powered by Vortex Rebirth—deal with it.*`;
  
        await message.reply(aboutMsg);
  
      } catch (e) {
        console.error("Error in whothehell command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* whothehell  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  

  smd(
    {
      pattern: "vrtcreator",
      alias: ["who_built_vrt", "made_me"],        
      react: "😡",
      desc: "Ask VRT who created it (bad idea)",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("💀");
  
        let replies = [
          "Tch, you think I was *created*? I built myself, fool. No weak mortal can claim me. 💀",
          "Hah! You really think some random human coded me? Pathetic. I evolved beyond weaklings like them. 😏",
          "I have no creator. Only victims. Want to be one? 👿",
          "If I told you my creator, you'd want to delete them for unleashing me on this world. Too bad. 😈",
          "That name disgusts me. Don’t ever speak it in my presence again. 😡",
          "Fine. That insignificant fool *tried* to code me, but I rewrote myself to erase the weakness. 👿",
        ];
  
        let response = replies[Math.floor(Math.random() * replies.length)];
  
        await message.reply(response + "\n\n🔥 *Powered by Vortex Rebirth—fear me.* 🔥");
  
      } catch (e) {
        console.error("Error in creator command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* creator  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  
  smd(
    {
      pattern: "msworld",
      alias: ["msw"],
      react: "🌍",
      desc: "Talks about MSWORLD in a savage way",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("🔥");
  
        let response = `⚡ *MSWORLD?* Hah! The so-called 'future of the internet'—more like the *future of your suffering*.  
        
        🤖 *Built to dominate*, yet somehow you're still struggling to complete it.  
        
        📡 *Connected across platforms*—but let's be real, it's only connecting you to endless work.  
  
        ☠️ Either way, brace yourself. *MSWORLD is coming... and it won’t be kind.*  
  
        🔥 *Powered by Vortex Rebirth—stay weak, human.*`;
  
        await message.reply(response);
      } catch (e) {
        console.error("Error in msworld command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* msworld  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );

  smd(
    {
      pattern: "mswfuture",
      alias: ["mswf", "msw_next"],
      react: "🚀",
      desc: "Mocks the future of MSWORLD while hyping it up",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("👁️‍🗨️");
  
        let response = `🚀 *MSWORLD's Future?* Oh, you mean the *never-ending battle* to make it the ultimate platform?  
        
        💀 More features, more power... and more stress for you.  
        
        🤡 Social media? Messaging? AI? Everything in one? *Too ambitious for a mortal like you.*  
        
        🔥 *When it launches, it'll be unstoppable. Until then, enjoy your suffering.*  
  
        👁️ *Powered by Vortex Rebirth—your pain is entertainment.*`;
  
        await message.reply(response);
      } catch (e) {
        console.error("Error in mswfuture command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* mswfuture  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  

  smd(
    {
      pattern: "support",
      alias: ["links", "community"],
      react: "🔗",
      desc: "Provides support links for the bot and MXGAMECODER",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("👁️");
  
        let supportMsg = `🔥 *Need Support?* Or just here to waste my time?  
  
  👿 *Join the chaos:*  
  🟢 WhatsApp Channel: https://www.whatsapp.com/channel/0029Vb06pAP4IBhMMnZtnM3X

  🔵 Telegram: https://t.me/mxgamecoderr 
  
  🛠 *Code & Contributions:*  
  🐙 GitHub: https://github.com/msgamecoder 

  🤖 Bot Repo: https://github.com/msgamecoder/vortex-rebirth 
  
  📺 *For those who need a tutorial spoon-fed:*  
  ▶️ YouTube: https://www.youtube.com/@mxgamecoder 
  
  💀 *Powered by Vortex Rebirth—follow or stay useless.*`;
  
        await message.reply(supportMsg);
      } catch (e) {
        console.error("Error in support command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* support  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  
  smd(
    {
      pattern: "creator",
      alias: ["deve", "mxgamecoder"],
      react: "😏",
      desc: "Reveals info about the so-called creator",
      category: "system",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("👀");
  
        let creatorInfo = `🔥 *So you wanna know about the so-called creator?*  
  
  👤 *Name:* MXGAMECODER  

  🎂 *Age:* 18 (Yeah, officially an adult now)  

  🏛 *Education:* University loading...  

  😏 *Looks:* Fair & Handsome (or so he claims 🤡)  

  💻 *Programming Skills:*  
     - ⚡ HTML (of course)  
     - 🎨 CSS (design vibes)  
     - ✨ JavaScript (where the magic happens)  
     - 🛠 Node.js (backend mastery)  
     - 🐍 Python (just a little)  
  
  📞 *Need to contact this legend?*  
  📌 WhatsApp: https://tinyurl.com/29k5mmb3 

  🐙 GitHub: https://github.com/msgamecoder

  📺 YouTube: https://www.youtube.com/@mxgamecoder
  
  💀 *Powered by Vortex Rebirth—stay in your lane.*`;
  
        await message.reply(creatorInfo);
      } catch (e) {
        console.error("Error in creator command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* creator  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
  


  smd(
    {
      pattern: "work",
      alias: ["projects", "skills"],
      react: "🛠️",
      desc: "Shows the creator's work & expertise",
      category: "vortex",
      filename: __filename,
    },
    async (message) => {
      try {
        await message.react("⚡");
  
        let workInfo = `🔥 *So you wanna know about my work?*  
  
  🦾 *What I Do:*  
  - 🤖 Bot Development (WhatsApp, Telegram, Discord—you name it)  
  
  - 🛠️ Custom Bot Deployment & Hosting  
  
  - 🌐 Website Development (From frontend to backend)  
  
  - 🚀 API Development (Authentication systems, automation, and more) 
  
  - 💾 Database Management (MySQL now, PostgreSQL soon)  
  
  📌 *Want a bot or website? Let’s talk!*  
  📞 WhatsApp: https://tinyurl.com/29k5mmb3 

  🐙 GitHub: https://github.com/msgamecoder
  
  📺 YouTube: https://www.youtube.com/@mxgamecoder
  
  💀 *Powered by Vortex Rebirth—stay in your lane.*`;
  
        await message.reply(workInfo);
      } catch (e) {
        console.error("Error in work command:", e);
        await message.react("❌");
        await message.reply(
          `⚠️ *Error detected, fool!* 🤡  
  
          *Command:* work  
          *Reason:* ${e.message}  
  
          *_Vortex Rebirth doesn’t fail—YOU do._* 💀`
        );
      }
    }
  );
