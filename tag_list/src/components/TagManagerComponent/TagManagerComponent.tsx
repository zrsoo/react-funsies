import TagComponent from "../TagComponent";
import { useState } from "react";

interface TagManagerComponentProps{
	onChange: (tags: string[]) => void;
}

const TagManagerComponent = ({ onChange }: TagManagerComponentProps) => {
	const [tags, setTags] = useState<string[]>([]);
	const [tagText, setTagText] = useState('');

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// Treat enter
		if(e.key === "Enter") {
			if(tagText.length !== 0 && !tags.find(tag => tag.toLocaleLowerCase() === tagText.toLocaleLowerCase())) {
				const newTags = [...tags, tagText];
				newTags.sort((a, b) => (b > a) ? 1 : -1);
				setTags(newTags);
				onChange(newTags);
			}
			setTagText('');
		}
		// Treat backspace
		else if(e.key === "Backspace") {
			if(tagText.length === 0) {
				const newTags = tags.slice(0, -1);
				setTags(newTags);
				onChange(newTags);
			}
		}
	}

	const handleDelete = (content: string) => {
		const newTags = tags.filter(tag => tag !== content);
		setTags(newTags);
		onChange(newTags);
	}

	return(
		<div style={{border: "2px solid white"}}>
			<input placeholder="Tag" style={{minHeight: "2em", fontSize: "1em"}} onKeyDown={(e) => handleKeyDown(e)} value={tagText} onChange={(e) => setTagText(e.target.value)}></input>
			<hr></hr>
			<div>
				{tags.map(tag => {return <TagComponent content={tag} onDelete={handleDelete}/>})}
			</div>
		</div>
	);
}

export default TagManagerComponent