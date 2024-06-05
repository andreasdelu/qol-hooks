# QOL Hooks

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/qol-hooks.svg)](https://www.npmjs.com/package/qol-hooks)
[![npm downloads](https://img.shields.io/npm/dt/qol-hooks.svg)](https://www.npmjs.com/package/qol-hooks)

## Description

QOL Hooks is a collection of useful hooks for enhancing the quality of life in your React applications. These hooks provide common functionalities that can be easily integrated into your projects.

## Installation

To install QOL Hooks, run:

```bash
npm install qol-hooks
```

or if you're using yarn:

```bash
yarn add qol-hooks
```

## Available Hooks

- [useClipboard](#useclipboard)
- [useDebounce](#usedebounce)
- [useEventListener](#useeventlistener)
- [useFetch](#usefetch)
- [useHover](#usehover)
- [useInterval](#useinterval)
- [useInView](#useinview)
- [useKeyPress](#usekeypress)
- [useLocalStorage](#uselocalstorage)
- [useOnClickOutside](#useonclickoutside)
- [useOnlineStatus](#useonlinestatus)
- [usePrevious](#useprevious)
- [useScroll](#usescroll)
- [useSessionStorage](#usesessionstorage)
- [useTimeout](#usetimeout)
- [useToggle](#usetoggle)
- [useWindowSize](#usewindowsize)

## useClipboard

A hook that allows you to copy text to the clipboard.

### Usage

```jsx
import { useClipboard } from "qol-hooks";

const Component = () => {
	const [copied, copy] = useClipboard();

	return (
		<div>
			<button onClick={() => copy("Hello, World!")}>Copy</button>
			{copied && <p>Copied to clipboard!</p>}
		</div>
	);
};
```

## useDebounce

A hook that debounces a value.

### Usage

```jsx
import { useDebounce } from "qol-hooks";

const Component = () => {
	const [value, setValue] = useState("");
	const debouncedValue = useDebounce(value, 500);

	return (
		<div>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder='Debounced input'
			/>
			<p>Debounced value: {debouncedValue}</p>
		</div>
	);
};
```

## useEventListener

A hook that allows you to add event listeners to the document.

### Usage

```jsx
import { useEventListener } from "qol-hooks";

const Component = () => {
	useEventListener("click", () => {
		console.log("Document clicked!");
	});

	return <div>Click anywhere on the document!</div>;
};
```

## useFetch

A hook that fetches data from an API.

### Usage

```jsx
import { useFetch } from "qol-hooks";

const Component = () => {
	const [data, loading, error] = useFetch(
		"https://jsonplaceholder.typicode.com/posts",
		{
			method: "GET",
		}
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<ul>
			{data.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
};
```

## useHover

A hook that detects whether an element is being hovered over.

### Usage

```jsx
import { useHover } from "qol-hooks";

const Component = () => {
	const [hoverRef, isHovered] = useHover();

	return <div ref={hoverRef}>{isHovered ? "Hovered" : "Not hovered"}</div>;
};
```

## useInterval

A hook that sets an interval.

### Usage

```jsx
import { useInterval } from "qol-hooks";

const Component = () => {
	useInterval(() => {
		console.log("Interval triggered!");
	}, 1000);

	return <div>Check the console!</div>;
};
```

## useInView

A hook that detects whether an element is in view.

### Usage

```jsx
import { useInView } from "qol-hooks";

const Component = () => {
	const [ref, inView] = useInView();

	return (
		<div ref={ref}>
			{inView ? "In view" : "Not in view"}
			<div style={{ height: "100vh" }}></div>
		</div>
	);
};
```

## useKeyPress

A hook that detects key presses.

### Usage

```jsx
import { useKeyPress } from "qol-hooks";

const Component = () => {
	const pressed = useKeyPress("a");

	return <div>{pressed ? "A key pressed!" : "Press 'A'"}</div>;
};
```

## useLocalStorage

A hook that allows you to store data in local storage.

### Usage

```jsx
import { useLocalStorage } from "qol-hooks";

const Component = () => {
	const [name, setName] = useLocalStorage("name", "");

	return (
		<div>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Enter your name'
			/>
			<p>Hello, {name || "Stranger"}!</p>
		</div>
	);
};
```

## useOnClickOutside

A hook that detects clicks outside of an element.

### Usage

```jsx
import { useOnClickOutside } from "qol-hooks";

const Component = () => {
	const ref = useRef();
	useOnClickOutside(ref, () => {
		console.log("Clicked outside!");
	});

	return <div ref={ref}>Click outside this element!</div>;
};
```

## useOnlineStatus

A hook that detects the online status of the user.

### Usage

```jsx
import { useOnlineStatus } from "qol-hooks";

const Component = () => {
	const online = useOnlineStatus();

	return <div>{online ? "Online" : "Offline"}</div>;
};
```

## usePrevious

A hook that returns the previous value of a state.

### Usage

```jsx
import { usePrevious } from "qol-hooks";

const Component = () => {
	const [count, setCount] = useState(0);
	const prevCount = usePrevious(count);

	return (
		<div>
			<p>Current: {count}</p>
			<p>Previous: {prevCount}</p>
			<button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
		</div>
	);
};
```

## useScroll

A hook that detects the scroll position of the window.

### Usage

```jsx
import { useScroll } from "qol-hooks";

const Component = () => {
	const { x, y } = useScroll();

	return (
		<div>
			<p>Scroll X: {x}</p>
			<p>Scroll Y: {y}</p>
		</div>
	);
};
```

## useSessionStorage

A hook that allows you to store data in session storage.

### Usage

```jsx
import { useSessionStorage } from "qol-hooks";

const Component = () => {
	const [name, setName] = useSessionStorage("name", "");

	return (
		<div>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Enter your name'
			/>
			<p>Hello, {name || "Stranger"}!</p>
		</div>
	);
};
```

## useTimeout

A hook that sets a timeout.

### Usage

```jsx
import { useTimeout } from "qol-hooks";

const Component = () => {
	const [visible, setVisible] = useState(false);
	useTimeout(() => setVisible(true), 1000);

	return <div>{visible ? "Visible" : "Not visible"}</div>;
};
```

## useToggle

A hook that toggles between two states.

### Usage

```jsx
import { useToggle } from "qol-hooks";

const Component = () => {
	const [isOn, toggle] = useToggle(false);

	return (
		<div>
			<button onClick={toggle}>{isOn ? "ON" : "OFF"}</button>
		</div>
	);
};
```

## useWindowSize

A hook that detects the window size.

### Usage

```jsx
import { useWindowSize } from "qol-hooks";

const Component = () => {
	const { width, height } = useWindowSize();

	return (
		<div>
			<p>Window width: {width}</p>
			<p>Window height: {height}</p>
		</div>
	);
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
