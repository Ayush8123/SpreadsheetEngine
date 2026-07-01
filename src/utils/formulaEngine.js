const { tokenize } = require("./tokenizer");
const { infixToRPN } = require("./shuntingYard");
const { evaluateRPN } = require("./rpnEvaluator");

async function evaluateFormula(formula, spreadsheet) {
    if (formula.startsWith("=")) {
        formula = formula.slice(1);
    }

    const tokens = tokenize(formula);
    const rpn = infixToRPN(tokens);
    return await evaluateRPN(rpn, spreadsheet);
}

module.exports = { evaluateFormula };
