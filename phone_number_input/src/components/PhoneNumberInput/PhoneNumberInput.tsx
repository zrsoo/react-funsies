import './PhoneNumberInput.css';

interface PhoneNumberInputProps {
    onValidChange: (phoneNumber: string) => void,
    label?: string,
    placeholder?: string
}

function PhoneNumberInput({onValidChange, label = "US Phone Number", placeholder = "(294) 917-8449"} : PhoneNumberInputProps) {
  return (
    <div className="PhoneNumberDiv">
        <hr style={{ width: "100%", borderColor: "lightblue"}}/>
      <h1>Phone Number Input Component</h1>
      {/* Add your component logic here */}
    </div>
  );
}

export default PhoneNumberInput;