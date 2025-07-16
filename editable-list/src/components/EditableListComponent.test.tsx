import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { areArraysTheSame } from "../utils/arrayUtils";
import EditableList from "./EditableListComponent";

// Mock crypto.randomUUID at the top level
const mockRandomUUID = jest.fn();
Object.defineProperty(global, 'crypto', {
    value: {
        randomUUID: mockRandomUUID,
    },
    writable: true,
});

describe('unit tests', () => {
    test('areArraysTheSame, false expectation, same length different elements', () => {
        let a1 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}, {id: "3", content: "asdd"}];
        let a2 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}, {id: "3", content: "asddd"}];

        expect(areArraysTheSame(a1, a2)).toBe(false);
    })

    test('areArraysTheSame, false expectation, different length same elements', () => {
        let a1 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}, {id: "3", content: "asdd"}];
        let a2 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}];

        expect(areArraysTheSame(a1, a2)).toBe(false);
    })

    test('areArraysTheSame, false expectation, different length same elements', () => {
        let a1 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}, {id: "3", content: "asdd"}];
        let a2: {id: string, content: string}[] = [];

        expect(areArraysTheSame(a1, a2)).toBe(false);
    })

    test('areArraysTheSame, true expectation, same length same elements', () => {
        let a1 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}, {id: "3", content: "asdd"}];
        let a2 = [{id: "1", content: "asd"}, {id: "2", content: "asdss"}, {id: "3", content: "asdd"}];

        expect(areArraysTheSame(a1, a2)).toBe(false);
    })
})

describe('integration tests', () => {
    const mockOnChange = jest.fn();
    
    beforeEach(() => {
        // Reset mocks before each test
        mockOnChange.mockClear();
        mockRandomUUID.mockClear();
        // Provide a mock implementation that returns predictable UUIDs
        mockRandomUUID.mockReturnValue('mock-uuid-123');
    });

    test('test add', () => {
        render(<EditableList onChange={mockOnChange}/>);
        const input = screen.getByPlaceholderText("Insert item");
        const button = screen.getByRole("button", {name: "Add Item"});

        fireEvent.change(input, {target: {value: "zaris"}});
        fireEvent.click(button);

        // Check that an input with value "zaris" exists
        expect(screen.getAllByDisplayValue("zaris")).toHaveLength(2);
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockRandomUUID).toHaveBeenCalled();
    });

    test('test remove', () => {
        render(<EditableList onChange={mockOnChange}/>);
        const input = screen.getByPlaceholderText("Insert item");
        const button = screen.getByRole("button", {name: "Add Item"});

        fireEvent.change(input, {target: {value: "zaris"}});
        fireEvent.click(button);

        const removeButton = screen.getByRole("button", {name: "x"});
        fireEvent.click(removeButton);

        // Check that an input with value "zaris" exists
        expect(screen.getAllByDisplayValue("zaris")).toHaveLength(1);
        expect(mockOnChange).toHaveBeenCalledWith([]);
        expect(mockRandomUUID).toHaveBeenCalled();
    });

    test('test update on blur', () => {
        render(<EditableList onChange={mockOnChange}/>);
        const input = screen.getByPlaceholderText("Insert item");
        const button = screen.getByRole("button", {name: "Add Item"});

        fireEvent.change(input, {target: {value: "zaris"}});
        fireEvent.click(button);

        const listInput = screen.getAllByDisplayValue("zaris")[1];
        fireEvent.change(listInput, {target: {value: "zarisss"}});
        fireEvent.blur(listInput); 

        // Check that an input with value "zaris" exists
        expect(screen.getByDisplayValue("zarisss")).toBeInTheDocument();
        expect(mockOnChange).toHaveBeenLastCalledWith([{id: "mock-uuid-123", content: "zarisss"}]);
        expect(mockRandomUUID).toHaveBeenCalled();
    });
})