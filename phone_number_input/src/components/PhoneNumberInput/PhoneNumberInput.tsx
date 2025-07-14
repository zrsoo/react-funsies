import { useState } from 'react';
import './PhoneNumberInput.css';
import { formatPhoneNumber, validatePhoneNumber } from '../../util/phoneUtils';


interface PhoneNumberInputProps {
    onValidChange: (phoneNumber: string) => void,
    label?: string,
    placeholder?: string
}

function PhoneNumberInput({onValidChange, label = "US Phone Number", placeholder = "(294) 917-8449"} : PhoneNumberInputProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
	console.log("PHONE NUMBER: " + phoneNumber);

	const isPhoneNumberCorrect = validatePhoneNumber(phoneNumber);
	if(isPhoneNumberCorrect) {
		onValidChange(formatPhoneNumber(phoneNumber));
	}

	return (
    <div className='PhoneNumberDiv'>			
			<label className='PhoneNumberLabel'>{label}</label>
			<input className='PhoneNumberInput' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={placeholder} 
				style={{ borderColor: isPhoneNumberCorrect ? "aqua" : "red"}}></input>
			{!isPhoneNumberCorrect && <label className='PhoneNumberLabel' style={{color: "red"}}>Phone number is incorrect!</label>}
    </div>
  );
}

export default PhoneNumberInput;