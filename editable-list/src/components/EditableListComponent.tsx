import { useState } from "react";
import { areArraysTheSame } from "../utils/arrayUtils";

interface EditableListProps {
	onChange: (items: {id: string, content: string}[]) => void;
}

const EditableList = ({ onChange }: EditableListProps) => {
	const [editableItems, setEditableItems] = useState<{id: string, content: string}[]>([]);
	const [items, setItems] = useState<{id: string, content: string}[]>([]);

	const [itemText, setItemText] = useState('');

	const handleAdd = (text: string) => {
		const newItems = [...editableItems, {id: crypto.randomUUID(), content: text}];
		setEditableItems(newItems);
		setItems(newItems);
		onChange(newItems);
	}

	const handleRemove = (id: string) => {
		const newItems = editableItems.filter(i => i.id !== id);
		setEditableItems(newItems);
		setItems(newItems);
		onChange(newItems);
	}

	const handleEditableItemChange = (id: string, newItem: string) => {
		const newItems = editableItems.map(i => {
			if(i.id === id) {
				return {id: i.id, content: newItem}
			}
			return i;
		});

		setEditableItems(newItems);
	}

	const handleBlur = (id: string) => {
		if(editableItems.find(i => i.id === id)?.content.length === 0)
			handleRemove(id);
		else {
			if(!areArraysTheSame(items, editableItems))
			{
				setItems(editableItems);
				onChange(editableItems);
			}
		}
	}

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
		if(e.key === "Enter") {
			setItems(editableItems);
			onChange(editableItems);
		}
	}

	return(
		<div style={{border: "2px solid white"}}>
			<input placeholder="Insert item" onChange={(e) => setItemText(e.target.value)}></input>
			<button onClick={(e) => handleAdd(itemText)}>Add Item</button>

			<hr></hr>

			{
				editableItems.map((item) => {
					return <div><input value={item.content} onChange={e => handleEditableItemChange(item.id, e.target.value)} onBlur={e => handleBlur(item.id)} onKeyDown={e => handleEnter(e, item.id)}>
						</input><button onClick={(e) => handleRemove(item.id)}>x</button></div>
				})
			}
		</div>
	)
}

export default EditableList