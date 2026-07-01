async function evaluateRPN(rpnTokens, spreadsheet) {
    const stack = [];

    for (const token of rpnTokens) {
        if (token.type === "NUMBER") {
            stack.push(token.value);
        } 
        else if (token.type === "CELL") {
            const val = await spreadsheet.getCellValue(token.value);
            stack.push(val);
        } 
        else if (token.type === "OPERATOR") {
            const b = stack.pop();
            const a = stack.pop();

            let result;
            switch (token.value) {
                case "+": result = a + b; break;
                case "-": result = a - b; break;
                case "*": result = a * b; break;
                case "/":
                    if (b === 0) throw new Error("Division by zero");
                    result = a / b;
                    break;
            }
            stack.push(result);
        }
    }

    if (stack.length !== 1) {
        throw new Error("Invalid formula");
    }

    return stack[0];
}

module.exports = { evaluateRPN };
