require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001", //<= default is "#000001"
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your owner discord id example: "515490955801919488"
    DEV_ID: [], // if you want to use command bot only, you can put your id here example: ["123456789", "123456789"]

    GITHUB_NAME: process.env.GITHUB_NAME || "Adivise", // your github username
    CLIENT_SECRET: process.env.CLIENT_SECRET || "YOUR_CLIENT_SECRET", // bot client secret
    GUILD_ID: process.env.GUILD_ID || "925675983699312660", //guild id to give user role
    ROLE_ID: process.env.ROLE_ID || "1077145164222574672", // role to give user

    HOST: process.env.HOST || "http://localhost", // your ip recom default
    PORT: parseInt(process.env.PORT || 80), // same ip
    REDIRECT_URL: process.env.REDIRECT_URL || "http://localhost:80", // same
}