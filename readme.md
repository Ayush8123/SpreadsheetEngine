# Spreadsheet Engine

An Excel-like backend engine built from scratch using **Node.js, Express, and MongoDB**.

This project implements core spreadsheet internals such as **formula parsing**, **dependency tracking**, and **automatic recalculation**, similar to how spreadsheet engines like Excel work behind the scenes.

---

## Features

- Set and update cell values
- Reset cell values
- Store formulas inside cells
- Parse arithmetic expressions with operator precedence
- Resolve cell references (`A1`, `B2`, etc.)
- Automatic dependency-based recalculation
- Persistent spreadsheet state using MongoDB

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Core Backend Concepts

---

## 1. Cell Storage

Each cell is stored as a document.

Example:

```json
{
  "cell": "C1",
  "value": 30,
  "formula": "=A1+B1"
}
```

This allows:

- Persistence
- Formula recovery
- Cached computed values

---

## 2. Tokenization

Formulas are first broken into tokens.

Input:

```txt
=A1 + B1 * 2
```

Tokens:

```txt
[A1, +, B1, *, 2]
```

Supported token types:

- CELL
- NUMBER
- OPERATOR
- PARENTHESIS

---

## 3. Shunting Yard Algorithm

Used to convert infix expressions into postfix (Reverse Polish Notation).

Input:

```txt
A1 + B1 * 2
```

Converted:

```txt
A1 B1 2 * +
```

This preserves:

- Operator precedence
- Associativity
- Parentheses

---

## 4. Reverse Polish Notation (RPN) Evaluation

The postfix expression is evaluated using a stack.

Example:

```txt
10 20 2 * +
```

Evaluation:

```txt
10 + (20 * 2) = 50
```

---

## 5. Dependency Graph

Formula relationships are stored as a directed graph.

Example:

```txt
C1 = A1 + B1
D1 = C1 * 2
```

Graph:

```txt
A1 ─┐
    ├──▶ C1 ───▶ D1
B1 ─┘
```

Edge meaning:

```txt
dependency → dependent
```

---

## 6. DFS-based Auto Recalculation

When a base cell changes, all dependent cells are recalculated automatically.

Example:

Initial:

```txt
A1 = 10
B1 = 20
C1 = =A1+B1
D1 = =C1*2
```

Stored:

```txt
C1 = 30
D1 = 60
```

Update:

```txt
A1 = 100
```

Auto propagation:

```txt
C1 = 120
D1 = 240
```

This is implemented using DFS traversal.

---

# API Endpoints

---

## Set Value / Formula

### POST `/sheet/set`

Set a normal value:

```json
{
  "cell": "A1",
  "value": 10
}
```

Set a formula:

```json
{
  "cell": "C1",
  "formula": "=A1+B1"
}
```

---

## Evaluate Formula

### POST `/sheet/value`

```json
{
  "formula": "=A1+B1"
}
```

Returns:

```json
{
  "result": 30
}
```

---

## Get All Cells

### GET `/sheet/all`

Returns all stored cells.

---

# Example Execution Flow

Input:

```txt
A1 = 10
B1 = 20
C1 = =A1+B1
D1 = =C1*2
```

Execution pipeline:

```txt
Tokenizer
→ Shunting Yard
→ RPN Evaluation
→ Store in MongoDB
→ Build dependency graph
```

Update:

```txt
A1 = 100
```

Propagation:

```txt
DFS(A1)
→ Recalculate C1
→ Recalculate D1
```

---

# Project Structure

```txt
src/
├── controllers/
├── routes/
├── services/
├── models/
├── utils/
│   ├── tokenizer.js
│   ├── shuntingYard.js
│   ├── evaluateRPN.js
│   ├── dependencyExtractor.js
```

---

# Future Improvements

- Circular dependency detection
- Graph rebuild on server restart
- Topological sorting optimization
- WebSocket-based live updates
- Multi-sheet support

---

# Learning Outcomes

Through this project I learned:

- Expression parsing
- Lexical analysis
- Stack-based computation
- Graph modeling
- DFS propagation
- State persistence
- Backend architecture design
- Dependency management

---

# Run Locally

```bash
npm install
npm run start
```

Server runs on:

```txt
http://localhost:3000
```