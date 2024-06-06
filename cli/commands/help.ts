import color from "../utils/color.js";

export default function help(): void {
	// Display help message
	// list of available commands
	// usage of each command
	console.log(color("cyan", "\nUsage:"));
	console.log(`npx qol-hooks <init|install|list|help>`);
	console.log(color("cyan", "\nCommands:"));
	console.log(`  ${color("yellow", "- init")} - Initialize QOL Hooks`);
	console.log(
		`  ${color("yellow", "- install <hook|all>")} - Install a hook or all hooks`
	);
	console.log(`  ${color("yellow", "- list")} - List available hooks`);
	console.log(`  ${color("yellow", "- help")} - Display this help message`);
	console.log("\n");
	// Exit the process
	process.exit(1);
}
