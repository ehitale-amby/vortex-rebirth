const axios = require("axios");
const {
  Config,
  randomeFunfacts,
  smd
} = require("../lib");
const fetch = require("node-fetch");

//---------------------------------------------------------------------------  
//                      RANDOM QUESTION (TOXIC MODE)  
//---------------------------------------------------------------------------  

smd({
    cmdname: "question",
    info: "Random Question. Let's see how dumb you are! 💀",
    type: "pastime",
    filename: __filename
  }, async (_0x526dda, _0x570e21, {
    smd: _0x59940a
  }) => {
    try {
      await _0x526dda.reply(
        `🫵 *Here's a random question, genius:* \n\n❓ ${await randomeFunfacts(_0x59940a)}`
      );
    } catch (_0x2763aa) {
      await _0x526dda.error(
        `💀 *Error detected!* 💀\n\n📛 Command: question\n\n${_0x2763aa}`, _0x2763aa
      );
    }
  });
  
  //---------------------------------------------------------------------------  
  //                      TRUTH OR DARE (TOXIC MODE)  
  //---------------------------------------------------------------------------  
  
  smd({
    cmdname: "truth",
    info: "Truth and dare game. Let's expose your secrets! 😈",
    type: "pastime",
    filename: __filename
  }, async (_0xc2b276, _0x3b493e, {
    smd: _0x52be61
  }) => {
    try {
      await _0xc2b276.reply(
        `🫣 *Ready to expose yourself?* \n\n🔮 *Truth:* ${await randomeFunfacts(_0x52be61)}`
      );
    } catch (_0x28b284) {
      await _0xc2b276.error(
        `💀 *Error detected!* 💀\n\n📛 Command: truth\n\n${_0x28b284}`, _0x28b284
      );
    }
  });
  
  //---------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------  
//                      DARE (TOXIC MODE)  
//---------------------------------------------------------------------------  

smd({
    cmdname: "dare",
    info: "Truth and dare (Dare game). You better not be a coward! 😏",
    type: "pastime",
    filename: __filename
  }, async (_0x330b72, _0x34d36a, {
    smd: _0x2a0858
  }) => {
    try {
      await _0x330b72.reply(
        `🔥 *Dare you to do this... but I know you're too weak!* \n\n🎭 *Dare:* ${await randomeFunfacts(_0x2a0858)}`
      );
    } catch (_0x27a0b8) {
      await _0x330b72.error(
        `💀 *Error detected!* 💀\n\n📛 Command: dare\n\n${_0x27a0b8}`, _0x27a0b8
      );
    }
  });
  
  //---------------------------------------------------------------------------  
  //                      JOKE (TOXIC MODE)  
  //---------------------------------------------------------------------------  
  
  smd({
    cmdname: "joke",
    info: "Sends a joke. Probably funnier than your existence. 🤡",
    type: "pastime",
    filename: __filename
  }, async (_0x330ac0, _0x8b468d, {
    smd: _0x2e3522
  }) => {
    try {
      await _0x330ac0.reply(
        `😂 *Here's a joke, but not funnier than you!* \n\n🃏 *Joke:* ${await randomeFunfacts(_0x2e3522)}`
      );
    } catch (_0x1817a2) {
      await _0x330ac0.error(
        `💀 *Error detected!* 💀\n\n📛 Command: joke\n\n${_0x1817a2}`, _0x1817a2
      );
    }
  });
  
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------  
//                      JOKE2 (TOXIC MODE)  
//---------------------------------------------------------------------------  

smd({
    cmdname: "joke2",
    info: "Sends a joke. Probably worse than your life. 🤡",
    type: "pastime",
    filename: __filename
  }, async (_0x5c9c52, _0x6b6e25, {
    smd: _0x64ba
  }) => {
    try {
      await _0x5c9c52.reply(
        `😂 *Here's a joke, but not as funny as your failures!* \n\n🃏 *Joke:* ${await randomeFunfacts(_0x64ba)}`
      );
    } catch (_0x35fd84) {
      await _0x5c9c52.error(
        `💀 *Error detected!* 💀\n\n📛 Command: joke2\n\n${_0x35fd84}`, _0x35fd84
      );
    }
  });
  
  //---------------------------------------------------------------------------  
  //                      FACT (TOXIC MODE)  
  //---------------------------------------------------------------------------  
  
  smd({
    cmdname: "fact",
    info: "Sends a fact. Not that you care. 🙄",
    type: "pastime",
    filename: __filename
  }, async (_0x1dc7e3, _0x16aaa1, {
    smd: _0x375b98
  }) => {
    try {
      await _0x1dc7e3.reply(
        `📢 *Here's a fact... but let's be real, your life is already full of unfortunate facts!* \n\n📖 *Fact:* ${await randomeFunfacts(_0x375b98)}`
      );
    } catch (_0x1e1a8b) {
      await _0x1dc7e3.error(
        `💀 *Error detected!* 💀\n\n📛 Command: fact\n\n${_0x1e1a8b}`, _0x1e1a8b
      );
    }
  });
  
  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------  
//                      QUOTES (TOXIC MODE)  
//---------------------------------------------------------------------------  

smd({
    cmdname: "quotes",
    info: "Sends a quote. Not that you need wisdom. 🙄",
    type: "pastime",
    filename: __filename
  }, async (_0x12963f, _0x4f30d2, {
    smd: _0x3462d1
  }) => {
    try {
      await _0x12963f.reply(
        `📢 *Here's a quote... maybe it'll make your life slightly less tragic!* \n\n💬 *Quote:* ${await randomeFunfacts(_0x3462d1)}`
      );
    } catch (_0x18e714) {
      await _0x12963f.error(
        `💀 *Error detected!* 💀\n\n📛 Command: quotes\n\n${_0x18e714}`, _0x18e714
      );
    }
  });
  
  //---------------------------------------------------------------------------  
  //                      DEFINE (TOXIC MODE)  
  //---------------------------------------------------------------------------  
  
  smd({
    cmdname: "define",
    info: "Urban dictionary. Because you clearly need education. 📚🤡",
    type: "pastime",
    filename: __filename
  }, async (_0x460337, _0x614c0a) => {
    try {
      let _0x328d73 = _0x614c0a ? _0x614c0a : _0x460337.reply_text;
      if (!_0x328d73) {
        return await _0x460337.send(
          `🧠 *Hey ${_0x460337.senderName}, use your brain and provide a word!* 🤦‍♂️`
        );
      }
      let {
        data: _0x330600
      } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x328d73);
      
      var _0x27eb8f = _0x330600 && _0x330600.list.length > 0
        ? `📖 *Word:* \`\`\`${_0x328d73}\`\`\`\n📜 *Definition:* \`\`\`${_0x330600.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}\`\`\`\n🔍 *Example:* \`\`\`${_0x330600.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}\`\`\``
        : `❌ *No results found for:* \`\`\`${_0x328d73}\`\`\`\n\n📢 *Even the internet doesn't recognize your nonsense!* 🤡`;
  
      return _0x460337.reply(_0x27eb8f);
    } catch (_0x1d0916) {
      await _0x460337.error(
        `💀 *Error detected!* 💀\n\n📛 Command: define\n\n${_0x1d0916}`, _0x1d0916
      );
    }
  });
  
  //---------------------------------------------------------------------------