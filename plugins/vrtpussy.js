const fetch = require("node-fetch");
const { smd, Config } = require("../lib");

smd(
  {
    pattern: "pussy", // Replace this with a new pattern if needed
    category: "nsfw",
    filename: __filename,
    desc: "Gets pussy pics.",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.waifu.pics/nsfw/neko";  // Correct endpoint
      const response = await fetch(apiUrl);
      const contentType = response.headers.get('content-type');

      // Check if the response is JSON
      if (!contentType || !contentType.includes('application/json')) {
        return await m.send("*_Unexpected response format! This might not be a valid endpoint._*");
      }

      const jsonResponse = await response.json();

      // Check if the URL is present in the response
      if (jsonResponse && jsonResponse.url) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: pussy",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Example for other patterns
smd(
  {
    pattern: "ass", // Replace this with another pattern as needed
    category: "nsfw",
    filename: __filename,
    desc: "Gets ass pics.",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.waifu.pics/nsfw/ass"; // Example endpoint
      const response = await fetch(apiUrl);
      const contentType = response.headers.get('content-type');

      // Check if the response is JSON
      if (!contentType || !contentType.includes('application/json')) {
        return await m.send("*_Unexpected response format! This might not be a valid endpoint._*");
      }

      const jsonResponse = await response.json();

      // Check if the URL is present in the response
      if (jsonResponse && jsonResponse.url) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: ass",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);



smd(
  {
    pattern: "blowjob", // Command pattern for ass images
    category: "nsfw",
    filename: __filename,
    desc: "Gets ass pics (using pussy API).",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.waifu.pics/nsfw/neko"; // Using the working "pussy" API
      const response = await fetch(apiUrl);
      const contentType = response.headers.get("content-type");

      // Check if the response is JSON
      if (!contentType || !contentType.includes("application/json")) {
        return await m.send("*_Unexpected response format! This might not be a valid endpoint._*");
      }

      const jsonResponse = await response.json();

      // Check if the URL is present in the response
      if (jsonResponse && jsonResponse.url) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: blowjob",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

smd(
  {
    pattern: "trap", // Command pattern for ass images
    category: "nsfw",
    filename: __filename,
    desc: "Gets ass pics (using pussy API).",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.waifu.pics/nsfw/neko"; // Using the working "pussy" API
      const response = await fetch(apiUrl);
      const contentType = response.headers.get("content-type");

      // Check if the response is JSON
      if (!contentType || !contentType.includes("application/json")) {
        return await m.send("*_Unexpected response format! This might not be a valid endpoint._*");
      }

      const jsonResponse = await response.json();

      // Check if the URL is present in the response
      if (jsonResponse && jsonResponse.url) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: trap",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

