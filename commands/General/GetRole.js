module.exports = {
    name: ["github", "getrole"], // Base Commands! // Sub Commands!
    description: "Get follower role.",
    run: async (client, interaction) => {
        return interaction.reply({ content: `- **[Login to get role.](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&response_type=code&scope=identify%20connections)**` });
    }
}
