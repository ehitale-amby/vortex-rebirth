const moment = require('moment-timezone')
const {fetchJson,smd, tlang,send, shazam, getBuffer, prefix, Config ,groupdb } = require("../lib")
let gis = require("async-g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')

smd(
    {
      pattern: "zip",
      alias: ["zipcode"],
      desc: "Provides information about a US zip code.",
      category: "tools",
      use: "zip [zip_code]",
      examples: ["zip 90001", "zip 33162"]
    },
    async (message, input) => {
      const zipCode = input;
  
      if (!zipCode) {
        return message.reply("*Are you dumb?* 🤡 *Provide a zip code!*");
      }
  
      try {
        const response = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);
        const { postCode, country, countryAbbreviation, places } = response.data;
  
        let output = `\n🎭 *ZIP Code Info* 🎭\n\n`;
        output += `📍 *Zip Code:* ${postCode}\n`;
        output += `🌎 *Country:* ${country} (${countryAbbreviation})\n\n`;
        output += `📌 *Places:*\n`;
  
        places.forEach((place, index) => {
          output += `\n  ${index + 1}. ${place["place name"]}, ${place.state} 📍 (${place.latitude}, ${place.longitude})`;
        });
  
        await message.send(output + `\n\n🌀 *Powered by 𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙* 😈`);
      } catch (error) {
        await message.error(
          "🛑 *Pathetic!* 🛑\n\nYour zip code is either fake or your brain is malfunctioning. 🤡\n\n_Command: zip_",
          error,
          "⚠️ *Failed to retrieve zip code information. Try again, clown.* 🤡"
        );
      }
    }
  );

  smd({
    pattern: "github",
    category: "search",
    desc: "Finds information about a GitHub user.",
    filename: __filename,
  },
  async (message, match) => {
    try {
      message.react("🔍");
  
      // Ensure a username is provided
      if (!match) {
        return message.reply(`*_Use your brain, idiot!_* 🤡\nProvide a GitHub username, e.g., *${prefix}github msgamecoder*`);
      }
  
      // Fetch data from the GitHub API
      const { data } = await axios.get(`https://api.github.com/users/${match}`);
      if (!data) {
        return await message.send(`*_Pathetic! No results found. Give me a REAL GitHub username, fool!_* 🤡`);
      }
  
      // Destructure data for cleaner formatting
      const {
        id,
        name,
        login,
        bio,
        company,
        location,
        email,
        blog,
        public_repos,
        public_gists,
        followers,
        following,
        updated_at,
        created_at,
        avatar_url,
      } = data;
  
      // Prepare and send the formatted message
      const caption = `\n🔥 *GITHUB USER INFO* 🔥\n\n` +
        `🆔 *ID:* ${id || "N/A"}\n` +
        `👤 *Nickname:* ${name || "N/A"}\n` +
        `💀 *Username:* ${login || "N/A"}\n` +
        `🤡 *Bio:* ${bio || "N/A"}\n` +
        `🏢 *Company:* ${company || "N/A"}\n` +
        `📍 *Location:* ${location || "N/A"}\n` +
        `📧 *Email:* ${email || "N/A"}\n` +
        `🌍 *Blog:* ${blog || "N/A"}\n` +
        `📂 *Public Repos:* ${public_repos || 0}\n` +
        `📜 *Public Gists:* ${public_gists || 0}\n` +
        `👥 *Followers:* ${followers || 0}\n` +
        `👀 *Following:* ${following || 0}\n` +
        `🔄 *Updated At:* ${new Date(updated_at).toLocaleString() || "N/A"}\n` +
        `🛠️ *Created At:* ${new Date(created_at).toLocaleString() || "N/A"}\n\n` +
        `💀 *Now go touch some grass instead of stalking GitHub profiles.* 💀\n\n` +
        `💀 *Powered by 𝕍𝕠𝕣𝕥𝕖𝕩 ℝ𝕖𝕓𝕚𝕣𝕥𝕙* 😈`;
  
      await message.sendMessage(
        message.jid,
        { 
          image: { url: avatar_url }, 
          caption 
        },
        { quoted: message }
      );
    } catch (error) {
      console.error("GitHub Command Error:", error);
      return await message.error(
        `💀 *ERROR!* 💀\n\nYour request failed, just like your life decisions. 🤡\n_Command: github_`,
        error,
        `⚠️ *_Dumb move! Either your username is fake, or GitHub hates you. Try again properly._*`
      );
    }
  });
  
  smd({
    pattern: "coffe",
    alias: ["tea", "kofi"],
    category: "search",
    react: "☕",
    desc: "Sends a random coffee image.",
    filename: __filename,
 },
 async (m) => {
   try {
     // Send coffee image with a disrespectful caption
     return await m.bot.sendMessage(
       m.chat,
       {
         image: { url: "https://coffee.alexflipnote.dev/random" },
         caption: `☕ *Here’s your coffee, weakling...*\n\nDon't spill it like your life choices. 😈`,
       },
       { quoted: m }
     );
   } catch (e) {
     return await m.error(
       `${e}\n\nCommand: coffe`,
       e,
       `☕ *_Too broke to afford coffee? Even the API refused to serve you. Pathetic!_* 🤡`
     );
   }
 });

 
 smd({
    pattern: "imdb",
    category: "search",
    desc: "Sends info of a movie/series.",
    use: "<text>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      message.react("🎬");
  
      if (!match) {
        return message.reply(
          `*_What are you even searching for? A movie? A life? Name something, fool!_* 😒`
        );
      }
  
      let { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`
      );
  
      if (!data || data.Response === "False") {
        return await message.reply(
          `*_That movie/series doesn't exist, just like your common sense!_* 🤡`
        );
      }
  
      let imdbt = `📽️ *IMDB SEARCH RESULTS* 📽️\n\n`;
      imdbt += `🎬 *Title:* ${data.Title || "Unknown"}\n`;
      imdbt += `📅 *Year:* ${data.Year || "N/A"}\n`;
      imdbt += `⭐ *Rated:* ${data.Rated || "N/A"}\n`;
      imdbt += `📆 *Released:* ${data.Released || "N/A"}\n`;
      imdbt += `⏳ *Runtime:* ${data.Runtime || "N/A"}\n`;
      imdbt += `🌀 *Genre:* ${data.Genre || "N/A"}\n`;
      imdbt += `🎭 *Director:* ${data.Director || "N/A"}\n`;
      imdbt += `✍ *Writer:* ${data.Writer || "N/A"}\n`;
      imdbt += `👨 *Actors:* ${data.Actors || "N/A"}\n`;
      imdbt += `📃 *Plot:* ${data.Plot || "N/A"}\n`;
      imdbt += `🌐 *Language:* ${data.Language || "N/A"}\n`;
      imdbt += `🌍 *Country:* ${data.Country || "N/A"}\n`;
      imdbt += `🏆 *Awards:* ${data.Awards || "N/A"}\n`;
      imdbt += `💰 *Box Office:* ${data.BoxOffice || "N/A"}\n`;
      imdbt += `🏢 *Production:* ${data.Production || "N/A"}\n`;
      imdbt += `🌟 *IMDB Rating:* ${data.imdbRating || "N/A"}/10\n`;
      imdbt += `❎ *IMDB Votes:* ${data.imdbVotes || "N/A"}\n\n`;
      imdbt += `🔹 *Powered by Vortex Rebirth — Unlike You, I'm Not a Flop!* 😈`;
  
      await message.bot.sendUi(
        message.jid,
        { caption: imdbt },
        { quoted: message },
        "image",
        data.Poster
      );
    } catch (e) {
      return await message.error(
        `${e}\n\nCommand: imdb`,
        e,
        `*_Couldn't find anything. Maybe try searching for your dignity next?_* 🤡`
      );
    }
  });

  
  smd({
    pattern: "weather",
    category: "search",
    desc: "Sends weather info for a location.",
    use: "<location>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Are you dumb? Give me a city name, ${message.isCreator ? "Master" : "Peasant"}!!_* 😒`
        );
      }
  
      let { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
      );
  
      if (!data || data.cod === "404") {
        return await message.reply(
          `*_That city doesn't exist, just like your intelligence!_* 🤡`
        );
      }
  
      let textw = `🌪️ *Weather Report for ${text}* 🌪️\n\n`;
      textw += `🌤️ *Weather:* ${data.weather[0].main || "Unknown"}\n`;
      textw += `📜 *Description:* ${data.weather[0].description || "N/A"}\n`;
      textw += `🌡️ *Temperature:* ${data.main.temp}°C\n`;
      textw += `🥵 *Feels Like:* ${data.main.feels_like}°C\n`;
      textw += `📉 *Pressure:* ${data.main.pressure} hPa\n`;
      textw += `💦 *Humidity:* ${data.main.humidity}%\n`;
      textw += `💨 *Wind Speed:* ${data.wind.speed} m/s\n`;
      textw += `📍 *Latitude:* ${data.coord.lat}\n`;
      textw += `📍 *Longitude:* ${data.coord.lon}\n`;
      textw += `🏳️ *Country:* ${data.sys.country}\n\n`;
      textw += `💀 *Powered by Vortex Rebirth — Now bow before me, weakling!* 😈`;
  
      message.bot.sendUi(
        message.jid,
        { caption: textw },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\nCommand: weather`,
        e,
        `*_Error fetching weather! Maybe try searching for your brain next?_* 🤡`
      );
    }
  });
  
  smd({
    pattern: "npm",
    desc: "Search for an NPM package.",
    category: "search",
    use: "<package name>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) {
        return message.reply(
          `*_Are you stupid? Give me a package name, dumbass!_* 🤡`
        );
      }
  
      const { data } = await axios.get(`https://api.npms.io/v2/search?q=${match}`);
  
      if (!data || !data.results.length) {
        return await message.reply(
          `*_Nothing found. Did you spell it right, genius?_* 🧐`
        );
      }
  
      let txt = data.results
        .map(
          ({ package: pkg }) =>
            `📦 *${pkg.name}* (v${pkg.version})\n🔗 _${pkg.links.npm}_\n📜 _${pkg.description || "No description"}_`
        )
        .join("\n\n")
        .trim();
  
      await message.reply(txt);
    } catch (e) {
      await message.error(
        `${e}\n\nCommand: npm`,
        e,
        `*_Error fetching package info. Maybe you should uninstall yourself!_* 🤡`
      );
    }
  });
  
  smd({
    pattern: "cric",
    category: "search",
    desc: "Fetches live cricket match info.",
    use: "<text>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      await message.reply(`*_Hold on, loser. Fetching cricket data..._* 🏏`);
  
      const response = await fetch(
        "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78"
      );
      const dat = await response.json();
  
      if (!dat || !dat.data || dat.data.length === 0) {
        return await message.reply(`*_No matches found. Maybe cricket is dead?_* 🤡`);
      }
  
      let result = `🏏 *LIVE CRICKET MATCHES* 🏏\n\n`;
  
      for (let i = 0; i < dat.data.length; i++) {
        result += `🔥 *MATCH ${i + 1}* 🔥\n`;
        result += `🏟️ *Name:* ${dat.data[i].name || "Unknown"}\n`;
        result += `📢 *Status:* ${dat.data[i].status || "No updates"}\n`;
        result += `📆 *Date:* ${dat.data[i].dateTimeGMT || "Unknown"}\n`;
        result += `🚀 *Match Started:* ${dat.data[i].matchStarted ? "Yes" : "No"}\n`;
        result += `🏁 *Match Ended:* ${dat.data[i].matchEnded ? "Yes" : "No"}\n`;
        result += `──────────────────────\n`;
      }
  
      return await message.reply(result);
    } catch (e) {
      return await message.error(
        `${e}\n\nCommand: cric`,
        e,
        `*_Oops! Can't fetch match details. Go watch TV instead!_* 📺😏`
      );
    }
  });

  smd({
    pattern: "image",
    alias: ["img" , "pic"],
    category: "search",
    desc: "Searches Image on Google",
    use: '<text>',
    filename: __filename,
},
async(message, match) => {
try{
let text = match ? match : message.reply_text;
if (!text) return message.reply(`Provide me a query!\n*Ex : .image luffy |10*`)

let name1 = text.split("|")[0] || text
let name2 = text.split("|")[1] || 5


let nn = parseInt(name2) || 5













try{
// let Group = await groupdb.findOne({ id: message.chat }) 
// let safe = Group.nsfw === "true" ? "off" : "on" 

// let n = await gis(name1, { query: { safe },
//     userAgent:  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
//   },)
// console.log("images results : " , n) 

let n = await downloadImages(name1,"off")
if(n && n[0]){
nn = n && n.length > nn ? nn : n.length 
await message.reply(`*_Sending images of '${name1}' in chat!_*`)
for (let i = 0; i < nn; i++) {
try{
    let random = Math.floor(Math.random() * n.length)
    message.bot.sendFromUrl(message.jid ,n[random].url || n[random],"",message,{},"image" )   
    n.splice(random, 1);
}catch {}
}
return ;
}


}catch(e){console.log("ERROR IN SYNC G>I>S IMAGE PACKAGE\n\t", e)}























let buttonMessage = {}


let urlsArray = [];
const params = {
q: name1, 
tbm: "isch",
hl: "en",
gl: "in",
ijn: "0", 
};
const headers = {
"User-Agent":
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
"Accept-Encoding": "application/json",
};

const res = await axios.get("https://www.google.com/search", { headers: headers, params: params });
let body = res.data;
body = body.slice(body.lastIndexOf("AF_initDataCallback"));
body = body.slice(body.indexOf("["));
body = body.slice(0, body.indexOf("</script>")-1);
body = body.slice(0, body.lastIndexOf(","));

const img = JSON.parse(body);

const imgObjects = img[56][1][0][0][1][0];

for (let i = 0; i < name2; i++) {
if (imgObjects[i] && imgObjects[i][0][0]["444383007"][1]) {
    let url = imgObjects[i][0][0]["444383007"][1][3][0]; // the url
    urlsArray.push(url);
}
}

for (let url of urlsArray) { try{ message.bot.sendFromUrl(message.chat ,url,"",message,{},"image" )  }catch {} }



}catch(e){return await message.error(`${e}\n\n command: image`,e,`*_Uhh dear, Didn't get any results!_*`) }
})


