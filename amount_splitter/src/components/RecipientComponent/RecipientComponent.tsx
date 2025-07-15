interface RecipientComponentProps {
    id: number;
    name: string;
    amount: number;
    onUpdate: (id: number, newAmount?: number, newName?: string) => void;
    onDelete: (id: number) => void;
}

const RecipientComponent = ({id, name, amount, onUpdate, onDelete} : RecipientComponentProps) => {
    return (
        <div style={{border: "2px solid white"}}>
            <input value={name} onChange={(event) => onUpdate(id, undefined, event.target.value)}></input>
            <input value={amount} onChange={(event) => onUpdate(id, parseFloat(event.target.value), undefined)}></input>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

export default RecipientComponent