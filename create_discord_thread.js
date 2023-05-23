const axios = require('axios');

const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordChannelId = process.env.DISCORD_CHANNEL_ID;

async function createDiscordThread() {
  try {
    const response = await axios.post(
      `https://discord.com/api/v9/channels/${discordChannelId}/messages`,
      {
        content: 'A new issue has been created in the repository!',
        type: 19,
      },
      {
        headers: {
          Authorization: `Bot ${discordBotToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const threadId = response.data.id;

    console.log(`Created a new thread in Discord with ID: ${threadId}`);
  } catch (error) {
    console.error('Error creating Discord thread:', error);
  }
}

createDiscordThread();
