import './TagComponent.css'

interface TagComponentProps{
	content: string;
	onDelete: (content: string) => void
}

const TagComponent = ({ content, onDelete }: TagComponentProps) => {
	return (
		<span className='TagSpan'>{content}<button onClick={(e) => onDelete(content)}>x</button></span>
	)
}

export default TagComponent