const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [false, "Description is required"],
        trim: true
    },
    status:{
        type: String,
        enum: ["pending", "inprogress", "completed"],
        default: "pending"
    },
   
    assigned: {
        type: String,
        required: [false, "Assigned is required"],
        trim: true
    },
    completed : {
        type: Boolean,
        default: false
    }
},
 {
    timestamps: true
}
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
