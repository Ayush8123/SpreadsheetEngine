const mongoose=require("mongoose")

const cellSchema=new mongoose.Schema(
    {
        cell: {
            type: String,
            required: true,
            unique: true   // A1 should not appear twice
        },
        value: {
            type: Number,
            default: 0
        },
        formula: {
            type: String,
            default: null
        }
    },
    {
        timestamps : true // adds createdAt & updatedAt
    }
)

const Cell=mongoose.model("Cell",cellSchema)
module.exports=Cell;