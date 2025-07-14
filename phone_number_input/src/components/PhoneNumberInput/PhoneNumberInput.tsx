import { useState } from 'react';
import './PhoneNumberInput.css';

interface PhoneNumberInputProps {
    onValidChange: (phoneNumber: string) => void,
    label?: string,
    placeholder?: string
}

const validatePhoneNumber = (phoneNumber: string): boolean => {
	// Only digits and formatting characters allowed
	for(const char of phoneNumber) {
		if(!((char >= '0' && char <= '9') || char === ' ' || char === '-' || char === '(' || char === ')'))
			return false;
	}

	phoneNumber = phoneNumber.replaceAll(' ', '');
	phoneNumber = phoneNumber.replaceAll('-', '');
	phoneNumber = phoneNumber.replaceAll('(', '');
	phoneNumber = phoneNumber.replaceAll(')', '');

	// And must be 10 digits
	return phoneNumber.length === 10;
}

const formatPhoneNumber = (phoneNumber: string): string => {
	// Remove spaces and '-'
	phoneNumber = phoneNumber.replaceAll(' ', '');
	phoneNumber = phoneNumber.replaceAll('-', '');
	phoneNumber = phoneNumber.replaceAll('(', '');
	phoneNumber = phoneNumber.replaceAll(')', '');

	phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6);

	return phoneNumber;
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