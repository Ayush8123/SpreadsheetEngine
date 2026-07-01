function tokenize(formula) {
    const result = [];
    let i = 0;

    while (i < formula.length) {
        const char = formula[i];

        // Skip spaces
        if (char === " ") {
            i++;
            continue;
        }

        // Number (multi-digit)
        if (/[0-9]/.test(char)) {  //“Is char a digit?”
            // If the current character is a digit, then we start building a number.
            let num = char;
            i++;
            while (i < formula.length && /[0-9]/.test(formula[i])) {
                num += formula[i];
                i++;
            }
            result.push({ type: "NUMBER", value: Number(num) });
            continue;
        }

        // Cell reference: A1, B22, Z100
        if (/[A-Z]/.test(char)) {
            let cell = char;
            i++;
            while (i < formula.length && /[0-9]/.test(formula[i])) {
                cell += formula[i];
                i++;
            }
            result.push({ type: "CELL", value: cell });
            continue;
        }

        // Operators
        if ("+-*/".includes(char)) {
            result.push({ type: "OPERATOR", value: char });
            i++;
            continue;
        }

        // Parentheses
        if (char === "(") {
            result.push({ type: "LPAREN", value: "(" });
            i++;
            continue;
        }
        if (char === ")") {
            result.push({ type: "RPAREN", value: ")" });
            i++;
            continue;
        }

        throw new Error("Invalid character: " + char);
    }

    return result;
}
module.exports = { tokenize }
/* 
tokenize("A1 + B2 * (C3 + 5)")
// output

 [
  { type: 'CELL', value: 'A1' },
  { type: 'OPERATOR', value: '+' },
  { type: 'CELL', value: 'B2' },
  { type: 'OPERATOR', value: '*' },
  { type: 'LPAREN', value: '(' },
  { type: 'CELL', value: 'C3' },
  { type: 'OPERATOR', value: '+' },
  { type: 'NUMBER', value: 5 },
  { type: 'RPAREN', value: ')' }
]
 */
