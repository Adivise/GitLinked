const Express = require('express');
const { URLSearchParams } = require('url');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (client) => {
    const app = Express();
    const port = client.config.PORT;

    function make_config(authorization_token) {
        data = {
            headers: {
                "authorization": `Bearer ${authorization_token}`
            }
        };
        return data;
    }

    app.use(Express.urlencoded({ extended: false }));
    app.use(Express.json());
    app.use(bodyParser.text());

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.post('/user', (req, res) => {
        const data_1 = new URLSearchParams();

        data_1.append('client_id', client.user.id);
        data_1.append('client_secret', client.config.CLIENT_SECRET);
        data_1.append('grant_type', 'authorization_code');
        data_1.append('redirect_uri', client.config.REDIRECT_URL);
        data_1.append('scope', 'identify', 'connections');
        data_1.append('code', req.body);

        fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1 }).then(response => response.json()).then(data => {
            axios.get("https://discord.com/api/users/@me/connections", make_config(data.access_token)).then(async (response) => {
                const fined = response.data.find(x => x.type === "github");
                if (fined) {
                    let user_id = "";

                    axios.get("https://discord.com/api/users/@me", make_config(data.access_token)).then(async (rp) => {
                        user_id = rp.data.id;
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).send("Error retrieving Discord user ID.");
                    });

                await getAllFollowers(client.config.GITHUB_NAME).then((fw) => {
                    if (fw.includes(parseInt(fined.id))) {
                        const guild = client.guilds.cache.get(client.config.GUILD_ID);
                        const member = guild.members.cache.get(user_id);
                        const role = guild.roles.cache.get(client.config.ROLE_ID);

                        member.roles.add(role).then(() => {
                            console.log(member.user.tag + " has been given the GitHub follower role.");
                            res.status(200).send("Success, you get a role now.\nYour can close this windown any time.");
                        }).catch((error) => {
                            console.log(error);
                            res.status(500).send("Error adding role to member.");
                        });
                    } else {
                        res.status(403).send(`You need to follow the GitHub https://github.com/${client.config.GITHUB_NAME} to get the role.`);
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send("Error retrieving GitHub followers.");
                });

            } else {
                res.status(403).send("You need to connect your Discord account to your GitHub account.");
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });
});
    app.listen(port, function () {
        console.log(`App listening! Link: ${client.config.HOST}:${client.config.PORT}/`);
    });
}

async function getAllFollowers(username) {
    let allFollowers = [];
    let hasMorePages = true;
  
    for (let page = 1; hasMorePages; page++) {
        const followersUrl = `https://api.github.com/users/${username}/followers?page=${page}`;
        const response = await fetch(followersUrl, {
            headers: { "User-Agent": "My GitHub Client" },
        });
        if (!response.ok) {
            throw new Error(`Failed to retrieve followers: ${response.statusText}`);
        }

        const followers = await response.json();
        if (Array.isArray(followers) && followers.length) {
        allFollowers = allFollowers.concat(followers.map((follower) => follower.id));
        } else {
            hasMorePages = false;
        }
    }
    return allFollowers;
}  