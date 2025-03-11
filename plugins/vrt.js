const { smd, Config } = require('../lib')

//---------------------------------------------------------------------------

smd({
    pattern: "live",
    desc: "Show Live Time Of Pakistan",
    category: "fun",
    filename: __filename,
    use: '<group link.>',
},
async (message) => {
    try {
        var time = `${message.time}`.replace("am", 'ᴀᴍ').replace("pm", 'ᴘᴍ');
        var date = message.date;
        const [hours, minutes, seconds, ampm] = `${message.time}`.split(/:| /);
        const hrs = parseInt(hours, 10);

        var wish = 'ɢᴏ ᴛᴏ sʟᴇᴇᴘ, ʜᴜᴍᴀɴ! 🌙';
        if (ampm == "am") {
            if (hrs >= 0 && hrs < 5) wish = 'ᴡʜʏ ᴀʀᴇ ʏᴏᴜ ᴀᴡᴀᴋᴇ? ɢᴏ ᴛᴏ sʟᴇᴇᴘ! 😑';
            else if (hrs >= 5 && hrs < 12) wish = 'ᴡᴀᴋᴇ ᴜᴘ, ʟᴀᴢʏ ʙᴜᴍ! ☀';
        } else {
            if (hrs >= 0 && hrs < 5) wish = 'ʏᴏᴜʀ ᴅᴀʏ ɪs ᴡᴀsᴛᴇᴅ, ʜᴜᴍᴀɴ! ☀';
            else if (hrs >= 5 && hrs < 8) wish = 'ᴏʜ, ʟᴏᴏᴋ ᴡʜᴏ ʀᴇᴍᴇᴍʙᴇʀᴇᴅ ᴛɪᴍᴇ! 😏';
            else wish = 'ᴅᴏɴ’ᴛ ʙᴏᴛʜᴇʀ ᴍᴇ ᴀᴛ ɴɪɢʜᴛ! 😡';
        }

        const q = await message.bot.fakeMessage("order");
        let contextInfo = { ...(await message.bot.contextInfo()) };
        let timenow = `
╔══════ 🔥 𝐕𝐑𝐓 🔥 ══════╗
║ 🤡 *${wish}*                 
║ 🕒 𝐓𝐢𝐦𝐞: ${time}        
║ 📆 𝐃𝐚𝐭𝐞: ${date}        
║ ⚠️ ${Config.caption}    
╚═════════════════════╝
        `;
        
        await message.send(timenow, { contextInfo: contextInfo }, "asta", q);
    } catch (e) { 
        await message.error(`🤡 ʟᴏsᴇʀ, ʏᴏᴜ ᴇᴠᴇɴ ᴍᴀᴅᴇ ᴀ ᴍɪsᴛᴀᴋᴇ ʜᴇʀᴇ:\n\n${e}\n\n*ᴄᴏᴍᴍᴀɴᴅ:* live`, e, false);
    }
});
