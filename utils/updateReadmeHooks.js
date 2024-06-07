import fs from "fs/promises";
import path from "path";

const __dirname = path.resolve();

async function updateReadmeHooks() {
	const readme = await fs.readFile(path.join(__dirname, "README.md"), "utf-8");
	const hooks = await fs
		.readFile(path.join(__dirname, "dist", "hooks.json"), "utf-8")
		.then((data) => JSON.parse(data))
		.then((hooks) => {
			return Object.entries(hooks)
				.map(([name, { name: hookName, ts, js }]) => {
					return `- ${hookName}`;
				})
				.join("\n");
		});
	const updatedReadme = readme.replace(
		/<!-- hooks starts -->[\s\S]*<!-- hooks ends -->/,
		`<!-- hooks starts -->\n${hooks}\n<!-- hooks ends -->`
	);

	const updatedReadmeBadge = updatedReadme.replace(
		/<!-- hook amount badge start -->[\s\S]*<!-- hook amount badge end -->/,
		`<!-- hook amount badge start -->![Static Badge](https://img.shields.io/badge/hooks-${
			hooks.split("\n").length
		}-D368FF)\n<!-- hook amount badge end -->`
	);
	fs.writeFile(path.join(__dirname, "README.md"), updatedReadmeBadge);
}

updateReadmeHooks();
