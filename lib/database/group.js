// let { dbs } = require(__dirname+"/_vrt.js")
let options = {
  assets: {
    type: Object,
    default: {}
  },
  rent: {
    type: Object,
    default: {}
  }
};
const mongoose = require("mongoose");
const Alive = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: "VRT"
  },
  alive_text: {
    type: String,
    "default": "⚡ &user, 𝐈 𝐚𝐦 𝐚𝐥𝐢𝐯𝐞… 𝐟𝐨𝐫 𝐧𝐨𝐰. 💀"
  },
  alive_get: {
    type: String,
    "default": "𝙇𝙊𝙇 😆"
  },
  alive_url: {
    type: String,
    default: ""
  },
  alive_image: {
    type: Boolean,
    default: false
  },
  alive_video: {
    type: Boolean,
    default: false
  },
  antiviewonce: {
    type: String,
    default: "false"
  },
  antidelete: {
    type: String,
    default: "false"
  },
  autobio: {
    type: String,
    default: "false"
  },
  levelup: {
    type: String,
    default: "true"
  },
  anticall: {
    type: String,
    default: "false"
  },
  autoreaction: {
    type: String,
    default: "true"
  },
  permit: {
    type: Boolean,
    default: false
  },
  permit_values: {
    type: String,
    default: "all"
  },
  chatbot: {
    type: String,
    default: "false"
  },
  bgm: {
    type: Boolean,
    default: false
  },
  bgmarray: {
    type: Object,
    default: {}
  },
  plugins: {
    type: Object,
    default: {}
  },
  notes: {
    type: Object,
    default: {}
  },
  mention: {
    type: Object,
    default: {}
  },
  filter: {
    type: Object,
    default: {
     "Asta_": "𝙔𝙚𝙨, 𝙗𝙧𝙪𝙝? 🤨"
    }
  },
  afk: {
    type: Object,
    default: {}
  },
  ...options
});
const alive = mongoose.model("alive", Alive);
module.exports = {
  alive: alive
};
