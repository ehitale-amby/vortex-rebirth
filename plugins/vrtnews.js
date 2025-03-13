const { smd } = require("../lib");
const axios = require("axios");

// Replace with your NewsAPI key
const apiKey = "c2c7b60f8bd2408e8906e49921956e21";

// Function to fetch news
const fetchNews = async (category, language = "en", query = "") => {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&language=${language}&apiKey=${apiKey}&q=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || data.status !== "ok" || !data.articles.length) {
      return { success: false, message: "Failed to fetch news." };
    }

    return { success: true, articles: data.articles };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/*
smd(
  {
    pattern: "wanews",
    alias: ["wa"],
    desc: "Fetches the latest WhatsApp beta news for Android.",
    category: "news",
    filename: __filename,
    use: "wanews",
  },
  async (message, input) => {
    const { success, articles, message: errorMessage } = await fetchNews("technology", "en", "WhatsApp beta");

    if (!success) {
      return message.send(errorMessage || "*Failed to fetch WhatsApp beta news.*");
    }

    const article = articles[0];
    const { title, description, url, urlToImage, publishedAt } = article;

    let output = `*${title}*\n\n${description || "No description available."}\n\n*Published At:* ${publishedAt}\n\n*Link:* ${url}\n`;

    if (urlToImage) {
      output += `*Image:* ${urlToImage}\n`;
    }

    return message.send(output, { quoted: message });
  }
);*/

smd(
  {
    pattern: "iosnews",
    alias: ["ios"],
    desc: "Fetches the latest iOS news.",
    category: "news",
    filename: __filename,
    use: "iosnews",
  },
  async (message, input) => {
    const { success, articles, message: errorMessage } = await fetchNews("technology", "en", "iOS");

    if (!success) {
      return message.send(errorMessage || "*Failed to fetch iOS news.*");
    }

    const article = articles[0];
    const { title, description, url, urlToImage, publishedAt } = article;

    let output = `*${title}*\n\n\n${description || "No description available."}\n\n\n*Published At:* ${publishedAt}\n\n\n*Link:* ${url}\n`;

    if (urlToImage) {
      output += `*Image:* ${urlToImage}\n`;
    }

    return message.send(output, { quoted: message });
  }
);

smd(
  {
    pattern: "googlenews",
    alias: ["gnews"],
    desc: "Fetches the latest Google news.",
    category: "news",
    filename: __filename,
    use: "googlenews",
  },
  async (message, input) => {
    const { success, articles, message: errorMessage } = await fetchNews("technology", "en", "Google");

    if (!success) {
      return message.send(errorMessage || "*Failed to fetch Google news.*");
    }

    const article = articles[0];
    const { title, description, url, urlToImage, publishedAt } = article;

    let output = `*${title}*\n\n\n${description || "No description available."}\n\n\n*Published At:* ${publishedAt}\n\n\n*Link:* ${url}\n`;

    if (urlToImage) {
      output += `*Image:* ${urlToImage}\n`;
    }

    return message.send(output, { quoted: message });
  }
);

smd(
  {
    pattern: "spacenews",
    desc: "Fetches space articles from the latest news.",
    category: "news",
    filename: __filename,
    use: "!spacenews",
  },
  async (message) => {
    const { success, articles, message: errorMessage } = await fetchNews("science", "en", "space");

    if (!success) {
      return message.send(errorMessage || "*Failed to fetch space news.*");
    }

    const article = articles[0];
    const { title, description, url, urlToImage, publishedAt } = article;

    let output = `*${title}*\n\n${description || "No description available."}\n\n*Published At:* ${publishedAt}\n\n*Link:* ${url}\n`;

    if (urlToImage) {
      output += `*Image:* ${urlToImage}\n`;
    }

    return message.send(output, { quoted: message });
  }
);

smd(
  {
    pattern: "animesearch",
    category: "news",
    desc: "Searches for an anime",
    use: '<query>',
    filename: __filename
  },
  async (message, client) => {
    const query = message.text.split(' ').slice(1).join(' ');
    if (!query) return client.sendMessage(message.from, { text: 'Please provide an anime title to search.' }, { quoted: message });

    const { success, articles, message: errorMessage } = await fetchNews("entertainment", "en", query);

    if (!success) {
      return client.sendMessage(message.from, { text: errorMessage || "Error searching for anime." }, { quoted: message });
    }

    const anime = articles[0];
    const animeInfo = `
*Title:* ${anime.title}\n\n
*Description:* ${anime.description || "No description available."}\n\n
*Link:* ${anime.url}
    `;

    client.sendMessage(message.from, { text: animeInfo }, { quoted: message });
  }
);

smd({
  pattern: 'nasanews',
  fromMe: false,
  desc: 'Get the latest NASA news',
  type: 'news'
}, async (message) => {
  const { success, articles, message: errorMessage } = await fetchNews("science", "en", "NASA");

  if (!success) {
    return message.send(errorMessage || "*Failed to fetch NASA news.*");
  }

  const article = articles[0];
  const { title, description, url, urlToImage, publishedAt } = article;

  let output = `🚀 *Title:* ${title}\n\n📅 *Published At:* ${publishedAt}\n\n📝 *Description:* ${description || "No description available."}\n\n🔗 *Link:* ${url}`;

  if (urlToImage) {
    output += `\n\n📸 *Image:* ${urlToImage}`;
  }

  await message.send(output, { quoted: message.data });
});