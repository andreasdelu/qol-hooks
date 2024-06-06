import fs, { constants } from "fs";
import fsPromise from "fs/promises";
import path from "path";
import CONFIG from "../config.js";
import color from "../utils/color.js";

export default async function installHook(
	hookName: string | "all"
): Promise<void> {
	let config = CONFIG.configSchema;
	try {
		config = JSON.parse(
			fs.readFileSync(CONFIG.configPath, { encoding: "utf-8" })
		);
	} catch (err) {
		console.error(color("red", "QOL Hooks is not initialized.\n"));
		process.exit(1);
	}

	const { folder, language } = config;
	const destination = path.resolve(process.cwd(), folder);
	if (!fs.existsSync(destination)) {
		console.error(
			color("red", `Destination folder ${destination} does not exist.\n`)
		);
		process.exit(1);
	}

	const hooks = JSON.parse(
		fs.readFileSync(path.resolve(CONFIG.modulePath, "..", "hooks.json"), {
			encoding: "utf-8",
		})
	);

	if (!hooks) {
		console.error(
			color(
				"red",
				"hooks.json not found. - Clean your npm cache and try again.\n"
			)
		);
		process.exit(1);
	}

	if (hookName === "all") {
		let sourcePaths: string[] = [];
		let destPaths: string[] = [];

		for (const hook in hooks) {
			const hookPath = hooks[hook];
			if (!hookPath?.ts) continue;

			let sourcePath = path.resolve(
				CONFIG.modulePath,
				"..",
				language === "typescript" ? hookPath.ts : hookPath.js
			);

			const destPath = path.resolve(
				destination,
				language === "typescript"
					? hookPath.ts.split("/")[1]
					: hookPath.js.split("/")[1]
			);

			sourcePaths.push(sourcePath);
			destPaths.push(destPath);
		}

		// Create the destination directory if it doesn't exist
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination, { recursive: true });
		}

		console.log(color("yellow", `Installing all hooks...`));

		for (let i = 0; i < sourcePaths.length; i++) {
			if (fs.existsSync(destPaths[i])) {
				console.error(
					color("red", `"${sourcePaths[i]}" already exists in "${folder}".`)
				);
				continue;
			}

			fs.copyFileSync(sourcePaths[i], destPaths[i], constants.COPYFILE_EXCL);
		}

		console.log(color("green", `All hooks installed in ${folder}.\n`));

		return;
	}

	const hookPath = hooks[hookName.toLowerCase()];
	if (!hookPath?.ts) {
		console.error(color("red", `Hook "${hookName}" not found.\n`));
		process.exit(1);
	}

	let sourcePath = path.resolve(
		CONFIG.modulePath,
		"..",
		language === "typescript" ? hookPath.ts : hookPath.js
	);

	const destPath = path.resolve(
		destination,
		language === "typescript"
			? hookPath.ts.split("/")[1]
			: hookPath.js.split("/")[1]
	);

	// Check if hook already exists
	if (fs.existsSync(destPath)) {
		console.error(
			color("red", `"${hookName}" already exists in "${folder}".\n`)
		);
		process.exit(1);
	}

	console.log(color("yellow", `Installing "${hookName}"...`));

	// Create the destination directory if it doesn't exist
	if (!fs.existsSync(path.dirname(destPath))) {
		fs.mkdirSync(path.dirname(destPath), { recursive: true });
	}

	fs.copyFileSync(sourcePath, destPath, constants.COPYFILE_EXCL);
	console.log(color("green", `${hookName} installed in ${destination}.\n`));
}
