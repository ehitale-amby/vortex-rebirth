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
