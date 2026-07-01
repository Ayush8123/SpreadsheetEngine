const service = require("../services/spreadsheetService");

exports.setCell = async (req, res) => {
    // console.log("REQ BODY:", req.body);

    const { cell, value, formula } = req.body;

    await service.setCell(cell, value, formula);

    res.json({ message: "Cell updated" });
};

exports.resetCell = async (req, res) => {
    const { cell } = req.body;
    await service.resetCell(cell);
    res.json({ message: "Cell reset" });
};

exports.getValue = async (req, res) => {
    const { formula } = req.body;
    const result = await service.getValue(formula);
    res.json({ result });
};


// for updating dependent cells after updating one
exports.getAllCells = async (req, res) => {
    const cells = await service.getAllCells();
    res.json(cells);
};
