function precedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
}

function infixToRPN(tokens) {
    const output = [];
    const stack = [];

    for (const token of tokens) {

        // Numbers and cell references go straight to output
        if (token.type === "NUMBER" || token.type === "CELL") {
            output.push(token);
        }

        // Operators
        else if (token.type === "OPERATOR") {
            while (
                stack.length &&
                stack[stack.length - 1].type === "OPERATOR" &&
                precedence(stack[stack.length - 1].value) >= precedence(token.value)
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }

        // Left Parenthesis
        else if (token.type === "LPAREN") {
            stack.push(token);
        }

        // Right Parenthesis
        else if (token.type === "RPAREN") {
            while (stack.length && stack[stack.length - 1].type !== "LPAREN") {
                output.push(stack.pop());
            }
            stack.pop(); // remove '('
        }
    }

    // Pop remaining operators
    while (stack.length) {
        output.push(stack.pop());
    }

    return output;
}

module.exports = { infixToRPN };
