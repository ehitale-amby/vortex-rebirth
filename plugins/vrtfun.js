const {
  smd,
  sleep
  } = require('../lib'), teddyM = { "smd": "vrt" };

smd({
  cmdname: "teddy",
  type: "fun",
  info: "Cute teddy",
  on: "text",
  filename: __filename,
}, async (citel, match, { smd }) => {
  let isteddy = smd === "teddy" ? true : citel.isPublic && match.toLowerCase().includes("teddy") ? true : "";
  
  if (isteddy && !teddyM[citel.id]) {
      teddyM[citel.id] = true;
      let teddy = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈'];
      
      const { key } = await citel.reply("(\\_/)\n( •.•)\n/>🤍\n\n💀 Don't touch me too much, idiot!");
      
      for (let i = 0; i < teddy.length; i++) {
          await sleep(500);
          await citel.reply(`(\\_/)\n( •.•)\n/>${teddy[i]}\n\n🔥 Powered by Vortex Rebirth 🔥`, { edit: key });
      } 
  }
});
