#!/usr/bin/env node

import init from "./commands/init.js";
import color from "./utils/color.js";
import installHook from "./commands/installHook.js";
import list from "./commands/list.js";
import help from "./commands/help.js";

async function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	switch (command) {
		case "init":
			await init();
			break;
		case "list":
			await list();
			break;
		case "help":
			help();
			break;
		case "install":
			if (!args[1]) {
				console.error(color("red", "Usage: npx qol-hooks install <hook|all>"));
				process.exit(1);
			}
			await installHook(args[1]);
			break;
		default:
			console.error(color("red", "Usage: npx qol-hooks <init|install|list>"));
			process.exit(1);
	}
}

main();
