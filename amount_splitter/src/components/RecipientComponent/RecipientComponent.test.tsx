import { assert, trace } from "console"
import RecipientComponent from "./RecipientComponent";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Integration testing for RecipientComponent', () => {
    const mockUpdate = jest.fn();
    const mockDelete = jest.fn();
    const mockProps = {id: 1, name: "bobi", amount: 50, onUpdate: mockUpdate, onDelete: mockDelete}

    test('onChange for name is fired', () => {
        render(<RecipientComponent { ...mockProps }/>);
        const input = screen.getByDisplayValue("bobi");

        fireEvent.change(input, {target: {value: "asd"}});

        expect(mockUpdate).toHaveBeenCalledWith(1, undefined, "asd");
    });

    test('onChange for amount is fired', () => {
        render(<RecipientComponent { ...mockProps }/>);
        const input = screen.getByDisplayValue("50");

        fireEvent.change(input, {target: {value: "100"}});

        expect(mockUpdate).toHaveBeenCalledWith(1, 100, undefined);
    });

    test('onClick for delete button', () => {
        render(<RecipientComponent { ...mockProps }/>);
        const button = screen.getByText("Delete");

        fireEvent.click(button);

        expect(mockDelete).toHaveBeenCalledWith(1);
    });
});