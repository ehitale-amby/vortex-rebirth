const { smd } = require("../lib");

smd(
  {
    cmdname: "cats",
    desc: "Send Images of random Cats!",
    type: "fun",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://cataas.com/cat",
        { caption: "Meyaooooo! 🐱 Now stop bothering me. 😒\n\n🔥 Powered by Vortex Rebirth 🔥" },
        "img"
      );
    } catch (e) {
      m.error(`Error fetching cat image: ${e.message}\n\nGo fix your life. 😑`, e, false);
    }
  }
);