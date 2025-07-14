import { screen, render, fireEvent } from "@testing-library/react";
import { formatPhoneNumber, validatePhoneNumber } from "../../util/phoneUtils";
import PhoneNumberInput from "./PhoneNumberInput";

describe('test validatePhoneNumber', () => {
    test('phone number containing random characters', () => {
			// Arrange
			const phoneNumber: string = '1024aa';

			// Act
			const result: boolean = validatePhoneNumber(phoneNumber);

			// Assert
			expect(result).toBe(false);
    });

    test('phone number contains correct characters, but not correct length', () => {
			let phoneNumber = "123456789";

			const result = validatePhoneNumber(phoneNumber);

			expect(result).toBe(false);
    });

		test('phone number is correct', () => {
			let phoneNumber = "(123) 456-7890";

			const result = validatePhoneNumber(phoneNumber);

			expect(result).toBe(true);
		});
})

describe('test format phone number', () => {
	test('format vanilla phone number', () => {
		const phoneNumber: string = "1234567890";

		const expectedPhoneNumber = "(123) 456-7890";

		expect(formatPhoneNumber(phoneNumber)).toBe(expectedPhoneNumber);
	});

		test('format already formatted phone number', () => {
		const phoneNumber: string = "(123) 456-7890";

		const expectedPhoneNumber = "(123) 456-7890";

		expect(formatPhoneNumber(phoneNumber)).toBe(expectedPhoneNumber);
	});

		test('format another format of phone number', () => {
		const phoneNumber: string = "123-456-----()7890";

		const expectedPhoneNumber = "(123) 456-7890";

		expect(formatPhoneNumber(phoneNumber)).toBe(expectedPhoneNumber);
	});
})

describe('test PhoneNumberInput component', () => {
	test('test that component fires onValidChange when phone number is correct', () => {
		// Arrange
		const mockOnValidChange = jest.fn();
		render(<PhoneNumberInput onValidChange = {mockOnValidChange} />);
		const input = screen.getByPlaceholderText('(294) 917-8449');

		// Act
		fireEvent.change(input, {target: {value: '1234567890'}});

		// Assert
		expect(mockOnValidChange).toHaveBeenCalledWith(formatPhoneNumber('1234567890'));
	})

	test('test that component shows error and has border color red when phone number is incorrect', () => {
		// Arrange
		const mockOnValidChange = jest.fn();
		render(<PhoneNumberInput onValidChange={mockOnValidChange} />);
		const input = screen.getByPlaceholderText('(294) 917-8449');
		const errorLabel = screen.getByText('Phone number is incorrect!');

		// Act
		const phoneNumber: string = '12345aaaa'
		fireEvent.change(input, {target: {value: phoneNumber}});
		
		// Assert
		expect(input).toHaveStyle('border-color: red');
		expect(errorLabel).toBeVisible();
		expect(errorLabel).toHaveStyle('color: red');
		expect(mockOnValidChange).not.toHaveBeenCalled();
	})
})