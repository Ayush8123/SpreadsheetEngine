import Cell from "./Cell";

const rows = 5;
const cols = ["A", "B", "C", "D", "E"];

const CELL_WIDTH = "120px";
const ROW_LABEL_WIDTH = "50px";

function Grid({
    gridData,
    onCellSubmit,
    setSelectedCell,
    setFormulaInput
}) {
    return (
        <div>
            {/* Column Headers */}
            <div style={{ display: "flex", marginBottom: "4px" }}>
                {/* Empty top-left corner */}
                <div style={{ width: ROW_LABEL_WIDTH }}></div>

                {cols.map((col) => (
                    <div
                        key={col}
                        style={{
                            width: CELL_WIDTH,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}
                    >
                        {col}
                    </div>
                ))}
            </div>

            {/* Grid Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {/* Row Numbers */}
                    <div
                        style={{
                            width: ROW_LABEL_WIDTH,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}
                    >
                        {rowIndex + 1}
                    </div>

                    {/* Cells */}
                    {cols.map((col) => {
                        const cellId = `${col}${rowIndex + 1}`;

                        return (
                            <Cell
                                key={cellId}
                                cellId={cellId}
                                value={gridData[cellId]?.value}
                                formula={gridData[cellId]?.formula}
                                onSubmit={onCellSubmit}
                                onSelect={(id, value) => {
                                    setSelectedCell(id);
                                    setFormulaInput(value);
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Grid;