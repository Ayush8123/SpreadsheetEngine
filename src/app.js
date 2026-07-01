require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
const {tokenize} = require("./utils/tokenizer.js")
const cors = require("cors");
connectDB(); 

app.use(express.json());
app.use(cors());

app.use("/sheet", require("./routes/spreadsheetRoutes"));

// const formula = "A1 + B2 * (C3 + 5)";
// const tokens = tokenize(formula);

// console.log(tokens);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
