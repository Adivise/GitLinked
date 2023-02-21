<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=GitLinked&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> </a> 
</p>

<p align="center"> 
  <a href="https://discord.gg/SNG3dh3MbR" target="_blank"> <img src="https://discordapp.com/api/guilds/903043706410643496/widget.png?style=banner2"/> </a> 
</p>

<p align="center"> 
  <a href="https://ko-fi.com/nanotect" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a> 
</p>

## 📑 Feature
- [x] Followers Role!
- [x] SlashCommand (Base, Group, Sub)
- [x] Context Menu (Message)
- [x] Easy to use

## 📎 Requirements

- Node.js v16+ **[Download](https://nodejs.org/en/download/)**
- Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
- Don't forget to change authorize url [Click Here](https://github.com/Adivise/GitLinked/blob/main/dashboard/index.html#L36)
![Screenshot_5](https://user-images.githubusercontent.com/61177761/220265704-63d63d53-ae77-4046-877f-1890eda79c38.png)
![Screenshot_6](https://user-images.githubusercontent.com/61177761/220265714-c3807973-5f14-4308-aee3-7ad489577268.png)

## 📚 Installation

```
git clone https://github.com/Adivise/GitLinked

cd GitLinked
npm install
```


## 📄 Configuration

Copy or Rename `.env.example` to `.env` and fill out the values:

```.env
# Bot
TOKEN=YOUR_BOT_TOKEN
OWNER_ID=YOUR_DISCORD_ID
EMBED_COLOR=#000001

# your github name
GITHUB_NAME=YOUR_GITHUB_NAME
# discord client secret
CLIENT_SECRET=YOUR_BOT_SECRET_TOKEN
# guild id to add role in
GUILD_ID=YOUR_GUILD_ID
# role id to add in user
ROLE_ID=ROLE_ID
# ip
HOST=http://localhost
# port
PORT=80
# redirect url 
REDIRECT_URL=http://localhost:80
```

After installation or finishes all you can use `node .` to start the bot.
