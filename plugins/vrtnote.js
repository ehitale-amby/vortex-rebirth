const {
  note, 
  smd,
  prefix 
 } = require('../lib')

 //---------------------------------------------------------------------------  
smd({
  cmdname: "delnote",
  type: "notes",
  filename: __filename,
  fromMe: true,
  info: "Deletes note from db.",
  use: '< note id | 1 >',
},
async (message, match) => {
  try {
      let id = match.split(' ')[0];
      if (!id || isNaN(id)) { 
          return message.reply(`*Are you brain-dead? Provide a valid Note ID! Example: ${prefix}delnote 1* 🤡`); 
      }
      let res = await note.delnote(message, id);
      return await message.reply(`*Finally erased that useless note... took you long enough, idiot. 😒*`);
  } catch (e) { 
      await message.error(`*Tch... error detected, you incompetent fool.*\n\ncommand: delnote`, e,);
  }
}
)
//---------------------------------------------------------------------------  

smd({
cmdname: "delallnote",
type: "notes",
fromMe: true,
filename: __filename,
info: "Deletes all notes from db."
},
async (message) => {
try {
let res = await note.delallnote(message);
return await message.reply(`*Boom! Every single note is gone. Happy now, dumbass? 💀*`);
} catch (e) { 
await message.error(`*Your stupidity caused an error. Fix yourself.*\n\ncommand: delallnotes`, e,); 
}
}
)
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------  
smd({
  cmdname: "allnote",
  type: "notes",
  filename: __filename,
  fromMe: true,
  info: "Shows list of all notes."
},
async (message) => {
  try {
    let res = await note.allnotes(message, "all");
    return await message.reply(`*Here’s your damn list of notes. Try not to lose them again, genius. 🙄*`);
  } catch (e) { 
      await message.error(`${e}\n\ncommand: allnote`, e, `*Tch... can't fetch data. Must be your fault.* 🤡`);
  }
}
)
//---------------------------------------------------------------------------  

smd({
  cmdname: "getnote",
  type: "notes",
  filename: __filename,
  fromMe: true,
  info: "Shows note by ID.",
  use: '< id|1|2 >',
},
async (message, match) => {
  try {
    if (!match) return await message.reply(`*Are you dumb? Provide a Note ID! Example: ${prefix}getnote id|1|2|...* 🥴`); 
    let res = await note.allnotes(message, match.split(" ")[0].toLowerCase().trim());
    return await message.reply(`*Found your pathetic little note. Try not to forget it again, idiot. 😒*`);
  } catch (e) { 
      await message.error(`${e}\n\ncommand: getnote`, e, `*Can't fetch data. Guess you're out of luck, fool.* 💀`);
  }
}
)
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------  
smd({
  cmdname: "addnote",
  type: "notes",
  info: "Adds a note on db.",
  fromMe: true,
  filename: __filename,
  use: '< text >',
},
async (message, match) => {
try {                
  if (!match) return await message.reply(`*Are you that dumb? Provide some text to save, idiot! 🤡*`);
  let res = await note.addnote(message, match);
  return await message.reply(`*Fine. Your stupid note has been saved. Hope your tiny brain remembers this time. 😒*`);
} catch (e) { 
  await message.error(`${e}\n\ncommand: addnote`, e, `*Tch... something went wrong. Must be your fault, fool.* 💀`);
}
}
)
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------  
//                  ADD NOTE COMMANDS (TOXIC MODE)  
//---------------------------------------------------------------------------  

smd({
  cmdname: "note",
  type: "notes",
  fromMe: true,
  filename: __filename,
  info: "Shows list of all notes."
},
async (message, text, { smd }) => {
  try {                
      let txt = `╭───── *『 MONGODB NOTES 』* ───◆  
┃ *Useless notes, huh? Fine, here’s what you can do.* 🙄  
┃ *------------------------------------------*  
┃  ┌┤  *✯---- ADD NEW NOTE ----⦿*  
┃  │✭ *Cmd :* ${prefix + smd} add 'Your Dumb Text'  
┃  │✭ *Usage :* Save whatever nonsense you want.  
┃  ╰───────────────────◆  
┃  
┃  ┌┤  *✯---- GET ALL NOTES ----⦿*  
┃  │✭ *Cmd :* ${prefix + smd} all  
┃  │✭ *Usage :* Retrieve all your pointless notes.  
┃  ╰───────────────────◆  
┃  
┃  ┌┤  *✯---- DELETE A NOTE ----⦿*  
┃  │✭ *Cmd :* ${prefix + smd} del 'note id'  
┃  │✭ *Usage :* Remove one of your pathetic notes.  
┃  ╰───────────────────◆  
┃  
┃  ┌┤  *✯---- DELETE ALL NOTES ----⦿*  
┃  │✭ *Cmd :* ${prefix + smd} delall  
┃  │✭ *Usage :* Wipe out every single useless note you saved.  
┃  ╰───────────────────◆  
╰━━━━━━━━━━━━━━━━━━━━━━──⊷`;

      if (!text) return await message.reply(txt);
      let action = text.split(' ')[0].trim().toLowerCase();

      if (action === "add" || action === "new") {
        let res = await note.addnote(message, text.replace("add", "").replace("new", ""));
        return await message.reply(`*There, I saved your dumb note. Don’t forget it again, loser. 😒*`);
      } else if (action === "all") {
        let res = await note.allnotes(message, "all");
        return await message.reply(`*Here’s your collection of useless notes. Try not to mess up again. 🤡*`);
      } else if (action === "delall") {
        let res = await note.delallnote(message);
        return await message.reply(`*Wiped everything! Now stop hoarding nonsense. 💀*`);
      } else if (action === "del") {
        let id = text.split(' ')[1];
        if (!id || isNaN(id)) { 
            return message.reply("*You dumb or what? Provide a valid Note ID! Example: .delnote 1 🤦*"); 
        }
        let res = await note.delnote(message, id);
        return await message.reply(`*Poof! That note is gone. Next time, don’t waste my time. 😤*`);
      } else { 
        return await message.reply(`*You really can’t follow simple instructions? Try again, fool.* \n\n${txt}`); 
      }

  } catch (e) { 
      await message.error(`${e}\n\ncommand: note`, e, `*Tch... Something broke. Probably your fault. 💀*`);
  }
})
//---------------------------------------------------------------------------