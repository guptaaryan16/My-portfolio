const Discord = require('discord.js');

const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordChannelId = process.env.DISCORD_CHANNEL_ID;

async function createDiscordThread() {
  const client = new Discord.Client();
  try {
    await client.login(discordBotToken);
    
    const channel = client.channels.cache.get(discordChannelId);
    if (!channel) {
      console.error('Invalid channel ID');
      return;
    }

    const message = await channel.send('A new issue has been created in the repository!');
    const thread = await message.startThread({
      name: 'New Issue Discussion',
      autoArchiveDuration: 1440, // Set thread auto-archive duration (in minutes). Use 1440 for 24 hours.
    });

    console.log(`Created a new thread in Discord with ID: ${thread.id}`);
  } catch (error) {
    console.error('Error creating Discord thread:', error);
  } finally {
    client.destroy();
  }
}

createDiscordThread();
