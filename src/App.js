import React, { useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import "./App.css";

function App() {
	const initialValue = [
		{
			type: "paragraph",
			children: [
				{
					text: "This is editable plain text, just like a <textarea>!",
				},
			],
		},
	];

	const [value, setValue] = useState(initialValue);
	const editor = useMemo(() => withReact(createEditor()), []);

	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

	const Element = ({ attributes, children, element }) => {
		switch (element.type) {
		  case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>
		  case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>
		  case 'heading-one':
			return <h1 {...attributes}>{children}</h1>
		  case 'heading-two':
			return <h2 {...attributes}>{children}</h2>
		  case 'list-item':
			return <li {...attributes}>{children}</li>
		  case 'numbered-list':
			return <ol {...attributes}>{children}</ol>
		  default:
			return <p {...attributes}>{children}</p>
		}
	  }

	const Leaf = ({ attributes, children, leaf }) => {
		if (leaf.bold) {
			children = <strong>{children}</strong>;
		}

		if (leaf.code) {
			children = <code>{children}</code>;
		}

		if (leaf.italic) {
			children = <em>{children}</em>;
		}

		if (leaf.underline) {
			children = <u>{children}</u>;
		}

		return <span {...attributes}>{children}</span>;
	};

	return (
		<>
			<div className="container">
				<Slate
					editor={editor}
					value={value}
					onChange={(value) => {
						setValue(value);
						//console.log(value);
					}}
				>
					<Editable
						placeholder="Enter some plain text..."
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						onKeyDown={(event) => {
							if (event.key === "c" && event.ctrlKey) {
								event.preventDefault();
								// Determine whether any of the currently selected blocks are code blocks.
							}
						}}
					/>
				</Slate>
			</div>
		</>
	);
}

export default App;
