import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import color from "../utils/color.js";
import CONFIG from "../config.js";

async function init(): Promise<void> {
	if (fs.existsSync(CONFIG.configPath)) {
		console.error(color("red", "QOL Hooks is already initialized.\n"));
		process.exit(1);
	}

	console.log(
		color(
			"magenta",
			`   ____   ____   __ \r\n  \/ __ \\ \/ __ \\ \/ \/ \r\n \/ \/ \/ \/\/ \/ \/ \/\/ \/  \r\n\/ \/_\/ \/\/ \/_\/ \/\/ \/___\r\n\\___\\_\\\\____\/\/_____\/\r\n             `
		)
	);

	const { folder, language } = await inquirer.prompt([
		{
			type: "input",
			name: "folder",
			message: color("blue", "Where do you want to store your hooks?"),
			default: "./src/hooks",
		},
		{
			type: "list",
			name: "language",
			message: color("blue", "Which language do you want to use?"),
			choices: [
				{
					name: color("cyan", "TypeScript"),
					value: "typescript",
				},
				{
					name: color("yellow", "JavaScript"),
					value: "javascript",
				},
			],
			default: "typescript",
		},
	]);

	const hooksFolderPath = path.resolve(process.cwd(), folder);
	if (!fs.existsSync(hooksFolderPath)) {
		fs.mkdirSync(hooksFolderPath, { recursive: true });
	}

	const config = {
		folder: folder,
		language: language.toLowerCase(),
		installedHooks: [],
	};

	fs.writeFileSync(CONFIG.configPath, JSON.stringify(config, null, 2));

	console.log(`Hooks folder set to "${folder}"`);
	console.log(color("green", "QOL Hooks initialized!\n"));
}

export default init;
