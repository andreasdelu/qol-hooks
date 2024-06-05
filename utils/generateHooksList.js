import fs from "fs";
import path from "path";

const __dirname = path.resolve();

function generateHooksList() {
	const hooksObject = {};
	fs.readdirSync(path.join(__dirname, "src"))
		.filter((file) => file.includes("use") && file.endsWith(".ts"))
		.map((file) => {
			const name = file.replace(".ts", "");
			hooksObject[name] = `${file}`;
		});

	fs.writeFileSync(
		path.join(__dirname, "hooks.json"),
		JSON.stringify(hooksObject, null, 2)
	);
}

generateHooksList();
