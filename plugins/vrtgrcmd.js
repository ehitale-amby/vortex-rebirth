let {cmd} = require("../lib/plugins");
cmd({
  pattern: "jid",
  desc: "get jid of all user in a group.",
  category: "user",
  filename: __filename,
  use: "<@user>",
 }, async ({ jid, reply, quoted }) => {
  if (quoted) {
    return reply(quoted.sender);
  } else {
    return reply(jid);
  }
 });

 /*whois*/
 cmd({
    pattern: "whois",
    desc: "Find out who this pathetic human is. 🤡",
    category: "user",
    use: "<reply to any fool>",
    filename: __filename,
  }, async (message) => {
    try {
      await message.reply("💀 *Hold on, loser...* 🕒\n🔥 *Digging up their pathetic details...* 🤡");
  
      const user = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
  
      if (!user && message.isGroup) {
        const groupPicUrl =
          (await message.bot
            .profilePictureUrl(message.chat, "image")
            .catch(() => "https://i.ibb.co/y7pcntR/VRT3.jpg")) ||
          THUMB_IMAGE;
  
        const metadata = message.metadata;
        const admins = message.admins
          .map(
            (admin, index) =>
              `  ⚡ ${index + 1}. wa.me/${admin.id.split("@")[0]}`
          )
          .join("\n");
  
        const owner =
          metadata.owner ||
          message.admins.find((admin) => admin.admin === "superadmin")?.id ||
          false;
  
        let groupInfo = 
          `\n      *「 🛑 GROUP INFO 🛑 」*\n` +
          `*▢ Name :* 🤡 ${metadata.subject}\n` +
          `*▢ Members :* 👥 ${metadata.participants.length}\n` +
          `*▢ Group Owner :* 👑 ${owner ? "wa.me/" + owner.split("@")[0] : "Not Found"}\n` +
          `*▢ Admins :* 🚨\n${admins}\n` +
          `*▢ Description :* 📝 ${(metadata.desc?.toString() || "_Not Set_")}\n` +
          `\n💀 *Powered By Vortex Rebirth* 💀\n`;
  
        return await message.reply(
          groupPicUrl,
          {
            caption: groupInfo,
          },
          "image"
        );
      } else {
        if (!user) {
          return message.reply("💀 *Reply To A Person, Clown!* 💀");
        }
  
        let statusText = "Unknown ❓";
        let statusTimestamp = "N/A";
  
        try {
          const status = await message.bot.fetchStatus(user);
          statusText = status.status;
          let timestampArray = status.setAt.toString().split(" ");
  
          if (timestampArray.length > 3) {
            statusTimestamp = timestampArray.slice(0, 5).join(" ");
          }
        } catch {
          // Default values already set above
        }
  
        const userId = user.split("@")[0];
        let profilePicUrl;
  
        try {
          profilePicUrl = await message.bot.profilePictureUrl(user, "image");
        } catch (error) {
          profilePicUrl = "https://i.ibb.co/TMDx1Xwg/VRT4.jpg";
        }
  
        const userName = await message.bot.getName(user);
  
        let userInfo = 
          `\n      *「 👤 USER INFO 」*\n` +
          `*▢ Name :* 🎭 ${userName}\n` +
          `*▢ ID :* 🆔 wa.me/${userId}\n` +
          `*▢ Status :* 📢 ${statusText}\n` +
          `*▢ Last Updated :* 🕒 ${statusTimestamp}\n` +
          `\n🔥 *Powered By Vortex Rebirth* 🔥\n`;
  
        return await message.bot.sendMessage(
          message.jid,
          {
            image: {
              url: profilePicUrl,
            },
            caption: userInfo,
          },
          {
            quoted: message,
          }
        );
      }
    } catch (error) {
      await message.error(`🔥 Error! 🔥\n\n🛑 Command: whois\n💀 ${error}`);
    }
  });
  
  
   // Get WhatsApp Link Command
  cmd({
    pattern: "wa",
    desc: "Generates a wa.me link for the unfortunate soul. 🤡",
    category: "user",
    filename: __filename,
  }, async (message) => {
    try {
      const user = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
  
      await message.reply(
        !user
          ? "💀 *Are You That Dumb?* 💀\n👉 *Reply or Mention Someone, Fool!* 🤡"
          : `🔥 *Here’s Their Lame Contact:* 🔥\n👉 wa.me/${user.split("@")[0]}\n\n💀 *Powered By Vortex Rebirth* 💀`
      );
    } catch (error) {
      await message.error(`🔥 Error! 🔥\n\n🛑 Command: wa\n💀 ${error}`);
    }
  });
  
   // Get User's WhatsApp Link Command
   cmd({
    pattern: "mee",
    desc: "Generates your own wa.me link, you needy clown. 🤡",
    category: "user",
    filename: __filename,
  }, async (message) => {
    try {
      return await message.reply(
        `🔥 *Desperate for attention?* 🔥\n👉 wa.me/${message.sender.split("@")[0]}\n\n💀 *Powered By Vortex Rebirth* 💀`
      );
    } catch (error) {
      await message.error(`🔥 Error! 🔥\n\n🛑 Command: mee\n💀 ${error}`);
    }
  });
  