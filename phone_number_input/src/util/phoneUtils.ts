export const validatePhoneNumber = (phoneNumber: string): boolean => {
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

export const formatPhoneNumber = (phoneNumber: string): string => {
	// Remove spaces and '-'
	phoneNumber = phoneNumber.replaceAll(' ', '');
	phoneNumber = phoneNumber.replaceAll('-', '');
	phoneNumber = phoneNumber.replaceAll('(', '');
	phoneNumber = phoneNumber.replaceAll(')', '');

	phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6);

	return phoneNumber;
}