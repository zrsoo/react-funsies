import { useState } from "react";
import RecipientComponent from "../RecipientComponent";

const SplitAmountComponent = () => {
	const [recipientToAdd, setRecipientToAdd] = useState('');
	const [amountToAdd, setAmountToAdd] = useState(0);

	const [totalAmount, setTotalAmount] = useState(1000);
	const [totalAmountInput, setTotalAmountInput] = useState(0);

	const [recipients, setRecipients] = useState([
		{id: 1, name: 'Bob', amount: 50}
	]);

	const computeSum = () => {
		let sum = 0;
		recipients.forEach(r => sum += r.amount);
		return sum;
	}

	const recipientsSum = computeSum();

	const onDelete = (id: number) => {
		const newRecipients = recipients.filter(r => r.id != id);
		setRecipients(newRecipients);
		computeSum();
	}

	const onUpdate = (id: number, newAmount?: number, newName?: string) => {
		const newRecipients = recipients.map((recipient) => {
			if(newAmount !== undefined) {
				if(recipient.id === id) {
					return {id: recipient.id, name: recipient.name, amount: newAmount}
				}
			}
			else if(newName !== undefined) {
				if(recipient.id === id) {
					return {id: recipient.id, name: newName, amount: recipient.amount}
				}
			}
			return recipient;
		});

		setRecipients(newRecipients);
		computeSum();
	}

	const getNextId = () => {
		let maxId: number = -1;

		recipients.forEach(r => {
				if(r.id > maxId)
					maxId = r.id;
			});

		return maxId + 1;
	};

	const onAdd = (name: string, amount: number) => {
		const newRecipients = [...recipients, {id: getNextId(), name: name, amount: amount}];
		setRecipients(newRecipients);
		computeSum();
	}

	return (
		<div style={{border: "2px solid aqua"}}>
			{
				recipients.map(recipient => {
					return <RecipientComponent id={recipient.id} name={recipient.name} amount={recipient.amount} onUpdate={onUpdate} onDelete={onDelete}/>
				})
			}
			<hr></hr>

			<div>
				<input placeholder="Name" onChange={e => setRecipientToAdd(e.target.value)}></input>
				<input placeholder="Amount" type="number" onChange={e => setAmountToAdd(parseFloat(e.target.value))}></input>
				<button onClick={(e) => onAdd(recipientToAdd, amountToAdd)}>Add recipient</button>
			</div>

			<div>
				<input value={totalAmountInput} placeholder="Total Amount" type="number" onChange={(e) => setTotalAmountInput(parseFloat(e.target.value))}></input>
				<button onClick={(e) => {setTotalAmount(totalAmountInput)}}>Set total amount</button>
				<p>Total Amount: {totalAmount}</p>
				<p>Remaining to split: {totalAmount - recipientsSum}</p>
			</div>
		</div>	
	)
} 

export default SplitAmountComponent;