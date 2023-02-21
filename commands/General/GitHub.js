const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: ["github", "info"], // Base Commands! // Sub Commands!
    description: "Check your github infomation.",
    options: [
        {
            name: "name",
            description: "Github username.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const args = interaction.options.getString("name");
        try {
            const res = await fetch(`https://api.github.com/users/${args}`);
            const data = await res.json();
            
            const repos = await fetch(data.repos_url);
            const repoData = await repos.json();
            
            let totalStars = 0;
            let totalForks = 0;
            for (const repo of repoData) {
                totalStars += repo.stargazers_count;
                totalForks += repo.forks_count;
            }

            const createdAt = new Date(data.created_at);
            const updatedAt = new Date(data.updated_at);
            
            const created = `${createdAt.getDate().toString().padStart(2, "0")}/${(createdAt.getMonth() + 1).toString().padStart(2, "0")}/${createdAt.getFullYear()}`;
            const updated = `${updatedAt.getDate().toString().padStart(2, "0")}/${(updatedAt.getMonth() + 1).toString().padStart(2, "0")}/${updatedAt.getFullYear()}`;

            const embed = new EmbedBuilder()
                .setTitle(`${data.login}'s Github Information`)
                .setDescription(data.bio)
                .addFields([
                    { name: "Followers", value: `${data.followers}`, inline: true }, 
                    { name: "Following", value: `${data.following}`, inline: true },
                    { name: "Repositories", value: `${data.public_repos}`, inline: true },
                    { name: "Total Stars", value: `${totalStars}`, inline: true },
                    { name: "Total Forks", value: `${totalForks}`, inline: true },
                    { name: "Location", value: `${data.location}` || "N/A", inline: true },
                    { name: "Created At", value: `${created} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`, inline: true },
                    { name: "Updated At", value: `${updated} ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`, inline: true }
                ])
                .setColor("#000001")
                .setFooter({ text: `ID: ${data.id}`, iconURL: data.avatar_url })
                .setThumbnail(data.avatar_url);

            return interaction.reply({ content: `- **[Login to get role.](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&response_type=code&scope=identify%20connections)**`, embeds: [embed] });
        } catch (error) {
            console.error(error);
            return interaction.reply("Invalid username. Please try again with a valid username.");
        }
    }
}
