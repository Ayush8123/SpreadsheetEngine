const Spreadsheet = require("../models/spreadsheet");
const { evaluateFormula } = require("../utils/formulaEngine");
const Cell = require("../models/Cell");
const spreadsheet = new Spreadsheet(100);

module.exports = {
    setCell: async (cell, value ,formula) => {
        if(formula){
            await spreadsheet.setFormulaCell(cell,formula);
        }
        else{
            await spreadsheet.setCell(cell, value);
        }
    },

    resetCell: async (cell) => {
        await spreadsheet.resetCell(cell);
    },

    getValue: async (formula) => {
        return await evaluateFormula(formula, spreadsheet);
    },
    
    getAllCells: async () => {
        return await Cell.find({});
    }
};
