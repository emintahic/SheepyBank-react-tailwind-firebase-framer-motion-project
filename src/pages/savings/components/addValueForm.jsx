import { useState } from "react";

export default function addValue(props) {
  const newAmount = 0;
  const [newValue, setNewValue] = useState(0);

  return props.trigger ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        newAmount = newValue;
        setTrigger(false);
      }}
    >
      <input
      required
        type="number"
        value={newValue}
        placeholder="Amount"
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      />
      <button type="submit">ADD</button>
    </form>
  ) : (
    ""
  );
}
