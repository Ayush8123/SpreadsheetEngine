import { useState, useEffect } from "react";

function Cell({ cellId, value, onSubmit, onSelect }) {
    const [input, setInput] = useState(value || "");

    useEffect(() => {
        setInput(value || "");
    }, [value]);

    const handleBlur = () => {
        onSubmit(cellId, input);
    };

    return (
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
                onSelect(cellId, input);
            }}
            onBlur={handleBlur}
        />
    );
}

export default Cell;