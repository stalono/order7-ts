import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { clientId, token } from './json/config.json';

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data?.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

export async function syncCommands() {
    rest.put(Routes.applicationCommands(clientId), { body: commands })
        .then(() => console.log('- Commands Synced.'))
        .catch(console.error);
}