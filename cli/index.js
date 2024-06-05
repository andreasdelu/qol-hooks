#!/usr/bin/env node

import fs, { constants } from "fs";
import path from "path";
const __dirname = path.resolve();
import inquirer from "inquirer";

import hooks from "../hooks.json" assert { type: "json" };

if (hooks === undefined || hooks === null || typeof hooks !== "object") {
	console.error("hooks.json not found or invalid.");
	process.exit(1);
}

const HOOKS_CONFIG_PATH = path.resolve(process.cwd(), "qol-hooks.config.json");

async function installHook(hookName) {
	let hooksFolder = fs.readFileSync(HOOKS_CONFIG_PATH, { encoding: "utf-8" });
	hooksFolder = JSON.parse(hooksFolder);
	const destination = path.resolve(process.cwd(), hooksFolder.hooksFolder);
	if (!fs.existsSync(destination)) {
		console.error(`Hooks folder not found in ${destination}`);
		process.exit(1);
	}

	const hookPath = hooks[hookName];
	if (!hookPath) {
		console.error(`Hook "${hookName}" not found.`);
		process.exit(1);
	}

	const sourcePath = path.resolve(__dirname, "src", hookPath);
	const destPath = path.resolve(process.cwd(), destination);

	//Check if hook already exists
	if (fs.existsSync(path.join(destPath, hookPath))) {
		console.error(`Hook ${hookName} already exists in ${destination}`);
		process.exit(1);
	}

	// Check if the destination path exists
	if (!fs.existsSync(destPath)) {
		console.log(`Creating ${destPath}`);
		fs.mkdirSync(destPath, { recursive: true });
	}

	fs.copyFileSync(
		sourcePath,
		path.join(destPath, hookPath),
		constants.COPYFILE_EXCL
	);
	console.log(`Installed ${hookName} in ${destination}`);
}

async function uninstallHook(hookName) {
	let hooksFolder = fs.readFileSync(HOOKS_CONFIG_PATH, { encoding: "utf-8" });
	hooksFolder = JSON.parse(hooksFolder);
	const hooksFolderPath = path.resolve(process.cwd(), hooksFolder.hooksFolder);
	if (!fs.existsSync(hooksFolderPath)) {
		console.error(`Hooks folder not found in ${hooksFolderPath}`);
		process.exit(1);
	}

	const hookPath = hooks[hookName];
	if (!hookPath) {
		console.error(`Hook "${hookName}" not found.`);
		process.exit(1);
	}

	const hookFilePath = path.resolve(process.cwd, hooksFolderPath, hookPath);
	if (!fs.existsSync(hookFilePath)) {
		console.error(`Hook "${hookName}" not found in ${hooksFolderPath}`);
		process.exit(1);
	}

	fs.unlinkSync(hookFilePath);
	console.log(`Uninstalled ${hookName}`);
}

async function init() {
	// Check if config file already exists
	if (fs.existsSync(path.resolve(process.cwd(), "qol-hooks.config.json"))) {
		console.error("QOL Hooks is already initialized.");
		process.exit(1);
	}

	// The user needs to set their preferred hooks folder
	const { hooksFolder } = await inquirer.prompt([
		{
			type: "input",
			name: "hooksFolder",
			message: "Where do you want to install hooks?",
			default: "./src/hooks",
		},
	]);

	// Create the hooks folder if it doesn't exist
	const hooksFolderPath = path.resolve(process.cwd(), hooksFolder);
	if (!fs.existsSync(hooksFolderPath)) {
		console.log(`Creating ${hooksFolderPath}`);
		fs.mkdirSync(hooksFolderPath, { recursive: true });
	}

	// Create a config file with the hooks folder path
	fs.writeFileSync(
		path.resolve(process.cwd(), "qol-hooks.config.json"),
		JSON.stringify({ hooksFolder }, null, 2)
	);

	console.log(`Hooks folder set to ${hooksFolderPath}`);
	console.log(`QOL Hooks initialized!`);
}

async function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	switch (command) {
		case "init":
			await init();
			break;
		case "install":
			if (!args[1]) {
				console.error("Usage: npx qol-hooks install <hookName>");
				process.exit(1);
			}
			await installHook(args[1]);
			break;
		case "uninstall":
			if (!args[1]) {
				console.error("Usage: npx qol-hooks uninstall <hookName>");
				process.exit(1);
			}
			await uninstallHook(args[1]);
			break;
		default:
			console.error("Usage: npx qol-hooks <init|install|uninstall>");
			process.exit(1);
	}
}

main();
