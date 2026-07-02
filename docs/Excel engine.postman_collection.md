# Spreadsheet Engine API Documentation

A backend-powered spreadsheet engine supporting direct values, formulas, dependency tracking, and automatic recalculation.

## Base URL

```text id="ydn3j0"
/api/v1/sheet
```

---

# Core Features

* Store direct numeric values
* Store formulas
* Formula parsing and evaluation
* Dependency graph management
* Auto-recalculation of dependent cells
* Supports arithmetic expressions and cell references

---

# How Formula Evaluation Works

The engine processes formulas in three stages:

### 1. Tokenization

Breaks formulas into meaningful tokens.

Example:

```text id="6g8xny"
=A1+B1*2
```

Tokens:

```text id="hrya0d"
["A1", "+", "B1", "*", "2"]
```

---

### 2. Shunting Yard Algorithm

Converts infix expressions into Reverse Polish Notation (RPN).

Example:

```text id="r4nq2z"
A1+B1*2
```

Becomes:

```text id="lo2es6"
A1 B1 2 * +
```

This ensures proper operator precedence.

---

### 3. Stack-Based Evaluation

Uses a stack to compute final values.

---

# Endpoints

## 1. Set Cell Value / Formula

### Endpoint

```http id="6i4jhr"
POST /sheet/set
```

### Description

Creates or updates a spreadsheet cell.

Supports:

* Direct numeric values
* Formula storage
* Dependency tracking
* Automatic recalculation

---

## Set a Direct Value

### Request Body

```json id="c1x7pm"
{
  "cell": "A1",
  "value": 10
}
```

### Response

```json id="i6a6vr"
{
  "message": "Cell updated successfully"
}
```

---

## Set a Formula

### Request Body

```json id="4zq1z6"
{
  "cell": "C1",
  "formula": "=A1+B1"
}
```

### Response

```json id="8y66w0"
{
  "message": "Cell updated successfully"
}
```

---

## Auto-Recalculation Example

Suppose:

```text id="i8q9df"
C1 = =A1+B1
D1 = =C1*2
```

If `A1` changes:

```json id="lyh8gz"
{
  "cell": "A1",
  "value": 20
}
```

Then:

* `C1` recalculates automatically
* `D1` recalculates automatically

This is handled through:

* Dependency graph
* DFS traversal

---

## Validation Rules

* `cell` is required
* Either `value` or `formula` must be provided
* Cell names must follow spreadsheet notation (A1, B2, C3...)

---

# 2. Evaluate Formula / Get Cell Value

### Endpoint

```http id="44o4gq"
GET /sheet/evaluate
```

### Description

Evaluates formulas dynamically and returns computed values.

Supports:

* Cell references
* Arithmetic operations
* Nested expressions

---

## Request Body

```json id="7s5b8y"
{
  "formula": "A1+10"
}
```

---

## Supported Formula Examples

```text id="i9j3i9"
A1+10
A2+A3
(A1+B2)*C3
10*3+5*C1
(A1+B1)/(C1-D1)
```

---

## Response Example

```json id="h8j7va"
{
  "result": 42
}
```

---

# Supported Operators

| Operator | Meaning        |
| -------- | -------------- |
| +        | Addition       |
| -        | Subtraction    |
| *        | Multiplication |
| /        | Division       |
| ()       | Grouping       |

---

# Internal Data Structures

## Dependency Graph

Tracks relationships between cells.

Example:

```text id="5n8h8n"
A1 → C1 → D1
```

Used for cascading updates.

---

## DFS Traversal

Used to update dependent cells recursively.

---

# Error Handling

| Code | Meaning                |
| ---- | ---------------------- |
| 200  | Success                |
| 400  | Invalid formula        |
| 404  | Cell not found         |
| 422  | Missing required field |
| 500  | Internal server error  |

---

# Example Workflow

### Step 1

Set A1:

```json id="thjlwm"
{
  "cell": "A1",
  "value": 10
}
```

### Step 2

Set B1:

```json id="8n7g7v"
{
  "cell": "B1",
  "value": 20
}
```

### Step 3

Set C1 formula:

```json id="k6g2b0"
{
  "cell": "C1",
  "formula": "=A1+B1"
}
```

Result:

```text id="y4cjlwm"
C1 = 30
```