smd({
    pattern: "google",
    alias: ['gsearch'],
    category: "search",
    desc: "Sends info of given query from Google Search.",
    use: '<text>',
    filename: __filename,
}, async (message, text) => {
    try {
        if (!text) {
            return message.reply(`_❌ Tch, type something idiot!_\n_Example:_ .google Why is my brain empty?`);
        }

        let { data } = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${text}&key=AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI&cx=baf9bdb0c631236e5`);
        
        if (!data.items || data.items.length === 0) {
            return message.reply("_❌ No results found. Even Google is tired of your stupidity._");
        }

        let result = `┏━━━🔥『 *𝙂𝙊𝙊𝙂𝙇𝙀 𝙎𝙀𝘼𝙍𝘾𝙃* 』🔥━━━┓\n\n`;
        result += `📌 *Query:*  ${text} \n\n`;

        for (let i = 0; i < Math.min(5, data.items.length); i++) {
            let item = data.items[i];
            result += `┏━━━━━━━━━━━━━━━\n`;
            result += `┃ 🪧 *Title:* ${item.title}\n\n`;
            result += `┃ 🖥 *Description:* ${item.snippet}\n\n`;
            result += `┃ 🌐 *Link:* ${item.link}\n\n`;
            result += `┗━━━━━━━━━━━━━━━\n\n`;
        }

        result += `\n*Powered by 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 🌀* (_Unlike you, I'm actually useful._)`;

        message.reply(result);
    } catch (e) {
        return message.error(`${e}\n\n command: google`, e, "❌ _Tch. Even I can't save you from your dumb queries._");
    }
});

  smd({
    pattern: "couplepp",
    category: "search",
    desc: "Sends two couple profile pics.",
    filename: __filename,
  },
  async (message) => {
    try {
      let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json');
      let random = anu[Math.floor(Math.random() * anu.length)];
  
      await message.bot.sendMessage(message.chat, {
        image: { url: random.male },
        caption: `👑 *Here's the male couple DP* \n\n _Go use it, lonely soul._ 💀`,
      });
  
      await message.bot.sendMessage(message.chat, {
        image: { url: random.female },
        caption: `💖 *Here's the female couple DP* \n\n _Not like you have a partner anyway._ 🤡`,
      });
  
    } catch (e) {
      return await message.error(
        `${e}\n\nCommand: couplepp`,
        e,
        `*_Oops, no couple pics for you! Maybe because you're forever alone?_* 😂`
      );
    }
  });

  smd({
    pattern: "iswa",
    alias: ["oldwa","bio","onwa"],
    category: "search",
    desc: "Searches in given rage about given number.",
    use: '9112345678xx',
    filename: __filename,
},
async(message, text) => {
if(!text) return await message.reply('Give Me Number without + sign. Example: .iswa 234902786xx')
    var inputnumber = text.split(" ")[0]
    if (!inputnumber.includes('x')) return message.reply(`*You did not add x*\nExample: iswa 234902786xx  \n ${Config.caption}`)
    message.reply(`*Searching for WhatsApp account in given range...* \n ${Config.caption}`)

    function countInstances(string, word) {  return string.split(word).length - 1; }
    var number0 = inputnumber.split('x')[0]
    var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
    var random_length = countInstances(inputnumber, 'x')
    var randomxx;
    if (random_length == 1) { randomxx = 10 } 
    else if (random_length == 2) { randomxx = 100 } 
    else if (random_length == 3) { randomxx = 1000 }

    text = `*--『 List of Whatsapp Numbers 』--*\n\n`
    var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
    var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`
    for (let i = 0; i < randomxx; i++) {
        var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        var status1 = nu[Math.floor(Math.random() * nu.length)]
        var status2 = nu[Math.floor(Math.random() * nu.length)]
        var status3 = nu[Math.floor(Math.random() * nu.length)]
        var dom4 = nu[Math.floor(Math.random() * nu.length)]
        var random;
        if (random_length == 1) { random = `${status1}` } 
        else if (random_length == 2) {random = `${status1}${status2}` } 
        else if (random_length == 3) {random = `${status1}${status2}${status3}` } 
        else if (random_length == 4) {random = `${status1}${status2}${status3}${dom4}` }

        var anu = await message.bot.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
        var anuu = anu.length !== 0 ? anu : false
        try 
        {
              try { var anu1 = await message.bot.fetchStatus(anu[0].jid); } 
              catch { var anu1 = '401' ; }
              if (anu1 == '401' || anu1.status.length == 0) { nobio += `wa.me/${anu[0].jid.split("@")[0]}\n` ; } 
              else {  text += `🧐 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n ✨*Bio :* ${anu1.status}\n🍁*Last update :* ${moment(anu1.setAt).tz(timezone).format('HH:mm:ss DD/MM/YYYY')}\n\n` ;   }
        } catch { nowhatsapp += ` ≛ ${number0}${i}${number1}\n`; }
    }
    return await message.reply(`${text}${nobio}${nowhatsapp}`)

}
)


smd({
    pattern: "nowa",
    category: "search",
    desc: "Searches in given rage about given number.",
    use: '9112345678xx',
    filename: __filename,
},
async(message, text) => {
if(!text) return await message.reply('Give Me Number without + sign. Example: .nowa 234902786xx')
const inputNumber = text.split(" ")[0]
if (!inputNumber.includes('x')) return message.reply(`*You did not add x in number.*\nExample: ${prefix}nowa 234902786xx  \n ${Config.caption}`)
message.reply(`*Searching for WhatsApp account in the given range...*\n${Config.caption}`);
function countInstances(string, word) { return string.split(word).length - 1; }
const number0 = inputNumber.split('x')[0];
const number1 = inputNumber.split('x').slice(-1)[0] || '';
const randomLength = countInstances(inputNumber, 'x');
const randomxx = [10, 100, 1000][randomLength - 1] || 0;
let nobio = `\n*『 WhatsApp Account With No Bio』* \n`;
let nobios='';
let nowhatsapp = `*『 Numbers With No WhatsApp Account 』* \n\n`;
for (let i = 0; i < randomxx; i++) 
{
const nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const status = nu.slice(0, randomLength).map(() => nu[Math.floor(Math.random() * nu.length)]).join('');
const random = `${status}${nu[Math.floor(Math.random() * nu.length)]}`.slice(0, randomLength);
const anu = await message.bot.onWhatsApp(`${number0}${i}${number1}`);
const anuu = anu.length !== 0 ? anu : false;
try 
{
     const anu1 = await message.bot.fetchStatus(anu[0].jid);
     if (anu1 === '401' || anu1.status.length === 0) {  nobios += `wa.me/${anu[0].jid.split("@")[0]}\n`; } 
} catch { nowhatsapp += ` ≛ ${number0}${i}${number1}\n`;  }
}
if(!nobios){ nobio = ''; } else {nobio += nobios+'\n\n' ;}
return await message.reply(`${nobio}${nowhatsapp}${Config.caption}`);

})


const downloadImages = async (query = "", safe = "on") => {
    if (!query) throw "need search query";

    // Function to fetch images from the gimg API
    const gimg_api = async (query) => {
        try {
            let { data } = await axios.get(`${api_smd}/api/gimg?query=${encodeURIComponent(query)}`);
            if (data && data.status && Array.isArray(data.result) && data.result.length > 0) {
                return data.result;
            }
            return false;
        } catch (error) {
            console.error("Error fetching images from gimg smd-api-1.vercel.app:", error);
            return false;
        }
    };

    // Function to fetch images from the bingimg API
    const bing_api = async (query) => {
        try {
            let { data } = await axios.get(`${api_smd}/api/bingimg?query=${encodeURIComponent(query)}`);
            if (data && data.status && Array.isArray(data.result) && data.result.length > 0) {
                return data.result;
            }
            return false;
        } catch (error) {
            console.error("Error fetching images from bingimg (smd-api-1.vercel.app) API:", error);
            return false;
        }
    };

    // Function to fetch images using the g-i-s package (Google Images)
    const pkg_api = async (query) => {
        try {
            let data = await gis(query, {
                query: { safe },
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
            });
            if (data && Array.isArray(data) && data.length > 0) {
                return data;
            }
            return false;
        } catch (error) {
            console.error("Error fetching images from Google Images:", error);
            return false;
        }
    };

    // Array of functions to fetch images from different APIs
    let func_Img = [pkg_api, gimg_api, bing_api];

    // Iterate over the functions and try fetching images
    let res = false;
    for (let i = 0; i < func_Img.length; i++) {
        try {
            res = await func_Img[i](query);
            if (res && res.length > 0) break; // If images are found, break the loop
        } catch (e) {
            console.error("Error fetching images:", e);
        }
    }

    return res;
};


smd({
    pattern: "shazam",
    category: "search",
    desc: "Finds info about a song.",
    filename: __filename,
  },
  async (message) => {
    try {
      let mime = message.reply_message ? message.reply_message.mtype : '';
      if (!/audio/.test(mime)) return message.reply(`🎵 Reply to an audio file with *${prefix}shazam* to identify the song!`);
  
      let buff = await message.reply_message.download();
      const { Shazam } = require("shazamio"); // Ensure you have the package installed
      let shazam = new Shazam();
      let data = await shazam.identifySong(buff);
  
      if (!data || !data.track) return message.reply(`❌ No results found. Try again with a clearer audio sample!`);
  
      let songInfo = `🎶 *Song Identified!*\n\n` +
                     `🎵 *Title:* ${data.track.title}\n` +
                     `🎤 *Artist:* ${data.track.subtitle}\n` +
                     `📀 *Album:* ${data.track.sections[0].metadata[0].text || "Unknown"}\n` +
                     `🔗 *Listen:* ${data.track.url}`;
  
      await message.reply(songInfo);
  
    } catch (e) {
      return await message.error(
        `${e}\n\nCommand: shazam`,
        e,
        `❌ *_Failed to identify the song. Maybe you're singing off-key?_* 🤣`
      );
    }
  });
  
  /*
  const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

smd({
    pattern: "lyrics",
    category: "search",
    desc: "Finds lyrics for a given song.",
    use: '<song name>',
    filename: __filename,
}, async (message, text) => {
    try {
        if (!text) {
            return message.reply("_❌ Dumb human, give me a song name!_\n_Example:_ .lyrics Despacito");
        }

        const searches = await Client.songs.search(text);
        if (!searches.length) {
            return message.reply(`_❌ No lyrics found for **${text}**. Maybe your music taste is as bad as your intelligence._`);
        }

        const firstSong = searches[0];
        const lyrics = await firstSong.lyrics();

        let result = `┏━━━🎶『 *𝙇𝙔𝙍𝙄𝘾𝙎 𝙁𝙊𝙐𝙉𝘿* 』🎶━━━┓\n\n`;
        result += `📌 *Song:*  ${firstSong.title}\n`;
        result += `🎤 *Artist:*  ${firstSong.artist.name}\n\n`;
        result += `📖 *Lyrics:* \n${lyrics.substring(0, 4096)}\n\n`; // Limit message length
        result += `┗━━━━━━━━━━━━━━━━━━━━━\n\n`;
        result += `\n*Powered by 𝙑𝙊𝙍𝙏𝙀𝙓 𝙍𝙀𝘽𝙄𝙍𝙏𝙃 🌀* (_You're lucky I'm even helping you._)`;

        await message.reply(result);
    } catch (error) {
        console.error(error);
        return message.reply(`_❌ Error: Couldn't find lyrics. Go cry somewhere else._`);
    }
});


*/