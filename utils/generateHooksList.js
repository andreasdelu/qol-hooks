import fs from "fs";
import path from "path";

const __dirname = path.resolve();

function generateHooksList() {
	const hooksObject = {};
	fs.readdirSync(path.join(__dirname, "src"))
		.filter((file) => file.includes("use") && file.endsWith(".ts"))
		.map((file) => {
			const name = file.replace(".ts", "");
			hooksObject[name.toLowerCase()] = {
				name,
				ts: `ts/${name}.ts`,
				js: `esm/${name}.js`,
			};
		});

	fs.writeFileSync(
		path.join(__dirname, "dist", "hooks.json"),
		JSON.stringify(hooksObject, null, 2)
	);
}

generateHooksList();
