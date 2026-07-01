function evaluateFormula(spreadsheet, formula) {
    formula = formula.substring(1); // remove '='

    const [a, b] = formula.split("+");

    const val1 = isNaN(a) ? spreadsheet.getCellValue(a) : Number(a);
    const val2 = isNaN(b) ? spreadsheet.getCellValue(b) : Number(b);

    return val1 + val2;
}

module.exports = { evaluateFormula };
