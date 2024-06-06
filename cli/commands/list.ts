import color from "../utils/color.js";
import fs from "fs/promises";
import CONFIG from "../config.js";
import path from "path";

type Hooks = {
	[key: string]: {
		name: string;
		ts: string;
		js: string;
	};
};

export default async function list(): Promise<void> {
	// Read the hooks.json file
	const jsonPath = path.resolve(CONFIG.modulePath, "..", "hooks.json");
	const hooks: Hooks = await fs
		.readFile(jsonPath, { encoding: "utf-8" })
		.then((data) => JSON.parse(data));

	// List all hooks
	console.log(color("cyan", "\nAvailable hooks:"));
	for (const hook in hooks) {
		const hookObj = hooks[hook];
		console.log(`  - ${hookObj.name}`);
	}
	console.log("\n");
}
