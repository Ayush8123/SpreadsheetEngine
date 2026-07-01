const Cell = require("./Cell");
const { tokenize } = require("../utils/tokenizer");
const { extractDependencies } = require("../utils/dependencyExtractor");
const { evaluateFormula } = require("../utils/formulaEngine");

class Spreadsheet {
    constructor(rows) {
        this.rows = rows;
        this.columns = 26;

        // dependency graph: dependency -> list of dependents
        this.dependencyGraph = new Map();
    }

    // equivalent to: adj[dep].push_back(cell)
    addDependencies(cell, dependencies) {
        for (const dep of dependencies) {
            if (!this.dependencyGraph.has(dep)) {
                this.dependencyGraph.set(dep, []);
            }
            this.dependencyGraph.get(dep).push(cell);
        }
    }

    // set value-only cell
    async setCell(cell, value) {
        await Cell.findOneAndUpdate(
            { cell },
            { value, formula: null },
            { upsert: true, new: true }
        );

        // trigger auto-recalculation
        await this.recalculateFrom(cell);
    }

    //set formula cell
    async setFormulaCell(cell, formula) {
        const expr = formula.startsWith("=") ? formula.slice(1) : formula;

        const tokens = tokenize(expr);
        const dependencies = extractDependencies(tokens);

        // register dependencies in graph
        this.addDependencies(cell, dependencies);

        const value = await evaluateFormula(formula, this);

        await Cell.findOneAndUpdate(
            { cell },
            { formula, value },
            { upsert: true, new: true }
        );
    }

    // DFS-based auto recalculation
    async recalculateFrom(cell) {
        if (!this.dependencyGraph.has(cell)) return;

        for (const dependent of this.dependencyGraph.get(cell)) {
            const doc = await Cell.findOne({ cell: dependent });
            if (!doc || !doc.formula) continue;

            const newValue = await evaluateFormula(doc.formula, this);

            await Cell.updateOne(
                { cell: dependent },
                { value: newValue }
            );

            // DFS
            await this.recalculateFrom(dependent);
        }
    }

    // value lookup used by formula engine
    async getCellValue(cell) {
        const doc = await Cell.findOne({ cell });
        return doc ? doc.value : 0;
    }
}

module.exports = Spreadsheet;
