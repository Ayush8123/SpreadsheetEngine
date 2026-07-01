import { useState, useEffect } from "react";
import Grid from "./components/Grid";
import { setCell, getValue, getAllCells } from "./api/sheetApi";
function App() {
    const [gridData, setGridData] = useState({});
    const [selectedCell, setSelectedCell] = useState(null);
    const [formulaInput, setFormulaInput] = useState("");

    const handleCellSubmit = async (cellId, input) => {
        if (input.startsWith("=")) {
            await setCell({
                cell: cellId,
                formula: input
            });
        } else {
            await setCell({
                cell: cellId,
                value: Number(input)
            });
        }
        await refreshGrid();
    };

    const refreshGrid = async () => {
        const res = await getAllCells();

        const updatedGrid = {};

        res.data.forEach((cell) => {
            updatedGrid[cell.cell] = {
                value: cell.value,
                formula: cell.formula
            };
        });

        setGridData(updatedGrid);
    };
    useEffect(() => {
        refreshGrid();
    }, []);

    return (
        <div>
            <h1>Spreadsheet Engine</h1>
            <div className="formula-bar">
                <div className="cell-label">
                    {selectedCell || "Select"}
                </div>

                <input
                    type="text"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && selectedCell) {
                            handleCellSubmit(selectedCell, formulaInput);
                        }
                    }}
                    placeholder="Enter value or formula..."
                />
            </div>
            <Grid
                gridData={gridData}
                onCellSubmit={handleCellSubmit}
                setSelectedCell={setSelectedCell}
                setFormulaInput={setFormulaInput}
            />
        </div>
    );
}

export default App;