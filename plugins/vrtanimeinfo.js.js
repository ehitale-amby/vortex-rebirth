const fetch = require("node-fetch");
const { smd } = require("../lib");

// List of anime characters
const animeCharacters = [
  { pattern: "akira", query: "Akira" },
  { pattern: "goku", query: "Goku" },
  { pattern: "naruto", query: "Naruto" },
  { pattern: "luffy", query: "Monkey D. Luffy" },
  { pattern: "eren", query: "Eren Yeager" },
  { pattern: "tanjiro", query: "Tanjiro Kamado" },
  { pattern: "light", query: "Light Yagami" },
  { pattern: "levi", query: "Levi Ackerman" },
  { pattern: "itachi", query: "Itachi Uchiha" },
  { pattern: "zenitsu", query: "Zenitsu Agatsuma" },
  { pattern: "kakashi", query: "Kakashi Hatake" },
  { pattern: "gojo", query: "Satoru Gojo" },
  { pattern: "mikasa", query: "Mikasa Ackerman" },
  { pattern: "saber", query: "Saber" },
  { pattern: "rem", query: "Rem" },
];

// Dynamically create commands for each character
animeCharacters.forEach(({ pattern, query }) => {
  smd({
    pattern,
    desc: `Sends a random image of ${query}.`,
    category: "animeinfo",
  }, async (m) => {
    try {
      // Fetch character data from Jikan API
      const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();

      if (!data || !data.data || data.data.length === 0) {
        return await m.send(`*No results found for ${query}.*`);
      }

      // Find the anime and extract the main image
      const anime = data.data.find((anime) => anime.title === query) || data.data[0];

      if (!anime || !anime.images || !anime.images.jpg || !anime.images.jpg.large_image_url) {
        return await m.send(`*No image available for ${query}.*`);
      }

      const imageUrl = anime.images.jpg.large_image_url; // Main image
      const caption = `
🌟 *${query} Main Image* 🌟

🎥 *Title:* ${anime.title || "Unknown"}
🗓️ *Release Date:* ${anime.aired?.string || "Unknown"}
⭐ *Score:* ${anime.score || "N/A"} / 10
📖 *Synopsis:* ${anime.synopsis || "No synopsis available."}

🔗 *More Info:* ${anime.url || "No link available."}

*Powered by MX-1.0*
`.trim();

      // Send the image with caption
      await m.bot.sendFromUrl(m.from, imageUrl, caption, m, {}, "image");
    } catch (error) {
      console.error(`Error fetching image for ${query}:`, error);
      await m.error(`${error}\n\nCommand: ${pattern}`, error, `*_Failed to fetch image for ${query}._*`);
    }
  });
});
