import CONFIG from "../config.js";
const { colors } = CONFIG;

type Colors =
	| "black"
	| "red"
	| "green"
	| "yellow"
	| "blue"
	| "magenta"
	| "cyan"
	| "white"
	| "crimson";

export default function color(color: Colors, text: string) {
	return `${colors.fg[color]}${text}${colors.reset}`;
}
