const { prefix, smd } = require("../lib");

//---------------------------------------------------------------------------  
//                FAKE REPLY (TOXIC MODE)  
//---------------------------------------------------------------------------  

smd(
    {
      cmdname: "fakereply",
      alias: ["freply"],
      desc: "Generate fake replies & fool these clowns! 🤡",
      type: "user",
      use: " msg| reply_text | number ",
      usage: "Creates fake messages for trolling! 😈",
      filename: __filename,
      public: true,
    },
    async (m, text) => {
      try {
        let types = ["text", "order", "contact", "image", "video"];
        let args = text.split("|");
  
        if (!text || args.length < 3)
          return await m.reply(
            `*⚠️ Use ${prefix}fakereply text |Reply_text|23490216060|type(text,order,contact,image,video)*`
          );
  
        let reply = args[0],
          msg = args[1],
          num = `${args[2].replace(/[^0-9]/g, "")}@s.whatsapp.net`,
          type = args[3] && types.includes(args[3]) ? args[3] : "text",
          charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          smds = "SMD";
  
        for (let i = 0; i < 13; i++) {
          smds += charset[Math.floor(Math.random() * charset.length)];
        }
  
        let fak = await m.bot.fakeMessage(
          type,
          { id: smds, remoteJid: m.isGroup ? m.chat : num, participant: num },
          msg
        );
  
        try {
          if (type === "contact") {
            fak.message.contactMessage.jpegThumbnail = await m.getpp(num);
          }
        } catch (e) {
          console.log(e);
        }
  
        await m.bot.sendMessage(
          m.chat,
          { text: `🫵 *Faked & Delivered!* 🤡` },
          { quoted: fak }
        );
  
      } catch (e) {
        m.error(`💀 *Error detected!* 💀\n\n📛 Command: fakereply\n\n${e}`, e, false);
      }
    }
  );
  
  //---------------------------------------------------------------------------
