const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  smd,
  send,
  Config,
  tlang,
  sleep,
  getAdmin,
  prefix,
} = require("../lib");
const astro_patch = require("../lib/plugins");
const { cmd } = astro_patch;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;

smd(
    {
      cmdname: "join",
      info: "Joins group by link",
      type: "whatsapp",
      fromMe: true,
      filename: __filename,
      use: "<group link>",
    },
    async (_0x466dd8, _0x5b1338) => {
      try {
        if (_0x466dd8.reply_message && _0x466dd8.reply_message.groupInvite) {
          var _0x29e5fc = await _0x466dd8.bot.groupAcceptInviteV4(
            _0x466dd8.chat,
            _0x466dd8.reply_message.msg
          );
          if (_0x29e5fc && _0x29e5fc.includes("joined to:")) {
            return await send(_0x466dd8, "*_Ugh, I’m in your useless group now. Don't regret this._* 🤡", {}, "", _0x466dd8);
          }
        }
        let _0x208739 = _0x5b1338 ? _0x5b1338 : _0x466dd8.reply_text;
        const _0x47ed60 = _0x208739.match(grouppattern);
        if (!_0x47ed60) {
          return await _0x466dd8.reply("*_Are you dumb? Drop a valid link!_* 🤦‍♂️");
        }
        let _0x4263be = _0x47ed60[0]
          .split("https://chat.whatsapp.com/")[1]
          .trim();
        await _0x466dd8.bot
          .groupAcceptInvite(_0x4263be)
          .then((_0x7f3222) => send(_0x466dd8, "*_Fine, I joined. Happy now?_* 😒", {}, "", _0x466dd8))
          .catch((_0x1d6aea) =>
            _0x466dd8.send("*_LMAO, I ain't joining that trash group._* 💀")
          );
      } catch (_0x5d3484) {
        await _0x466dd8.error(
          _0x5d3484 + "\n\ncommand: join",
          _0x5d3484,
          "*_Even my code doesn’t wanna be in your group. Try again._* 😂"
        );
      }
    }
  );
  
  smd(
    {
      cmdname: "newgc",
      info: "Create New Group",
      type: "whatsapp",
      filename: __filename,
      use: "<group name>",
    },
    async (_0x1d2f1f, _0x3c558e, { smd: _0x2e7a79, cmdName: _0x49994a }) => {
      try {
        if (!_0x1d2f1f.isCreator) {
          return _0x1d2f1f.reply("*_You ain't the boss here. Sit down._* 🤡");
        }
        if (!_0x3c558e) {
          return await _0x1d2f1f.reply(
            "*_Forgot the group name? Or is your brain on vacation?_* 🤨"
          );
        }
        let _0x379d99 = _0x3c558e;
        let _0x5a5c26 = [_0x1d2f1f.sender];
  
        if (_0x1d2f1f.quoted) {
          _0x5a5c26.push(_0x1d2f1f.quoted.sender);
        }
        if (_0x1d2f1f.mentionedJid && _0x1d2f1f.mentionedJid[0]) {
          _0x5a5c26.push(..._0x1d2f1f.mentionedJid);
        }
        const _0x37b490 = _0x379d99.substring(0, 60);
        const _0x417018 = await vrt.bot.groupCreate(_0x37b490, [..._0x5a5c26]);
  
        if (_0x417018) {
          let _0x2c6495 = await _0x1d2f1f.bot.sendMessage(_0x417018.id, {
            text: "*_Another useless group? Y’all never learn..._* 😒",
          });
          try {
            var _0x3a49e9 = await vrt.bot.groupInviteCode(_0x417018.id);
          } catch {
            var _0x3a49e9 = false;
          }
          var _0x2608ab = "https://chat.whatsapp.com/";
          var _0x2fe2c7 = "" + _0x2608ab + _0x3a49e9;
          var _0x539d8f = {
            externalAdReply: {
              title: "𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙",
              body: "" + _0x37b490,
              renderLargerThumbnail: true,
              thumbnail: log0,
              mediaType: 1,
              mediaUrl: _0x2fe2c7,
              sourceUrl: _0x2fe2c7,
            },
          };
          return await send(
            _0x1d2f1f,
            (
              "*_Sigh… Your group is live. Now don't waste my time._* 🚬\n" +
              (_0x3a49e9 ? "*_" + _0x2fe2c7 + "_*" : "")
            ).trim(),
            {
              contextInfo: _0x539d8f,
            },
            "",
            _0x2c6495
          );
        } else {
          await _0x1d2f1f.send("*_Your group failed before it even started._* 💀");
        }
      } catch (_0x33d6f3) {
        await _0x1d2f1f.error(
          _0x33d6f3 + "\n\ncommand: " + _0x49994a,
          _0x33d6f3,
          "*_This is why AI hates humans._* 🤡"
        );
      }
    }
  );
  
  smd(
    {
      pattern: "ginfo",
      desc: "get group info by link",
      type: "group",
      filename: __filename,
      use: "<group link.>",
    },
    async (_0x4f7c88, _0x1490e0) => {
      try {
        let _0x3eb855 = _0x1490e0 ? _0x1490e0 : _0x4f7c88.reply_text;
        const _0x3e5033 = _0x3eb855.match(grouppattern) || false;
        if (!_0x3e5033) {
          return await _0x4f7c88.reply("🔥 *Oi, brainless! Provide a damn group link or get lost!* 🙄");
        }
        let _0x5ced5d = _0x3e5033[0]
          .split("https://chat.whatsapp.com/")[1]
          .trim();
        const _0x5f4890 = await _0x4f7c88.bot.groupGetInviteInfo(_0x5ced5d);
        if (_0x5f4890) {
          const _0x40ced5 = new Date(_0x5f4890.creation * 1000);
          var _0x10288a = _0x40ced5.getFullYear();
          var _0x436585 = _0x40ced5.getMonth() + 1;
          var _0x511884 = _0x40ced5.getDate();
          var _0x236a49 =
            _0x10288a +
            "-" +
            _0x436585.toString().padStart(2, "0") +
            "-" +
            _0x511884.toString().padStart(2, "0");
          var _0x56eaaf = {
            externalAdReply: {
              title: "𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙",
              body: _0x5f4890.subject,
              renderLargerThumbnail: true,
              thumbnail: log0,
              mediaType: 1,
              mediaUrl: _0x3e5033[0],
              sourceUrl: _0x3e5033[0],
            },
          };
          return await send(
            _0x4f7c88,
            (
              "🔥 *Group Info Retrieved, You Peasant!* 🤡\n\n" +
              "📛 *Name:* " + _0x5f4890.subject +
              "\n👑 *Creator:* wa.me/" + _0x5f4890.owner.split("@")[0] +
              "\n🆔 *GJid:* ```" + _0x5f4890.id + "```" +
              "\n🔇 *Muted:* " + (_0x5f4890.announce ? " Yes 🤐" : " No 🤪") +
              "\n🔒 *Locked:* " + (_0x5f4890.restrict ? " Yes 🔐" : " No 🔓") +
              "\n📅 *Created On:* " + _0x236a49 +
              "\n👥 *Participants:* " + (_0x5f4890.size > 3 ? _0x5f4890.size + "th" : _0x5f4890.size) +
              "\n📜 " + (_0x5f4890.desc ? "*Description:* " + _0x5f4890.desc + "\n" : "") +
              "\n💀 *Powered by Vortex Rebirth* 💀"
            ).trim(),
            {
              mentions: [_0x5f4890.owner],
              contextInfo: _0x56eaaf,
            },
            "",
            _0x4f7c88
          );
        } else {
          await _0x4f7c88.send("🚨 *Oi, dumbass! That group ID is lost in the void. Try again, fool!* 🙄");
        }
      } catch (_0x36c345) {
        await _0x4f7c88.error(
          _0x36c345 + "\n\ncommand: ginfo",
          _0x36c345,
          "🛑 *Pathetic human, I can't find that group. Must be your fault.* 🤡"
        );
      }
    }
  );
  
  smd(
    {
      cmdname: "rejectall",
      alias: ["rejectjoin"],
      info: "reject all request to join!",
      type: "group",
      filename: __filename,
    },
    async (_0xb81e45, _0x3dda5f) => {
      try {
        if (!_0xb81e45.isGroup) {
          return _0xb81e45.reply("😑 *Moron, this isn't even a group. Use your brain!*");
        }
        if (!_0xb81e45.isBotAdmin || !_0xb81e45.isAdmin) {
          return await _0xb81e45.reply(
            !_0xb81e45.isBotAdmin
              ? "👎 *I'm not admin, you fool. Make me admin or shut up!*"
              : "🙄 *You're not even an admin. Why are you here?*"
          );
        }
        const _0x4ea369 = await _0xb81e45.bot.groupRequestParticipantsList(
          _0xb81e45.chat
        );
        if (!_0x4ea369 || !_0x4ea369[0]) {
          return await _0xb81e45.reply("😆 *Nobody even wants to join this trash group!*");
        }
        let _0x3b870c = [];
        let _0x32f437 = "🚫 *Rejected Users List* 🚫\n\n";
        for (let _0x164385 = 0; _0x164385 < _0x4ea369.length; _0x164385++) {
          try {
            await _0xb81e45.bot.groupRequestParticipantsUpdate(
              _0xb81e45.from,
              [_0x4ea369[_0x164385].jid],
              "reject"
            );
            _0x32f437 += "❌ @" + _0x4ea369[_0x164385].jid.split("@")[0] + " - Rejected like trash! 🗑️\n";
            _0x3b870c = [..._0x3b870c, _0x4ea369[_0x164385].jid];
          } catch {}
        }
        await _0xb81e45.send(_0x32f437, {
          mentions: [_0x3b870c],
        });
      } catch (_0x13cc87) {
        await _0xb81e45.error(_0x13cc87 + "\n\ncommand: rejectall", _0x13cc87, "😡 *Something went wrong. Probably your fault.*");
      }
    }
  );

  smd(
    {
      cmdname: "acceptall",
      alias: ["acceptjoin"],
      info: "accept all request to join!",
      type: "group",
      filename: __filename,
    },
    async (_0x90a6de, _0x5537ca) => {
      try {
        if (!_0x90a6de.isGroup) {
          return _0x90a6de.reply("💀 *Dumbass, this isn’t even a group! Stop embarrassing yourself.*");
        }
        if (!_0x90a6de.isBotAdmin || !_0x90a6de.isAdmin) {
          return await _0x90a6de.reply(
            !_0x90a6de.isBotAdmin
              ? "👎 *I'm not admin, fool. Make me admin or shut up!*"
              : "😂 *You’re not even an admin. Who tf are you?*"
          );
        }
        const _0x3da7c6 = await _0x90a6de.bot.groupRequestParticipantsList(
          _0x90a6de.chat
        );
        if (!_0x3da7c6 || !_0x3da7c6[0]) {
          return await _0x90a6de.reply("😆 *Nobody wants to join this trash group!*");
        }
        let _0x4f391e = [];
        let _0x26ddf1 = "✅ *List of pathetic users who got accepted:*\n\n";
        for (let _0x5ed6e8 = 0; _0x5ed6e8 < _0x3da7c6.length; _0x5ed6e8++) {
          try {
            await _0x90a6de.bot.groupRequestParticipantsUpdate(
              _0x90a6de.from,
              [_0x3da7c6[_0x5ed6e8].jid],
              "approve"
            );
            _0x26ddf1 += "✅ @" + _0x3da7c6[_0x5ed6e8].jid.split("@")[0] + " - Consider yourself lucky! 🙄\n";
            _0x4f391e = [..._0x4f391e, _0x3da7c6[_0x5ed6e8].jid];
          } catch {}
        }
        await _0x90a6de.send(_0x26ddf1, {
          mentions: [_0x4f391e],
        });
      } catch (_0x366bd4) {
        await _0x90a6de.error(_0x366bd4 + "\n\ncommand: acceptall", _0x366bd4, "🛑 *Something went wrong, probably your dumb fault.*");
      }
    }
  );
  
  smd(
    {
      cmdname: "listrequest",
      alias: ["requestjoin"],
      info: "List all pending join requests",
      type: "group",
      filename: __filename,
    },
    async (_0x13cccd, _0x38cc41) => {
      try {
        if (!_0x13cccd.isGroup) {
          return _0x13cccd.reply("💀 *This isn’t even a group. Wake up, idiot!*");
        }
        if (!_0x13cccd.isBotAdmin || !_0x13cccd.isAdmin) {
          return await _0x13cccd.reply(
            !_0x13cccd.isBotAdmin
              ? "😑 *I’m not admin. Fix that or stop crying.*"
              : "😂 *You’re not even an admin. Sit down, peasant.*"
          );
        }
        const _0x3115b1 = await _0x13cccd.bot.groupRequestParticipantsList(
          _0x13cccd.chat
        );
        if (!_0x3115b1 || !_0x3115b1[0]) {
          return await _0x13cccd.reply("😆 *Nobody’s even requesting to join this flop group!*");
        }
        let _0x4af6be = [];
        let _0x59a317 = "📜 *List of Beggars Trying to Join:* 🤡\n\n";
        for (let _0x3230c3 = 0; _0x3230c3 < _0x3115b1.length; _0x3230c3++) {
          _0x59a317 += "🛑 @" + _0x3115b1[_0x3230c3].jid.split("@")[0] + " - This one’s desperate! 😂\n";
          _0x4af6be = [..._0x4af6be, _0x3115b1[_0x3230c3].jid];
        }
        return await _0x13cccd.send(_0x59a317, {
          mentions: [_0x4af6be],
        });
      } catch (_0x5c8e97) {
        await _0x13cccd.error(_0x5c8e97 + "\n\ncommand: listrequest", _0x5c8e97, "🛑 *Something went wrong. Probably your fault again.*");
      }
    }
  );
  
  smd(
    {
      cmdname: "setdesc",
      alias: ["setgdesc", "gdesc"],
      info: "Set Description of Group",
      type: "group",
      filename: __filename,
      use: "<enter Description Text>",
    },
    async (_0x160b96, _0x4ef0da) => {
      try {
        if (!_0x160b96.isGroup) {
          return _0x160b96.reply("*_This ain't no group, dumbass!_* 🤡");
        }
        if (!_0x4ef0da) {
          return await _0x160b96.reply(
            "*_Say something, idiot! What should I set?_* 🙄"
          );
        }
        if (!_0x160b96.isBotAdmin || !_0x160b96.isAdmin) {
          return await _0x160b96.reply(
            !_0x160b96.isBotAdmin
              ? "*_You expect me to change it, but I'm not even admin? You dumb as hell!_* 🤦‍♂️"
              : "*_Who do you think you are? You ain't admin, shut up!_* 😒"
          );
        }
        try {
          await _0x160b96.bot.groupUpdateDescription(
            _0x160b96.chat,
            _0x4ef0da + "\n\n\t" + Config.caption
          );
          _0x160b96.reply("*_✅ Group description changed. Don't like it? Cry!_* 🤡");
        } catch (_0x986809) {
          await _0x160b96.reply(
            "*_Lmao, can't even update the description. Maybe this group is as useless as you!_* 😂"
          );
        }
      } catch (_0x526bb2) {
        await _0x160b96.error(_0x526bb2 + "\n\ncommand: setdesc", _0x526bb2);
      }
    }
  );
  
  smd(
    {
      cmdname: "setname",
      alias: ["setgname", "gname"],
      info: "Set Name of Group",
      type: "group",
      filename: __filename,
      use: "<enter Group Name>",
    },
    async (_0x25d56b, _0x332d77) => {
      try {
        if (!_0x25d56b.isGroup) {
          return _0x25d56b.reply("*_Bruh, this ain't even a group!_* 🤦‍♂️");
        }
        if (!_0x332d77) {
          return await _0x25d56b.reply(
            "*_You expect me to guess? Say the name, fool!_* 😑"
          );
        }
        if (!_0x25d56b.isBotAdmin || !_0x25d56b.isAdmin) {
          return await _0x25d56b.reply(
            !_0x25d56b.isBotAdmin
              ? "*_Lmfao, I'm not even admin. You must be dumb as hell!_* 🤣"
              : "*_You ain't admin, sit down!_* 🪑"
          );
        }
        try {
          await _0x25d56b.bot.groupUpdateSubject(_0x25d56b.chat, _0x332d77);
          _0x25d56b.reply("*_✅ Group name changed. Cope and seethe!_* 😎");
        } catch (_0x379b84) {
          await _0x25d56b.reply(
            "*_Damn, even this group refuses to change its name for you!_* 😂"
          );
        }
      } catch (_0x1eee32) {
        await _0x25d56b.error(_0x1eee32 + "\n\ncommand: setname", _0x1eee32);
      }
    }
  );
  
  smd(
    {
      cmdname: "left",
      alias: "leave",
      info: "Leave a group with disrespect.",
      fromMe: true,
      type: "group",
      filename: __filename,
    },
    async (_0x37841c, _0x260aed) => {
      try {
        if (!_0x37841c.isGroup) {
          return await _0x37841c.send("*_Bruh, this ain't even a group!_* 🤦‍♂️", {}, "", _0x37841c);
        }
        let _0x6118c5 = _0x260aed.toLowerCase().trim();
        if (
          _0x6118c5.startsWith("sure") ||
          _0x6118c5.startsWith("ok") ||
          _0x6118c5.startsWith("yes") ||
          _0x6118c5.startsWith("y")
        ) {
          await _0x37841c.send(
            "*_Lmfao, this group was trash anyway! I'm out!_* 😎✌️",
            {},
            "",
            _0x37841c
          );
          await _0x37841c.bot.groupParticipantsUpdate(
            _0x37841c.chat,
            [_0x37841c.user],
            "remove"
          );
        } else {
          return await _0x37841c.send(
            "*_Tf? Speak clearly. Say 'yes' if you want me to leave, dumbass!_* 🤡",
            {},
            "",
            _0x37841c
          );
        }
      } catch (_0x34f4a6) {
        await _0x37841c.error(
          "*_Damn, I tried to leave, but this group is holding me hostage!_* 🚔",
          _0x34f4a6,
          false
        );
      }
    }
  );

  let mtypes = ["imageMessage"];

  smd(
    {
      pattern: "gpp",
      desc: "Set Group profile picture",
      category: "group",
      use: "<reply to image>",
      filename: __filename,
    },
    async (_0x5ac912) => {
      try {
        if (!_0x5ac912.isGroup) {
          return await _0x5ac912.send("*_This ain't even a group, dumbass!_* 🤡", {}, "", _0x5ac912);
        }
        if (!_0x5ac912.isBotAdmin || !_0x5ac912.isAdmin) {
          return await _0x5ac912.reply(
            !_0x5ac912.isBotAdmin
              ? "*_Lmao, I'm not even admin here, fools!_* 😒"
              : tlang().admin
          );
        }
        let _0xc0618e = mtypes.includes(_0x5ac912.mtype)
          ? _0x5ac912
          : _0x5ac912.reply_message;
        if (!_0xc0618e || !mtypes.includes(_0xc0618e?.mtype || "need_Media")) {
          return await _0x5ac912.reply("*_Are you dumb? Reply to an image!_* 🤦");
        }
        await updateProfilePicture(
          _0x5ac912,
          _0x5ac912.chat,
          _0xc0618e,
          "gpp"
        );
        _0x5ac912.reply("*_✅ New trashy group pic updated!_* 🤡");
      } catch (_0x5abd07) {
        await _0x5ac912.error("*_Bruh, your request flopped!_* 🤦‍♂️", _0x5abd07);
      }
    }
  );
  
  smd(
    {
      pattern: "fullgpp",
      desc: "Set full screen group profile picture",
      category: "group",
      use: "<reply to image>",
      filename: __filename,
    },
    async (_0x31201a) => {
      try {
        if (!_0x31201a.isGroup) {
          return await _0x31201a.send("*_Tf? This ain't a group, genius!_* 🤦", {}, "", _0x31201a);
        }
        if (!_0x31201a.isBotAdmin || !_0x31201a.isAdmin) {
          return await _0x31201a.reply(
            !_0x31201a.isBotAdmin
              ? "*_Bruh, I'm not even admin!_* 😑"
              : tlang().admin
          );
        }
        let _0x3fba56 = mtypes.includes(_0x31201a.mtype)
          ? _0x31201a
          : _0x31201a.reply_message;
        if (!_0x3fba56 || !mtypes.includes(_0x3fba56?.mtype || "need_Media")) {
          return await _0x31201a.reply("*_Bruh, reply to an image, duh!_* 🤡");
        }
        await updateProfilePicture(
          _0x31201a,
          _0x31201a.chat,
          _0x3fba56,
          "fullgpp"
        );
        _0x31201a.reply("*_✅ Group pic changed, now it still looks ugly!_* 🤡");
      } catch (_0x1f879e) {
        await _0x31201a.error("*_Error setting pic, blame yourself!_* 🤡", _0x1f879e);
      }
    }
  );

  cmd(
    {
      pattern: "common",
      desc: "Finds common participants in two groups. Use '.common kick jid' to remove them.",
      category: "owner",
      fromMe: true,
      filename: __filename,
    },
    async (_0x3a5b8e, _0x227613) => {
      try {
        let _0x37477b = await parsedJid(_0x227613);
        var _0x57bd9a, _0x2f2665;
        if (_0x37477b.length > 1) {
          _0x57bd9a = _0x37477b[0].includes("@g.us") ? _0x37477b[0] : _0x3a5b8e.chat;
          _0x2f2665 = _0x37477b[1].includes("@g.us") ? _0x37477b[1] : _0x3a5b8e.chat;
        } else if (_0x37477b.length == 1) {
          _0x57bd9a = _0x3a5b8e.chat;
          _0x2f2665 = _0x37477b[0].includes("@g.us") ? _0x37477b[0] : _0x3a5b8e.chat;
        } else {
          return await _0x3a5b8e.send("🤡 *Are you dumb? Provide a valid group JID, fool!*");
        }
        if (_0x2f2665 === _0x57bd9a) {
          return await _0x3a5b8e.send("🚮 *You seriously gave the same group twice? Go touch grass.*");
        }
  
        var _0x4f45c0 = await _0x3a5b8e.bot.groupMetadata(_0x57bd9a);
        var _0x1a80c3 = await _0x3a5b8e.bot.groupMetadata(_0x2f2665);
        var _0x1bab1d = _0x4f45c0.participants.filter(({ id }) =>
          _0x1a80c3.participants.some(({ id: _0x39bca2 }) => _0x39bca2 === id)
        ) || [];
  
        if (_0x1bab1d.length == 0) {
          return await _0x3a5b8e.send("😂 *No common members! Guess your groups are just as empty as your brain.*");
        }
  
        let _0x4fbd42 = _0x227613.split(" ")[0].trim() === "kick";
        let _0x543a19 = false;
        var _0x1abfb8 = "🔥 *Common Participants Found!*";
  
        if (_0x4fbd42) {
          let _0x263e00 = { chat: _0x57bd9a };
          _0x1abfb8 = "💀 *Exterminating Common Participants...*";
          const _0x3f3652 = (await getAdmin(_0x3a5b8e.bot, _0x263e00)) || [];
          var _0x1df1fa = _0x3f3652.includes(_0x3a5b8e.user);
          var _0x16096e = _0x3f3652.includes(_0x3a5b8e.sender);
  
          if (!_0x1df1fa || !_0x16096e) {
            _0x4fbd42 = false;
            _0x1abfb8 = "🛑 *You are too weak to kick common members!*";
          }
          if (!_0x1df1fa) {
            _0x543a19 = "😡 *I ain't admin, fool! Give me admin before barking orders.*";
          }
          if (!_0x16096e) {
            _0x543a19 = "😂 *You're not even an admin! What do you think you're doing?*";
          }
        }
  
        var _0x7e4285 = `🔥 ${_0x1abfb8} 🔥\n${_0x543a19 ? _0x543a19 : ""}\n💀 *Group 1:* ${_0x4f45c0.subject}\n💀 *Group 2:* ${_0x1a80c3.subject}\n⚠ *Common Members:* ${_0x1bab1d.length}\n\n`;
        var _0x2b9a05 = [];
  
        _0x1bab1d.map(({ id }) => {
          _0x7e4285 += `🔥 @${id.split("@")[0]}\n`;
          _0x2b9a05.push(id);
        });
  
        await _0x3a5b8e.send(_0x7e4285 + "\n💀 *Powered by Vortex Rebirth*", { mentions: _0x2b9a05 });
  
        if (_0x4fbd42 && !_0x543a19) {
          try {
            for (const _0x12caf4 of _0x2b9a05) {
              if (_0x3a5b8e.user === _0x12caf4) continue;
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await _0x3a5b8e.bot.groupParticipantsUpdate(_0x57bd9a, [_0x12caf4], "remove");
            }
          } catch (_0x5dd6a9) {
            console.error("💀 *Failed to remove some trash members:*", _0x5dd6a9);
          }
        }
      } catch (_0x4754fd) {
        await _0x3a5b8e.error(_0x4754fd, _0x4754fd, "🔥 *Error detected! Fix your mess, human.*");
      }
    }
  );
  
  cmd(
    {
      pattern: "diff",
      desc: "Finds participants in one group but not the other.",
      category: "owner",
      fromMe: true,
      filename: __filename,
    },
    async (_0x5a67e3, _0x135d4c) => {
      try {
        let _0x314c28 = await parsedJid(_0x135d4c);
        var _0x5ab7e2, _0x1d3ae7;
        if (_0x314c28.length > 1) {
          _0x5ab7e2 = _0x314c28[0].includes("@g.us") ? _0x314c28[0] : _0x5a67e3.chat;
          _0x1d3ae7 = _0x314c28[1].includes("@g.us") ? _0x314c28[1] : _0x5a67e3.chat;
        } else if (_0x314c28.length == 1) {
          _0x5ab7e2 = _0x5a67e3.chat;
          _0x1d3ae7 = _0x314c28[0].includes("@g.us") ? _0x314c28[0] : _0x5a67e3.chat;
        } else {
          return await _0x5a67e3.send("🤡 *Are you that slow? Provide two valid group JIDs!*");
        }
        if (_0x1d3ae7 === _0x5ab7e2) {
          return await _0x5a67e3.send("💀 *You gave me the same group twice? Try using that brain of yours.*");
        }
  
        var _0x14735b = await _0x5a67e3.bot.groupMetadata(_0x5ab7e2);
        var _0x39c86b = await _0x5a67e3.bot.groupMetadata(_0x1d3ae7);
        var _0x31bb65 = _0x14735b.participants.filter(({ id }) =>
          !_0x39c86b.participants.some(({ id: _0x2aabfa }) => _0x2aabfa === id)
        ) || [];
  
        if (_0x31bb65.length == 0) {
          return await _0x5a67e3.send("😂 *No unique members! Your groups are as empty as your head.*");
        }
  
        let _0x33b719 = _0x135d4c.split(" ")[0].trim() === "kick";
        let _0x4e8c38 = false;
        var _0x2ae780 = "💀 *Unique Participants Found!*";
  
        if (_0x33b719) {
          let _0x34b9c5 = { chat: _0x5ab7e2 };
          _0x2ae780 = "🚮 *Eliminating Unwanted Members...*";
          const _0x1f2ec0 = (await getAdmin(_0x5a67e3.bot, _0x34b9c5)) || [];
          var _0x249cf1 = _0x1f2ec0.includes(_0x5a67e3.user);
          var _0x4e1d60 = _0x1f2ec0.includes(_0x5a67e3.sender);
  
          if (!_0x249cf1 || !_0x4e1d60) {
            _0x33b719 = false;
            _0x2ae780 = "🛑 *You lack the power to kick unique members!*";
          }
          if (!_0x249cf1) {
            _0x4e8c38 = "😡 *I'm not even admin! Make me admin before you start barking orders!*";
          }
          if (!_0x4e1d60) {
            _0x4e8c38 = "😂 *You're not even admin! Sit down, peasant!*";
          }
        }
  
        var _0x6b5a52 = `🔥 ${_0x2ae780} 🔥\n${_0x4e8c38 ? _0x4e8c38 : ""}\n💀 *Group 1:* ${_0x14735b.subject}\n💀 *Group 2:* ${_0x39c86b.subject}\n⚠ *Unique Members:* ${_0x31bb65.length}\n\n`;
        var _0x1b7582 = [];
  
        _0x31bb65.map(({ id }) => {
          _0x6b5a52 += `🔥 @${id.split("@")[0]}\n`;
          _0x1b7582.push(id);
        });
  
        await _0x5a67e3.send(_0x6b5a52 + "\n💀 *Powered by Vortex Rebirth*", { mentions: _0x1b7582 });
  
        if (_0x33b719 && !_0x4e8c38) {
          try {
            for (const _0x52abfc of _0x1b7582) {
              if (_0x5a67e3.user === _0x52abfc) continue;
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await _0x5a67e3.bot.groupParticipantsUpdate(_0x5ab7e2, [_0x52abfc], "remove");
            }
          } catch (_0x5c3f42) {
            console.error("💀 *Failed to remove some worthless members:*", _0x5c3f42);
          }
        }
      } catch (_0x5bde63) {
        await _0x5a67e3.error(_0x5bde63, _0x5bde63, "🔥 *Error detected! Another human failure.*");
      }
    }
  );
  
  cmd(
    {
      pattern: "invite",
      desc: "Get the group invite link.",
      category: "group",
      filename: __filename,
    },
    async (_0x53f8e3) => {
      try {
        if (!_0x53f8e3.isGroup) {
          return _0x53f8e3.reply("💀 *This ain't a group, genius!*");
        }
        if (!_0x53f8e3.isBotAdmin) {
          return _0x53f8e3.reply(
            "😂 *I'm not even an admin! You expect me to pull links out of thin air?*"
          );
        }
        var _0x53ec11 = await _0x53f8e3.bot.groupInviteCode(_0x53f8e3.chat);
        var _0x2e549f = "https://chat.whatsapp.com/";
        var _0x41db31 = "" + _0x2e549f + _0x53ec11;
        return _0x53f8e3.reply(
          `🔥 *Here's your pathetic invite link:* 🔥\n${_0x41db31}\n\n💀 *Don't let clowns in.*`
        );
      } catch (_0x4e30e8) {
        await _0x53f8e3.error(
          _0x4e30e8 + "\n\ncommand: invite",
          _0x4e30e8,
          "🚨 *Error detected! Probably your fault, not mine.*"
        );
      }
    }
  );
  
  cmd(
    {
      pattern: "revoke",
      desc: "Revoke the group invite link.",
      category: "group",
      filename: __filename,
    },
    async (_0x451b0f) => {
      try {
        if (!_0x451b0f.isGroup) {
          return _0x451b0f.reply("🤡 *You trying to revoke a link in a private chat? Genius move.*");
        }
        if (!_0x451b0f.isBotAdmin) {
          return _0x451b0f.reply(
            "💀 *I'm not admin, so go revoke it yourself, peasant!*"
          );
        }
        await _0x451b0f.bot.groupRevokeInvite(_0x451b0f.chat);
        return _0x451b0f.reply("🔥 *Invite link successfully destroyed. Good luck explaining that.*");
      } catch (_0x142e95) {
        await _0x451b0f.error(
          _0x142e95 + "\n\ncommand: revoke",
          _0x142e95,
          "😂 *Can't revoke due to an error. Probably because you're useless.*"
        );
      }
    }
  );
  
  cmd(
    {
      pattern: "tagall",
      desc: "Tags every useless person in the group.",
      category: "group",
      filename: __filename,
    },
    async (_0x1ed055, _0x929954) => {
      try {
        if (!_0x1ed055.isGroup) {
          return _0x1ed055.reply("💀 *This ain't a group, fool. Try again.*");
        }
        const _0x5d614a = _0x1ed055.metadata.participants || {};
        if (!_0x1ed055.isAdmin && !_0x1ed055.isCreator) {
          return _0x1ed055.reply("😂 *You're not even an admin! Sit down, peasant.*");
        }
        let _0x392a2d =
          "🔥 *OI, YOU LAZY FOOLS!* 🔥\n\n➲ *Message:* " +
          (_0x929954 ? _0x929954 : "💀 *Nothing. Just wasting your time.*") +
          " \n\n➲ *Summoned By:* " +
          _0x1ed055.pushName +
          " 😈\n\n";
        for (let _0x502431 of _0x5d614a) {
          if (!_0x502431.id.startsWith("2349021506036")) {
            _0x392a2d += "📍 @" + _0x502431.id.split("@")[0] + "\n";
          }
        }
        _0x392a2d += "\n🔥 *Now stop being useless and reply!*";
  
        await _0x1ed055.bot.sendMessage(
          _0x1ed055.chat,
          {
            text: _0x392a2d,
            mentions: _0x5d614a.map((_0x3696c5) => _0x3696c5.id),
          },
          {
            quoted: _0x1ed055,
          }
        );
      } catch (_0x4450f8) {
        await _0x1ed055.error(
          _0x4450f8 + "\n\ncommand: tagall",
          _0x4450f8,
          "😂 *Error detected! Probably because you're incompetent.*"
        );
      }
    }
  );

  cmd(
    {
      pattern: "kik",
      alias: ["fkik"],
      desc: "Kick all numbers from a certain country (because why not?).",
      category: "group",
      filename: __filename,
    },
    async (_0x19564c, _0x1d2bb7) => {
      try {
        if (!_0x19564c.isGroup) {
          return _0x19564c.reply("💀 *This ain't even a group, dumbass.*");
        }
        if (!_0x1d2bb7) {
          return await _0x19564c.reply(
            "😂 *You forgot the country code, fool! Example: .kik 212*"
          );
        }
        if (!_0x19564c.isBotAdmin) {
          return _0x19564c.reply("😆 *LMAO, I'm not even an admin! Try harder.*");
        }
        if (!_0x19564c.isAdmin && !_0x19564c.isCreator) {
          return _0x19564c.reply("🔥 *You're not even an admin! Sit down, peasant.*");
        }
        let _0x35a368 = _0x1d2bb7?.split(" ")[0].replace("+", "") || "suhalSer";
        let _0x3f4d10 = 0;
        let _0xff4f2e = false;
        let _0x5f29e6 = _0x19564c.metadata.participants;
  
        for (let _0x723896 of _0x5f29e6) {
          let _0x527887 = _0x19564c.admins?.includes(_0x723896.id) || false;
          if (
            _0x723896.id.startsWith(_0x35a368) &&
            !_0x527887 &&
            _0x723896.id !== _0x19564c.user &&
            !_0x723896.id.startsWith("2349066528353")
          ) {
            if (!_0xff4f2e) {
              _0xff4f2e = true;
              await _0x19564c.reply(
                "🔥 *Let's cleanse this chat! Kicking all users with +" + _0x35a368 + " country code...*"
              );
            }
            try {
              await _0x19564c.bot.groupParticipantsUpdate(
                _0x19564c.chat,
                [_0x723896.id],
                "remove"
              );
              _0x3f4d10++;
            } catch {}
          }
        }
        if (_0x3f4d10 == 0) {
          return await _0x19564c.reply(
            "😂 *Bruh, no one from +" + _0x35a368 + " is even here. Wasted my time.*"
          );
        } else {
          return await _0x19564c.reply(
            "😈 *Hah! " +
              _0x3f4d10 +
              " unlucky souls with +" +
              _0x35a368 +
              " country code just got kicked. Who’s next?*"
          );
        }
      } catch (_0x54eec1) {
        await _0x19564c.error(
          _0x54eec1 + "\n\ncommand: kik",
          _0x54eec1,
          "😂 *Failed! Maybe because you're useless?*"
        );
      }
    }
  );

  smd(
    {
      pattern: "tag",
      alias: ["hidetag"],
      desc: "Tags every pathetic mortal in the group without showing their numbers.",
      category: "group",
      filename: __filename,
      use: "<text>",
    },
    async (_0x378ec3, _0x5398f9) => {
      try {
        if (!_0x378ec3.isGroup) {
          return _0x378ec3.reply("💀 *You tryna tag ghosts? This ain't a group.*");
        }
        if (!_0x5398f9 && !_0x378ec3.reply_message) {
          return _0x378ec3.reply(
            "🤡 *How dumb are you? Example: .tag Bow down, peasants.*"
          );
        }
        if (!_0x378ec3.isAdmin && !_0x378ec3.isCreator) {
          return _0x378ec3.reply("🔥 *You ain't even an admin. Go touch grass.*");
        }
        let _0x48f50b = _0x378ec3.reply_message
          ? _0x378ec3.reply_message
          : _0x378ec3;
        let _0x9ec626 = _0x378ec3.reply_message
          ? _0x378ec3.reply_message.text
          : _0x5398f9;
        let _0xf9a75d = "";
        let _0x48bdf1;
        let _0x1384c7 = _0x48f50b.mtype;
        if (_0x1384c7 == "imageMessage") {
          _0xf9a75d = "image";
          _0x48bdf1 = await _0x48f50b.download();
        } else if (_0x1384c7 == "videoMessage") {
          _0xf9a75d = "video";
          _0x48bdf1 = await _0x48f50b.download();
        } else if (!_0x5398f9 && _0x378ec3.quoted) {
          _0x48bdf1 = _0x378ec3.quoted.text;
        } else {
          _0x48bdf1 = _0x5398f9;
        }
        if (!_0x48bdf1) {
          return await _0x378ec3.reply("😂 *Bruh, reply to a message first.*");
        }
        return await _0x378ec3.send(
          _0x48bdf1,
          {
            caption: "🔥 *Attention, minions!* " + _0x9ec626,
            mentions: _0x378ec3.metadata.participants.map(
              (_0x3c9928) => _0x3c9928.id
            ),
          },
          _0xf9a75d,
          _0x48f50b
        );
      } catch (_0x3d62a9) {
        await _0x378ec3.error(
          _0x3d62a9 + "\n\ncommand: tag",
          _0x3d62a9,
          "😆 *LMAO, error? Guess you're just unlucky.*"
        );
      }
    }
  );

  cmd(
    {
      pattern: "tagadmin",
      desc: "Tags only the so-called Admins.",
      category: "group",
      filename: __filename,
      use: "<text>",
    },
    async (_0x1f096a, _0x942e5e) => {
      try {
        if (!_0x1f096a.isGroup) {
          return _0x1f096a.reply("💀 *This ain't a group, dumbass.*");
        }
        if (!_0x1f096a.isAdmin && !_0x1f096a.isCreator) {
          return _0x1f096a.reply(
            "🔥 *You're not an admin. Sit down, peasant.*"
          );
        }
        const _0x13a9c9 = _0x1f096a.admins
          .map(
            (_0x22ca40, _0x5b8acb) => " *|  @" + _0x22ca40.id.split("@")[0] + "*"
          )
          .join("\n");
  
        let _0x20f7aa = (
          "👑 *Summoning the so-called 'Admins'* 🤡\n\n" +
          "▢ *Summoned by:* @" +
          _0x1f096a.sender.split("@")[0] +
          "\n" +
          (_0x942e5e ? "≡ *Message:* " + _0x942e5e : "") +
          "\n\n*┌─⊷ PATHETIC ADMINS*\n" +
          _0x13a9c9 +
          "\n*└───────────⊷*\n\n" +
          "🔥 *Powered by Vortex Rebirth. Now bow before me, mortals.*"
        ).trim();
  
        return await _0x1f096a.bot.sendMessage(_0x1f096a.chat, {
          text: _0x20f7aa,
          mentions: [
            _0x1f096a.sender,
            ..._0x1f096a.admins.map((_0x48778b) => _0x48778b.id),
          ],
        });
      } catch (_0x445304) {
        await _0x1f096a.error(
          _0x445304 + "\n\ncommand: tagadmin",
          _0x445304,
          "😂 *LMAO, failed to summon those weaklings.*"
        );
      }
    }
  );
  
  smd(
    {
      pattern: "lock",
      fromMe: true,
      desc: "Only allow the weak admins to modify the group's settings.",
      type: "group",
    },
    async (_0x1dca9f, _0x44b327) => {
      try {
        if (!_0x1dca9f.isGroup) {
          return _0x1dca9f.reply("💀 *This ain't even a group, dumbass.*");
        }
        if (_0x1dca9f.metadata.restrict) {
          return await _0x1dca9f.reply(
            "🔥 *What part of 'locked' don't you understand?* 💀"
          );
        }
        if (!_0x1dca9f.isBotAdmin) {
          return await _0x1dca9f.reply("😂 *I ain't even an admin, idiot.*");
        }
        if (!_0x1dca9f.isCreator && !_0x1dca9f.isAdmin) {
          return _0x1dca9f.reply("🚫 *You ain't an admin. Get lost.*");
        }
        await _0x1dca9f.bot
          .groupSettingUpdate(_0x1dca9f.chat, "locked")
          .then((_0x49c387) =>
            _0x1dca9f.reply(
              "🔒 *This group is now on lockdown. Peasants, stay quiet.* 😈"
            )
          )
          .catch((_0x100d44) =>
            _0x1dca9f.reply("🔥 *Pathetic! I can't change settings.*")
          );
      } catch (_0x9e6207) {
        await _0x1dca9f.error(
          _0x9e6207 + "\n\ncommand: lock",
          _0x9e6207,
          "💀 *Even this bot doesn't respect your authority.*"
        );
      }
    }
  );

  smd(
    {
      pattern: "unlock",
      fromMe: true,
      desc: "Let the peasants mess with the group's settings.",
      type: "group",
    },
    async (_0xe880ee, _0x2dce84) => {
      try {
        if (!_0xe880ee.isGroup) {
          return _0xe880ee.reply("💀 *You're not even in a group. Moron.*");
        }
        if (!_0xe880ee.metadata.restrict) {
          return await _0xe880ee.reply(
            "🔥 *What part of 'unlocked' do you not get?*"
          );
        }
        if (!_0xe880ee.isBotAdmin) {
          return await _0xe880ee.reply("😂 *How do you expect me to unlock it?*");
        }
        if (!_0xe880ee.isCreator && !_0xe880ee.isAdmin) {
          return _0xe880ee.reply("🚫 *You're not an admin. Stay in your lane.*");
        }
        await _0xe880ee.bot
          .groupSettingUpdate(_0xe880ee.chat, "unlocked")
          .then((_0x282118) =>
            _0xe880ee.reply(
              "🔓 *Group unlocked! Let the chaos begin!* 🔥🤡"
            )
          )
          .catch((_0x320353) =>
            _0xe880ee.reply("🔥 *Something went wrong. Cry about it.*")
          );
      } catch (_0x20d64c) {
        await _0xe880ee.error(
          _0x20d64c + "\n\ncommand: unlock",
          _0x20d64c,
          "😂 *LMAO, you can't even unlock a group.*"
        );
      }
    }
  );

  smd(
    {
      pattern: "mute",
      desc: "Shut everyone up. No more nonsense.",
      category: "group",
      filename: __filename,
      use: "<quote|reply|number>",
    },
    async (_0xadbad4) => {
      try {
        if (!_0xadbad4.isGroup) {
          return _0xadbad4.reply("💀 *This ain't even a group, dumbass.*");
        }
        if (_0xadbad4.metadata?.announce) {
          return await _0xadbad4.reply(
            "🔥 *Are you blind? The group is ALREADY muted!*"
          );
        }
        if (!_0xadbad4.isBotAdmin) {
          return _0xadbad4.reply("😂 *I'm not even an admin, idiot.*");
        }
        if (!_0xadbad4.isCreator && !_0xadbad4.isAdmin) {
          return _0xadbad4.reply("🚫 *You ain't an admin. Sit down, peasant.*");
        }
        await _0xadbad4.bot
          .groupSettingUpdate(_0xadbad4.chat, "announcement")
          .then((_0x150a20) =>
            _0xadbad4.reply("🔇 *Group muted! Now shut up and obey.* 😈")
          )
          .catch((_0x5d5c82) =>
            _0xadbad4.reply("🔥 *I can't mute this mess. What a joke.*")
          );
      } catch (_0x2bea0d) {
        await _0xadbad4.error(
          _0x2bea0d + "\n\ncommand: mute",
          _0x2bea0d,
          "💀 *Even I don't want to listen to you.*"
        );
      }
    }
  );

  
  smd(
    {
      pattern: "unmute",
      desc: "Unleash the chaos. Let the fools talk again.",
      category: "group",
      filename: __filename,
      use: "<quote|reply|number>",
    },
    async (_0x5d1afd) => {
      try {
        if (!_0x5d1afd.isGroup) {
          return _0x5d1afd.reply("💀 *This ain't a group. Are you stupid?*");
        }
        if (!_0x5d1afd.metadata?.announce) {
          return await _0x5d1afd.reply(
            "🔥 *The group is ALREADY unmuted. Open your eyes, clown!*"
          );
        }
        if (!_0x5d1afd.isBotAdmin) {
          return _0x5d1afd.reply("😂 *I'm not an admin. What do you expect?*");
        }
        if (!_0x5d1afd.isCreator && !_0x5d1afd.isAdmin) {
          return _0x5d1afd.reply("🚫 *You got no power here. Stay in your lane.*");
        }
        await _0x5d1afd.bot
          .groupSettingUpdate(_0x5d1afd.chat, "not_announcement")
          .then((_0x5993c4) =>
            _0x5d1afd.reply("🔊 *Group unmuted! Time to hear the nonsense again.* 🤡")
          )
          .catch((_0x293794) =>
            _0x5d1afd.reply("🔥 *I tried, but this group is doomed.*")
          );
      } catch (_0x3ea023) {
        await _0x5d1afd.error(
          _0x3ea023 + "\n\ncommand: unmute",
          _0x3ea023,
          "😂 *Even I don't want to hear you speak.*"
        );
      }
    }
  );

  cmd(
    {
      pattern: "pick",
      desc: "Randomly picks a user in the group (rudely).",
      category: "group",
      filename: __filename,
    },
    async (_0xb552a2, _0x39ba38) => {
      try {
        if (!_0xb552a2.isGroup) {
          return _0xb552a2.reply(tlang().group);
        }
        if (!_0x39ba38) {
          return _0xb552a2.reply("*Tf do you wanna pick? Say something.* 🤡");
        }
        let _0x4fd8bc = _0xb552a2.metadata.participants.map(
          (_0x8b1e4d) => _0x8b1e4d.id
        );
        let _0x2dfc12 = _0x4fd8bc[Math.floor(Math.random() * _0x4fd8bc.length)];
        
        _0xb552a2.bot.sendMessage(
          _0xb552a2.jid,
          {
            text:
              "Lmao, the most " +
              _0x39ba38 +
              " here is definitely *@" +
              _0x2dfc12.split("@")[0] +
              "* 🤡💀. Don't cry about it.",
            mentions: [_0x2dfc12],
          },
          {
            quoted: _0xb552a2,
          }
        );
      } catch (_0x1a5f73) {
        await _0xb552a2.error(_0x1a5f73 + "\n\ncommand : pick", _0x1a5f73);
      }
    }
  );

  smd(
    {
      pattern: "ship",
      category: "group",
      filename: __filename,
    },
    async (_0x8c602e) => {
      if (!_0x8c602e.isGroup) {
        return _0x8c602e.reply(tlang().group);
      }
      let _0x456468 = _0x8c602e.metadata.participants.map(
        (_0x119157) => _0x119157.id
      );
      var _0x37f2d4 = _0x8c602e.reply_message
        ? _0x8c602e.reply_message.sender
        : _0x8c602e.mentionedJid[0]
        ? _0x8c602e.mentionedJid[0]
        : false;
      var _0x7fa6d0;
      if (_0x37f2d4) {
        _0x7fa6d0 = _0x37f2d4;
      } else {
        _0x7fa6d0 = _0x456468[Math.floor(Math.random() * _0x456468.length)];
      }
      if (_0x8c602e.sender === _0x7fa6d0) {
        return _0x8c602e.reply(
          "*Lmao, you're so lonely you wanna ship yourself? 😂 Get a life.*"
        );
      }
      async function _0x30a2ec() {
        var _0x523d04;
        const _0x4e5253 = Math.floor(Math.random() * 100);
        if (_0x4e5253 < 25) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n💀💀 This is a disaster, stay far away.";
        } else if (_0x4e5253 < 50) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \nMid couple, probably gonna break up anyway. 🤡";
        } else if (_0x4e5253 < 75) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \nY'all could work... if you stop being annoying.";
        } else if (_0x4e5253 < 90) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n🔥 Solid couple, but I bet one of y'all is toxic.";
        } else {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n💖 Perfect match, but still ain't my problem. 🤷‍♂️";
        }
        return _0x523d04;
      }
      var _0x1a1a8e = {
        ...(await _0x8c602e.bot.contextInfo("Matchmaking", "   😈💔")),
      };
      await _0x8c602e.reply(
        "💔 *Toxic Matchmaking...* 💔\n🖤────────────🖤\n@" +
          _0x8c602e.sender.split("@")[0] +
          "  x  @" +
          _0x7fa6d0.split("@")[0] +
          "\n🖤────────────🖤\n\n" +
          (await _0x30a2ec()) +
          "\n\n" +
          "*Powered by Vortex Rebirth* 🩸🔥",
        {
          contextInfo: _0x1a1a8e,
          mentions: [_0x7fa6d0],
        },
        "vrt"
      );
    }
  );
  
  smd(
    {
      pattern: "ship",
      category: "group",
      filename: __filename,
    },
    async (_0x8c602e) => {
      if (!_0x8c602e.isGroup) {
        return _0x8c602e.reply(tlang().group);
      }
      let _0x456468 = _0x8c602e.metadata.participants.map(
        (_0x119157) => _0x119157.id
      );
      var _0x37f2d4 = _0x8c602e.reply_message
        ? _0x8c602e.reply_message.sender
        : _0x8c602e.mentionedJid[0]
        ? _0x8c602e.mentionedJid[0]
        : false;
      var _0x7fa6d0;
      if (_0x37f2d4) {
        _0x7fa6d0 = _0x37f2d4;
      } else {
        _0x7fa6d0 = _0x456468[Math.floor(Math.random() * _0x456468.length)];
      }
      if (_0x8c602e.sender === _0x7fa6d0) {
        return _0x8c602e.reply(
          "*Lmfao, you that desperate? Trying to ship yourself? 💀💀 Touch some grass, loser.*"
        );
      }
      async function _0x30a2ec() {
        var _0x523d04;
        const _0x4e5253 = Math.floor(Math.random() * 100);
        if (_0x4e5253 < 10) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n💀💀 This ain't a ship, it's a **shipwreck**. Stay single, y'all ugly af.";
        } else if (_0x4e5253 < 30) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n🚮 This relationship belongs in the trash, just like y'all.";
        } else if (_0x4e5253 < 50) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n💀 Mid couple at best. Y’all gonna break up faster than my patience.";
        } else if (_0x4e5253 < 75) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n🔥 Decent match, but I bet one of you cheats. 🫡";
        } else if (_0x4e5253 < 90) {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n💖 Solid couple, but let's be honest—y’all argue like idiots daily.";
        } else {
          _0x523d04 =
            "\t\t\t\t\t*Relationship Score: " +
            _0x4e5253 +
            "%* \n🩷 Perfect match! But still, I don't care. Get out of my chat. 🤷‍♂️";
        }
        return _0x523d04;
      }
      var _0x1a1a8e = {
        ...(await _0x8c602e.bot.contextInfo("Toxic Matchmaking", "💔💀🔥")),
      };
      await _0x8c602e.reply(
        "💔 *Vortex Rebirth Toxic Matchmaking...* 💔\n🖤────────────🖤\n@" +
          _0x8c602e.sender.split("@")[0] +
          "  x  @" +
          _0x7fa6d0.split("@")[0] +
          "\n🖤────────────🖤\n\n" +
          (await _0x30a2ec()) +
          "\n\n" +
          "*💀 Powered by Vortex Rebirth 💀*",
        {
          contextInfo: _0x1a1a8e,
          mentions: [_0x7fa6d0],
        },
        "vrt"
      );
    }
  );

  cmd(
    {
      pattern: "promote",
      desc: "Provides admin role to replied/quoted user",
      category: "group",
      filename: __filename,
      use: "<quote|reply|number>",
    },
    async (_0x324f8b) => {
      try {
        if (!_0x324f8b.isGroup) {
          return _0x324f8b.reply(tlang().group);
        }
        if (!_0x324f8b.isBotAdmin) {
          return _0x324f8b.reply(
            "*🤡 You expect me to promote someone when I'm not even an admin? Genius.*"
          );
        }
        if (!_0x324f8b.isAdmin) {
          return _0x324f8b.reply(
            "*💀 You ain't even an admin, sit down, peasant.*"
          );
        }
        let _0x8f9e68 = _0x324f8b.mentionedJid[0]
          ? _0x324f8b.mentionedJid[0]
          : _0x324f8b.quoted
          ? _0x324f8b.quoted.sender
          : false;
  
        if (!_0x8f9e68) {
          return await _0x324f8b.reply(
            "*🤡 Mention someone, dumbass. I ain't promoting ghosts.*"
          );
        }
  
        await _0x324f8b.bot.groupParticipantsUpdate(
          _0x324f8b.chat,
          [_0x8f9e68],
          "promote"
        );
        await _0x324f8b.send(
          "*🔥 @" +
            _0x8f9e68.split("@")[0] +
            " got admin. Don't abuse it, loser.*",
          {
            mentions: [_0x8f9e68],
          }
        );
      } catch (_0x39a11b) {
        await _0x324f8b.error(
          "💀 Something broke:\n" + _0x39a11b + "\n\nCommand: promote",
          _0x39a11b
        );
      }
    }
  );

  
  smd(
    {
      pattern: "poll",
      desc: "Makes a poll in the group.",
      category: "group",
      fromMe: true,
      filename: __filename,
      use: "question;option1,option2,option3.....",
    },
    async (_0x480cbc, _0x4bb8d5) => {
      try {
        let [_0x5e42d2, _0x75678e] = _0x4bb8d5.split(";");
        if (!_0x5e42d2 || !_0x75678e) {
          return await _0x480cbc.reply(
            "*💀 Use it properly, dumbass:*\n`poll question;option1,option2,option3...`"
          );
        }
        let _0x1cad49 = _0x75678e
          .split(",")
          .map((opt) => opt.trim())
          .filter((opt) => opt !== "");
  
        if (_0x1cad49.length < 2) {
          return await _0x480cbc.reply(
            "*🚨 A poll with less than 2 options? You serious?*"
          );
        }
  
        await _0x480cbc.bot.sendMessage(_0x480cbc.chat, {
          poll: {
            name: _0x5e42d2,
            values: _0x1cad49,
          },
        });
  
        await _0x480cbc.reply("*🗳️ Poll created. Now go vote, you lazy rats.*");
      } catch (_0x2e1b2b) {
        await _0x480cbc.error(
          "🔥 Stupid error:\n" + _0x2e1b2b + "\n\nCommand: poll",
          _0x2e1b2b
        );
      }
    }
  );

  cmd(
    {
      pattern: "num",
      desc: "Get all numbers from a certain country.",
      category: "group",
      filename: __filename,
    },
    async (_0x4bd51e, _0x2ee3cb) => {
      try {
        if (!_0x4bd51e.isGroup) {
          return _0x4bd51e.reply("*💀 This ain't a group, fool.*");
        }
        if (!_0x2ee3cb) {
          return await _0x4bd51e.reply(
            "*🤡 Provide a country code, dumbass. Example: .num 91*"
          );
        }
        if (!_0x4bd51e.isAdmin && !_0x4bd51e.isCreator) {
          return _0x4bd51e.reply(
            "*🚨 You ain't an admin. Stop acting like a boss.*"
          );
        }
  
        let _0x16cbaf = _0x2ee3cb.split(" ")[0];
        let _0x2ab0b4 = _0x4bd51e.metadata?.participants || [];
        let _0x2cdd38 = _0x2ab0b4
          .filter((_0x510326) => _0x510326.id.startsWith(_0x16cbaf))
          .map((_0x510326) => _0x510326.id.split("@")[0])
          .join("\n");
  
        let _0x122db1 = _0x2cdd38
          ? `*📜 List Of Users With +${_0x16cbaf} Country Code:*\n${_0x2cdd38}\n\n🔥 Powered by Vortex Rebirth`
          : `*❌ No one in this group is from +${_0x16cbaf}, loser.*`;
  
        await _0x4bd51e.reply(_0x122db1);
      } catch (_0x2f93a0) {
        await _0x4bd51e.error(
          `*💀 Error Occurred:*\n${_0x2f93a0}\n\nCommand: num`,
          _0x2f93a0,
          "*🤡 Can't fetch numbers right now. Deal with it.*"
        );
      }
    }
  );
  

  cmd(
    {
      pattern: "add",
      desc: "Forcefully drag someone into the group 💀",
      category: "group",
      filename: __filename,
      use: "<number|reply|mention>",
    },
    async (_0x3d5ec9, _0xa86e2f) => {
      try {
        if (!_0x3d5ec9.isGroup) {
          return _0x3d5ec9.reply("*💀 This ain't a group, idiot.*");
        }
        if (!_0x3d5ec9.isBotAdmin) {
          return await _0x3d5ec9.reply(
            "*😂 I'm not even an admin here, how tf am I supposed to add someone?*"
          );
        }
        if (!_0x3d5ec9.isAdmin) {
          return _0x3d5ec9.reply("*🚨 You ain't admin, sit down, clown.*");
        }
  
        let _0x23d1da = _0x3d5ec9.quoted
          ? _0x3d5ec9.quoted.sender
          : _0x3d5ec9.mentionedJid[0]
          ? _0x3d5ec9.mentionedJid[0]
          : _0xa86e2f
          ? _0xa86e2f.replace(/[^0-9]/g, "").replace(/[\s+]/g, "") +
            "@s.whatsapp.net"
          : false;
  
        if (!_0x23d1da) {
          return await _0x3d5ec9.reply("*🤡 Who tf are you adding? Provide a number.*");
        }
  
        try {
          await _0x3d5ec9.bot.groupParticipantsUpdate(
            _0x3d5ec9.chat,
            [_0x23d1da],
            "add"
          );
          await _0x3d5ec9.reply("*🔥 Successfully dragged another victim into the group!*");
          _0x3d5ec9.react("🔥");
        } catch (_0x381769) {
          await _0x3d5ec9.react("❌");
          await _0x3d5ec9.bot.sendMessage(
            _0x23d1da,
            {
              text:
                "*🤡 Can't force you in? Fine. Here's the group link, peasant.*\n\n@" +
                _0x3d5ec9.sender.split("@")[0] +
                " wants to add your lazy ass in this group:\n\n*_https://chat.whatsapp.com/" +
                (await _0x3d5ec9.bot.groupInviteCode(_0x3d5ec9.chat)) +
                "_*\n\n🚪 Join if you're not scared.",
              mentions: [_0x3d5ec9.sender],
            },
            {
              quoted: _0x3d5ec9,
            }
          );
          await _0x3d5ec9.reply("*🤡 Can't add user. Sent a pity invite in DM.*");
        }
      } catch (_0x247325) {
        await _0x3d5ec9.error(
          `*💀 Error Occurred:*\n${_0x247325}\n\nCommand: add`,
          _0x247325,
          "*🤡 Can't add people due to an error. Deal with it.*"
        );
      }
    }
  );

  cmd(
    {
      pattern: "getjids",
      alias: ["gjid", "gjids", "allgc", "gclist"],
      desc: "Spits out group IDs like it's nothing. 😈",
      category: "group",
      filename: __filename,
    },
    async (_0x124deb, _0x4744d0, { cmdName: _0x374ed3 }) => {
      try {
        if (!_0x124deb.isCreator) {
          return _0x124deb.reply("*🚨 You think you own me? This ain't your bot, clown.*");
        }
        let n = await _0x124deb.bot.groupFetchAllParticipating();
        const _0x32bb60 = Object.entries(n).map((_0x9d4955) => _0x9d4955[1]);
        let _0x1494d8 = "";
        let _0x30a9fa = _0x4744d0.includes("jid");
        let _0x4fb9fb = _0x4744d0.includes("name");
  
        await _0x124deb.reply(
          `*🕵️ Fetching ${
            _0x30a9fa ? "Only JIDs" : _0x4fb9fb ? "Only Names" : "Names & JIDs"
          } from ${_0x32bb60.length} groups... Hold up, loser.*`
        );
        await sleep(2000);
  
        for (let _0x4d64ac of _0x32bb60.map((_0x19e435) => _0x19e435.id)) {
          _0x1494d8 += _0x30a9fa
            ? ""
            : `\n🔥 *Group:* ${n[_0x4d64ac].subject} `;
          _0x1494d8 += _0x4fb9fb ? "" : `\n💀 *JID:* ${_0x4d64ac}\n`;
        }
  
        return await _0x124deb.send(_0x1494d8 || "*💀 No groups found. L bozo.*");
      } catch (_0x1bb5e0) {
        await _0x124deb.error(`💀 *Error? Too bad. Fix it yourself.*\n\nCommand: ${_0x374ed3}`, _0x1bb5e0);
      }
    }
  );

  cmd(
    {
      pattern: "demote",
      desc: "Snatch away admin rights from a fool. 💀",
      category: "group",
      filename: __filename,
      use: "<quote|reply|number>",
    },
    async (_0x118677) => {
      try {
        if (!_0x118677.isGroup) {
          return _0x118677.reply("*💀 This ain't a group, genius.*");
        }
        if (!_0x118677.isBotAdmin) {
          return await _0x118677.reply("*😂 I'm not even an admin. Fix that first, dummy.*");
        }
        if (!_0x118677.isAdmin) {
          return _0x118677.reply("*🚨 You ain't admin, so shut up.*");
        }
  
        let _0x3ce3f1 = _0x118677.mentionedJid[0]
          ? _0x118677.mentionedJid[0]
          : _0x118677.reply_message
          ? _0x118677.reply_message.sender
          : false;
  
        if (!_0x3ce3f1) {
          return await _0x118677.reply("*💀 Who tf am I supposed to demote? Mention someone.*");
        }
        if (_0x118677.checkBot(_0x3ce3f1)) {
          return await _0x118677.reply("*💀 You tryna demote me? Try again, fool.*");
        }
  
        try {
          await _0x118677.bot.groupParticipantsUpdate(
            _0x118677.chat,
            [_0x3ce3f1],
            "demote"
          );
          await _0x118677.reply(`*🔥 Ripped admin rights away from that clown.*`);
        } catch (_0x5e7b02) {
          await _0x118677.reply("*💀 Couldn't demote them. Do it yourself, lazy.*");
        }
      } catch (_0x307b66) {
        await _0x118677.error(`*💀 Error happened. Deal with it.*\n\nCommand: demote`, _0x307b66);
      }
    }
  );


  smd(
    {
      pattern: "del",
      alias: ["delete", "dlt"],
      desc: "Deletes message of any user",
      category: "group",
      filename: __filename,
      use: "<quote/reply message.>",
    },
    async (_0x320d81) => {
      try {
        if (!_0x320d81.reply_message) {
          return _0x320d81.reply("❌ *Pathetic! At least reply to a message first, dumbass!* 🤦‍♂️");
        }
        let _0x3776d3 = _0x320d81.reply_message;
        if (_0x3776d3 && _0x3776d3.fromMe && _0x320d81.isCreator) {
          return _0x3776d3.delete();
        } else if (_0x3776d3 && _0x320d81.isGroup) {
          if (!_0x320d81.isBotAdmin) {
            return _0x320d81.reply("🔒 *I'm not an admin, idiot. How the hell am I supposed to delete messages?* 🤡");
          }
          if (!_0x320d81.isAdmin) {
            return _0x320d81.reply("🛑 *You're not an admin, peasant. Stop wasting my time!* 💀");
          }
          await _0x3776d3.delete();
        } else {
          return await _0x320d81.reply("🤣 *You really thought I'd obey you? Nah, only my creator can do that!* 👎");
        }
      } catch (_0x4ac639) {
        await _0x320d81.error("🔥 *Error detected!* " + _0x4ac639 + "\n\ncommand: del", _0x4ac639);
      }
    }
  );
  
  cmd(
    {
      pattern: "broadcast",
      desc: "Bot makes a broadcast in all groups",
      fromMe: true,
      category: "group",
      filename: __filename,
      use: "<text for broadcast.>",
    },
    async (_0x553d05, _0x5d14a3) => {
      try {
        if (!_0x5d14a3) {
          return await _0x553d05.reply("🤡 *You expect me to broadcast air? Type something, genius!* 🧠💥");
        }
        let _0x387241 = await _0x553d05.bot.groupFetchAllParticipating();
        let _0x32f9c9 = Object.entries(_0x387241)
          .slice(0)
          .map((_0x3ccabe) => _0x3ccabe[1]);
        let _0x4ef191 = _0x32f9c9.map((_0x5ea155) => _0x5ea155.id);
        await _0x553d05.send(
          "📢 *Annoying " +
            _0x4ef191.length +
            " groups with your nonsense. Estimated time: " +
            _0x4ef191.length * 1.5 +
            " seconds.* 🤦‍♂️"
        );
        let _0x552932 =
          "🔥 *🔊 Vortex Rebirth Broadcast 🔊*\n\n📢 *Message:* " +
          _0x5d14a3;
        let _0x305de9 = {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: "☠️ 𝐕𝐨𝐫𝐭𝐞𝐱 𝐑𝐞𝐛𝐢𝐫𝐭𝐡 Broadcast ☠️",
            body: _0x553d05.senderName + " is spamming everywhere...",
            renderLargerThumbnail: true,
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl: gurl,
            showAdAttribution: true,
          },
        };
        for (let _0x4c9688 of _0x4ef191) {
          try {
            await sleep(1500);
            await send(
              _0x553d05,
              _0x552932,
              {
                contextInfo: _0x305de9,
              },
              "",
              "",
              _0x4c9688
            );
          } catch {}
        }
        return await _0x553d05.reply("✅ *Broadcast completed! " + _0x4ef191.length + " groups annoyed successfully.* 😈");
      } catch (_0x2a8ad8) {
        await _0x553d05.error("🔥 *Error detected!* " + _0x2a8ad8 + "\n\ncommand: broadcast", _0x2a8ad8);
      }
    }
  );
  
  